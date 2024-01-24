import '@shopify/shopify-api/adapters/node';
import express from 'express';
import 'dotenv/config'
import shopify from './config.js';
import sessionHandler from './utils/sessionHandler.js';
import mongoose from 'mongoose'
import StoreModel from './utils/modals/StoreModel.js';
const app = express();
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);

app.get('/auth', async (req, res) => {
  // The library will automatically redirect the user
  const shop = req.query.shop;
  if (!shop) {
    res.status(401).send("Please Provide a shop")
  }
  await shopify.auth.begin({
    shop: shopify.utils.sanitizeShop(req.query.shop, true),
    callbackPath: '/auth/callback',
    isOnline: false,
    rawRequest: req,
    rawResponse: res,
  });
});
app.get('/auth/callback', async (req, res) => {
  // The library will automatically set the appropriate HTTP headers
  const shop = req.query.shop
  const callback = await shopify.auth.callback({
    rawRequest: req,
    rawResponse: res,
  });
  
  const { session } = callback;
  const sessionShop = session.shop
  await sessionHandler.storeSession(session)
  await StoreModel.findOneAndUpdate(
    {shop:sessionShop},
    {isActive:true},
    {upsert:true}
  )
 
  // You can now use callback.session to make API requests
  res.redirect('/my-apps-entry-page');

})
app.get('/my-apps-entry-page', async (req, res) => {

  const sessionId = await shopify.session.getCurrentId({
    isOnline: true,
    rawRequest: req,
    rawResponse: res,
  });
  const session = await sessionHandler.loadSession(sessionId)
  console.log("my session")
  console.log(session)

  res.send("hellowork")
})
app.listen(8080, () => {
  console.log("app in listening on 8080")
})
