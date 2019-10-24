var moment = require('moment');
var db = require('./database/models/listings.js');

/* 
listing => unique, 7 random digits
minStayLength => random int between 1 and 7
maxStayLength => Default is 30 days, 30% chance to be set to a week
ratePerNight => random int between 50 and 2000
cleaningFee => random int between 0 to 200
datesReserved => year obj that contains month props with reserved date moments
discounts => generate discount objects // will only be week or month discounts 7 days or 30 days

serviceFee => // relate to rate per night. Done by equation, Max is 30% for 1 night, decreases to 15% with additional days. Start with 15% of ratePerNight

STRETCH - Different fees and min/max stay lengths per day of week

ADD SEED DATA TO DATABASE, FOR POPULARITY AND DISCOUNTS
*/

// DOES NOT ALWAYS CREATE SAME NUMBER OF LISTINGS AS INPUT
var generateListings = (numOfListings) => {
  var result = [];
  // RANDOM 7 DIGIT NUMBERS
  // for (let i = 0; i < numOfListings; i++) {
  //   var currentNum = '';
  //   for (let j = 0; j < 7; j++) {
  //     currentNum += Math.floor(Math.random() * 10);
  //   }
  //   currentNum = Number(currentNum);
  //   if (result.indexOf(currentNum) < 0) {
  //     result.push(currentNum);
  //   }
  // }
  
  // ORDERED LISTINGS
  for (let i = 0; i < numOfListings; i++) {
    result.push(i);
  }
  return result;
};

var generateMinStayLength = () => {
  return Math.ceil(Math.random() * 7);
};

var generateMaxStayLength = () => {
  var seedType = Math.floor(Math.random() * 10);
  var result = 30;
  if (seedType < 3) {
    result = 7;
  }
  return result;
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
  case 2: // HIGH POPULARITY 20-25 DAYS RESERVED
    numDaysToReserve = Math.floor(Math.random() * 6) + 20;
    break;
  }
  var results = {};
  for (let i = 0; i < numOfYears; i++) {
    var year = moment().year() + i;
    var currentYear = {};
    for (let j = 0; j < 12; j++) {
      var currentMonth = moment().month(j).format('MMMM');
      var numOfDays = moment(`${year}-${currentMonth}`, 'YYYY-MMMM').daysInMonth();
      var reservedDates = [];
      for (let k = 0; k < numDaysToReserve; k++) {
        var randomDay = Math.ceil(Math.random() * numOfDays);
        var dateToReserve = moment(`${randomDay}-${currentMonth}-${year}`, 'D-MMMM-YYYY', true).format('D-MMMM-YYYY');
        while (reservedDates.includes(dateToReserve)) {
          var otherRandomDay = Math.ceil(Math.random() * numOfDays);
          dateToReserve = moment(`${otherRandomDay}-${currentMonth}-${year}`, 'D-MMMM-YYYY', true).format('D-MMMM-YYYY');
        }
        reservedDates.push(dateToReserve);
      }
      // reservedDates = reservedDates.sort( (a, b) => { return a - b; }); // DONT NEED TO SORT MOMENTS
      currentYear[currentMonth] = reservedDates;
    }
    results[year] = currentYear;
  }
  return results;
};

var generateDiscounts = () => {
  var generateWeekDiscount = () => {
    return Math.floor(Math.random() * 11) + 10;
  };

  var generateMonthDiscount = () => {
    return Math.floor(Math.random() * 16) + 10;
  };

  var results = {};
  var seedType = Math.floor(Math.random() * 4);

  switch (seedType) {
  case 1:
    results.week = generateWeekDiscount();
    break;
  case 2:
    results.month = generateMonthDiscount();
    break;
  case 3:
    results.week = generateWeekDiscount();
    results.month = generateMonthDiscount();
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
      maxStayLength: generateMaxStayLength(),
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