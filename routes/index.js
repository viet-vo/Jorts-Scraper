// import db from "../models";
const express = require("express");
const app = express();
const cheerio = require("cheerio");
const link = "https://www.amazon.com/s/ref=nb_sb_ss_i_1_12?url=search-alias%3Daps&field-keywords=mens+jean+shorts&sprefix=mens+jean+sh%2Caps%2C219&crid=3NVWVJSYHNA2M";
const axios = require("axios");

// app.get("/scrape", (req, res) => {
axios.get(link).then(response => {
    const $ = cheerio.load(html);
    
    // $("img.s-access-image").each((i, element) => {
    //     const image = $(element).attr("src");
    //     results.push({
    //         image: image
    //     });
    // });
    // $("h2.a-size-small").each((i, element) => {
    //     const title = $(element).text();
    //     results.push({
    //         title: title
    //     })
    // });
    $("div.s-item-container").each((i, element) => {
        let result = {};
        result.image = $(this).children("div.a-row").children().children().children().attr("src");
        result.text = $(this).children("div.a-spacing-none").children().children().attr("title");
        
    })
    // for (let i = 0; i<=result.length; i++) {
    //     if(result[i].image === undefined || result[].text === undefined) {
    //         result.splice(i)
    //     }
    // }
    console.log(result);
});