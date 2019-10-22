import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import { CalendarContext } from './CalendarLayout.jsx';
import styles from './styles/Day.module.css';

function Day(props) {
  const currentContext = useContext(CalendarContext);
  const endDate = currentContext.targetState.endDate;
  const startDate = currentContext.targetState.startDate;
  const nextReservedDate = currentContext.targetState.nextResDate;
  const selectableState = currentContext.selectableState;
  const setSelectableState = currentContext.setSelectableState;

  function handleOnClick() {
    // console.log(event.target)
    if ((startDate === null || endDate === undefined) && event.target.className !== styles.calSelected) {
      currentContext.setTarget(event.target.id);
    }
  };

  if (props.day !== null) {
    var isBeforeCurrentDay = (props.day <= moment());
    if (props.datesReserved === undefined) {
      var isReserved = true;
    } else {
      var isReserved = (props.datesReserved.includes(props.day.format('D-MMMM-YYYY')));
    }

    var isBeforeSelected = false;
    var isAfterNextReservation = false;
    var isNotEndDate = true;
  
    if (endDate === undefined && startDate !== null) {
      var currentStartDate = moment(startDate, 'D-MMMM-YYYY', true);
      isReserved = false;
      isBeforeSelected = (props.day < currentStartDate);
      isAfterNextReservation = (props.day.isAfter(moment(nextReservedDate, 'D-MMMM-YYYY', true)));
    }
    if (endDate !== undefined) { // can optimize here by adding more conditions only applicable to select days
      isNotEndDate = !(props.day.isSame(moment(endDate, 'D-MMMM-YYYY', true)));
      var currentStartDate = moment(startDate, 'D-MMMM-YYYY', true);
      var currentEndDate = moment(endDate, 'D-MMMM-YYYY', true);
      var isBetweenStartAndEnd = (props.day.isAfter(currentStartDate) && props.day.isBefore(currentEndDate));
    }
  }

  function handleMouseOver() {
    // console.log(event.target);
    // // use conditional rendering for onMouseOver
    // // 
    // setSelectableState(event.target.id);
  }

  if (props.day === null) {
    return (
      <td className={styles.calWhiteSpace} ></td>
    );
  } else if (isBetweenStartAndEnd) {
    return (
      <td className={styles.calSelected} id={props.day.format('D-MMMM-YYYY')}>
        {props.day.format('D')}
      </td>
    );
  } else if ( (isBeforeCurrentDay || isBeforeSelected || isAfterNextReservation || isReserved) && isNotEndDate ) {
    return (
      <td className={styles.calStatic} id={props.day.format('D-MMMM-YYYY')}>
        {props.day.format('D')}
      </td>
    );
  } else {
    return (
      <td className={styles.calDay} id={props.day.format('D-MMMM-YYYY')} onClick={handleOnClick} onMouseOver={selectableState.selectDates ? handleMouseOver : undefined} >
        {props.day.format('D')}
      </td>
    );
  }
}
 
export default Day;