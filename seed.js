var moment = require('moment');
var db = require('./database/models/listings.js');

/* 
listing => unique, 7 random digits
minStayLength => random int between 1 and 7
ratePerNight => random int between 50 and 2000
cleaningFee => random int between 0 to 200
datesReserved => year obj that contains month props with reserved dates values
discounts => generate discount objects // will only be week or month discounts 7 days or 30 days

serviceFee => // relate to rate per night. Done by equation, Max is 30% for 1 night, decreases to 15% with additional days. Start with 15% of ratePerNight

STRETCH - Different fees and min/max stay lengths per day of week

ADD SEED DATA TO DATABASE, FOR POPULARITY AND DISCOUNTS
*/

// DOES NOT ALWAYS CREATE SAME NUMBER OF LISTINGS AS INPUT
var generateListings = (numOfListings) => {
  var result = [];
  for (let i = 0; i < numOfListings; i++) {
    var currentNum = '';
    for (let j = 0; j < 7; j++) {
      currentNum += Math.floor(Math.random() * 10);
    }
    currentNum = Number(currentNum);
    if (result.indexOf(currentNum) < 0) {
      result.push(currentNum);
    }
    
  }
  return result;
};

var generateMinStayLength = () => {
  return Math.ceil(Math.random() * 7);
};

var generateRatePerNight = () => {
  return Math.floor(Math.random() * 950) + 50;
};

var generateCleaningFee = () => {
  return Math.floor(Math.random() * 200);
};

var generateDatesReserved = (numOfYears) => {
  var seedType = Math.floor(Math.random() * 3); // 0 = LOW, 1 = MED, 2 = HIGH
  var numDaysToReserve = 0;
  switch (seedType) {
  case 0: // LOW POPULARITY 0-10 DAYS RESERVED
    numDaysToReserve = Math.floor(Math.random() * 11);
    break;
  case 1: // MED POPULARITY 10-20 DAYS RESERVED
    numDaysToReserve = Math.floor(Math.random() * 11) + 10;
    break;
  case 2: // HIGH POPULARITY 20-30 DAYS RESERVED
    numDaysToReserve = Math.floor(Math.random() * 11) + 20;
    break;
  }
  var results = [];
  for (let i = 0; i < numOfYears; i++) {
    var year = moment().year() + i;
    var currentYear = {};
    for (let j = 0; j < 12; j++) {
      var currentMonth = moment().month(j).format('MMMM');
      var numOfDays = moment(`${year}-${currentMonth}`, 'YYYY-MMMM').daysInMonth();
      var reservedDates = [];
      for (let k = 0; k < numDaysToReserve; k++) {
        var dateToReserve = Math.ceil(Math.random() * numOfDays);
        while (reservedDates.indexOf(dateToReserve) > 0) {
          dateToReserve = Math.ceil(Math.random() * numOfDays);
        }
        reservedDates.push(dateToReserve);
      }
      reservedDates = reservedDates.sort( (a, b) => { return a - b; });
      currentYear[currentMonth] = reservedDates;
    }
    results.push(currentYear);
  }
  return results;
};

var generateDiscounts = () => {
  var generateWeekDiscount = () => {
    var discount = Math.floor(Math.random() * 11) + 10;
    return {
      discount: discount,
      type: 'weekly'
    };
  };

  var generateMonthDiscount = () => {
    var discount = Math.floor(Math.random() * 16) + 10;
    return {
      discount: discount,
      type: 'monthly'
    };
  };

  var results = [];
  var seedType = Math.floor(Math.random() * 4);

  switch (seedType) {
  case 1:
    results.push(generateWeekDiscount());
    break;
  case 2:
    results.push(generateMonthDiscount());
    break;
  case 3:
    results.push(generateMonthDiscount());
    results.push(generateWeekDiscount());
    break;
  }

  return results;
};

var seedDatabase = (numOfListings, numOfYears) => {
  var results = [];
  var listings = generateListings(numOfListings);
  while (listings.length > 0) {
    var currentListing = {
      listing: listings.pop(),
      minStayLength: generateMinStayLength(),
      ratePerNight: generateRatePerNight(),
      cleaningFee: generateCleaningFee(),
      datesReserved: generateDatesReserved(numOfYears),
      discounts: generateDiscounts()
    };
    results.push(currentListing);
  }
  db.addMany(results, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('SUCCESS SEEDING DATABASE');
    }
  } );
};

seedDatabase(150, 2);