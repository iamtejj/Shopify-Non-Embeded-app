import '@shopify/shopify-api/adapters/node';
import express from 'express';
import 'dotenv/config'
import shopify from './config.js';
import sessionHandler from './utils/sessionHandler.js';
import mongoose from 'mongoose'
import StoreModel from './utils/modals/StoreModel.js';
import path from 'path'
import fs from 'fs'

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
    isOnline: true,
    rawRequest: req,
    rawResponse: res,
  });
});
app.get('/auth/callback', async (req, res) => {
  // The library will automatically set the appropriate HTTP headers
  console.log("calll")
  const shop = req.query.shop
  console.log("shop is reacingt")
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
const root = process.cwd()
app.use(express.static(path.join(root, './frontend/app-frontend/dist')));
app.get("/myrout",(req,res)=>{
  res.json("heelo")
})

app.get('/myproducts',async (req,res)=>{
  const sessionId = await shopify.session.getCurrentId({
    isOnline: false,
    rawRequest: req,
    rawResponse: res,
  });
  const session = await sessionHandler.loadSession(sessionId)
  const queryString = `{
  products (first: 3) {
    edges {
      node {
        id
        title
      }
    }
  }
}`
// `session` is built as part of the OAuth process
const client = new shopify.clients.Graphql({session});
const products = await client.query({
  data: queryString,
});
res.json(products)
})
app.get('/mysession', async (req, res) => {
  const sessionId = await shopify.session.getCurrentId({
    isOnline: false,
    rawRequest: req,
    rawResponse: res,
  });
  const session = await sessionHandler.loadSession(sessionId)
  console.log("my session")
  console.log(session)
  const file = fs.readFileSync(`${root}/frontend/app-frontend/index.html`,'utf-8')
  const client = new shopify.clients.Rest({session});
  const shop = await client.get({path: 'shop'})
  res.json(shop);
  // res
  // .status(200)
  // .set("Content-Type", "text/html")
  // .sendFile(`${root}/frontend/app-frontend/dist/index.html`);
  // res.send("hellowork")
});
app.listen(8080, () => {
  console.log("app in listening on 8080")
})
