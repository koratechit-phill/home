/* =========================================================
   KORATECH STORE — E-commerce Demo Script
   상품 데이터 / 렌더링 / 배너 / 좋아요 / 장바구니 / 검색
   ※ 실제 운영 시 PRODUCTS 를 API 응답으로 교체하세요.
   ========================================================= */
(function () {
  'use strict';
  var KT = window.KT;
  var t = KT.t;

  /* ---------- 카테고리 아이콘 ---------- */
  var ICON = {
    women: '<svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"><path d="M17 6l-9 7 4 6 4-2v25h16V17l4 2 4-6-9-7c-1 3-4 5-7 5s-6-2-7-5z"/></svg>',
    men: '<svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"><path d="M16 6h16l10 8-4 6-4-2v24H14V18l-4 2-4-6 10-8z"/><path d="M20 6l4 6 4-6"/></svg>',
    living: '<svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"><path d="M14 22L18 6h12l4 16H14z"/><path d="M24 22v16M16 42h16"/></svg>',
    tech: '<svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round"><path d="M8 30v-6a16 16 0 0132 0v6"/><rect x="6" y="28" width="8" height="12" rx="3"/><rect x="34" y="28" width="8" height="12" rx="3"/></svg>',
    beauty: '<svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"><rect x="15" y="16" width="18" height="26" rx="4"/><path d="M19 16V9h10v7M21 6h6"/></svg>',
    kitchen: '<svg viewBox="0 0 48 48" fill="none" stroke="#fff" stroke-width="2.5" stroke-linejoin="round"><path d="M10 14h24v16a10 10 0 01-10 10h-4a10 10 0 01-10-10V14z"/><path d="M34 18h3a5 5 0 010 10h-3"/></svg>'
  };

  /* ---------- 데모 상품 데이터 (가상 브랜드) ---------- */
  var PRODUCTS = [
    { id: 1,  brand: 'MOREN STUDIO', cat: 'women',   name: { ko: '울 블렌드 오버핏 하프 코트', en: 'Wool Blend Oversized Half Coat' }, price: 289000, off: 22, likes: 4210, rv: 312, tags: ['coupon', 'free', 'new'], c: ['#8a6a52', '#3b2a20'] },
    { id: 2,  brand: 'ARCHIVE NOTE', cat: 'men',     name: { ko: '헤비 코튼 스웨트셔츠 (5 COLORS)', en: 'Heavy Cotton Sweatshirt (5 Colors)' }, price: 79000, off: 30, likes: 9820, rv: 1240, tags: ['coupon', 'free', 'only'], c: ['#64748b', '#1e293b'] },
    { id: 3,  brand: 'LUMEN OBJECT', cat: 'living',  name: { ko: '세라믹 포터블 무드 조명', en: 'Ceramic Portable Mood Lamp' }, price: 129000, off: 15, likes: 6630, rv: 528, tags: ['free', 'only'], c: ['#d6c7a8', '#8a7a5c'] },
    { id: 4,  brand: 'SONORA',       cat: 'tech',    name: { ko: '노이즈캔슬링 무선 헤드폰 Air', en: 'Noise-cancelling Wireless Headphones Air' }, price: 349000, off: 12, likes: 3110, rv: 207, tags: ['free', 'new'], c: ['#4f7bff', '#1a37d6'] },
    { id: 5,  brand: 'DEW LAB',      cat: 'beauty',  name: { ko: '세라마이드 수분 크림 80ml', en: 'Ceramide Moisture Cream 80ml' }, price: 38000, off: 35, likes: 12040, rv: 3320, tags: ['coupon', 'free'], c: ['#fbcfe8', '#db2777'] },
    { id: 6,  brand: 'KILN & CO',    cat: 'kitchen', name: { ko: '핸드메이드 스톤웨어 머그 2P', en: 'Handmade Stoneware Mug Set of 2' }, price: 42000, off: 10, likes: 2890, rv: 410, tags: ['only'], c: ['#a3a3a3', '#525252'] },
    { id: 7,  brand: 'MOREN STUDIO', cat: 'women',   name: { ko: '캐시미어 터치 라운드 니트', en: 'Cashmere-touch Crewneck Knit' }, price: 119000, off: 25, likes: 7720, rv: 655, tags: ['coupon', 'free', 'new'], c: ['#e8e2d6', '#a8977a'] },
    { id: 8,  brand: 'FIELD ROUTE',  cat: 'men',     name: { ko: '3L 방수 마운틴 재킷', en: '3L Waterproof Mountain Jacket' }, price: 398000, off: 18, likes: 5140, rv: 389, tags: ['free'], c: ['#14532d', '#052e16'] },
    { id: 9,  brand: 'PLAIN FORM',   cat: 'living',  name: { ko: '알루미늄 모듈 선반 3단', en: 'Aluminum Modular Shelf, 3 Tier' }, price: 186000, off: 19, likes: 4480, rv: 166, tags: ['coupon', 'new'], c: ['#cbd5e1', '#64748b'] },
    { id: 10, brand: 'TACTILE',      cat: 'tech',    name: { ko: '저소음 기계식 키보드 75%', en: 'Silent Mechanical Keyboard 75%' }, price: 159000, off: 20, likes: 8810, rv: 902, tags: ['free', 'only'], c: ['#fde68a', '#b45309'] },
    { id: 11, brand: 'DEW LAB',      cat: 'beauty',  name: { ko: '저자극 데일리 선크림 SPF50+', en: 'Gentle Daily Sunscreen SPF50+' }, price: 26000, off: 29, likes: 10300, rv: 2710, tags: ['coupon', 'free', 'new'], c: ['#fed7aa', '#ea580c'] },
    { id: 12, brand: 'KILN & CO',    cat: 'kitchen', name: { ko: '스테인리스 핸드드립 케틀', en: 'Stainless Pour-over Kettle' }, price: 68000, off: 0, likes: 1930, rv: 144, tags: ['free'], c: ['#e5e7eb', '#6b7280'] },
    { id: 13, brand: 'NOON BAG',     cat: 'women',   name: { ko: '스웨이드 호보 숄더백', en: 'Suede Hobo Shoulder Bag' }, price: 158000, off: 30, likes: 9510, rv: 811, tags: ['coupon', 'free'], c: ['#a16207', '#422006'] },
    { id: 14, brand: 'ARCHIVE NOTE', cat: 'men',     name: { ko: '와이드 데님 팬츠 원워시', en: 'Wide Denim Pants, One Wash' }, price: 89000, off: 15, likes: 6020, rv: 598, tags: ['free', 'new'], c: ['#3b5b8a', '#1e3a5f'] },
    { id: 15, brand: 'LUMEN OBJECT', cat: 'living',  name: { ko: '리넨 블렌드 침구 세트 Q', en: 'Linen Blend Bedding Set, Queen' }, price: 239000, off: 26, likes: 3370, rv: 233, tags: ['coupon'], c: ['#d9cfc1', '#8b7d6b'] }
  ];

  var TAG_LABEL = {
    coupon: t('쿠폰', 'Coupon'), free: t('무료배송', 'Free ship'), new: t('신상품', 'New'), only: t('단독', 'Exclusive')
  };

  function sale(p) { return Math.round(p.price * (100 - p.off) / 100 / 10) * 10; }
  function compact(n) {
    if (KT.lang === 'en') return n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'k' : String(n);
    return n >= 10000 ? (n / 10000).toFixed(1).replace('.0', '') + '만' : n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + '천' : String(n);
  }
  function art(p) {
    return '<div class="art" style="background:linear-gradient(155deg,' + p.c[0] + ',' + p.c[1] + ')"><b>' + p.brand.split(' ')[0].slice(0, 4) + '</b>' + ICON[p.cat] + '</div>';
  }
  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }

  /* ---------- State ---------- */
  var likes = KT.store.get('kt_likes', []);
  var cart = KT.store.get('kt_cart', []); // [{id, q}]

  function cardHTML(p, rank) {
    var liked = likes.indexOf(p.id) > -1;
    return '<article class="p-card">' +
      '<a class="p-thumb" href="#" data-detail="' + p.id + '" aria-label="' + p.brand + ' ' + p.name[KT.lang] + '">' +
        (rank ? '<span class="p-rank">' + rank + '</span>' : '') + art(p) +
      '</a>' +
      '<button class="p-like' + (liked ? ' is-on' : '') + '" type="button" data-like="' + p.id + '" aria-pressed="' + liked + '" aria-label="' + t('좋아요', 'Like') + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg></button>' +
      '<button class="p-cart" type="button" data-add="' + p.id + '">' + t('장바구니 담기', 'Add to cart') + '</button>' +
      '<div class="p-info">' +
        '<p class="p-brand">' + p.brand + '</p>' +
        '<p class="p-name">' + p.name[KT.lang] + '</p>' +
        '<p class="p-price">' + (p.off ? '<span class="off">' + p.off + '%</span>' : '') + '<span class="now">' + Number(sale(p)).toLocaleString() + (KT.lang === 'en' ? '' : '') + '</span>' + (p.off ? '<del>' + Number(p.price).toLocaleString() + '</del>' : '') + '</p>' +
        '<p class="p-tags">' + p.tags.map(function (k) { return '<span' + (k === 'only' ? ' class="hot"' : '') + '>' + TAG_LABEL[k] + '</span>'; }).join('') + '</p>' +
        '<p class="p-meta"><span class="heart">' + compact(p.likes + (liked ? 1 : 0)) + '</span><span>' + t('리뷰', 'Reviews') + ' ' + compact(p.rv) + '</span></p>' +
      '</div></article>';
  }

  /* ---------- BEST 렌더 ---------- */
  var bestGrid = document.getElementById('bestGrid');
  var curCat = 'all', curSort = 'best';
  function renderBest() {
    if (!bestGrid) return;
    var list = PRODUCTS.filter(function (p) { return curCat === 'all' || p.cat === curCat; });
    list.sort(function (a, b) {
      if (curSort === 'low') return sale(a) - sale(b);
      if (curSort === 'high') return sale(b) - sale(a);
      if (curSort === 'off') return b.off - a.off;
      if (curSort === 'review') return b.rv - a.rv;
      return b.likes - a.likes;
    });
    bestGrid.innerHTML = list.slice(0, 10).map(function (p, i) { return cardHTML(p, curSort === 'best' ? i + 1 : 0); }).join('') ||
      '<p style="grid-column:1/-1;padding:60px 0;text-align:center;color:#888">' + t('상품이 없습니다.', 'No products.') + '</p>';
  }

  /* ---------- 기획전 렌더 ---------- */
  var COLLECTIONS = [
    { bg: 'bg-a', title: { ko: '간절기를 위한<br>레이어링 가이드', en: 'A layering guide<br>for in-between seasons' }, sub: { ko: '모렌스튜디오 단독 ~25%', en: 'Moren Studio exclusive, up to 25%' }, ids: [1, 7, 13] },
    { bg: 'bg-c', title: { ko: '오래 머무는<br>공간의 온도', en: 'The warmth of<br>a space you stay in' }, sub: { ko: '리빙 베스트 컬렉션', en: 'Living best collection' }, ids: [3, 9, 15] },
    { bg: 'bg-b', title: { ko: '집중이 필요한<br>당신의 데스크', en: 'A desk built<br>for deep focus' }, sub: { ko: '테크 신상 ~20%', en: 'New tech, up to 20%' }, ids: [4, 10, 12] }
  ];
  var colList = document.getElementById('colList');
  if (colList) {
    colList.innerHTML = COLLECTIONS.map(function (c) {
      return '<div class="col-item reveal"><a class="col-cover" href="#" data-soon><div class="bg ' + c.bg + '"></div><h3>' + c.title[KT.lang] + '</h3><p>' + c.sub[KT.lang] + '</p></a>' +
        '<div class="col-products">' + c.ids.map(function (id) {
          var p = byId(id);
          return '<a class="col-p" href="#" data-add="' + p.id + '"><div class="mini">' + art(p) + '</div><div><p class="p-brand">' + p.brand + '</p><p class="p-name">' + p.name[KT.lang] + '</p><p class="p-price">' + (p.off ? '<span class="off">' + p.off + '%</span>' : '') + '<span class="now">' + Number(sale(p)).toLocaleString() + '</span></p></div></a>';
        }).join('') + '</div></div>';
    }).join('');
  }

  /* ---------- 신상품 렌더 ---------- */
  var newGrid = document.getElementById('newGrid');
  if (newGrid) {
    newGrid.innerHTML = PRODUCTS.filter(function (p) { return p.tags.indexOf('new') > -1; }).slice(0, 5).map(function (p) { return cardHTML(p, 0); }).join('');
  }

  /* ---------- 탭 / 정렬 / 상단 카테고리 ---------- */
  function setCat(cat) {
    curCat = cat;
    document.querySelectorAll('[data-cat]').forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-cat') === cat); });
    renderBest();
  }
  document.querySelectorAll('[data-cat]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault();
      setCat(b.getAttribute('data-cat'));
      if (b.closest('.sh-cat')) { var s = document.getElementById('best'); if (s) s.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
  var sortSel = document.getElementById('sortSel');
  if (sortSel) sortSel.addEventListener('change', function () { curSort = sortSel.value; renderBest(); });
  renderBest();

  /* ---------- 좋아요 / 담기 (이벤트 위임) ---------- */
  document.addEventListener('click', function (e) {
    var like = e.target.closest('[data-like]');
    if (like) {
      e.preventDefault();
      var id = +like.getAttribute('data-like');
      var i = likes.indexOf(id);
      if (i > -1) likes.splice(i, 1); else likes.push(id);
      KT.store.set('kt_likes', likes);
      document.querySelectorAll('[data-like="' + id + '"]').forEach(function (b) {
        var on = likes.indexOf(id) > -1;
        b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on);
      });
      updateBadges();
      KT.toast(i > -1 ? t('좋아요를 취소했어요.', 'Removed from likes.') : t('좋아요한 상품에 추가했어요.', 'Added to likes.'));
      return;
    }
    var add = e.target.closest('[data-add]');
    if (add) { e.preventDefault(); addToCart(+add.getAttribute('data-add')); return; }
    var det = e.target.closest('[data-detail]');
    if (det) { e.preventDefault(); KT.toast(t('상품 상세 페이지는 추후 추가됩니다.', 'Product detail page coming soon.')); }
  });

  /* ---------- Cart ---------- */
  var drawer = document.getElementById('cartDrawer');
  var dim = document.getElementById('dimLayer');
  var cartBody = document.getElementById('cartBody');
  var lastFocus;

  function addToCart(id) {
    var found = cart.filter(function (c) { return c.id === id; })[0];
    if (found) found.q++; else cart.push({ id: id, q: 1 });
    saveCart();
    KT.toast(t('장바구니에 담았어요.', 'Added to cart.'));
  }
  function saveCart() { KT.store.set('kt_cart', cart); renderCart(); updateBadges(); }
  function renderCart() {
    if (!cartBody) return;
    var sub = 0, origin = 0;
    if (!cart.length) {
      cartBody.innerHTML = '<p class="drawer-empty">' + t('장바구니가 비어 있어요.', 'Your cart is empty.') + '</p>';
    } else {
      cartBody.innerHTML = cart.map(function (c) {
        var p = byId(c.id); if (!p) return '';
        sub += sale(p) * c.q; origin += p.price * c.q;
        return '<div class="cart-item"><div class="mini">' + art(p) + '</div><div><p class="br">' + p.brand + '</p><p class="nm">' + p.name[KT.lang] + '</p>' +
          '<div class="qty"><button type="button" data-q="-1" data-id="' + p.id + '" aria-label="' + t('수량 감소', 'Decrease') + '">−</button><span>' + c.q + '</span><button type="button" data-q="1" data-id="' + p.id + '" aria-label="' + t('수량 증가', 'Increase') + '">+</button></div></div>' +
          '<div><p class="pr">' + KT.won(sale(p) * c.q) + '</p><button class="rm" type="button" data-rm="' + p.id + '">' + t('삭제', 'Remove') + '</button></div></div>';
      }).join('');
    }
    var ship = sub === 0 || sub >= 50000 ? 0 : 3000;
    var f = document.getElementById('cartFoot');
    if (f) {
      f.querySelector('[data-v="origin"]').textContent = KT.won(origin);
      f.querySelector('[data-v="disc"]').textContent = '−' + KT.won(origin - sub);
      f.querySelector('[data-v="ship"]').textContent = ship ? KT.won(ship) : t('무료', 'Free');
      f.querySelector('[data-v="total"]').textContent = KT.won(sub + ship);
    }
  }
  if (cartBody) {
    cartBody.addEventListener('click', function (e) {
      var q = e.target.closest('[data-q]'), rm = e.target.closest('[data-rm]');
      if (q) {
        var id = +q.getAttribute('data-id');
        cart.forEach(function (c) { if (c.id === id) c.q = Math.max(1, c.q + (+q.getAttribute('data-q'))); });
        saveCart();
      }
      if (rm) { var rid = +rm.getAttribute('data-rm'); cart = cart.filter(function (c) { return c.id !== rid; }); saveCart(); }
    });
  }
  function openDrawer() {
    lastFocus = document.activeElement;
    renderCart();
    drawer.classList.add('is-open'); dim.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    var c = drawer.querySelector('.drawer-close'); if (c) c.focus();
  }
  function closeDrawer() {
    drawer.classList.remove('is-open'); dim.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('[data-open-cart]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); openDrawer(); }); });
  if (drawer) {
    drawer.querySelector('.drawer-close').addEventListener('click', closeDrawer);
    dim.addEventListener('click', closeDrawer);
    var checkout = document.getElementById('checkoutBtn');
    if (checkout) checkout.addEventListener('click', function () {
      if (!cart.length) { KT.toast(t('상품을 먼저 담아주세요.', 'Add something first.')); return; }
      KT.toast(t('데모: PG 결제창이 이곳에서 호출됩니다.', 'Demo: the PG checkout opens here.'));
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (drawer && drawer.classList.contains('is-open')) closeDrawer(); closeSearch(); }
  });

  function updateBadges() {
    var n = cart.reduce(function (s, c) { return s + c.q; }, 0);
    document.querySelectorAll('[data-badge="cart"]').forEach(function (b) { b.textContent = n; b.setAttribute('data-n', n); });
    document.querySelectorAll('[data-badge="like"]').forEach(function (b) { b.textContent = likes.length; b.setAttribute('data-n', likes.length); });
  }
  updateBadges(); renderCart();

  /* ---------- Search ---------- */
  var search = document.getElementById('searchLayer');
  function closeSearch() { if (search && search.classList.contains('is-open')) { search.classList.remove('is-open'); document.body.style.overflow = ''; } }
  document.querySelectorAll('[data-open-search]').forEach(function (b) {
    b.addEventListener('click', function (e) {
      e.preventDefault(); search.classList.add('is-open'); document.body.style.overflow = 'hidden';
      setTimeout(function () { search.querySelector('input').focus(); }, 50);
    });
  });
  if (search) {
    search.querySelector('.close').addEventListener('click', closeSearch);
    var sForm = search.querySelector('form'), sInput = search.querySelector('input');
    sForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = sInput.value.trim().toLowerCase();
      if (!q) return;
      var hits = PRODUCTS.filter(function (p) { return (p.brand + ' ' + p.name.ko + ' ' + p.name.en).toLowerCase().indexOf(q) > -1; });
      closeSearch();
      if (bestGrid) {
        curCat = 'all';
        document.querySelectorAll('[data-cat]').forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-cat') === 'all'); });
        bestGrid.innerHTML = hits.length ? hits.map(function (p) { return cardHTML(p, 0); }).join('') :
          '<p style="grid-column:1/-1;padding:60px 0;text-align:center;color:#888">' + t('검색 결과가 없습니다.', 'No results.') + '</p>';
        document.getElementById('best').scrollIntoView({ behavior: 'smooth' });
        KT.toast(t('"' + q + '" 검색 결과 ' + hits.length + '건', hits.length + ' results for "' + q + '"'));
      }
    });
    search.querySelectorAll('.kw button').forEach(function (b) { b.addEventListener('click', function () { sInput.value = b.textContent; sForm.requestSubmit ? sForm.requestSubmit() : sForm.dispatchEvent(new Event('submit')); }); });
  }

  /* ---------- Banner carousel ---------- */
  var track = document.querySelector('.banner-track');
  if (track) {
    var slides = track.children, total = slides.length, cur = 0, timer;
    var countEl = document.querySelector('.banner-ctrl .count b');
    var totEl = document.querySelector('.banner-ctrl .count i');
    var prog = document.querySelector('.banner-progress span');
    var paused = false;
    if (totEl) totEl.textContent = ' / ' + String(total).padStart(2, '0');
    function perView() { return window.innerWidth <= 1024 ? 1 : 2; }
    function go(n) {
      var max = total - perView();
      cur = n > max ? 0 : n < 0 ? max : n;
      track.style.transform = 'translateX(' + (-cur * (100 / perView())) + '%)';
      for (var i = 0; i < total; i++) slides[i].classList.toggle('is-current', i >= cur && i < cur + perView());
      if (countEl) countEl.textContent = String(cur + 1).padStart(2, '0');
      if (prog) { prog.classList.remove('run'); void prog.offsetWidth; if (!paused) prog.classList.add('run'); }
      restart();
    }
    function restart() { clearTimeout(timer); if (!paused) timer = setTimeout(function () { go(cur + 1); }, 5000); }
    document.querySelector('[data-banner="prev"]').addEventListener('click', function () { go(cur - 1); });
    document.querySelector('[data-banner="next"]').addEventListener('click', function () { go(cur + 1); });
    var pauseBtn = document.querySelector('[data-banner="pause"]');
    pauseBtn.addEventListener('click', function () {
      paused = !paused;
      pauseBtn.innerHTML = paused ? '▶' : '❚❚';
      pauseBtn.setAttribute('aria-label', paused ? t('재생', 'Play') : t('일시정지', 'Pause'));
      go(cur);
    });
    /* swipe */
    var sx = null;
    track.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
      if (sx === null) return; var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1)); sx = null;
    });
    window.addEventListener('resize', function () { go(cur); });
    go(0);
  }
})();
