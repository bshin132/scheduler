import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay, selected } = props;
  const parsedDayList = days.map((day) => (
    <DayListItem key={day.id} {...day} setDay={setDay} selected={day.name === props.day}/>
  ));

  return <ul>{parsedDayList}</ul>;
}
