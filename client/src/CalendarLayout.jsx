import React, { useState, useEffect, useReducer } from 'react';
import moment from 'moment';
import Message from './Message';
import Calendar from './Calendar';
import Data from './Data';
import dayStyles from './styles/Day.module.css';
import layoutStyles from './styles/CalendarLayout.module.css';
import './styles/reset.css';

export const CalendarContext = React.createContext(null);

function CalendarLayout(props) {
  const [dateState, setMonth] = useReducer(monthReducer, {date: moment().format('MMMM YYYY')}); 
  // MAY RUN INTO CONFLICT WHEN DATE IS AT 30 or 31
  const [targetState, setTarget] = useReducer(targetReducer, {startDate: null});
  const [highlightState, setHighlightState] = useState(null);
  const [nightsState, setNightsState] = useState(null);

  useEffect(() => {
    setTarget(null);
  }, [props.currentListing])

  useEffect(() => {
    setHighlightState(null);
  }, [targetState])

  useEffect(() => {
    if (targetState.startDate !== null) {
      changeNights();
    }
  }, [highlightState])

  function monthReducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { date: moment(state.date, 'MMMM YYYY').add(1, 'M').format('MMMM YYYY') };
      case 'decrement':
        return { date: moment(state.date, 'MMMM YYYY').subtract(1, 'M').format('MMMM YYYY') };
    }
  };

  function targetReducer(state, action) { // action is target id, non-moment date
    if (action === null) {
      var targets = document.getElementsByClassName(dayStyles.calSelected);
      for (let i = 0; i < targets.length; i++) {
        targets[i].className = dayStyles.calDay;
      }
      // var tooltiptext = document.getElementById('tooltiptext');
      // tooltiptext.parentNode.removeChild(tooltiptext);
      return { startDate: action };
    } else {
      if (state.startDate === null) {
        var target = document.getElementById(action);
        target.className = dayStyles.calSelected;
        // target.innerHTML += `<span class='tooltiptext' id='tooltiptext'/>${props.currentListing.minStayLength} night minimum stay</span>`;

        var datesReserved = props.currentListing.datesReserved;
        var startDay = moment(action, 'D-MMMM-YYYY', true);
        var nextResDate = null;
        for (let i = 0; i < props.currentListing.maxStayLength; i++) { // iterates over max stay length
          var currentDay = startDay.add(1, 'Day').format('D-MMMM-YYYY');
          var currentMonth = moment(currentDay, 'D-MMMM-YYYY', true).format('MMMM');
          var currentYear = moment(currentDay, 'D-MMMM-YYYY', true).format('YYYY');
          if (datesReserved[currentYear][currentMonth].includes(currentDay)) {
            nextResDate = currentDay;
            break;
          }
        }
        return { 
          startDate: action,
          nextResDate: nextResDate
        };
      } else {
        var target = document.getElementById(action);
        target.className = dayStyles.calSelected;
        return {
          startDate: state.startDate,
          nextResDate: state.nextResDate,
          endDate: action
        }
      }
    }
  };

  function changeNights() {
    var highlightedDate = moment(highlightState, 'D-MMMM-YYYY', true);
    var startDate = moment(targetState.startDate, 'D-MMMM-YYYY', true);
    var endDate = moment(targetState.endDate, 'D-MMMM-YYYY', true);
    if (!endDate.isValid()) {
      var nights = highlightedDate.diff(startDate, 'days');
      setNightsState(nights);
    } else {
      setNightsState(endDate.diff(startDate, 'days'));
    }
  }

  return (
    <CalendarContext.Provider value={{
      dateState, setMonth,
      targetState, setTarget,
      highlightState, setHighlightState,
      nightsState, setNightsState
    }}>
      <div className={layoutStyles.layout}>
        <span className={layoutStyles.calComponentHeader}>Availability</span>
        <br></br>
        <br></br>
          <Message currentListing={props.currentListing} />
        <br></br>
        <table>
          <tbody>
            <Calendar currentListing={props.currentListing} />
          </tbody>
        </table>
        <br></br>
        <br></br>
        <Data currentListing={props.currentListing} />
      </div>
    </CalendarContext.Provider>
  );
};

export default CalendarLayout;