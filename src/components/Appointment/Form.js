import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //RESETS STUDENT AND INTERVIEWER STATES
  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setError("");
  };
  
  //RESET CALL
  const cancel = () => {
    reset();
    props.onCancel();
  };

  //VALIDATE TO SEE IF USER PICKS A STUDENT AND INTERVIEWER
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Interviewer cannot be unselected");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }


  //FORM COMP
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onSubmit={event => event.preventDefault()} onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
