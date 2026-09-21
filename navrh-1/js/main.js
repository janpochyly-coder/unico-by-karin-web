// Mobilné menu
(function () {
  var burger = document.querySelector('.burger');
  var links = document.querySelector('.nav-links');
  if (!burger || !links) return;
  burger.addEventListener('click', function () {
    links.classList.toggle('open');
  });
  // zavri po kliknutí na odkaz
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
    });
  });
})();

// Konfigurátor rituálu
(function () {
  var opts = document.querySelectorAll('.opt');
  var list = document.getElementById('ritual-list');
  var count = document.getElementById('sum-count');
  var copyBtn = document.getElementById('copy-ritual');
  var resetBtn = document.getElementById('reset-ritual');
  if (!opts.length || !list) return;

  var EMPTY = 'Zatiaľ ste nič nevybrali — kliknite na služby vľavo.';

  function countLabel(n) {
    if (n === 0) return 'Zatiaľ bez výberu';
    if (n === 1) return '1 vybraná služba';
    if (n >= 2 && n <= 4) return n + ' vybrané služby';
    return n + ' vybraných služieb';
  }

  function render() {
    var chosen = [];
    opts.forEach(function (o) {
      if (o.classList.contains('selected')) chosen.push(o.getAttribute('data-name'));
    });
    list.innerHTML = '';
    if (!chosen.length) {
      var li = document.createElement('li');
      li.className = 'empty';
      li.textContent = EMPTY;
      list.appendChild(li);
    } else {
      chosen.forEach(function (name) {
        var li = document.createElement('li');
        li.textContent = name;
        list.appendChild(li);
      });
    }
    if (count) count.textContent = countLabel(chosen.length);
    return chosen;
  }

  opts.forEach(function (o) {
    o.addEventListener('click', function () {
      o.classList.toggle('selected');
      o.setAttribute('aria-pressed', o.classList.contains('selected'));
      render();
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var chosen = [];
      opts.forEach(function (o) {
        if (o.classList.contains('selected')) chosen.push(o.getAttribute('data-name'));
      });
      if (!chosen.length) {
        copyBtn.textContent = 'Najprv vyberte';
        setTimeout(function () { copyBtn.textContent = 'Kopírovať zoznam'; }, 1600);
        return;
      }
      var text = 'Môj rituál — UNICO by Karin:\n'
        + chosen.map(function (n) { return '• ' + n; }).join('\n')
        + '\n\nObjednávka telefonicky: +421 911 476 786';
      var done = function () {
        copyBtn.textContent = 'Skopírované ✓';
        setTimeout(function () { copyBtn.textContent = 'Kopírovať zoznam'; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () { fallback(text, done); });
      } else {
        fallback(text, done);
      }
    });
  }

  function fallback(text, done) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      done();
    } catch (e) { /* ticho */ }
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      opts.forEach(function (o) {
        o.classList.remove('selected');
        o.setAttribute('aria-pressed', 'false');
      });
      render();
    });
  }

  render();
})();
