 

function getAppointmentsForDay(state, day) {
  let thatDaysAppointments = []
  let array = [];
 
  // loops through state.days to find day argument
  for (let theDay of state.days) {
    if (theDay.name === day) {
      thatDaysAppointments = theDay.appointments
    }
  }
  // loops through appointment and compares days array lloking for match
  for (let appointmentId in state.appointments) {
    if (thatDaysAppointments.includes(state.appointments[appointmentId].id)) {
      array.push(state.appointments[appointmentId])
    }
  }
  return array
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewObject = {};
  for (let interviewer in state.interviewers) {
    interviewObject.student = interview.student;
    if (interview.interviewer === state.interviewers[interviewer].id) {
      interviewObject.interviewer = {
        id: state.interviewers[interviewer].id,
        name: state.interviewers[interviewer].name,
        avatar: state.interviewers[interviewer].avatar
      };
    }
  }
  return interviewObject;
}

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//       interviewers: [1, 2]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//       interviewers: [2]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },

//   interviewers: {
//     "1": {  
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }
// };


function getInterviewersForDay(state, day) {
  let theInterviewers = [];
  if (state.days === "" || !state.days) {
    return
  }
  for (let days of state.days) {
    // console.log(days)
    if (days.name === day && days.interviewers) {
      theInterviewers = days.interviewers.map(
        id => state.interviewers[id]
      );
    }
  }
  return theInterviewers;
}

// console.log(getInterviewersForDay(state, "Monday"))

export { getAppointmentsForDay, getInterview, getInterviewersForDay }
