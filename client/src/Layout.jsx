import React, { useState, useEffect, useContext, useReducer } from 'react';
import moment from 'moment';
import Message from './Message';
import Calendar from './Calendar';
import Data from './Data';

export const CalendarContext = React.createContext(null);

function Layout(props) {
  const [dateState, setMonth] = useReducer(monthReducer, {date: moment()});
  const [targetState, setTarget] = useReducer(targetReducer, {target: null})

  useEffect(() => {
    setTarget(null);
  }, [props.currentListing])

  function monthReducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { date: state.date.add(1, 'M')};
      case 'decrement':
        return { date: state.date.subtract(1, 'M')};
    }
  };
  
  function targetReducer(state, action) { // action is target id, date
    if (action !== null) { // if state is already a date, then do something else
      var target = document.getElementById(action);
      target.className = "calSelected tooltip";
      // target.innerHTML += `<span class='tooltiptext' id='tooltiptext'/>${props.currentListing.minStayLength} night minimum stay</span>`;
    } else {
      // get all elements with calSelected and reset
      var revertTargets = document.getElementsByClassName('calSelected');
      for (let i = 0; i < revertTargets.length; i++) {
        revertTargets[i].className = "calDay";
        var tooltiptext = document.getElementById('tooltiptext');
        tooltiptext.parentNode.removeChild(tooltiptext);
      };
    }
    return { target: action };
  };

  return (
    <CalendarContext.Provider value={{
      dateState, setMonth,
      targetState, setTarget
    }}>
      <div>
        Availability
        <br></br>
          <Message currentListing={props.currentListing} />
        <br></br>
        <table>
          <tbody>
            <Calendar currentListing={props.currentListing} />
          </tbody>
        </table>
        <br></br>
        <Data />
      </div>
    </CalendarContext.Provider>
  );
};

export default Layout;