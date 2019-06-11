const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Set up handlebars engine and views location and register partials
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDirectoryPath));


app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Jesus Guadiana"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Jesus Guadiana"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "Help Page",
        name: "Jesus Guadiana"
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if(error){
             return res.send({
                 error: error
             })
        }
        forecast(lat, long, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                address: req.query.address,
                location,
                forecastData
            });
          });
    });
});

app.get("/help/*", (req, res)=>{
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found",
        name: "Jesus Guadiana"
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "The page was not found",
        name: "Jesus Guadiana"
    });
});

app.listen(3000, () =>{
    console.log("App started on port 3000");
});

