const express = require("express");

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Benvenuto nel blog!");
});

module.exports = app;
