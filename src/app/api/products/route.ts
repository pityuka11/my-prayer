// Explicitly set runtime to nodejs for OpenNext compatibility
export const runtime = 'nodejs'

export async function GET() {
  const products = [
    {
      id: '1',
      title: 'Willow Tree Prayer of Peace',
      image: 'https://m.media-amazon.com/images/I/81HI2+P149L._AC_SL1500_.jpg',
      url: 'https://amzn.to/4gVhUjH',
      price: '$29.85',
      tags: ['prayer']
    },
    {
      id: '2',
      title: 'Bedtime Prayers for Little Ones',
      image: 'https://m.media-amazon.com/images/I/81pf3q2K7IL._SL1500_.jpg',
      url: 'https://amzn.to/42uzKUx',
      price: '$9.99',
      tags: ['prayer']
    },
    {
      id: '3',
      title: 'Kindle: Does Prayer Change Things?',
      image: 'https://m.media-amazon.com/images/I/61BgGQRPOGL._SL1500_.jpg',
      url: 'https://amzn.to/4757F91',
      price: '$0.00',
      tags: ['kindle', 'prayer']
    },
    {
      id: '4',
      title: 'Prayer Journal for Women',
      image: 'https://m.media-amazon.com/images/I/71obP7SgU4L._SL1250_.jpg',
      url: 'https://amzn.to/47aKr1g',
      price: '$10.95',
      tags: ['prayer', 'journal']
    },
    {
      id: '5',
      title: 'Morning and Evening Prayer',
      image: 'https://m.media-amazon.com/images/I/51zQ0zZIbDL._SL1500_.jpg',
      url: 'https://amzn.to/4o3XUgV',
      price: '$31.03',
      tags: ['prayer', 'devotional']
    },
    {
      id: '6',
      title: 'He Will Reign Forever',
      image: 'https://m.media-amazon.com/images/I/71WfW1bbqkL._SL1360_.jpg',
      url: 'https://amzn.to/4mPlq0g',
      price: '$29.95',
      tags: ['prayer', 'classic']
    },
    {
      id: '7',
      title: '365 Days of Prayer for Life',
      image: 'https://m.media-amazon.com/images/I/715AQVlt+3L._SL1500_.jpg',
      url: 'https://amzn.to/3WsYvgg',
      price: '$17.99',
      tags: ['prayer', 'daily']
    },
    {
      id: '8',
      title: 'Prayers That Work',
      image: 'https://m.media-amazon.com/images/I/61f+vsSUq2L._SL1500_.jpg',
      url: 'https://amzn.to/3KVk9Hy',
      price: '$19.99',
      tags: ['prayer', 'faith']
    }
  ];

  return new Response(JSON.stringify({ items: products }), {
    headers: { 'content-type': 'application/json' }
  });
}
