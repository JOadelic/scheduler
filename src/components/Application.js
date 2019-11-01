import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "components/DayList.js";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Ha Pham",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3:30pm",
//     interview: {
//       student: "Maria Fernandez",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "6pm",
//     interview: {
//       student: "Jenny Lastname",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }

// ];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });
  const interviewers = getInterviewersForDay(state, state.day)

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => setState((state) => {
        const appointments ={
          ...state.appointments,
          [id]: appointment
        };
    
        return ({
          ...state,
          appointments
        });
      }))
    }


  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments ={
      ...state.appointments,
      [id]: appointment
    };

    setState({
      ...state,
      appointments
    });
    return axios.delete(`/api/appointments/${id}`)
  };
  

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
     setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, []);

  const appointmentsArray = getAppointmentsForDay(state, state.day);
  
  const schedule = appointmentsArray.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log('this is the interview', interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        // interviewer={interviewer}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });



  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="/images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList days={state.days} day={state.day} setDay={setDay} />
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="/images/lhl.png"
  alt="Lighthouse Labs"
/>

      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );

}



