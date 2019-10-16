import React, { useEffect, useState, useReducer, useContext } from 'react';
import moment from 'moment';
import { CalendarContext } from './Layout.jsx';

function Day(props) {
  const currentContext = useContext(CalendarContext);

  function handleOnClick() {
    // get all elements with calSelected and remove class from that DOM
    var revertTargets = document.getElementsByClassName('calSelected');
    // var aside = document.getElementById(`${event.target.id}aside`);
    for (let i = 0; i < revertTargets.length; i++) {
      revertTargets[i].className = "calDay";
    }
    event.target.className += " calSelected";
    // event.target.setAttribute("aria-expanded", "true");
    // aside.innerHTML="<span role='tooltip' aria-live='polite'>Hello</span>";
    // aside.setAttribute("style", "display: block;");

    currentContext.handleOnClick();
  };

  if (props.day === null) {
    return (
      <td className="calWhiteSpace"></td>
    );
  } else if (props.day <= moment() || props.datesReserved.indexOf(Number(props.day.format('D'))) > -1) {
    return (
      <td className="calStatic">
        {props.day.format('D')}
      </td>
    );
  } else {
    return (
      <td className="calDay" id={props.day.format('D-MMMM-YYYY')} onClick={handleOnClick} aria-expanded="false" aria-describedby={`${props.day.format('D-MMMM-YYYY')}aside`}>
        {props.day.format('D')}
        {/* <aside id={`${props.day.format('D-MMMM-YYYY')}aside`}></aside> */}
      </td>
    );
  }

}
 
export default Day;