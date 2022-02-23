import React from "react";

import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const parsedInterviewerList = props.interviewers.map((interviewer) => (
    <InterviewerListItem
      key={interviewer.id}
      {...interviewer}
      setInterviewer= {() => props.setInterviewer(interviewer.id)}
      selected={interviewer.id === props.interviewer}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewerList}</ul>
    </section>
  );
}
