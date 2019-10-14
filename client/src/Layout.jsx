import React, { useState, useEffect } from 'react';
import Message from './Message';
import Calendar from './Calendar';

function Layout(props) {

  return (
    <div>
      Availability
      <br></br>
      <Message currentListing={props.currentListing} />
      <br></br>
      <table>
        <tbody>
          <tr>
            <td><Calendar currentListing={props.currentListing}/></td>
            {/* <td><Calendar currentListing={props.currentListing}/></td> */}
          </tr>
        </tbody>
      </table>
      <br></br>
      Clear Dates and Data
    </div>
  );
};

export default Layout;