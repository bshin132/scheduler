import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  let interviewClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  return (
    <li
      className={interviewClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt="Sylvia Palmer"
      />
      {props.selected && props.name}
    </li>
  );
}