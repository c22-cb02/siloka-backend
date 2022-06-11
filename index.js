import express from "express";
import cors from "cors";
import axios from "axios";
import { addMessage, addSuccessRate, addToCS } from "./utils.js";
import { Generator } from "snowflake-generator";
import microbenchmark from "./microbenchmark.js"


BigInt.prototype.toJSON = function () {
  return this.toString();
};

const app = express();
const port = process.env.NODE_ENV === "production" ? 80 : 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Siloka Backend" });
});

app.get("/generate-roomid", microbenchmark("generate-roomid", (req, res) => {
  const timestamp = 988131601;

  const SnowflakeGenerator = new Generator(timestamp);
  const generatedSnowflakeId = SnowflakeGenerator.generate();

  res.json({ room_id: generatedSnowflakeId });
}));

app.post("/feedback", microbenchmark("feedback", async (req, res) => {
  const payload = {
    room_id: req.body.room_id,
    is_answer_ok: req.body.is_answer_ok,
  };

  try {
    const room_id = payload.room_id;
    const is_answer_ok = payload.is_answer_ok;
    await addSuccessRate(room_id, is_answer_ok);

    if (!is_answer_ok) {
      await addToCS(room_id, false);
      return res.json({ viewType: 4, message: null });
    }
    res.json({ message: `Thank you for the feedback. (${room_id})` });
  } catch (err) {
    res.json({ error: err.message });
  }
}));

app.get("/to-cs", microbenchmark("cs redirect", async (req, res) => {
  const room_id = req.query.room_id;

  try {
    await addToCS(room_id, true);
    res.json({ viewType: 0, message: "Directing to customer service..." });
  } catch (err) {
    res.json({ error: err.message });
  }
}));

app.post("/message", microbenchmark("send message", async (req, res) => {
  const payload = {
    messages: req.body.query,
  };

  try {
    const response = await axios.post(
      "http://35.240.219.237/predict/",
      payload
    );

    const room_id = req.body.room_id;
    const messageFromUser = req.body.query;
    await addMessage(room_id, messageFromUser);

    const predictionData = response.data;
    res.json({ viewType: 0, message: predictionData.predicted_response });
  } catch (err) {
    res.json({ err: error.message });
  }
}));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
