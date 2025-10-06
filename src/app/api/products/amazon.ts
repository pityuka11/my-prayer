import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import fetch from 'node-fetch';

const ACCESS_KEY = process.env.AMAZON_ACCESS_KEY!;
const SECRET_KEY = process.env.AMAZON_SECRET_KEY!;
const PARTNER_TAG = process.env.AMAZON_PARTNER_TAG!;
const REGION = 'us-east-1';
const MARKETPLACE = 'www.amazon.com';

async function amazonSearch(keywords: string) {
  const endpoint = `https://webservices.amazon.com/paapi5/searchitems`;
  const payload = {
    Keywords: keywords,
    SearchIndex: 'Books',
    ItemCount: 10,
    Resources: ['Images.Primary.Medium', 'ItemInfo.Title', 'Offers.Listings.Price'],
    PartnerTag: PARTNER_TAG,
    PartnerType: 'Associates',
    Marketplace: MARKETPLACE
  };

  const headers = await signRequest(endpoint, payload);
  const res = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(payload) });
  return await res.json();
}

// simplified signer for AWS PA-API v5
async function signRequest(endpoint: string, payload: any) {
  const host = new URL(endpoint).host;
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.substring(0, 8);

  const canonicalUri = '/paapi5/searchitems';
  const canonicalQuerystring = '';
  const canonicalHeaders = `content-encoding:amz-1.0\nhost:${host}\nx-amz-date:${amzDate}\n`;
  const signedHeaders = 'content-encoding;host;x-amz-date';
  const payloadHash = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  const canonicalRequest = `POST\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;

  const algorithm = 'AWS4-HMAC-SHA256';
  const credentialScope = `${dateStamp}/${REGION}/ProductAdvertisingAPI/aws4_request`;
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;

  const signingKey = getSignatureKey(SECRET_KEY, dateStamp, REGION, 'ProductAdvertisingAPI');
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  return {
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Amz-Date': amzDate,
    'Authorization': `${algorithm} Credential=${ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    'x-amz-target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
    'Content-Encoding': 'amz-1.0',
  };
}

function getSignatureKey(key: string, dateStamp: string, region: string, serviceName: string) {
  const kDate = crypto.createHmac('sha256', 'AWS4' + key).update(dateStamp).digest();
  const kRegion = crypto.createHmac('sha256', kDate).update(region).digest();
  const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
  return crypto.createHmac('sha256', kService).update('aws4_request').digest();
}

export async function GET(_req: NextRequest) {
  const data = await amazonSearch('prayer book');
  const products = data.SearchResult?.Items?.map((item: any, i: number) => ({
    id: i + 1,
    title: item.ItemInfo.Title.DisplayValue,
    image: item.Images?.Primary?.Medium?.URL,
    url: item.DetailPageURL, // includes affiliate tag automatically
    price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || 'N/A',
    tags: ['prayer']
  })) ?? [];

  return NextResponse.json(products);
}
