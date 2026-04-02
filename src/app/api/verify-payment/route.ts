import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || '')
      .update(body.toString())
      .digest("hex");

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    });

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // 1. Fetch order details from Razorpay to get the 'tier' from notes — highly secure
      const order = await razorpay.orders.fetch(razorpay_order_id);
      const tier = order.notes?.tier || 'pro'; // Default to pro if missing

      // 2. Update the user's profile in Supabase
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ subscription_tier: tier })
        .eq('id', user.id);

      if (updateError) {
        console.error('Profile Update Error:', updateError);
        return NextResponse.json({ message: "Payment verified, but profile update failed." }, { status: 500 });
      }

      return NextResponse.json({ message: "Payment verified and tier activated successfully!" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Signature mismatch" }, { status: 400 });
    }
  } catch (error) {
    console.error('Verify Payment Error:', error);
    return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
  }
}
