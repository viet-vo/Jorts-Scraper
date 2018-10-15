const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
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

require("./routes/index");

app.listen(PORT, function () {
    console.log("App running on: http://localhost:" + PORT);
});