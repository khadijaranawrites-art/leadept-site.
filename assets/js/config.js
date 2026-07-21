/* LEADEPT site configuration.
   Fill these in to switch on integrations. Leave blank to use safe defaults.

   BOOKING_URL   -> your calendar link (Calendly / SavvyCal / TidyCal).
                    When set, every "Book a call" button opens it.
   SUPABASE_URL  -> your Supabase project URL (optional, for lead storage).
   SUPABASE_KEY  -> your Supabase public anon key (optional).
   If Supabase is left blank, the contact form is captured by Netlify Forms
   (view submissions in your Netlify dashboard, with email alerts).            */
window.LEADEPT_CONFIG = {
  BOOKING_URL: "",
  SUPABASE_URL: "",
  SUPABASE_KEY: ""
};
