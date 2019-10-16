import React, { useState, useEffect, useContext, useReducer } from 'react';
import moment from 'moment';
import Message from './Message';
import Calendar from './Calendar';

export const CalendarContext = React.createContext(null);

function monthReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { date: state.date.add(1, 'M')};
    case 'decrement':
      return { date: state.date.subtract(1, 'M')};
  }
};

function clickReducer(state, action) {
  switch (state.click) {
    case 'noclick':
      console.log(state.click);
      return { click: 'firstclick' };
    case 'firstclick':
      console.log(state.click);
      return { click: 'secondclick' };
    case 'secondclick':
      console.log(state.click);
      return { click: 'noclick' };
  }
};

function Layout(props) {
  const [dateState, setMonth] = useReducer(monthReducer, {date: moment()});
  const [clickState, handleOnClick] = useReducer(clickReducer, {click: 'noclick'})

  return (
    <CalendarContext.Provider value={{
      dateState, setMonth,
      clickState, handleOnClick
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