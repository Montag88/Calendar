import React, { useState, useEffect , useLayoutEffect } from 'react';
import axios from 'axios';
import CalendarLayout from './CalendarLayout.jsx';
import moment from 'moment';

function App () {
  const currentYear = moment().format('YYYY');
  const defaultYear = {}
  defaultYear[currentYear] = {
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: []
  }
  const [currentListing, changeListing] = useState({
    listing: 9999999,
    minStayLength: 9,
    ratePerNight: 9999,
    cleaningFee: 999,
    discounts: {},
    datesReserved: defaultYear
  });

  // on load get a random listing
  useEffect(() => {
    getListing();
  }, [])

  function getListing() {
    axios.get('http://localhost:3000/rooms')
    .then((response) => {
      changeListing(response.data[0]);
    })
  }
  
  // RENDER LAYOUT AFTER GETTING FIRST LISTING
  return (
    <div>
      <span>
        <button onClick={getListing}>GET RANDOM LISTING</button>
        <br></br>
          <div>
            <ul>
              <li>Current Listing: {currentListing.listing}</li>
              <li>Minimum Stay Length: {currentListing.minStayLength}</li>
              <li>Max Stay Length: {currentListing.maxStayLength}</li>
              <li>Rate Per Night: {currentListing.ratePerNight}</li>
              <li>Cleaning Fee: {currentListing.cleaningFee}</li>
            </ul>
          </div>
      </span>
      <hr></hr>
      <br></br>
      <CalendarLayout currentListing={currentListing}/>
      <br></br>
      <hr></hr>
    </div>
  );
};

export default App;