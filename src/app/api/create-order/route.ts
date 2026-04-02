import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@/utils/supabase/server';
import { getRegionData } from '@/lib/pricing';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { tier } = await req.json();
    const country = req.headers.get('x-vercel-ip-country') || 'IN';
    const region = getRegionData(country);

    let amount = 0;
    
    // Use Central Pricing Engine
    if (tier === 'pro') amount = region.pro * 100;
    if (tier === 'advanced') amount = region.advanced * 100;

    if (amount === 0) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Lazy initialization of Razorpay to prevent build-time failures
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY || '',
      key_secret: process.env.RAZORPAY_KEY_SECRET || '',
    });

    const options = {
      amount,
      currency: region.currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        tier: tier
      }
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error('Razorpay Order Error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
