require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const indexRouter = require("./routes");
const stripe = require("stripe")(process.env.SECRET_KEY);
const Controller = require("./modules/orders/order.controller") ;

const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

mongoose.connect(DB_URL).then(console.log("Database Connected..."));
app.use(cors());
app.use(express.static("public"));

app.post('api/v1/orders/webhook', express.raw({type: 'application/json'}), async(request, response) => {
  
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      const event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
      switch (event.type) {
        case 'checkout.session.async_payment_failed':
          const async_payment_failed = event.data.object;
         await Controller.updateBasedonPayment(async_payment_failed);
          break;
        case 'checkout.session.async_payment_succeeded':
          const async_payment_succeeded = event.data.object;
          await Controller.updateBasedonPayment(async_payment_succeeded);
          
          break;
        case 'checkout.session.completed':
          const session_completed = event.data.object;
          await Controller.updateBasedonPayment(session_completed);
          break;
        case 'checkout.session.expired':
          const session_expired = event.data.object;
           await Controller.updateBasedonPayment(session_expired);
          break;
       
        default:
        
          console.log(`Unhandled event type ${event.type}.`);
      }
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event



  response.send();
});




app.use(express.json());
app.use("/", indexRouter);
app.use((err, req, res, next) => {
  const errMsg = err
    ? err.toString().split("Error: ")[1]
    : "something went wrong";
  res.status(500).json({ data: "", msg: errMsg });
});

app.listen(port, () => {
  console.log(`app is running in port ${port}`);
});
