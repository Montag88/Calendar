import React, { useState, useEffect , useLayoutEffect } from 'react';
import axios from 'axios';
import Layout from './Layout.jsx';

function App () {
  const [currentListing, changeListing] = useState({
    listing: 9999999,
    minStayLength: 9,
    ratePerNight: 9999,
    cleaningFee: 999,
    discounts: [],
    datesReserved: [{
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
    }]
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
              <li>Rate Per Night: {currentListing.ratePerNight}</li>
              <li>Cleaning Fee: {currentListing.cleaningFee}</li>
            </ul>
          </div>
      </span>
      <hr></hr>
      <Layout currentListing={currentListing}/>
    </div>
  );
};

export default App;