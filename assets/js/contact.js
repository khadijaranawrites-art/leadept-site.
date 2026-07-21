/* LEADEPT — booking links + contact form submission */
(function () {
  'use strict';
  var cfg = window.LEADEPT_CONFIG || {};

  /* Point every "Book a call" button at the real calendar link, if set */
  if (cfg.BOOKING_URL) {
    document.querySelectorAll('a[href="contact.html"], a[data-booking]').forEach(function (a) {
      var label = (a.textContent || '').toLowerCase();
      if (a.hasAttribute('data-booking') || label.indexOf('book a call') !== -1) {
        a.href = cfg.BOOKING_URL;
        a.target = '_blank';
        a.rel = 'noopener';
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
  function encode(data) {
    return Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
    }).join('&');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.website && form.website.value) return;        // legacy honeypot
    if (form['bot-field'] && form['bot-field'].value) return;
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    if (!name || !email || email.indexOf('@') === -1) {
      setStatus('Please add your name and a valid email.', 'err');
      return;
    }
    var payload = {
      name: name, email: email,
      company: form.company.value.trim(),
      message: form.message.value.trim()
    };
    btn.disabled = true;
    setStatus('Sending…', '');

    function done() {
      form.reset();
      btn.disabled = false;
      setStatus('Thanks! Your message is in — we’ll reply within one business day.', 'ok');
    }
    function fail() {
      btn.disabled = false;
      setStatus('Something went wrong. Please email hello@leadept.com and we’ll sort it.', 'err');
    }

    // Preferred: store in Supabase if configured
    if (cfg.SUPABASE_URL && cfg.SUPABASE_KEY) {
      fetch(cfg.SUPABASE_URL.replace(/\/$/, '') + '/rest/v1/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': cfg.SUPABASE_KEY,
          'Authorization': 'Bearer ' + cfg.SUPABASE_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      }).then(function (r) { r.ok ? done() : fail(); }).catch(fail);
      return;
    }

    // Fallback: Netlify Forms (works out of the box on the deployed site)
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(Object.assign({ 'form-name': 'lead' }, payload))
    }).then(function (r) { r.ok ? done() : fail(); }).catch(fail);
  });
})();
