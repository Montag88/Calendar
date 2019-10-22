import React, { useState, useEffect, useContext, useReducer } from 'react';
import { CalendarContext } from './CalendarLayout.jsx';
import moment from 'moment';
import styles from './styles/Data.module.css';

function Data(props) {
  const currentContext = useContext(CalendarContext);
  const startDate = moment(currentContext.targetState.startDate, 'D-MMMM-YYYY', true);
  const endDate = moment(currentContext.targetState.endDate, 'D-MMMM-YYYY', true);

  function generateData() {
    if (startDate.isValid() && endDate.isValid()) {
      var ratePerNight = props.currentListing.ratePerNight;
      var nights = endDate.diff(startDate, 'days');
      var costOfStay = ratePerNight * nights;
      var cleaningFee = props.currentListing.cleaningFee;
      var serviceFee = Math.round(costOfStay * .15);
      var totalCost = costOfStay + cleaningFee + serviceFee;
      // FORMAT NUMBERING WITH COMMAS, ROUND NUMBERING TO NEAREST DOLLAR
      // IF QUALIFIES FOR DISCOUNTS, SHOW DISCOUNTS

      return (
        <table>
          <tbody>
            <tr>
              <td className={styles.dataDescription}>{`$${ratePerNight} x ${nights} nights`}</td>
              <td className={styles.dataNumber}>{`$${costOfStay}`}</td>
            </tr>
            <tr>
              <td className={styles.dataDescription}>Cleaning fee</td>
              <td className={styles.dataNumber}>{`$${cleaningFee}`}</td>
            </tr>
            <tr>
              <td className={styles.dataDescription}>Service fee</td>
              <td className={styles.dataNumber}>{`$${serviceFee}`}</td>
            </tr>
            <tr>
              <td className={styles.dataDescription}>Estimate total</td>
              <td className={styles.dataNumber}>{`$${totalCost}`}</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return (<></>);
    }
  }
  function onClearHandler() {
    currentContext.setTarget(null);
  }
  function createReserve() {
    if (startDate.isValid() && endDate.isValid()) {
      return (<div className={styles.reserveButton}>Reserve</div>);
    } else {
      return (<></>);
    }
  }

  if (currentContext.targetState.startDate !== null) {
    return (
      <table>
        <tbody>
          <tr>
            <td className={styles.calClear}>
              <div onClick={onClearHandler} className={styles.clearButton}>Clear dates</div>
            </td>
            <td className={styles.calData}>
              {generateData()}
            </td>
            <td>
              {createReserve()}
            </td>
          </tr>
        </tbody>
      </table>
    );
  } else {
    return (
      <>
      </>
    );
  }
}

export default Data;