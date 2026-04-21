const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoCluster = process.env.MONGO_CLUSTER || "cluster0.r8o8snu.mongodb.net";
const mongoAppName = process.env.MONGO_APP_NAME || "Cluster0";
const mongoUri = process.env.MONGO_URI;

if (!mongoUri && (!mongoUser || !mongoPassword)) {
  throw new Error("Missing MONGO_URI or (MONGO_USER and MONGO_PASSWORD) in environment variables");
}

const uri =
  mongoUri ||
  `mongodb+srv://${encodeURIComponent(mongoUser)}:${encodeURIComponent(
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

const generateTrackingNumber = () => {
  const prefix = "ZAP";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


    const db = client.db("zap");
    const parcelsCollection = db.collection("parcels");
    const paymentHistoryCollection = db.collection("paymentHistory");

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



    //Payment  

    // Create Stripe checkout session endpoint

	    app.post('/create-checkout-session', async (req, res) => {
	
	      const paymentInfo = req.body;
	      const amount = paymentInfo.cost * 100; // Convert to cents

	      const siteDomain = process.env.SITE_DOMAIN;
	      if (!siteDomain) {
	        return res.status(500).json({ message: "SITE_DOMAIN is not configured on the server" });
	      }

	      const siteBase = siteDomain.replace(/\/+$/, "");
	      const successUrl = `${siteBase}/dashboard/payment-success?session_id={CHECKOUT_SESSION_ID}`;
	      const cancelUrl = `${siteBase}/dashboard/payment-cancelled`;

	      try {
	        const session = await stripe.checkout.sessions.create({
	          line_items: [
	            {
	              // Provide the exact Price ID (for example, price_1234) of the product you want to sell
	              price_data: {
	                currency: 'usd',
	                product_data: {
	                  name: paymentInfo.parcelName,
	                  description: "Delivery fee for parcel #" + paymentInfo.parcelId,

	                },
	                unit_amount: amount,
	              },
	              quantity: 1,
	            },
	          ],
	          customer_email: paymentInfo.email,
	          mode: 'payment',
	          metadata: {
	            parcelId: paymentInfo.parcelId,
	          },
	          success_url: successUrl,
	          cancel_url: cancelUrl,
	        });

	        console.log("Session URL:", session.url);
	        console.log("Success URL:", successUrl);
	        console.log("Cancel URL:", cancelUrl);

	        return res.send({ url: session.url });
	      } catch (error) {
	        console.error("Error creating Stripe checkout session:", error);
	        return res.status(500).json({ message: "Failed to create checkout session" });
	      }
	
	    });
     
    //Payment status verification endpoint
    
    app.get('/payments/session-status', async (req, res) => {
      const { session_id: sessionId } = req.query;

      if (!sessionId) {
        return res.status(400).json({ message: "session_id is required" });
      }

      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const parcelId = session?.metadata?.parcelId;
        const isPaid = session.payment_status === 'paid';

        if (isPaid && parcelId && ObjectId.isValid(parcelId)) {
          await parcelsCollection.updateOne(
            { _id: new ObjectId(parcelId) },
            {
              $set: {
                payment_status: 'paid',
                paid: true,
                stripeSessionId: session.id,
                transactionId: session.payment_intent || null,
                paid_at: new Date().toISOString(),
              },
            }
          );

          const parcel = await parcelsCollection.findOne({ _id: new ObjectId(parcelId) });
          if (parcel) {
            const trackingNumber = parcel?.tracking_number || generateTrackingNumber();
            if (!parcel?.tracking_number) {
              await parcelsCollection.updateOne(
                { _id: new ObjectId(parcelId) },
                { $set: { tracking_number: trackingNumber } }
              );
            }

            const cost = parcel?.delivery_cost ?? (typeof session.amount_total === "number" ? session.amount_total / 100 : null);
            await paymentHistoryCollection.updateOne(
              { parcel_id: parcelId },
              {
                $setOnInsert: {
                  parcel_name: parcel?.parcel_name ?? null,
                  parcel_id: parcelId,
                  sender_email: parcel?.senderEmail ?? parcel?.sender_email ?? session.customer_email ?? null,
                  receiver_email: parcel?.receiverEmail ?? parcel?.receiver_email ?? null,
                  receiver_name: parcel?.receiver_name ?? null,
                  address: parcel?.receiver_address ?? null,
                  cost,
                  transaction_number: parcelId,
                  created_at: new Date().toISOString(),
                },
                $set: {
                  tracking_number: trackingNumber,
                },
              },
              { upsert: true }
            );
          }
        }

        return res.status(200).json({
          sessionId: session.id,
          payment_status: session.payment_status,
          status: session.status,
          amount_total: session.amount_total,
          currency: session.currency,
          parcelId: parcelId || null,
          paid: isPaid,
        });
      } catch (error) {
        console.error("Error verifying Stripe session:", error);
        return res.status(500).json({ message: "Failed to verify payment session" });
      }
    });

    // Payment history 
    app.get("/payment-history", async (req, res) => {
      const { email } = req.query;

      if (!email) {
        return res.status(400).json({ message: "email is required" });
      }

      try {
        const cursor = paymentHistoryCollection
          .find({ sender_email: email })
          .sort({ created_at: -1 });
        const result = await cursor.toArray();
        return res.status(200).json(result);
      } catch (error) {
        console.error("Error fetching payment history:", error);
        return res.status(500).json({ message: "Failed to fetch payment history" });
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
