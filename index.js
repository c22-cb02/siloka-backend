import express from "express";
import cors from "cors";
import axios from "axios";
import { Datastore } from "@google-cloud/datastore";

const app = express();
const datastore = new Datastore();
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

  if (!payload.is_answer_ok) {
    res.json({ viewType: 4, message: null });
  }
});

app.get("/to-cs", (req, res) => {
  const room_id = req.body.room_id;
  const is_to_cs = true;
  addToCS(room_id, is_to_cs);
  res.json({ viewType : 0, message: "Directing to customer service..." });
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

  addMessage(room_id, messageFromUser);

  res.json({ viewType : 0, message: predictionData.predicted_response });
});

async function addToCS(room_id, choice) {
  const toCSKey = datastore.key("ToCS");
  const entity = {
    key: toCSKey,
    data: [
      {
        name: "room_id",
        value: room_id,
      },
      {
        name: "is_to_cs",
        value: choice,
      },
    ],
  };

  try {
    await datastore.save(entity);
    console.log(`ToCS ${toCSKey.id} created successfully.`);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

async function addSuccessRate(room_id, request, response, feedback) {
  const successRateKey = datastore.key("SuccessRate");
  const entity = {
    key: successRateKey,
    data: [
      {
        name: "room_id",
        value: room_id,
      },
      {
        name: "feedback",
        value: feedback,
      },
    ],
  };

  try {
    await datastore.save(entity);
    console.log(`SuccessRate ${successRateKey.id} created successfully.`);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

async function addMessage(room_id, message) {
  const messageKey = datastore.key("Message");
  const entity = {
    key: messageKey,
    data: [
      {
        name: "room_id",
        value: room_id,
      },
      {
        name: "message",
        value: message,
        excludeFromIndexes: true,
      },
    ],
  };

  try {
    await datastore.save(entity);
    console.log(`Message ${messageKey.id} created successfully.`);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
