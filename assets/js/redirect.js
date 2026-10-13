/* 루트(/) 접속 시 브라우저 언어에 따라 /ko/ 또는 /en/ 으로 이동 */
(function () {
  var saved = null;
  try { saved = localStorage.getItem('kt_lang'); } catch (e) {}
  var lang = saved || ((navigator.language || 'ko').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en');
  window.location.replace(lang + '/index.html');
})();
