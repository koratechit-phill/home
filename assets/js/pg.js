/* =========================================================
   KORATECH Developers — PG Developer Center Script
   코드 하이라이트 / 언어 탭 / 복사 / 문서 내비 / 데모 위젯 / 수수료 계산기
   ========================================================= */
(function () {
  'use strict';
  var KT = window.KT;
  var t = KT.t;

  /* ---------- 간단 문법 하이라이터 ---------- */
  var KW = 'const|let|var|await|async|function|return|if|else|import|from|new|try|catch|throw|def|class|print|true|false|null|None|True|False|export|require|public|static|void|String|int|echo|curl|elseif|foreach|as|use|package|func';
  var RE = new RegExp(
    '(\\/\\/[^\\n]*|#(?![\\w-]*;)[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +          // 1 comment
    '|(\'(?:\\\\.|[^\'\\\\])*\'|"(?:\\\\.|[^"\\\\])*"|`(?:\\\\.|[^`\\\\])*`)' + // 2 string
    '|\\b(' + KW + ')\\b' +                                                     // 3 keyword
    '|\\b(\\d+(?:\\.\\d+)?)\\b' +                                               // 4 number
    '|(\\b[a-zA-Z_]\\w*)(?=\\()' +                                              // 5 function
    '|(\\s-{1,2}[a-zA-Z][\\w-]*)',                                              // 6 cli flag
    'g');
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function highlight(src, lang) {
    var out = '', last = 0, m;
    RE.lastIndex = 0;
    while ((m = RE.exec(src))) {
      out += esc(src.slice(last, m.index));
      var cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : m[4] ? 'n' : m[5] ? 'f' : 'p';
      if (cls === 'c' && m[1].charAt(0) === '#' && !/^(python|bash|shell|curl|ruby)$/.test(lang)) {
        out += esc(m[0]); last = RE.lastIndex; continue;
      }
      out += '<span class="tok-' + cls + '">' + esc(m[0]) + '</span>';
      last = RE.lastIndex;
    }
    return out + esc(src.slice(last));
  }
  document.querySelectorAll('pre code').forEach(function (code) {
    var lang = code.getAttribute('data-lang') || '';
    code.innerHTML = highlight(code.textContent.replace(/^\n/, ''), lang);
  });

  /* ---------- 언어 탭 (코드 박스마다 독립) ---------- */
  document.querySelectorAll('.code-box').forEach(function (box) {
    var tabs = box.querySelectorAll('[role="tab"]');
    var panels = box.querySelectorAll('[role="tabpanel"]');
    function sel(i, focus) {
      tabs.forEach(function (tb, k) {
        tb.setAttribute('aria-selected', k === i ? 'true' : 'false');
        tb.setAttribute('tabindex', k === i ? '0' : '-1');
        if (k === i && focus) tb.focus();
      });
      panels.forEach(function (p, k) { p.hidden = k !== i; });
    }
    tabs.forEach(function (tb, i) {
      tb.addEventListener('click', function () { sel(i); });
      tb.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') sel((i + 1) % tabs.length, true);
        if (e.key === 'ArrowLeft') sel((i - 1 + tabs.length) % tabs.length, true);
      });
    });
    if (tabs.length) sel(0);
  });

  /* ---------- 복사 ---------- */
  function copy(text) {
    function done() { KT.toast(t('클립보드에 복사했어요.', 'Copied to clipboard.')); }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else fallback();
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { KT.toast(t('복사에 실패했어요.', 'Copy failed.')); }
      document.body.removeChild(ta);
    }
  }
  document.querySelectorAll('.code-panel').forEach(function (p) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'copy-btn'; b.textContent = t('복사', 'Copy');
    b.addEventListener('click', function () { copy(p.querySelector('code').textContent); });
    p.appendChild(b);
  });
  document.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var target = document.getElementById(b.getAttribute('data-copy'));
      if (target) copy(target.textContent);
    });
  });

  /* ---------- 문서 내비: 스크롤 스파이 + 필터 ---------- */
  var navLinks = document.querySelectorAll('.docs-nav a[href^="#"]');
  var secs = [];
  navLinks.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) secs.push({ a: a, s: s }); });
  function spy() {
    var y = window.scrollY + 140, cur = null;
    secs.forEach(function (o) { if (o.s.offsetTop <= y) cur = o; });
    navLinks.forEach(function (a) { a.classList.toggle('is-active', cur && a === cur.a); });
  }
  if (secs.length) { window.addEventListener('scroll', spy, { passive: true }); spy(); }

  var filter = document.getElementById('docFilter');
  if (filter) {
    filter.addEventListener('input', function () {
      var q = filter.value.trim().toLowerCase();
      navLinks.forEach(function (a) { a.hidden = q && a.textContent.toLowerCase().indexOf(q) === -1; });
    });
  }
  /* ⌘K / Ctrl+K → 문서 검색 */
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && filter) {
      e.preventDefault();
      document.getElementById('docs').scrollIntoView({ behavior: 'smooth' });
      setTimeout(function () { filter.focus(); }, 400);
    }
  });
  document.querySelectorAll('[data-focus-search]').forEach(function (b) {
    b.addEventListener('click', function () {
      document.getElementById('docs').scrollIntoView({ behavior: 'smooth' });
      setTimeout(function () { if (filter) filter.focus(); }, 400);
    });
  });

  /* ---------- 히어로 결제 위젯 데모 ---------- */
  var widget = document.querySelector('.pay-widget');
  if (widget) {
    var methods = widget.querySelectorAll('.pay-methods button');
    var result = widget.querySelector('.pay-result');
    methods.forEach(function (b) {
      b.addEventListener('click', function () {
        methods.forEach(function (x) { x.classList.remove('is-active'); x.setAttribute('aria-pressed', 'false'); });
        b.classList.add('is-active'); b.setAttribute('aria-pressed', 'true');
        result.textContent = '';
      });
    });
    widget.querySelector('.btn').addEventListener('click', function () {
      var m = widget.querySelector('.pay-methods .is-active');
      result.style.color = 'var(--gray-500)';
      result.textContent = t('결제 승인 요청 중…', 'Requesting approval…');
      setTimeout(function () {
        result.style.color = '#0f766e';
        result.textContent = '✓ ' + (m ? m.textContent : '') + ' · ' + t('테스트 결제 승인 완료 (DONE)', 'Test payment approved (DONE)');
      }, 900);
    });
  }

  /* ---------- 수수료 계산기 (예시 요율) ---------- */
  var calc = document.getElementById('feeCalc');
  if (calc) {
    var amt = calc.querySelector('#calcAmount');
    var mtd = calc.querySelector('#calcMethod');
    var cyc = calc.querySelector('#calcCycle');
    function fmt(n) { return KT.won(Math.round(n)); }
    function run() {
      var a = parseInt(String(amt.value).replace(/[^\d]/g, ''), 10) || 0;
      var opt = mtd.options[mtd.selectedIndex];
      var rate = parseFloat(opt.getAttribute('data-rate')) || 0;
      var fixed = parseFloat(opt.getAttribute('data-fixed')) || 0;
      var extra = parseFloat(cyc.options[cyc.selectedIndex].getAttribute('data-extra')) || 0;
      var fee = a * (rate + extra) / 100 + fixed;
      var vat = fee * 0.1;
      calc.querySelector('[data-o="rate"]').textContent = fixed ? fmt(fixed) + t(' / 건', ' / txn') : (rate + extra).toFixed(2) + '%';
      calc.querySelector('[data-o="fee"]').textContent = fmt(fee);
      calc.querySelector('[data-o="vat"]').textContent = fmt(vat);
      calc.querySelector('[data-o="net"]').textContent = fmt(Math.max(0, a - fee - vat));
    }
    amt.addEventListener('input', function () {
      var d = amt.value.replace(/[^\d]/g, '');
      amt.value = d ? Number(d).toLocaleString() : '';
      run();
    });
    mtd.addEventListener('change', run);
    cyc.addEventListener('change', run);
    run();
  }
})();
