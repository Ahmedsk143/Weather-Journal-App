const projectData = {};

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

/* Middlewares*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("website"));

// Running the server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`The server is running on localhost: ${port}`);
});

// get data Route
app.get("/all", (req, res) => {
  res.status(200).json(projectData);
});
// Add data Route
app.post("/add", (req, res) => {
  if (req.body.date && req.body.temp && req.body.content) {
    res.status(200).json("POST received");
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
  } else {
    res.status(400).json("Something is missing");
  }
});
