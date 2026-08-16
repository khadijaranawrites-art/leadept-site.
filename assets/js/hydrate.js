/* LEADEPT — applies editable content from /content/site.json to the pages.
   Text stays in the HTML as defaults; this only overrides when you edit in the admin. */
(function () {
  'use strict';
  function setText(sel, val) {
    if (!val) return;
    var el = document.querySelector(sel);
    if (el) el.textContent = val;
  }
  var path = location.pathname.replace(/\/$/, '');
  var isHome = path === '' || /\/index\.html$/.test(path) || path === '/index';

  fetch('/content/site.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : {}; })
    .then(function (c) {
      c = c || {};

      /* Email everywhere */
      if (c.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
          var txt = (a.textContent || '').trim();
          a.setAttribute('href', 'mailto:' + c.email);
          if (/@/.test(txt)) a.textContent = c.email;
        });
      }

      /* Booking link on all Book-a-call buttons */
      if (c.booking_url) {
        document.querySelectorAll('a[data-booking], a.btn').forEach(function (a) {
          var label = (a.textContent || '').toLowerCase();
          if (a.hasAttribute('data-booking') || label.indexOf('book a call') !== -1 || label.indexOf('book your') !== -1) {
            a.setAttribute('href', c.booking_url);
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener');
          }
        });
      }

      /* Homepage-only copy */
      if (isHome) {
        if (c.pill_text) {
          var pill = document.querySelector('.pill');
          if (pill) { var dot = pill.querySelector('.dot'); pill.innerHTML = ''; if (dot) pill.appendChild(dot); pill.insertAdjacentText('beforeend', ' ' + c.pill_text); }
        }
        setText('.hero h1', c.hero_title);
        setText('.hero .highlight', c.hero_highlight);
        setText('.hero p.lead', c.hero_lead);
        setText('.guarantee h2', c.guarantee_text);
      }
    })
    .catch(function () {});
})();
