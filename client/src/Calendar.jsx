import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Week from './Week.jsx';

function Calendar(props) {
  // ARROWS
  const [currentMonth, setMonth] = useState(moment().format('MMMM'));
  const [currentYear, setYear] = useState(moment().format('YYYY'));
  // const [datesReserved, setDatesReserved] = useState([]);

  // useEffect(() => {
  //   // SHOULD CHANGE DATABASE TO OBJECT WITH YEAR PROPS, change [0] to [currentYear]
  //   setDatesReserved(props.currentListing.datesReserved[0][currentMonth]);
  // }, [])

  function createCalendar() {
    var daysInMonth = moment().daysInMonth();
    var startDay = moment(`01-${currentMonth}-${currentYear}`, 'DD-MMMM-YYYY', true).format('d');
    var datesReserved = props.currentListing.datesReserved[0][currentMonth];
    var month = [];
    var week = [];
    for (let i = 0; i < daysInMonth; i++) {
      if (i === 0) {
        for (let j = 0; j < startDay; j++) {
          week.push(null);
        }
      }
      week.push(i + 1);
      if (i === daysInMonth - 1) {
        while(week.length < 7) {
          week.push(null);
        }
      }
      if (week.length === 7) {
        month.push(week);
        week = [];
      }
    }

    return (
      <>
      {month.map((week) => {
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
    <table>
      <thead>
        <tr>
          <th className="calHeader">X==</th>
          <th colSpan="5" className="calHeader">{`${currentMonth} ${currentYear}`}</th>
          <th className="calHeader">==X</th>
        </tr>
      </thead>
      <tbody>
        {createCalHeaders()}
        {createCalendar()}
      </tbody>
    </table>
  );
};

export default Calendar;