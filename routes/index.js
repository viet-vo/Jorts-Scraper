// import db from "../models";
const express = require("express");
const app = express();
const axoios = require("axios");
const cheerio = require("cheerio");
const link = "https://www.amazon.com/s/ref=nb_sb_ss_i_1_12?url=search-alias%3Daps&field-keywords=mens+jean+shorts&sprefix=mens+jean+sh%2Caps%2C219&crid=3NVWVJSYHNA2M";

app.get("/scrape", (req, res) => {
    axios.get(link).then(response => {
        const $ = cheerio.load(response.data);
        let results = [];
        $("img.s-access-image").each((i, element) => {
            console.log(element);
            const image = $(element).attr("src");
            results.push({
                image: image
            });
        });
        console.log(results);
    });

});
// axios.get(link).each()