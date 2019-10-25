const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3010;
const db = require('../database/models/listings.js');

app.use(cors());

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/rooms/:id', express.static(path.resolve(__dirname, '../public')));


// CONVERT ALL TO PROMISES

// GET ALL LISTINGS, RETURNS ARRAY OF LISTINGS
// app.get('/rooms', cors(), (req, res) => {
//   // use db.readAllListings to get all listings
//   // reformat all listings to array of listings, here or on db side
//   // get random listing from all listings
//   // get info about one listing
//   // respond json obj of one listing, with status 200
//   db.readAllListings((err, result) => {
//     if (err) {
//       res.status(404).send(err);
//     }
//     var randomIndex = Math.floor(Math.random() * result.length);
//     res.status(200).json(result[randomIndex].listing);

//     // db.readOne(result[randomIndex].listing, (err, result) => {
//     //   if (err) {
//     //     res.status(404).send(err);
//     //   }
//     //   res.status(200).json(result);
//     // });
//   });
// });

// GET INFO ABOUT A SINGLE LISTING
app.get('/listings/:id', cors(), (req, res) => {
  const listing = Number(req.params.id);
  db.readOne(listing, (err, result) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json(result);
  });
  // use BODY PARSER JSON
  // use db.readOne to get info about listing in req.body
  // respond with json obj with status 200
});

// POST A RESERVATION FOR A SINGLE LISTING
// app.post('/rooms', (req, res) => {
//   // use BODY PARSER
//   // write to current listing, with dates in post
// });

app.listen(port, () => console.log(`Airbnb Calendar listening on port ${port}!`));