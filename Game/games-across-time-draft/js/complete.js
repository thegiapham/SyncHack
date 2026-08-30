/**
 * Games Across Time — "game complete" button
 * ------------------------------------------------------------
 * Each game lives on its own page, so it cannot call back into
 * the archive's in-memory state. This drops a button on the page
 * that records the country in localStorage under 'gat:completed'
 * and returns to the archive, which merges the list on load.
 *
 * Usage (one line per game page):
 *   <script src="js/complete.js" data-country="mongolia"></script>
 *   <script src="../games-across-time-draft/js/complete.js"
 *           data-country="greece"
 *           data-home="../games-across-time-draft/index.html"></script>
 * ------------------------------------------------------------
 */
(function () {
  var tag = document.currentScript;
  if (!tag) return;

  var country = tag.getAttribute('data-country');
  if (!country) return;

  var home = tag.getAttribute('data-home') || 'index.html';
  var label = tag.getAttribute('data-label') || 'Mark game complete';
  var STORAGE_KEY = 'gat:completed';

  function record() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      var list = Array.isArray(saved) ? saved : [];
      if (list.indexOf(country) === -1) list.push(country);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      /* storage blocked — completion just won't persist */
    }
  }

  function build() {
    if (document.querySelector('.gat-complete')) return;

    var style = document.createElement('style');
    style.textContent =
      '.gat-complete{position:fixed;right:22px;bottom:22px;z-index:9999;' +
      'font-family:"Cormorant Garamond",Georgia,serif;font-size:16px;letter-spacing:.06em;' +
      'text-transform:uppercase;color:#2c2419;background:#d0a65f;border:1px solid #8a6a32;' +
      'border-radius:2px;padding:13px 22px;cursor:pointer;box-shadow:0 10px 26px rgba(20,14,6,.35);' +
      'transition:background .18s ease,transform .18s ease}' +
      '.gat-complete:hover{background:#e0bb78;transform:translateY(-1px)}' +
      '.gat-complete:focus-visible{outline:2px solid #2c2419;outline-offset:3px}' +
      '@media(max-width:520px){.gat-complete{right:12px;bottom:12px;font-size:14px;padding:11px 16px}}';
    document.head.appendChild(style);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'gat-complete';
    btn.textContent = label;
    btn.addEventListener('click', function () {
      record();
      window.location.href = home;
    });
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
