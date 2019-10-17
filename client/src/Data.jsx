import React, { useState, useEffect, useContext, useReducer } from 'react';
import { CalendarContext } from './Layout.jsx';

function Data(props) {
  const currentContext = useContext(CalendarContext);
  if (currentContext.targetState.target !== null) {
    return (
      <div onClick={() => {currentContext.setTarget(null)}}>Clear dates</div>
    );
  } else {
    return (
      <>
      </>
    );
  }
}

export default Data;