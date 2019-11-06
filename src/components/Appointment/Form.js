import React, { useState } from 'react';
import Button from "../Button.js"
import InterviewerList from "../InterviewerList.js";
import "./styles.scss";

export default function Form(props) {
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  const [error, setError] = useState("");
  function reset() {
    setName("")
    setInterviewer(null);
  }

  function cancel() {
    reset()
    props.onCancel()
  }
  
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;

    // the following else if causes a test to fail. But saves app
    // from crashing if user edits the name but doesnt choose
    // a new interviewer... will write better tests when time allows....bootcamp life
    } else if (!interviewer) {
      setError("Must pick an interviewer");
      return;
    }
  
    setError("");
    props.onSave(name, interviewer, props.isSave);
  }

 
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value = {name}
       onChange={event => setName(event.target.value)}
       data-testid="student-name-input"

      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => cancel()}>Cancel</Button>
      <Button confirm onClick={() => validate()}>Save</Button>
    </section>
  </section>
</main>
  )
}