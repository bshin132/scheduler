import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const { days, day, setDay, selected } = props;
  const parsedDayList = days.map((day) => (
    <DayListItem
      key={day.id}
      {...day}
      setDay={props.onChange}
      selected={day.name === props.value}
    />
  ));

  return <ul>{parsedDayList}</ul>;
}
