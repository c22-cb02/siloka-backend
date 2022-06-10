import { Datastore } from "@google-cloud/datastore";

const datastore = new Datastore();

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

async function addSuccessRate(room_id, feedback) {
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

export { addToCS, addSuccessRate, addMessage };