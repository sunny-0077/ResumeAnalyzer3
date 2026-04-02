/* -------------------------------
   #4 Interview reset
--------------------------------*/
export const resetInterviewState = (
  setQuestions: any,
  setAnswers: any,
  setIndex: any,
  newQuestions: any[]
) => {
  setQuestions(newQuestions);
  setAnswers([]);
  setIndex(0);
};

/* -------------------------------
   #6 URL safe referral
--------------------------------*/
export const safeReferral = (name: string) => {
  return encodeURIComponent(name);
};

/* -------------------------------
   #7 prevent lifetime repurchase
--------------------------------*/
export const preventLifetimeRepurchase = (plan: string) => {
  if (plan === "lifetime") {
    return false;
  }
  return true;
};

/* -------------------------------
   #8 notification limit
--------------------------------*/
export const limitNotifications = (prev: any[], notification: any) => {
  return [notification, ...prev].slice(0, 20);
};

/* -------------------------------
   #10 require pro
--------------------------------*/
export const requireProAccess = (tier: string) => {
  if (tier === "free") {
    return false;
  }
  return true;
};

/* -------------------------------
   #13 resilient fetch with retry + timeout
--------------------------------*/
export const fetchWithRetry = async (url: string, options: any = {}, retries = 2): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
  
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);
    
    // Also retry on 5xx errors if needed
    if (!res.ok && res.status >= 500 && retries > 0) {
      return fetchWithRetry(url, options, retries - 1);
    }
    return res;
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') throw new Error('Request timed out after 15 seconds');
    if (retries === 0) throw err;
    return fetchWithRetry(url, options, retries - 1);
  }
};

/* -------------------------------
   #12 sort job match results
--------------------------------*/
export const sortResults = (results: any[]) => {
  return [...results].sort((a, b) => (b.score || 0) - (a.score || 0));
};

/* -------------------------------
   #14 capitalize title case
--------------------------------*/
export const capitalize = (s: string) => s.replace(/\b\w/g, c => c.toUpperCase());

/* -------------------------------
   #15 convert bullets to sentences
--------------------------------*/
export const bulletsToSentence = (text: string) => text.replace(/•|\-/g, ".");

/* -------------------------------
   #13 interview completion
--------------------------------*/
export const checkCompletion = (
  index: number,
  length: number,
  setCompleted: any
) => {
  if (index >= length) {
    setCompleted(true);
    return true;
  }
  return false;
};

/* -------------------------------
   #17 global analytics tracking
--------------------------------*/
export const track = (event: string, properties: any = {}) => {
  // Global dispatch for analytics listeners (e.g., Mixpanel, Segment, or internal logger)
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('analytics-event', { 
      detail: { event, properties, timestamp: Date.now() } 
    }));
  }
  
  // Production-grade logging fallback
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, properties);
  }
};
