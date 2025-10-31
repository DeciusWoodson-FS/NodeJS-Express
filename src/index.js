const express = require("express");
const morgan = require("morgan");
const routeHandler = require("./routes");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.get ("/", (req, res) => {
    res.status(200).json({message: "Coming from root route", success: true});
});

app.use("/api/v1", routeHandler);
app.use("*api", (req, res) =>{
    res.status(404).json({message: "Route doesn't exist", success: false});
});

module.exports = app;