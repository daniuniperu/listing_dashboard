const fs = require('fs');
const path = require('path');
const { Pool } = require("pg");
// used when data need to be taken from postgresql
/*
const pool = new Pool({
  user: "test-assignment",
  host: "test-instance-1-cluster.cluster-cys30lik4v4w.us-east-1.rds.amazonaws.com",
  database: "postgres",
  password: "gfdjh24m,sddsf",
  port: 5432,
});
*/

// Function to get mock data
const getMockData = () => {
    const rawData = fs.readFileSync(path.join(__dirname, '../mock_data.json'));
    return JSON.parse(rawData);
};

// Function to get data from PostgreSQL (if needed in the future)
// const getDataFromDB = async (pool) => {
//     const result = await pool.query(`
//         SELECT
//             broker,
//             DATE_TRUNC('month', listing_date) AS listing_month,
//             COUNT(listing_id) AS new_listings,
//             AVG(revenue) AS avg_revenue
//         FROM
//             listings
//         WHERE
//             listing_date BETWEEN '2020-11-01' AND '2021-11-30'
//         GROUP BY
//             broker,
//             listing_month
//         ORDER BY
//             listing_month, broker;
//     `);
//     return result.rows;
// };

module.exports = {
    getMockData,
    // getDataFromDB,
};