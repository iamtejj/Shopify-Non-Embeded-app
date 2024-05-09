import "@shopify/shopify-api/adapters/node";
import express from "express";
import "dotenv/config";
import shopify from "./config.js";
import sessionHandler from "./utils/sessionHandler.js";
import mongoose from "mongoose";
import StoreModel from "./utils/modals/StoreModel.js";
import path from "path";
import fs from "fs";
import { merchantRouter } from "./Routes/merchant.js";
import { error } from "console";

const app = express();
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);


app.get("/auth", async (req, res) => {
  // The library will automatically redirect the user

  const shop = req.query.shop;
  if (!shop) {
    return res.status(401).send("Please Provide a shop"); 
  }
  const sanitizeShop = shopify.utils.sanitizeShop(req.query.shop, true)
  console.log(sanitizeShop)
  return await shopify.auth.begin({
    shop: sanitizeShop,
    callbackPath: "/auth/token",
    isOnline: false,
    rawRequest: req,
    rawResponse: res,
  }); 
});

app.get("/auth/token", async (req, res) => {
  console.log("auth token")
  try {
    const callback = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
    const { session } = callback;
    const sessionShop = session.shop;
    await sessionHandler.storeSession(session);
    const webhookRegisterResponse = await shopify.webhooks.register({
      session,
    }); //Register all webhooks with offline token
    console.dir(webhookRegisterResponse, { depth: null }); //This is an array that includes all registry responses.
    return await shopify.auth.begin({
      shop: sessionShop,
      callbackPath: "/auth/callback",
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });
  } catch (error) {
    console.log(error);
    return res.redirect("/notfound");
  }
});
app.get("/auth/callback", async (req, res) => {
  try {
    const callback = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
    const { session } = callback;
    const sessionShop = session.shop;
    await sessionHandler.storeSession(session);
    await StoreModel.findOneAndUpdate(
      { shop: sessionShop },
      { isActive: true },
      { upsert: true }
    );
    res.redirect("/");
  } catch (error) {
    res.redirect("/notfound");
  }
  // You can now use callback.session to make API requests
});



app.use(express.json())
app.use('/api/v1/mechant',merchantRouter)


// Serve Static React Frontend
const root = process.cwd();
// app.use(express.static(path.join(root, "./frontend/app-frontend/dist")));
app.get("/myrout", (req, res) => {});

app.get("/myproducts", async (req, res) => {
  try {
    const sessionId = await shopify.session.getCurrentId({
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });
    const session = await sessionHandler.loadSession(sessionId);
    console.log("session")
    console.log(session)
    const queryString = `{
        products (first: 50) {
          edges {
            node {
              id
              title
            }
          }
        }
      }`;
    // `session` is built as part of the OAuth process
    const client = new shopify.clients.Graphql({ session });
    const products = await client.query({
      data: queryString,
    });
    res.json(products);
  } catch (error) {
    res.redirect("/notfound");
  }
});
app.get("/mysession", async (req, res) => {
  try {
    const sessionId = await shopify.session.getCurrentId({
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });
    const session = await sessionHandler.loadSession(sessionId);
    const client = new shopify.clients.Rest({ session });
    const shop = await client.get({ path: "shop" });
    res.json(shop);
  } catch (error) {
    res.redirect("/notfound");
  }
});
app.get("/notfound", (req, res) => {
  res.send(
    `<a href="/auth?shop=code-with-tj.myshopify.com">Something when wrong</a>`
  );
});
// app.get('*', (req, res) => {
//   res.sendFile(path.join(root,'./frontend/app-frontend/dist', 'index.html'));
// });
app.use('/',(req,res,next)=>{
  const shop = req.query.shop
  if(shop){
    res.redirect(`/auth?shop=${shop}`)
    return next()
  }
  else{
    res.send("please Provide a shop")
  }
})
app.use(function(error,req,res,next){
  console.log(error)
  next()
})
app.listen(8080, () => {
  console.log("app in listening on 8080");
});
