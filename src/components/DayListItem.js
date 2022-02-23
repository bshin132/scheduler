import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

const formatSpots = (spots) => {
  if (!spots) {
    return `no spots remaining`;
  }
  if (spots === 1) {
    return `${spots} spot remaining`;
  }
  return `${spots} spots remaining`;
};

export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props;
  const message = formatSpots(spots);
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots,
  });

  return (
    <li onClick={() => setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{message}</h3>
    </li>
  );
}
