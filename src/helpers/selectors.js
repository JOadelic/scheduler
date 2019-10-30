 

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

export { getAppointmentsForDay, getInterview }
