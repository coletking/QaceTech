import { MongoClient } from "mongodb";

// please note that i intentionally expose this credentials to make it easy to run.. i will not do this for a life project
const mongoUrl = "mongodb+srv://test:test@cluster0.f7lp6.mongodb.net/";
const dbName = "MyDatabase";
const collectionName = "users";
const client = new MongoClient(mongoUrl);
export const mongoConnection = async () => {
  try {
    await client.connect();
    console.log("MongoDB connected successfully.");
    return client.db(dbName).collection(collectionName);
  } catch (err) {
    console.error("Error establishing MongoDB connection:", err);
    throw new Error("Failed to connect to MongoDB");
  }
};