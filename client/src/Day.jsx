import React, { useEffect, useState, useReducer, useContext } from 'react';
import moment from 'moment';
import { CalendarContext } from './Layout.jsx';

function Day(props) {
  const currentContext = useContext(CalendarContext);

  function handleOnClick() {
    if (currentContext.targetState.startDate === null || currentContext.targetState.endDate === undefined) {
      currentContext.setTarget(event.target.id);
    }
  };

  if (props.day !== null) {
    var isBeforeCurrentDay = (props.day <= moment());
    var hasNoData = (props.datesReserved === undefined);
    var isBeforeSelected = false;
    var isAfterNextReservation = false;
  
    var currentStartDate = moment(currentContext.targetState.startDate, 'D-MMMM-YYYY', true);
    var nextReservations = props.datesReserved.filter((day) => {
      return ( day > Number(currentStartDate.format('D')) );
    });
    var nextReservedDate = moment(`${nextReservations[0]}-${currentStartDate.format('MMMM-YYYY')}`, 'D-MMMM-YYYY', true);

    if (currentContext.targetState.endDate === undefined && currentContext.targetState.startDate !== null) {
      isBeforeSelected = (props.day < currentStartDate);
      isAfterNextReservation = (props.day > nextReservedDate);
    }
  }

  if (props.day === null) {
    return (
      <td className="calWhiteSpace"></td>
    );
  } else if (isBeforeCurrentDay || hasNoData || isBeforeSelected || isAfterNextReservation || props.datesReserved.indexOf(Number(props.day.format('D'))) > -1) {
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