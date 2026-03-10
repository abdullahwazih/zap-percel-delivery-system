const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const stripe = require('stripe')('process.env.STRIPE_KEY');

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER || "cluster0.r8o8snu.mongodb.net";
const mongoAppName = process.env.MONGO_APP_NAME || "Cluster0";

if (!mongoUser || !mongoPassword) {
  throw new Error("Missing MONGO_USER or MONGO_PASSWORD in environment variables");
}

const uri = `mongodb+srv://${encodeURIComponent(mongoUser)}:${encodeURIComponent(
  mongoPassword
)}@${mongoCluster}/?appName=${encodeURIComponent(mongoAppName)}`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    const db = client.db("zap");
    const parcelsCollection = db.collection("parcels");

    app.post("/parcels", async (req, res) => {
      try {
        const parcelData = req.body;
        const result = await parcelsCollection.insertOne(parcelData);
        res.status(201).json({ message: "Parcel created", id: result.insertedId });
      } catch (error) {
        console.error("Error creating parcel:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.get('/parcels', async (req, res) => {
      const { email } = req.query;

      const query = email ? { senderEmail: email } : {};

      const cursor = parcelsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/parcels/:id', async (req, res) => {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid parcel id" });
      }

      try {
        const parcel = await parcelsCollection.findOne({ _id: new ObjectId(id) });

        if (!parcel) {
          return res.status(404).json({ message: "Parcel not found" });
        }

        res.status(200).json(parcel);
      } catch (error) {
        console.error("Error fetching parcel:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.delete('/parcels/:id', async (req, res) => {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid parcel id" });
      }

      try {
        const result = await parcelsCollection.deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Parcel deleted" });
        } else {
          res.status(404).json({ message: "Parcel not found" });
        }
      } catch (error) {
         console.error("Error deleting parcel:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

  } catch (error) {
    console.error("Failed to initialize MongoDB connection:", error);
    throw error;
  }
}
run().catch(console.dir);

process.on("SIGINT", async () => {
  await client.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await client.close();
  process.exit(0);
});




app.listen(port, () => {
  console.log(`Zap backend listening on port ${port}`);
});
