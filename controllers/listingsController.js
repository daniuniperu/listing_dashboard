const listingsService = require('../services/listingsService');

const getListings = async (req, res) => {
    try {
        const result = listingsService.getMockData();

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

        console.log("List Brokers: " + JSON.stringify(brokersData));

        res.render("home", {
            listingsData: result,
            brokersData: JSON.stringify(brokersData),
        });

    } catch (err) {
        console.error('Error fetching listings: ' + err);
        res.send("Error occurred while fetching data");
    }
};

module.exports = {
    getListings,
};