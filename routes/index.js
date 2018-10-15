// import db from "../models";
const express = require("express");
const app = express();
const cheerio = require("cheerio");
const link = "https://www.amazon.com/s/ref=nb_sb_ss_i_1_12?url=search-alias%3Daps&field-keywords=mens+jean+shorts&sprefix=mens+jean+sh%2Caps%2C219&crid=3NVWVJSYHNA2M";
const request = require("request");

// app.get("/scrape", (req, res) => {
request(link, (error, response, html) => {
    const $ = cheerio.load(html);
    let results = [];
    $("img.s-access-image").each((i, element) => {
        const image = $(element).attr("src");
        results.push({
            image: image
        });
    });
    $("h2.a-size-small").each((i, element) => {
        const title = $(element).text();
        results.push({
            title: title
        })
    });
    console.log(results);
});
// });
// axios.get(link).each()