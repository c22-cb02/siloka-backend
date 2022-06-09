const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var http = require("http");

const app = express();
const port = process.env.NODE_ENV === 'production' ? 80 : 3000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.end("Welcome to Siloka Backend");
});

app.get("/to-cs", (req, res) => {
  res.end("Directing to customer service...");
});

app.post("/message", (req, res) => {
  var payload = { messages: req.body };
  var request = http.request(
    {
      host: "34.87.1.81",
      port: 80,
      path: "/predict/",
      method: "POST",
      body: JSON.stringify(payload),
    },
    function (response) {
      response.on("data", function (chunk) {
        res.send(chunk);
      });
    }
  );
  request.end();
});

app.post("/message-shortcut", (req, res) => {
  // TODO
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
