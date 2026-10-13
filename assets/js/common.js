/* =========================================================
   KORATECH IT SOLUTIONS — Common Script
   헤더 스크롤 / 모바일 메뉴 / 스크롤 등장 / 토스트 / 맨위로
   ========================================================= */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');

  var KT = window.KT = window.KT || {};
  KT.lang = (doc.getAttribute('lang') || 'ko').slice(0, 2);
  KT.t = function (ko, en) { return KT.lang === 'en' ? en : ko; };

  /* ---------- Storage (안전 래퍼) ---------- */
  KT.store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* noop */ } }
  };

  /* ---------- Toast ---------- */
  var toastEl, toastTimer;
  KT.toast = function (msg) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.setAttribute('role', 'status');
      toastEl.setAttribute('aria-live', 'polite');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('is-show'); }, 2600);
  };

  KT.won = function (n) {
    return KT.lang === 'en' ? '₩' + Number(n).toLocaleString('en-US') : Number(n).toLocaleString('ko-KR') + '원';
  };

  /* 풋터에 적힌 대표 이메일/전화 (change.vbs로 바뀐 값을 그대로 읽음) */
  KT.contactEmail = function () {
    var a = document.querySelector('.site-footer a[href^="mailto:"]');
    return a ? a.getAttribute('href').replace('mailto:', '') : '';
  };

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.menu-toggle');
    var toTop = document.querySelector('.to-top');
    var lastY = window.scrollY;

    /* 헤더 상태 */
    function onScroll() {
      var y = window.scrollY;
      if (header) {
        header.classList.toggle('is-scrolled', y > 40);
        if (header.hasAttribute('data-autohide') && !header.classList.contains('is-open')) {
          header.classList.toggle('is-hidden', y > 400 && y > lastY);
        }
      }
      if (toTop) toTop.classList.toggle('is-show', y > 800);
      lastY = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* 모바일 메뉴 */
    if (toggle && header) {
      toggle.addEventListener('click', function () {
        var open = header.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
      });
      header.querySelectorAll('.gnb a').forEach(function (a) {
        a.addEventListener('click', function () {
          header.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        });
      });
    }

    if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    /* 스크롤 등장 */
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add('is-in'); });
    }

    /* 언어 선택 기억 (루트 접속 시 사용) */
    document.querySelectorAll('[hreflang]').forEach(function (a) {
      if (a.tagName !== 'A') return;
      a.addEventListener('click', function () { try { localStorage.setItem('kt_lang', a.getAttribute('hreflang')); } catch (e) {} });
    });
    try { localStorage.setItem('kt_lang', KT.lang); } catch (e) {}

    /* 연도 자동 */
    document.querySelectorAll('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    /* 준비중 링크 */
    document.querySelectorAll('[data-soon]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); KT.toast(KT.t('준비 중인 페이지입니다.', 'This page is coming soon.')); });
    });
  });
})();
