import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';

import 'dotenv/config'

const shopify = shopifyApi({
    apiKey: process.env.SHOPIFY_API_KEY,
    apiSecretKey: process.env.SHOPIFY_CLIENT_SECRETE,
    scopes: process.env.SCOPES.split(','),
    hostName: '6db9-2402-a00-162-6b7c-9542-861d-b179-fcd1.ngrok-free.app',
    hostScheme: 'https',
    isEmbeddedApp: false,
  
  });

export default shopify