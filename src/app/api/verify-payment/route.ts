import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Here you would typically update the user's subscription in the database (Supabase)
      return NextResponse.json({ message: "Payment verified successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Signature mismatch" }, { status: 400 });
    }
  } catch (error) {
    console.error('Verify Payment Error:', error);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
