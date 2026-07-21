/* LEADEPT — site configuration
   These values are safe to expose publicly.
   The Supabase "anon" key is designed for browser use and is locked down
   by Row Level Security so visitors can only INSERT new leads (never read). */
window.LEADEPT_CONFIG = {
  // Filled in once the Supabase project is live:
  SUPABASE_URL: "",       // e.g. https://xxxx.supabase.co
  SUPABASE_ANON_KEY: "",  // public anon key

  // Where "Book a call" buttons go. Until the founder's calendar link is set,
  // buttons scroll to the contact form instead.
  BOOKING_URL: "",        // e.g. https://calendly.com/leadept/intro

  // Fallback contact email (also update the mailto links in the HTML).
  CONTACT_EMAIL: "hello@leadept.com"
};
