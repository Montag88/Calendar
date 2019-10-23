import React, { useState, useEffect, useContext, useReducer } from 'react';
import moment from 'moment';
import Message from './Message';
import Calendar from './Calendar';
import Data from './Data';
import dayStyles from './styles/Day.module.css';
import layoutStyles from './styles/CalendarLayout.module.css';
import './styles/reset.css';

export const CalendarContext = React.createContext(null);

function CalendarLayout(props) {
  const [dateState, setMonth] = useReducer(monthReducer, {date: moment()}); 
  // MAY RUN INTO CONFLICT WHEN DATE IS AT 30 or 31
  const [targetState, setTarget] = useReducer(targetReducer, {startDate: null});
  const [selectableState, setSelectableState] = useReducer(selectableReducer, {selectDates: undefined});

  useEffect(() => {
    setTarget(null);
  }, [props.currentListing])

  useEffect(() => {
    changeHighlight();
  }, [targetState, dateState])

  useEffect(() => {
    setHighlights();
  }, [selectableState])

  function selectableReducer(state, action) {
    if (state.selectDates === undefined || action === undefined) {
      return { selectDates: action };
    } else {
      // console.log('ACTION', action)
      return { 
        selectDates: state.selectDates,
        highlightedDate: action
      }
    }
  }

  function monthReducer(state, action) {
    // console.log(state, action) // TRIGGERS TWICE?
    switch (action.type) {
      case 'increment':
        // console.log('inc once')
        return { date: state.date.add(1, 'M')};
      case 'decrement':
        // console.log('dec once')
        return { date: state.date.subtract(1, 'M')};
    }
  };

  function setHighlights() {
    if (selectableState.highlightedDate !== undefined) {
      // console.log('SELECTABLE STATE', selectableState)
      var highlight = selectableState.selectDates.filter((date) => (date <= selectableState.highlightedDate));
      highlight.map((date) => {
        var currentDOM = document.getElementById(date);
        currentDOM.className = dayStyles.calHighlighted;
      });
    }
  }

  function changeHighlight() {
    var startDate = targetState.startDate;
    var endDate = targetState.endDate;

    if (startDate !== null && endDate === undefined) {
      var nextResDate = moment(targetState.nextResDate, 'D-MMMM-YYYY', true);
      var currentDay = moment(startDate, 'D-MMMM-YYYY', true);
      var highlightDates = [];
      while (currentDay.isSameOrBefore(nextResDate)) {
        var currentDOM = document.getElementById(currentDay.format('D-MMMM-YYYY'));
        if (currentDOM === null) {
          break;
        } else {
          if (currentDOM.className !== dayStyles.calSelected) {
            currentDOM.className = dayStyles.calHighlight;
            highlightDates.push(currentDOM.id);
          }
          currentDay.add(1, 'Day');
        }
      }
      setSelectableState(highlightDates);
    } else if (endDate !== undefined) {
      for (let i = 0; i < selectableState.length; i++) {
        var currentDOM = document.getElementById(selectableState[i].format('D-MMMM-YYYY'));
        if (currentDOM.className !== dayStyles.calSelected) {
          currentDOM.className = dayStyles.calDay;
        }
      }
      setSelectableState(undefined);
    }
  }

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

  return (
    <CalendarContext.Provider value={{
      dateState, setMonth,
      targetState, setTarget,
      selectableState, setSelectableState
    }}>
      <div>
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