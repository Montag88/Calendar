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

  function getRandomListing() {
    axios.get('http://localhost:3010/rooms')
    .then((response) => {
      // console.log('URL', window.location);
      // console.log('RESPONSE DATA', response.data);
      // REDIRECT URL TO RESPONSE.DATA listing id
      // then change listing to result of that GET request
      changeListing(response.data[0]);
    })
  }

  function getListing() {
    // console.log('WINDOW LOCATION', document.location.pathname)
    var location = document.location.pathname;
    // var regex = RegExp(/\d{7}/);
    // var listingID = regex.exec(location)[0];
    var listingID = location.slice(7);
    axios.get(`http://localhost:3010/listings/${listingID}`)
    .then((response) => {
      if (response.data.length !== 0) {
        changeListing(response.data[0]);
      }
    })
  }
  
  // RENDER LAYOUT AFTER GETTING FIRST LISTING
  return (
    <div>
      <br></br>
      <CalendarLayout currentListing={currentListing}/>
      <br></br>
    </div>
  );
};

export default App;