import React, { useState, useEffect, useLayoutEffect } from 'react';

function Message(props) {
  const [message, changeMessage] = useState('');

  // CLEAN UP RENDERING, visibly loads case 0 before rerendering
  function setMessage() {
    var message= '';
    var discounts = props.currentListing.discounts;
    switch(discounts.length) {
      case 0:
        message = 'Enter your trip dates for accurate pricing and availability';
        // ADD EVENTLISTENER TO MESSAGE DOM
        break;
      case 1:
        message = `This host offers a ${discounts[0].discount}% ${discounts[0].type} discount.`;
        break;
      case 2:
        message = `This host offers ${discounts[1].discount}% off if you stay a week and a ${discounts[0].discount}% ${discounts[0].type} discount.`;
        break;
    };
    return message;
  }

  useEffect(() => {
    var newMessage = setMessage();
    changeMessage(newMessage);
  }, [props]); // when props changes, message updates

  return (
    <div id="message">
      {message}
    </div>
  );
}

export default Message;