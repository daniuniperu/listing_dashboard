const express = require("express");
const { Pool } = require("pg");
const fs = require('fs');
const path = require("path");
const app = express();

// used when data need to be taken from postgresql
/*
const pool = new Pool({
  user: "your-db-user",
  host: "your-db-host",
  database: "your-database",
  password: "your-db-password",
  port: 5432,
});
*/

// Setup Handlebars
app.set('views', path.join(__dirname)) 
app.set('view engine', 'hbs') 

// Home Route
app.get("/", async (req, res) => {
  try {
    // Load mock data from the JSON file
    const rawData = fs.readFileSync('mock_data.json');
    const result = JSON.parse(rawData);
    
    //  used when data need to be taken from postgresql
    /*
    const result = await pool.query(`
            SELECT
                broker,
                DATE_TRUNC('month', listing_date) AS listing_month,
                COUNT(listing_id) AS new_listings,
                AVG(revenue) AS avg_revenue
            FROM
                listings
            WHERE
                listing_date BETWEEN '2020-11-01' AND '2021-11-30'
            GROUP BY
                broker,
                listing_month
            ORDER BY
                listing_month, broker;
        `); 
    */

    // Prepare data for chart
    const brokersData = {};
    result.forEach((row) => {
      if (!brokersData[row.broker]) {
        brokersData[row.broker] = {
          months: [],
          listings: [],
          avgRevenue: [],
        };
      }
      brokersData[row.broker].months.push(row.listing_month);
      brokersData[row.broker].listings.push(row.new_listings);
      brokersData[row.broker].avgRevenue.push(row.avg_revenue);
    });

    console.log("List Brokers: "+JSON.stringify(brokersData));

    res.render("home", {
      listingsData: result,
      brokersData: JSON.stringify(brokersData),
    });

  } catch (err) {
    console.error('Muestra error:'+err);
    res.send("Error occurred while fetching data ok");
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
