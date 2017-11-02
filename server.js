const express = require("express"); // express framework
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

// models
const Service = require("./api/models/serviceModel");
const Tariff = require("./api/models/tariffModel");
const StatsHourly = require("./api/models/hourlyStatsModel");


// mongo connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/xavier",{useMongoClient: true}); // connect to MongoDB

// handle incoming requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routing pages
let routes = require("./api/routes/appRoute");
routes(app); // register our routes

app.listen(port); 
console.log('App running on ' + port);