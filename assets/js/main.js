/* LEADEPT — site interactions */
(function () {
  'use strict';

  /* ---- mobile nav ---- */
  var toggle = document.querySelector('.nav-toggle');
  var body = document.body;
  if (toggle) {
    toggle.addEventListener('click', function () {
      body.classList.toggle('nav-open');
      var open = body.classList.contains('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () { body.classList.remove('nav-open'); });
    });
  }

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.14 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- year ---- */
  var y = document.getElementById('year');
  if (y) { y.textContent = new Date().getFullYear(); }
})();
