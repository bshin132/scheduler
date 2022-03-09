import React from "react";
import DayListItem from "./DayListItem";

//DAYLIST COMP
export default function DayList(props) {
  const parsedDayList = props.days.map((day) => (
    <DayListItem
      key={day.id}
      {...day}
      setDay={props.onChange}
      selected={day.name === props.value}
    />
  ));

  return <ul>{parsedDayList}</ul>;
}
