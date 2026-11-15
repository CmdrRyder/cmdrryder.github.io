// Site behaviour: phone menu, featured-research carousel, card scroller, research filters.
(function () {
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // phone menu
  var btn = document.querySelector(".menu-btn"), nav = document.querySelector(".nav");
  if (btn && nav) btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // featured research carousel (home)
  var feat = document.querySelector(".feature");
  if (feat) {
    var slides = feat.querySelectorAll(".fslide"), dots = feat.querySelectorAll(".fdots button");
    var i = 0, paused = false;
    var show = function (n) {
      slides[i].classList.remove("on"); slides[i].setAttribute("aria-hidden", "true"); dots[i].removeAttribute("aria-current");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("on"); slides[i].removeAttribute("aria-hidden"); dots[i].setAttribute("aria-current", "true");
    };
    dots.forEach(function (d, k) { d.addEventListener("click", function () { show(k); }); });
    feat.querySelector(".prev").addEventListener("click", function () { show(i - 1); });
    feat.querySelector(".next").addEventListener("click", function () { show(i + 1); });
    feat.addEventListener("mouseenter", function () { paused = true; });
    feat.addEventListener("mouseleave", function () { paused = false; });
    feat.addEventListener("focusin", function () { paused = true; });
    feat.addEventListener("focusout", function () { paused = false; });
    document.addEventListener("visibilitychange", function () { paused = document.hidden; });
    if (!still) setInterval(function () { if (!paused) show(i + 1); }, 6500);
  }

  // horizontal card scroller
  document.querySelectorAll(".scroller-wrap").forEach(function (w) {
    var s = w.querySelector(".scroller");
    var step = function () { var c = s.querySelector(".fcard"); return c ? (c.offsetWidth + 16) * 2 : 300; };
    w.querySelector(".sbtn.l").addEventListener("click", function () { s.scrollBy({ left: -step(), behavior: still ? "auto" : "smooth" }); });
    w.querySelector(".sbtn.r").addEventListener("click", function () { s.scrollBy({ left: step(), behavior: still ? "auto" : "smooth" }); });
  });

  // research filters
  var chips = document.querySelectorAll(".chip[data-filter]");
  if (chips.length) {
    var rows = document.querySelectorAll(".rrow[data-theme]");
    var apply = function (f) {
      chips.forEach(function (c) { c.setAttribute("aria-pressed", c.dataset.filter === f ? "true" : "false"); });
      rows.forEach(function (r) { r.hidden = !(f === "all" || r.dataset.theme.split(" ").indexOf(f) >= 0); });
    };
    chips.forEach(function (c) { c.addEventListener("click", function () { apply(c.dataset.filter); history.replaceState(null, "", c.dataset.filter === "all" ? location.pathname : "#" + c.dataset.filter); }); });
    var h = location.hash.replace("#", "");
    apply(document.querySelector('.chip[data-filter="' + h + '"]') ? h : "all");
  }
})();
