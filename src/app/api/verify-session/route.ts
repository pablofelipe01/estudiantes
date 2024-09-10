import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const { sessionId } = await req.json();

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        // Here you could update the user's credits in your database
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ success: false, message: 'Payment not completed' });
      }
    } catch (err: any) {
      return NextResponse.json({ success: false, message: err.message });
    }
  } else {
    return NextResponse.json({ statusCode: 405, message: 'Method Not Allowed' });
  }
}