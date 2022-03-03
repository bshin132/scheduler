import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => {
    setState({ ...state, day });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
      axios.get("/api/days"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        appointments: all[0].data,
        interviewers: all[1].data,
        days: all[2].data,
      }));
    });
  }
  , []
  );

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({
      ...state,
      appointments,
    });
    return axios.put(`/api/appointments/${id}`, { interview });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day, index) => {
      if (day.name === foundDay.name) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
