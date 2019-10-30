import React from "react";
import classNames from 'classnames';
import "components/Button.scss";



export default function Button(props) {
   const classnames = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });
   return  <button className={classnames} onClick={props.onClick} disabled={props.disabled}> {props.children}</button>
   }


