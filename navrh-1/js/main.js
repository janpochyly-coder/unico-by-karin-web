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
