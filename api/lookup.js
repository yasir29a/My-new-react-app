export default function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reg } = req.body;
    
    if (!reg) {
      return res.status(400).json({ error: 'Registration required' });
    }

    // TODO: Replace with real vehicle-history provider integration
    const stub = {
      registration: reg.toUpperCase(),
      make: 'Toyota',
      model: 'Corolla',
      year: 2016,
      mileage: '72,000',
      mot: { status: 'Expired', expiry: '2024-08-12' },
      warnings: ['Outstanding finance'],
      fetchedAt: new Date().toISOString()
    };

    return res.status(200).json({ success: true, data: stub });

  } catch (error) {
    console.error('Lookup error:', error);
    return res.status(500).json({ error: 'Failed to lookup vehicle' });
  }
}
