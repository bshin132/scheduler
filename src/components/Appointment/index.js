import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  //DIFFERENT MODES ASSIGNED TO VARIABLES
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETEING = "DELETEING";
  const CANCEL = "CANCEL";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //SAVE APPOINTMENT 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }

  //DELETE APPOINTMENT
  function deleteAppointment() {
    transition(DELETEING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  //TRANSITION FOR CANCEL
  function deleteConfirmation() {
    transition(CANCEL);
  }

  //TRANSITION FOR EDIT
  function editAppointment() {
    transition(EDIT);
  }

  //INDEX COMP
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteConfirmation}
          onEdit={editAppointment}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === CANCEL && (
        <Confirm
          message="Are you sure?"
          onConfirm={deleteAppointment}
          onCancel={back}
        />
      )}
      {mode === SAVING && <Status message="SAVING..." />}
      {mode === DELETEING && <Status message="DELETING..." />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          value={props.interview.student}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save." onClose={() => back()} />
      )}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete." onClose={() => back()} />
      )}
    </article>
  );
}
