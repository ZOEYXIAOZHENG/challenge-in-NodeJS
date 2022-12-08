const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/v1/region", (req, res) => {
    const { region } = req.query;
    axios
        .get(`https://restcountries.com/v3.1/region/${region}`)
        .then((response) => {
            let countries = response.data;

            // To get the total population of that region / continent
            let regionTotalPopulation = 0;
            for (let country of countries) {
                regionTotalPopulation += country.population;
            }

            // the name of the country with the highest population of that region / continent
            let sorted = countries.sort((a, b) =>
                b.population > a.population ? 1 : -1
            );
            let highestPopulatedCountry = sorted["0"].name.official;
            res.status(200).json({
                success: "true",
                regionTotalPopulation,
                highestPopulatedCountry,
            });
        })
        .catch((err) => {
            if (err.response.data.status == 404) {
                res.status(404).send({
                    success: "false",
                    errorMessage: "invalid region",
                });
            }
        });
});

module.exports = router;
