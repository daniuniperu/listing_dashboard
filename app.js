const express = require("express");
const path = require("path");
const listingsController = require('./controllers/listingsController');

const app = express();

// Setup Handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Define routes
app.get("/", listingsController.getListings);

// Start server
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});