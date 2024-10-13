import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb"; // Import MongoClient
import dotenv from "dotenv"; // Import dotenv

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

const uri = process.env.MONGODB_URI; // Use the MONGODB_URI from the .env file

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}

// Call the connect function
connectToMongo();

// Start the server
app.listen(3007, () => {
  console.log("App Server is running on port 3007");
});
