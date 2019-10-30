import React from "react";
import "./styles.scss";
import classNames from "classnames";


export default function Empty(props) {
  const style = classNames("appointment")
  return (
    <main className="appointment__add">
      <img 
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
</main>
  )
}