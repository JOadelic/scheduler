import React, { useEffect } from "react";
import "./styles.scss";
// import classNames from "classnames";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from "hooks/useVisualMode.js"
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const CONFIRM = "CONFIRM";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    (props.interview ? SHOW : EMPTY)

  );
  

  useEffect(() => {
    if (props.interview) {
      transition(SHOW)
    } else {
      transition(EMPTY)
    }
  }, [])


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING)
    
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  }

  function cancel() {
    transition(DELETE, true)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  }

  function destroy() {
    transition(DELETE, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }



  return (
    <article className="appointment">
      <Header time={props.time} />
      <div>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && props.interview && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
        )}
        {mode === CREATE &&
          <Form
            interviewers={props.interviewers}
            onSave={(name, interviewer) => save(name, interviewer)}
            onCancel={() => back()}
          />}
        {mode === SAVING && <Status message="Saving" />}
        {mode === CONFIRM && (
          <Confirm
            message="Are you sure you want to delete?"
            onCancel={() => transition(SHOW)}
            onConfirm={() => destroy()}
          />
        )}
        {mode === DELETE && <Status message="Deleting" />}
        {mode === EDIT && <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          onSave={save}
          onCancel={back}
          interviewer={props.interview.name}
        />}
        {mode === ERROR_SAVE && (
          <Error message="Could not save appointment" onClose={() => back()} />
        )}
        {mode === ERROR_DELETE && (
          <Error message="Could not delete appointment" onClose={() => transition(SHOW)} />
        )}

      </div>
    </article>
  )
}


