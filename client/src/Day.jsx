import React, { useEffect, useState } from 'react';

function Day(props) {
  // console.log(props.datesReserved)
  if (props.datesReserved.indexOf(props.day) > -1) {
    return (
      <td className="calReserved">
        {props.day}
      </td>
    );
  } else {
    return (
      <td className="calDay">
        {props.day}
      </td>
    );
  }


}
 
export default Day;