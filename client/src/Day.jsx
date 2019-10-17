import React, { useEffect, useState, useReducer, useContext } from 'react';
import moment from 'moment';
import { CalendarContext } from './Layout.jsx';

function Day(props) {
  const currentContext = useContext(CalendarContext);

  // useEffect(() => {
  //   revertTargets();
  // }, [currentContext.targetState])
  
  // function revertTargets() {
  //   // get all elements with calSelected and reset
  //   var revertTargets = document.getElementsByClassName('calSelected');
  //   for (let i = 0; i < revertTargets.length; i++) {
  //     revertTargets[i].className = "calDay";
  //     var tooltiptext = document.getElementById('tooltiptext');
  //     tooltiptext.parentNode.removeChild(tooltiptext);
  //   }
  // };

  function handleOnClick() {
    if (currentContext.targetState.target === null) {
      currentContext.setTarget(event.target.id);
    }
  };

  var isBeforeCurrentDay = (props.day <= moment());
  var hasNoData = (props.datesReserved === undefined);
  var isBeforeSelected = (props.day < moment(currentContext.targetState.target, 'D-MMMM-YYYY', true));

  if (props.day === null) {
    return (
      <td className="calWhiteSpace"></td>
    );
  } else if (isBeforeCurrentDay || hasNoData || isBeforeSelected || props.datesReserved.indexOf(Number(props.day.format('D'))) > -1) {
    return (
      <td className="calStatic">
        {props.day.format('D')}
      </td>
    );
  } else {
    return (
      <td className="calDay" id={props.day.format('D-MMMM-YYYY')} onClick={handleOnClick}>
        {props.day.format('D')}
      </td>
    );
  }
}
 
export default Day;