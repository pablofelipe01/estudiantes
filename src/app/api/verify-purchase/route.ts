import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // Use the latest API version
});

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const { userId } = await req.json();

      // Here, you should implement the logic to verify the purchase with Stripe
      // This is a simplified example and should be expanded based on your specific needs
      const sessions = await stripe.checkout.sessions.list({
        limit: 1,
        customer: userId,
      });

      if (sessions.data.length > 0 && sessions.data[0].payment_status === "paid") {
        // Purchase verified successfully
        return NextResponse.json({ success: true });
      } else {
        // Purchase verification failed
        return NextResponse.json({ success: false });
      }
    } catch (error) {
      console.error("Error verifying purchase:", error);
      return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}