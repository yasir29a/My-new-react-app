import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
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
    const { token, email, planId, amount, planName } = req.body;

    // Validate required fields
    if (!token || !email || !planId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate amount
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Create charge using Stripe API
    const charge = await stripe.charges.create({
      amount: Math.round(amount),
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

    let errorMessage = 'Payment failed. Please try again.';
    
    if (error.type === 'StripeCardError') {
      errorMessage = error.message;
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
}

function getEstimateTime(planId) {
  const times = {
    'basic': '24 hours',
    'standard': '1-3 hours',
    'premium': '30 minutes'
  };
  return times[planId] || '1-3 hours';
}
