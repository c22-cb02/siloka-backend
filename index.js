import express from "express";
import cors from "cors";
import axios from "axios";
import { addMessage, addSuccessRate, addToCS } from "./utils";

const app = express();
const port = process.env.NODE_ENV === "production" ? 80 : 3000;

// Configuring body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Siloka Backend" });
});

app.post("/feedback", async (req, res) => {
  const payload = {
    room_id: req.body.room_id,
    is_answer_ok: req.body.is_answer_ok,
  };

  const room_id = payload.room_id;
  const is_answer_ok = payload.is_answer_ok;
  await addSuccessRate(room_id, is_answer_ok);

  if (!payload.is_answer_ok) {
    await addToCS(room_id, false);
    res.json({ viewType: 4, message: null });
  }
});

app.get("/to-cs", async (req, res) => {
  const room_id = req.body.room_id;
  await addToCS(room_id, true);
  res.json({ viewType: 0, message: "Directing to customer service..." });
});

app.post("/message", async (req, res) => {
  const payload = {
    messages: req.body.message,
  };

  const response = await axios
    .post("http://34.87.1.81/predict/", payload)
    .catch((error) =>
      res.status(500).json({ message: "There is a problem with the API" })
    );

  const predictionData = response.data;

  const room_id = req.body.room_id;
  const messageFromUser = req.body.message;

  await addMessage(room_id, messageFromUser);

  res.json({ viewType: 0, message: predictionData.predicted_response });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
