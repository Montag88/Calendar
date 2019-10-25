var mongoose = require('mongoose');
// CHANGE BELOW TO DATABASE WHEN USING DOCKER COMPOSE
mongoose.connect('mongodb://localhost/listings');
var Mixed = mongoose.Schema.Types.Mixed;

var listingsSchema = new mongoose.Schema({
  listing: { // unique ID, 7 digits
    type: Number,
    unique: true
  },
  minStayLength: { // min of 1
    type: Number,
    default: 1
  }, 
  maxStayLength: Number,
  ratePerNight: Number,
  cleaningFee: Number,
  datesReserved: Mixed, // Obj, each prop is a year, value contains month props, each month has array of reserved dates
  discounts: Mixed // Obj with type of discount props, week and month, value is amount of discount. Applies to ratePerNight. larger daysRequired arranged first

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