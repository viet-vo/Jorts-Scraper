// import db from "../models";
const express = require("express");
const app = express();

const cheerio = require("cheerio");
const link = "https://www.amazon.com/s/ref=nb_sb_ss_i_1_12?url=search-alias%3Daps&field-keywords=mens+jean+shorts&sprefix=mens+jean+sh%2Caps%2C219&crid=3NVWVJSYHNA2M";
const axios = require("axios");

// app.get("/scrape", (req, res) => {
axios.get(link).then(response => {
    const $ = cheerio.load(response.data);
    let results = [];
    $("div.s-item-container").each((i, element) => {
        var result = {};
        result.image = $(element).children("div.a-row").children().children().children().attr("src");
        result.text = $(element).children("div.a-spacing-none").children().children().attr("title");
        results.push(result);
    })
    console.log(results);
});

