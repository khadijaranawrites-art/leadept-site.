/* LEADEPT — contact form + booking link handling */
(function () {
  'use strict';
  var cfg = window.LEADEPT_CONFIG || {};

  /* ---- route "Book a call" buttons to the real calendar when set ---- */
  if (cfg.BOOKING_URL) {
    document.querySelectorAll('[data-booking], a.btn').forEach(function (a) {
      var label = (a.textContent || '').toLowerCase();
      if (a.hasAttribute('data-booking') || label.indexOf('book a call') > -1 || label.indexOf('intro call') > -1) {
        a.href = cfg.BOOKING_URL;
        a.target = '_blank'; a.rel = 'noopener';
      }
    });
  }

  var form = document.getElementById('lead-form');
  if (!form) return;
  var statusEl = document.getElementById('form-status');
  var btn = document.getElementById('lead-submit');

  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = 'form-status show ' + (kind || '');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // honeypot
    if (form.website && form.website.value) { return; }

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    if (!name || !email || email.indexOf('@') < 1) {
      setStatus('Please add your name and a valid email.', 'err');
      return;
    }

    var payload = {
      name: name,
      email: email,
      company: form.company.value.trim() || null,
      message: form.message.value.trim() || null,
      source: 'contact_form'
    };

    // If Supabase isn't configured yet, fall back to an email draft so no lead is lost.
    if (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) {
      var to = cfg.CONTACT_EMAIL || 'hello@leadept.com';
      var body = encodeURIComponent(
        'Name: ' + name + '\nEmail: ' + email +
        '\nCompany: ' + (payload.company || '') +
        '\n\n' + (payload.message || '')
      );
      window.location.href = 'mailto:' + to + '?subject=' +
        encodeURIComponent('New enquiry from ' + name) + '&body=' + body;
      setStatus('Opening your email app so you can send this to us…', 'ok');
      return;
    }

    btn.disabled = true;
    var original = btn.innerHTML;
    btn.innerHTML = 'Sending…';

    fetch(cfg.SUPABASE_URL + '/rest/v1/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': cfg.SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + cfg.SUPABASE_ANON_KEY,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (res.ok) {
        form.reset();
        setStatus('Thanks, ' + name.split(' ')[0] + " — got it. We'll be in touch within one business day.", 'ok');
      } else {
        return res.text().then(function (t) { throw new Error(t || res.status); });
      }
    }).catch(function () {
      setStatus('Something went wrong sending that. Please email us directly at ' +
        (cfg.CONTACT_EMAIL || 'hello@leadept.com') + '.', 'err');
    }).then(function () {
      btn.disabled = false;
      btn.innerHTML = original;
    });
  });
})();
