import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

import 'dotenv/config'

const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_CLIENT_SECRETE,
    scopes: process.env.SCOPES.split(','),
    hostName: 'a9e5-2402-a00-162-6b7c-21b7-f8fd-bae0-77ef.ngrok-free.app',
    hostScheme: 'https',
    isEmbeddedApp: false,
  
  });

export default shopify