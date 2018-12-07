const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
// const request = require("request");
const link = "https://www.amazon.com/s/ref=nb_sb_ss_i_1_12?url=search-alias%3Daps&field-keywords=mens+jean+shorts&sprefix=mens+jean+sh%2Caps%2C219&crid=3NVWVJSYHNA2M";
const PORT = 3000;
// TODO comment describing scraping tools
// ...
const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/jortScraps", {
    useNewUrlParser: true
});
var db = require("./models");
//! SCRAPING
app.get("/scrape", function (req, res) {
    axios.get(link).then(response => {
        const $ = cheerio.load(response);
        let result = {};
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
            result.image = $(this)
                .children("div.a-row")
                .children()
                .children()
                .children()
                .attr("src");
            result.text = $(this)
                .children("div.a-spacing-none")
                .children()
                .children()
                .attr("title");
            result.image = image;
            result.text = text;
        })

        // for (let i = 0; i<=result.length; i++) {
        //     if(result[i].image === false) {
        //         result.splice(i, 1)
        //     }
        // }
        console.log(result);
        db.Jorts.create(result)
            .then(function (dbJorts) {
                console.log(dbJorts);
            })
            .catch(function (err) {
                res.json(err);
            });
    })
    res.send("Scrape Complete");
});

app.get("/jorts", function (req, res) {
    // Grab every document in the Articles collection
    db.Jorts.find({})
      .then(function (dbJorts) {
        // If we were able to successfully find Jortss, send them back to the client
        res.json(dbJorts);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

app.get("/jorts/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Jorts.findOne({
        _id: req.params.id
      })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then(function (dbJorts) {
        // If we were able to successfully find an Jorts with the given id, send it back to the client
        res.json(dbJorts);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

// require("./routes/index");

app.listen(PORT, function () {
    console.log("App running http://localhost:" + PORT);
