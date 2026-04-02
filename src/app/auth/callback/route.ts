import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.user) {
      // Identity Check: Synchronize the profiles table row
      const { data: profile } = await supabase.from('profiles').select('has_onboarded').eq('id', data.user.id).single();
      
      const isNewUser = !profile || !profile.has_onboarded;
      
      const forwardedHost = request.headers.get('x-forwarded-host'); // local testing
      const isLocalEnv = process.env.NODE_ENV === 'development';
      
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${isNewUser ? '/onboarding' : next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${isNewUser ? '/onboarding' : next}`);
      } else {
        return NextResponse.redirect(`${origin}${isNewUser ? '/onboarding' : next}`);
      }
    }
  }

  // Fallback on error
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
