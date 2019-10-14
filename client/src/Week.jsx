import React, { useEffect, useState } from 'react';
import Day from './Day.jsx';

function Week(props) {
  return (
    <tr>
      {props.week.map((day, index) => {
        return (<Day key={index} datesReserved={props.datesReserved} day={day}/>)
      })}
    </tr>
  );
}

export default Week;