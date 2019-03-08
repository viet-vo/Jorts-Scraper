var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

var databaseUri = 'mongodb://localhost/JortsDB'
var uri = "mongodb://heroku:jortskey1@ds119085.mlab.com:19085/signindb"

if (process.env.MONGODB_URI) {
    mongoose.connect(uri, {
        useNewUrlParser: true
    }, console.log("connected through mLab"))
} else {
    mongoose.connect(databaseUri, {
        useNewUrlParser: true
    }, console.log("connected locally"))
}


const link = "https://www.amazon.com/Mens-Denim-Shorts/b?ie=UTF8&node=2476501011";
app.get("/scrape", function (req, res) {

    axios.get(link).then(function (response) {

        var $ = cheerio.load(response.data);

        $("li.s-result-item").each(function (i, element) {
            var result = {};
            
            result.image = $(element).children().children().children().children().children().children().children().children().attr("src");
            result.text = $(element).children().children(".a-row.a-spacing-none").children().children().children("h2").text()
            console.log(result)
            db.Jorts.create(result)
                .then(function (JortsList) {
                    console.log(JortsList);
                })
                .catch(function (err) {
                    return res.json(err);
                });
        });

        res.send("Scrape Complete");
    });
});

app.get("/Jorts", function (req, res) {
    db.Jorts.find({})
        .then(function (JortsList) {
            res.json(JortsList);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/Jorts/:id", function (req, res) {
    db.Jorts.findOne({
            _id: req.params.id
        })
        .populate("note")
        .then(function (JortsList) {
            res.json(JortsList);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.post("/Jorts/:id", function (req, res) {
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Jorts.findOneAndUpdate({
                _id: req.params.id
            }, {
                note: dbNote._id
            }, {
                new: true
            });
        })
        .then(function (JortsList) {
            res.json(JortsList);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.delete("/clearall", function (req, res) {
    db.Jorts.remove({}, function (error, response) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log(response);
            res.send("database reset");
        }
    });
});

app.listen(PORT, function () {
    console.log("App running on http://localhost:" + PORT);
});