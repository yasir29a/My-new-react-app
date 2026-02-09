const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/lookup', (req, res) => {
  const { reg } = req.body;
  if (!reg) return res.status(400).json({ error: 'registration required' });

  // TODO: replace stub with real vehicle-history provider integration
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

  setTimeout(() => res.json({ success: true, data: stub }), 600);
});

// Serve client build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')));
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));
