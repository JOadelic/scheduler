import React from "react";
import "./DayListItem.scss";
import classNames from 'classnames';
// import { render } from "@testing-library/react";

export default function DayListItem(props) {

  const style = classNames("day-list__item", {
    "day-list__item--selected": (props.selected === true),
    "day-list__item--full": (props.spots === 0)
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining";
    } 
    if (spots === 1) {
      return "1 spot remaining";
    }
    if (spots > 1) {
      return `${spots} spots remaining`;
    }
  };
 
  return (
    <li className={style} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

