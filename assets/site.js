(()=>{'use strict';
const menu=document.querySelector('.menu-button'),mob=document.querySelector('.mobile-nav');if(menu&&mob){menu.addEventListener('click',()=>{let open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));mob.classList.toggle('is-open',open);menu.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');});}
// Featured research slideshow
const slider=document.querySelector('.hero-slider');if(slider){const slides=[...slider.querySelectorAll('.hero-slide')],dots=[...slider.querySelectorAll('.slide-dot')];let index=0,timer=null,hover=false;const go=(n)=>{index=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('is-active',i===index));dots.forEach((d,i)=>{d.classList.toggle('is-active',i===index);d.setAttribute('aria-current',i===index?'true':'false');});};const stop=()=>{if(timer){clearInterval(timer);timer=null}};const start=()=>{stop();if(!hover&&!document.hidden)timer=setInterval(()=>go(index+1),15000)};slider.querySelector('.hero-prev')?.addEventListener('click',()=>{go(index-1);start()});slider.querySelector('.hero-next')?.addEventListener('click',()=>{go(index+1);start()});dots.forEach(d=>d.addEventListener('click',()=>{go(Number(d.dataset.goto));start()}));slider.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;stop()}});slider.addEventListener('pointerleave',()=>{hover=false;start()});slider.addEventListener('focusin',e=>{if(e.target.matches(':focus-visible'))stop()});slider.addEventListener('focusout',start);document.addEventListener('visibilitychange',()=>document.hidden?stop():start());start();}
// Horizontal card controls
const strip=document.querySelector('.research-strip');if(strip){const motion=window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth';const step=()=>{const c=strip.querySelector('.research-card');const g=parseFloat(getComputedStyle(strip).columnGap)||16;return c?c.getBoundingClientRect().width+g:300};const move=(dist)=>{const max=strip.scrollWidth-strip.clientWidth;if(max<=4)return;const x=strip.scrollLeft;if(dist>0&&x>=max-6)strip.scrollTo({left:0,behavior:motion});else if(dist<0&&x<=6)strip.scrollTo({left:max,behavior:motion});else strip.scrollBy({left:dist,behavior:motion})};let t=null,hold=false;const halt=()=>{if(t){clearInterval(t);t=null}};const run=()=>{halt();if(!hold&&!document.hidden)t=setInterval(()=>move(step()),15000)};const page=()=>Math.min(strip.clientWidth*.65,540);document.querySelector('.scroll-left')?.addEventListener('click',()=>{move(-page());run()});document.querySelector('.scroll-right')?.addEventListener('click',()=>{move(page());run()});const shell=strip.closest('.carousel-shell')||strip;shell.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hold=true;halt()}});shell.addEventListener('pointerleave',()=>{hold=false;run()});strip.addEventListener('touchstart',halt,{passive:true});strip.addEventListener('touchend',()=>{halt();setTimeout(run,15000)},{passive:true});document.addEventListener('visibilitychange',()=>document.hidden?halt():run());run();}
// Research filters, shareable with ?category=...
const chips=[...document.querySelectorAll('[data-filter]')],rows=[...document.querySelectorAll('[data-category]')];if(chips.length){const filter=(f)=>{chips.forEach(c=>c.classList.toggle('is-selected',c.dataset.filter===f));rows.forEach(r=>r.hidden=(f!=='All'&&r.dataset.category!==f));};chips.forEach(c=>c.addEventListener('click',()=>{filter(c.dataset.filter);let u=new URL(location.href);c.dataset.filter==='All'?u.searchParams.delete('category'):u.searchParams.set('category',c.dataset.filter);history.replaceState(null,'',u);}));let f=new URLSearchParams(location.search).get('category');filter(chips.some(c=>c.dataset.filter===f)?f:'All');}
// Default scholar link opens a scholar search rather than an unverified profile URL.

})();
/* Lightbox for facility galleries and study figures */
(function () {
  var box = document.createElement("div");
  box.className = "lightbox"; box.setAttribute("role", "dialog"); box.setAttribute("aria-modal", "true"); box.setAttribute("aria-label", "Image viewer");
  box.innerHTML = '<img alt=""><p></p><button class="lb-close" type="button" aria-label="Close">&times;</button><button class="lb-prev" type="button" aria-label="Previous image">&#8249;</button><button class="lb-next" type="button" aria-label="Next image">&#8250;</button>';
  document.body.appendChild(box);
  var img = box.querySelector("img"), cap = box.querySelector("p"), list = [], idx = 0, last = null;
  function items(el) {
    var g = el.closest("[data-gallery]");
    if (g) return Array.prototype.slice.call(g.querySelectorAll(".lb"));
    return Array.prototype.slice.call(document.querySelectorAll(".paper-figure"));
  }
  function info(el) {
    if (el.classList.contains("lb")) return { src: el.getAttribute("data-full"), cap: el.getAttribute("data-cap") || "", alt: (el.querySelector("img") || {}).alt || "" };
    var f = el.closest("figure"), c = f && f.querySelector("figcaption");
    return { src: el.currentSrc || el.src, cap: c ? c.textContent : "", alt: el.alt };
  }
  function show(i) {
    idx = (i + list.length) % list.length; var d = info(list[idx]);
    img.src = d.src; img.alt = d.alt; cap.textContent = d.cap;
    var multi = list.length > 1; box.querySelector(".lb-prev").hidden = !multi; box.querySelector(".lb-next").hidden = !multi;
  }
  function open(el) { last = el; list = items(el); show(list.indexOf(el)); box.classList.add("open"); document.body.style.overflow = "hidden"; box.querySelector(".lb-close").focus(); }
  function close() { box.classList.remove("open"); document.body.style.overflow = ""; img.removeAttribute("src"); if (last) last.focus && last.focus(); }
  document.addEventListener("click", function (e) {
    var t = e.target.closest(".lb, .paper-figure");
    if (t && !box.contains(t)) { e.preventDefault(); open(t); return; }
    if (e.target === box || e.target.closest(".lb-close")) close();
    else if (e.target.closest(".lb-prev")) show(idx - 1);
    else if (e.target.closest(".lb-next")) show(idx + 1);
  });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close(); else if (e.key === "ArrowLeft") show(idx - 1); else if (e.key === "ArrowRight") show(idx + 1);
  });
  /* pause looping videos when off screen or when the visitor prefers reduced motion */
  var vids = document.querySelectorAll(".paper-video video");
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    vids.forEach(function (v) { v.removeAttribute("autoplay"); v.pause(); v.controls = true; });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { var p = en.target.play(); if (p && p.catch) p.catch(function () {}); } else en.target.pause(); }); }, { threshold: 0.2 });
    vids.forEach(function (v) { io.observe(v); });
  }
})();
