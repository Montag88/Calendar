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

  // ADD SEED DATA TO DATABASE, FOR POPULARITY AND DISCOUNTS
});

var Listings = mongoose.model('Listings', listingsSchema);

var addMany = (arr, callback) => {
  Listings.insertMany(arr, callback);
};

// ARRAY OF OBJS WITH _ID AND LISTING PROPS
var readAllListings = (callback) => {
  Listings.find({}, 'listing', callback);
};

// LISTING OBJ
var readOne = (target, callback) => {
  Listings.find({listing: target}, callback);
};

module.exports.addMany = addMany;
module.exports.readAllListings = readAllListings;
module.exports.readOne = readOne;