import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";


  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value }
      case SET_APPLICATION_DATA:
        return { ...state, ...action.value }
      case SET_INTERVIEW: 
        return { ...state, appointments: action.appointments }
      
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => dispatch({ type: SET_DAY, value: day });


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, appointments })
        Promise.all([
          axios.get("/api/days"),
          axios.get("/api/appointments"),
          axios.get("/api/interviewers"),
        ]).then((all) => {
          //  dispatch(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
          dispatch({ type: SET_APPLICATION_DATA, value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data } });
            // console.log('this is all========',all[0].data[0].spots) // this is the number of spots
        })
    
      }) 
  }


  function cancelInterview(id, interview) {

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };

      // const appointments = {
      //   ...state.appointments,
      //   [id]: appointment
      // };

      // dispatch({
      //   type: SET_INTERVIEW,
      //    appointments
      // });
      Promise.all([
        axios.get("/api/days"),
        axios.get("/api/appointments"),
        axios.get("/api/interviewers"),
      ]).then((all) => {
        //  dispatch(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
        dispatch({ type: SET_APPLICATION_DATA, value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data } });
          // console.log('this is all========',all[0].data[0].spots) // this is the number of spots
      })
    })
  };


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      //  dispatch(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      dispatch({ type: SET_APPLICATION_DATA, value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data } });
        // console.log('this is all========',all[0].data[0].spots) // this is the number of spots
    })
  }, []);


  
  return { state, setDay, bookInterview, cancelInterview }

  

}
