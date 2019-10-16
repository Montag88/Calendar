import React, { useState, useEffect, useContext, useReducer } from 'react';
import moment from 'moment';
import Message from './Message';
import Calendar from './Calendar';

export const CalendarContext = React.createContext(null);

function monthReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { date: state.date.add(1, 'M')};
    case "decrement":
      return { date: state.date.subtract(1, 'M')};
  }
};

function Layout(props) {
  const [dateState, setMonth] = useReducer(monthReducer, {date: moment()});
  return (
    <CalendarContext.Provider value={{
      setMonth,
      dateState
    }}>
      <div>
        Availability
        <br></br>
          <Message currentListing={props.currentListing} />
        <br></br>
        <table>
          <tbody>
            <Calendar currentListing={props.currentListing}/>
          </tbody>
        </table>
        <br></br>
        Clear Dates and Data
      </div>
    </CalendarContext.Provider>
  );
};

export default Layout;