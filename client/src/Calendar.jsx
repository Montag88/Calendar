import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import Week from './Week.jsx';
import { CalendarContext } from './Layout.jsx';

function Calendar(props) {
  const currentContext = useContext(CalendarContext);
  const setMonth = currentContext.setMonth;
  var currentMonth = currentContext.dateState.date;
  var nextMonth = moment(currentMonth).add(1, 'M');

  function createCalendar(month) {
    var daysInMonth = moment(month).daysInMonth();
    var startDay = moment(`1-${month.format('MMMM-YYYY')}`, 'D-MMMM-YYYY', true).format('d');
    if (props.currentListing.datesReserved[month.format('YYYY')] === undefined) {
      var datesReserved = undefined;
    } else {
      var datesReserved = props.currentListing.datesReserved[month.format('YYYY')][month.format('MMMM')];
    }
    var assembledMonth = [];
    var assembledWeek = [];
    for (let i = 0; i < daysInMonth; i++) {
      if (i === 0) {
        for (let j = 0; j < startDay; j++) {
          assembledWeek.push(null);
        }
      }
      assembledWeek.push(moment(`${i + 1}-${month.format('MMMM-YYYY')}`, 'D-MMMM-YYYY', true));
      if (i === daysInMonth - 1) {
        while(assembledWeek.length < 7) {
          assembledWeek.push(null);
        }
      }
      if (assembledWeek.length === 7) {
        assembledMonth.push(assembledWeek);
        assembledWeek = [];
      }
    }

    return (
      <>
      {assembledMonth.map((week) => {
        return <Week key={week} datesReserved={datesReserved} week={week} />
      })}
      </>
    );
  }

  function createCalHeaders() {
    return(
      <tr>
      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((dayHeader) => {
            return <th className="calHeader" key={dayHeader}>{dayHeader}</th>
          })}
      </tr>
    );
  };

  return (
    <tr>
      <td>
        <table>
          <thead>
            <tr>
              <th className="calHeader"><button onClick={() => {setMonth({type: "decrement"})}}>-</button></th>
              <th colSpan="5" className="calHeader">{`${currentMonth.format('MMMM YYYY')}`}</th>
              <th className="calHeader"></th>
            </tr>
          </thead>
          <tbody>
            {createCalHeaders()}
            {createCalendar(currentMonth)}
          </tbody>
        </table>
      </td>
      <td>
        <table>
          <thead>
            <tr>
              <th className="calHeader"></th>
              <th colSpan="5" className="calHeader">{`${nextMonth.format('MMMM YYYY')}`}</th>
              <th className="calHeader"><button onClick={() => {setMonth({type: "increment"})}}>+</button></th>
            </tr>
          </thead>
          <tbody>
            {createCalHeaders()}
            {createCalendar(nextMonth)}
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default Calendar;