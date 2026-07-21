/* LEADEPT — site configuration
   These values are safe to expose publicly.
   The Supabase key below is a public "anon" key, designed for browser use and
   locked down by Row Level Security: visitors can only INSERT new leads and can
   never read, edit or delete them. */
window.LEADEPT_CONFIG = {
  SUPABASE_URL: "https://dpydtofypvnfbycvmkep.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRweWR0b2Z5cHZuZmJ5Y3Zta2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2MTEzMDYsImV4cCI6MjEwMDE4NzMwNn0.CyxThgiyl1Wdivz4CKrJQ9C8q7beZViCi6MMDnoAbRA",

  // Where "Book a call" buttons go. Until the founder's calendar link is set,
  // buttons scroll to the contact form instead.
  BOOKING_URL: "",        // e.g. https://calendly.com/leadept/intro

  // Fallback contact email (also shown in the site footer / contact page).
  CONTACT_EMAIL: "hello@leadept.com"
};
