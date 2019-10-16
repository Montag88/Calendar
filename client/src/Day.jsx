import React, { useEffect, useState, useReducer, useContext } from 'react';
import moment from 'moment';
import { CalendarContext } from './Layout.jsx';

function Day(props) {
  const currentContext = useContext(CalendarContext);

  function handleOnClick() {
    // get all elements with calSelected and remove class from that DOM
    var revertTargets = document.getElementsByClassName('calSelected');
    for (let i = 0; i < revertTargets.length; i++) {
      revertTargets[i].className = "calDay";
    }
    event.target.className += " calSelected";
    // dispatch();
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
      <td className="calDay" id={props.day} onClick={handleOnClick}>
        {props.day.format('D')}
      </td>
    );
  }

}
 
export default Day;