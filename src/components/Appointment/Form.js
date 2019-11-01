import React, { useState } from 'react';
import Button from "../Button.js"
import InterviewerList from "../InterviewerList.js";
import "./styles.scss";
export default function Form(props) {
  const [name, setName] = useState(props.name || "")
  const [interviewer, setInterviewer] = useState(props.interviewer || null)
  
  function reset() {
    setName("")
    setInterviewer(null);
  }

  function cancel() {
    reset()
    props.onCancel()
    console.log('working????')
    
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
        /*
          This must be a controlled component
        */
       onChange={event => setName(event.target.value)}

      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={() => cancel()}>Cancel</Button>
      <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
    </section>
  </section>
</main>
  )
}