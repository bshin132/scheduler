function getAppointmentsForDay(state, day) {
  const answer = [];
  for (const element of state.days) {
    if (element.name === day) {
      for (const appointment of element.appointments) {
        if (state.appointments[appointment]) {
          answer.push(state.appointments[appointment]);
        }
      }
    }
  }
  return answer;
}

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo,
  };
}

function getInterviewersForDay(state, day) {
    const interviewer = [];
    for (const element of state.days) {
      if (element.name === day) {
        for (const interview of element.interviewers) {
          if (state.interviewers[interview]) {
            interviewer.push(state.interviewers[interview]);
          }
        }
      }
    }
    return interviewer;
  }

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
