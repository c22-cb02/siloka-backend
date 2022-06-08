const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Siloka Backend");
});

app.get("/to-cs", (req, res) => {
  res.send("Directing to customer service...");
});

app.post("/message", (req, res) => {
  res.send(req.body);
});

app.post("/message-shortcut", (req, res) => {
  // TODO
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
