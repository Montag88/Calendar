var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/listings');

var listingsSchema = new mongoose.Schema({
  listing: { // unique ID, 7 digits
    type: Number,
    unique: true
  },
  minStayLength: { // min of 1
    type: Number,
    default: 1
  }, 
  ratePerNight: Number,
  cleaningFee: Number,
  datesReserved: Array, // Array of objs, each obj is a year, contains month props, each month has array of reserved dates
  discounts: Array // Array of discount objs that have two props, discount and type. Applies to ratePerNight. larger daysRequired arranged first
});

var Listings = mongoose.model('Listings', listingsSchema);

// add database access functions. Add/read/etc

var addMany = (arr, callback) => {
  Listings.insertMany(arr, callback);
};

module.exports.addMany = addMany;