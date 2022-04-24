// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");

/* Dependencies */
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// POST route
app.post("/add", add);

function add(rq, rs) {
  projectData["temp"] = rq.body.temperature;
  projectData["date"] = rq.body.date;
  projectData["content"] = rq.body.content;
  projectData["pressure"] = rq.body.pressure;
  projectData["humidity"] = rq.body.humidity;
  rs.send(projectData);
}

// Initialize all route with a callback function
app.get("/all", get);

// Callback function to complete GET '/all'
function get(rq, rs) {
  rs.send(projectData);
}

// Set up and Spin up the server
const port = 8080;
const server = app.listen(port, () => {
  console.log(`server is listening on port: ${port}`); // Callback to debug
});
