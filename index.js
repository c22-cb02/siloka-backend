import express from "express";
import cors from "cors";
import axios from "axios";
import { Generator } from "snowflake-generator";

// Make custom toJSON implementation of BigInt because Snowflake return BigInt
BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();
const port = process.env.NODE_ENV === "production" ? 80 : 3000;

// Configuring body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Siloka Backend" });
});

app.get("/to-cs", (req, res) => {
  res.json({ message: "Directing to customer service..." });
});

app.get("/generate-roomid", (req, res) => {
  const timestamp = 988131601;

  const SnowflakeGenerator = new Generator(timestamp);
  const generatedSnowflakeId = SnowflakeGenerator.generate();

  res.json({ room_id: generatedSnowflakeId });
});

app.post("/message", async (req, res) => {
  const payload = {
    messages: req.body.content,
  };

  const response = await axios
    .post("http://34.87.1.81/predict/", payload)
    .catch((error) =>
      res.status(500).json({ message: "There is problem with the API" })
    );

  const predictionData = response.data;

  res.json({ message: predictionData.predicted_response });
});

app.post("/message-shortcut", (req, res) => {
  // TODO
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
