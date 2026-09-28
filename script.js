/* TAMANNA JAIN - HR Portfolio JS */

(function() {
  'use strict';

  // --- Let's Talk Dropdown ---
  const btn = document.getElementById('letsTalkBtn');
  const dropdown = document.getElementById('talkDropdown');

  if (btn && dropdown) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      dropdown.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });
    document.addEventListener('click', function() {
      dropdown.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-hidden', 'true');
    });
    dropdown.addEventListener('click', function(e) { e.stopPropagation(); });
  }

  // --- Mobile Menu ---
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose = document.getElementById('menuClose');

  if (menuBtn && mobileMenu && menuClose) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.add('is-open');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    menuClose.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', closeMenu);
    });
  }

  // --- Intersection Observer for fade-in animations ---
  const fadeEls = document.querySelectorAll('.role-card, .hiring-stat, .ops-item, .engagement-card, .keywork-item-card, .future-card, .skill-card');
  if ('IntersectionObserver' in window) {
    fadeEls.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, idx) {
        if (entry.isIntersecting) {
          setTimeout(function() {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, 60 * (Array.from(fadeEls).indexOf(entry.target) % 6));
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(function(el) { io.observe(el); });
  }

  // --- Scroll-velocity skew (via Lenis smooth scroll) ---
  if (typeof Lenis !== 'undefined') {
    var lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });
    var skewEls = document.querySelectorAll('.scroll-skew');
    var MAX_SKEW = 6; // degrees — subtle, not distorted
    var currentSkew = 0;

    function skewRaf(time) {
      lenis.raf(time);
      var velocity = lenis.velocity || 0;
      var targetSkew = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, velocity * 0.5));
      currentSkew += (targetSkew - currentSkew) * 0.12;
      if (Math.abs(currentSkew) > 0.02) {
        var val = 'skewY(' + currentSkew.toFixed(2) + 'deg)';
        skewEls.forEach(function(el) { el.style.transform = val; });
      } else if (currentSkew !== 0) {
        currentSkew = 0;
        skewEls.forEach(function(el) { el.style.transform = ''; });
      }
      requestAnimationFrame(skewRaf);
    }
    requestAnimationFrame(skewRaf);
  }

})();
