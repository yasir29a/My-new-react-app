const express = require('express');
const cors = require('cors');
const path = require('path');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
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

// Payment Processing Endpoint
app.post('/api/payment', async (req, res) => {
  try {
    const { token, email, planId, amount, planName } = req.body;

    // Validate required fields
    if (!token || !email || !planId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate amount is a number and > 0
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create charge using Stripe API
    const charge = await stripe.charges.create({
      amount: Math.round(amount), // Amount in pence
      currency: 'gbp',
      source: token,
      description: `Vehicle Inspection Report - ${planName}`,
      receipt_email: email,
      metadata: {
        planId: planId,
        planName: planName,
        email: email
      }
    });

    // Log successful charge (in production, save to database)
    console.log('✓ Payment successful:', {
      chargeId: charge.id,
      amount: charge.amount,
      email: email,
      plan: planName,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      chargeId: charge.id,
      message: 'Payment processed successfully. Your report will be sent to your email shortly.',
      reportDelivery: {
        method: 'email',
        address: email,
        estimateTime: getEstimateTime(planId)
      }
    });

  } catch (error) {
    console.error('Payment error:', error.message);

    // Provide user-friendly error messages
    let errorMessage = 'Payment failed. Please try again.';
    
    if (error.type === 'StripeCardError') {
      errorMessage = error.message; // Card declined, insufficient funds, etc.
    } else if (error.type === 'StripeRateLimitError') {
      errorMessage = 'Too many requests. Please try again in a moment.';
    } else if (error.type === 'StripeAuthenticationError') {
      errorMessage = 'Payment system configuration error. Please contact support.';
    } else if (error.type === 'StripeConnectionError') {
      errorMessage = 'Network error. Please check your connection and try again.';
    }

    return res.status(400).json({ 
      success: false,
      error: errorMessage 
    });
  }
});

// Helper function to get estimated delivery time
function getEstimateTime(planId) {
  const times = {
    'basic': '24 hours',
    'standard': '1-3 hours',
    'premium': '30 minutes'
  };
  return times[planId] || '1-3 hours';
}

// Serve client build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html')));
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));
