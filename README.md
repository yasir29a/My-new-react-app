# Modern Like System (scaffold)

Scaffolded full-stack React (Vite) frontend and Express backend with Stripe payment integration.

## Quick start:

1. Install dependencies for server and client:

```bash
npm run install-all
```

2. Set up Stripe API keys:

   a. Get your keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   
   b. Create `.env` file in project root:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   ```
   
   c. Create `.env` file in `client` folder:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
   ```

3. Start development servers:

```bash
npm run dev
```

Backend: `server` runs on port 4000 by default. Frontend: `client` runs on 5173.

## Features:

- ✓ Responsive multi-page React website (Home, Pricing, About, FAQ, Contact)
- ✓ Stripe payment integration with CardElement
- ✓ Vehicle lookup API
- ✓ Professional UI with animations and gradients
- ✓ Mobile-friendly navigation with hamburger menu

## Payment Integration:

The payment system uses Stripe's secure CardElement component. When users click "Buy Your Report" or "Get Started" on pricing plans, they see a professional payment modal with:
- Plan details and pricing
- Card input (handled securely by Stripe)
- Email confirmation
- Error handling and loading states

Payments are processed on the backend via the `/api/payment` endpoint.

## Next steps:
- Implement real vehicle-history data provider integration (requires API access).
- Set up payment success notifications and report delivery.
- Connect database for storing payment records and user reports.
