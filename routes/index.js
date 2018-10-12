const db = require("../models");
const PORT = 3000;
const app = express();

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("home");
    });
};