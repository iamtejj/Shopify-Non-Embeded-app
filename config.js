import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

import 'dotenv/config'

const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_CLIENT_SECRETE,
    scopes: process.env.SCOPES.split(','),
    hostName: process.env.SHOPIFY_APP_URL.replace('https://',''),
    hostScheme: 'https',
    isEmbeddedApp: false,
  
  });

export default shopify