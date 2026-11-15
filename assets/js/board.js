// Rotating project board on the home page: crossfades slides every 5 s,
// pauses on hover or keyboard focus, and stays still for reduced-motion users.
(function () {
  var board = document.querySelector(".board");
  if (!board) return;
  var slides = board.querySelectorAll(".slide");
  var dots = board.querySelectorAll(".dots button");
  var title = board.querySelector(".cap a");
  var line = board.querySelector(".cap p");
  var i = 0, timer = null, paused = false;
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function show(n) {
    slides[i].classList.remove("on");
    slides[i].setAttribute("aria-hidden", "true");
    slides[i].tabIndex = -1;
    dots[i].removeAttribute("aria-current");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("on");
    slides[i].removeAttribute("aria-hidden");
    slides[i].tabIndex = 0;
    dots[i].setAttribute("aria-current", "true");
    title.textContent = slides[i].dataset.title;
    title.href = slides[i].getAttribute("href");
    line.textContent = slides[i].dataset.line;
  }
  function start() { if (!still && !timer) timer = setInterval(function () { if (!paused) show(i + 1); }, 5000); }

  dots.forEach(function (d, k) { d.addEventListener("click", function () { show(k); }); });
  board.addEventListener("mouseenter", function () { paused = true; });
  board.addEventListener("mouseleave", function () { paused = false; });
  board.addEventListener("focusin", function () { paused = true; });
  board.addEventListener("focusout", function () { paused = false; });
  document.addEventListener("visibilitychange", function () { paused = document.hidden; });
  start();
})();
