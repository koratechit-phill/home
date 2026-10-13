/* =========================================================
   KORATECH — Corporate Main Page Script
   ========================================================= */
(function () {
  'use strict';
  var KT = window.KT || {};

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    /* ---------- 히어로 단어 회전 ---------- */
    var rot = document.querySelector('.rotator');
    if (rot) {
      var words = rot.querySelectorAll('b'), idx = 0;
      words[0].classList.add('is-on');
      setInterval(function () {
        var cur = words[idx];
        cur.classList.remove('is-on'); cur.classList.add('is-out');
        setTimeout(function () { cur.classList.remove('is-out'); }, 600);
        idx = (idx + 1) % words.length;
        words[idx].classList.add('is-on');
      }, 2400);
    }

    /* ---------- 슬로건 단어 점등 ---------- */
    var dims = document.querySelectorAll('.slogan-text .dim');
    function lightUp() {
      var vh = window.innerHeight;
      dims.forEach(function (el) {
        var r = el.getBoundingClientRect();
        el.classList.toggle('is-lit', r.top < vh * 0.72);
      });
    }
    if (dims.length) { window.addEventListener('scroll', lightUp, { passive: true }); lightUp(); }

    /* ---------- 숫자 카운터 ---------- */
    var nums = document.querySelectorAll('[data-count]');
    function runCount(el) {
      var end = parseFloat(el.getAttribute('data-count'));
      var dec = (el.getAttribute('data-count').split('.')[1] || '').length;
      var start = null, dur = 1600;
      var out = el.querySelector('.n') || el;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var e = 1 - Math.pow(1 - p, 3);
        out.textContent = (end * e).toFixed(dec);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); } });
      }, { threshold: 0.5 });
      nums.forEach(function (n) { cio.observe(n); });
    }

    /* ---------- 서비스 탭 ---------- */
    var tabs = document.querySelectorAll('.svc-tab');
    var panels = document.querySelectorAll('.svc-panel');
    function activate(i, focus) {
      tabs.forEach(function (t, k) {
        var on = k === i;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
        if (on && focus) t.focus();
      });
      panels.forEach(function (p, k) { p.classList.toggle('is-active', k === i); p.hidden = k !== i; });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { activate(i); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); activate((i + 1) % tabs.length, true); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); activate((i - 1 + tabs.length) % tabs.length, true); }
      });
    });
    if (tabs.length) activate(0);

    /* ---------- 히어로 마우스 패럴랙스 ---------- */
    var hero = document.querySelector('.hero');
    var orbs = document.querySelectorAll('.hero-orb');
    if (hero && window.matchMedia('(pointer:fine)').matches) {
      hero.addEventListener('mousemove', function (e) {
        var x = (e.clientX / window.innerWidth - 0.5), y = (e.clientY / window.innerHeight - 0.5);
        orbs.forEach(function (o, i) {
          var f = (i + 1) * 18;
          o.style.translate = (x * f) + 'px ' + (y * f) + 'px';
        });
      });
    }

    /* ---------- 문의 폼 ---------- */
    var form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;
        form.querySelectorAll('[required]').forEach(function (inp) {
          var field = inp.closest('.field');
          var valid = inp.type === 'checkbox' ? inp.checked : inp.value.trim() !== '';
          if (inp.type === 'email' && valid) valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value.trim());
          if (field) field.classList.toggle('is-error', !valid);
          if (!valid) ok = false;
        });
        if (!ok) { KT.toast(KT.t('필수 항목을 확인해 주세요.', 'Please check the required fields.')); return; }

        var data = new FormData(form);
        var types = data.getAll('type').join(', ');
        var subject = '[' + KT.t('프로젝트 문의', 'Project Inquiry') + '] ' + (data.get('company') || '') + ' / ' + (data.get('name') || '');
        var body = [
          KT.t('회사명', 'Company') + ': ' + (data.get('company') || ''),
          KT.t('담당자', 'Name') + ': ' + (data.get('name') || ''),
          KT.t('연락처', 'Phone') + ': ' + (data.get('phone') || ''),
          KT.t('이메일', 'Email') + ': ' + (data.get('email') || ''),
          KT.t('문의 분야', 'Service') + ': ' + types,
          KT.t('예산', 'Budget') + ': ' + (data.get('budget') || ''),
          '',
          data.get('message') || ''
        ].join('\n');

        /* 실제 운영 시: fetch('/api/inquiry', { method:'POST', body:data }) 로 교체 */
        var to = KT.contactEmail();
        if (to) window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        KT.toast(KT.t('문의가 접수되었습니다. 메일 앱에서 전송을 완료해 주세요.', 'Thanks! Please complete sending in your mail app.'));
        form.reset();
      });
      form.querySelectorAll('input, select, textarea').forEach(function (inp) {
        inp.addEventListener('input', function () { var f = inp.closest('.field'); if (f) f.classList.remove('is-error'); });
      });
    }
  });
})();
