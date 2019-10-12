import React, { useState, useEffect } from 'react';
import Message from './Message';

function Layout(props) {

  return (
    <div>
      Availability
      <br></br>
      <Message currentListing={props.currentListing} />
      <br></br>
      Arrows and Month
      <br></br>
      Days of the week
      <br></br>
      Calendar
      <br></br>
      Clear Dates and Data
    </div>
  );
};

export default Layout;