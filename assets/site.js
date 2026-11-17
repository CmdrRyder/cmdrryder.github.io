(()=>{'use strict';
const menu=document.querySelector('.menu-button'),mob=document.querySelector('.mobile-nav');if(menu&&mob){menu.addEventListener('click',()=>{let open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));mob.classList.toggle('is-open',open);menu.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');});}
// Featured research slideshow
const slider=document.querySelector('.hero-slider');if(slider){const slides=[...slider.querySelectorAll('.hero-slide')],dots=[...slider.querySelectorAll('.slide-dot')];let index=0,timer=null,hover=false;const go=(n)=>{index=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('is-active',i===index));dots.forEach((d,i)=>{d.classList.toggle('is-active',i===index);d.setAttribute('aria-current',i===index?'true':'false');});};const stop=()=>{if(timer){clearInterval(timer);timer=null}};const start=()=>{stop();if(!hover&&!document.hidden)timer=setInterval(()=>go(index+1),15000)};slider.querySelector('.hero-prev')?.addEventListener('click',()=>{go(index-1);start()});slider.querySelector('.hero-next')?.addEventListener('click',()=>{go(index+1);start()});dots.forEach(d=>d.addEventListener('click',()=>{go(Number(d.dataset.goto));start()}));slider.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;stop()}});slider.addEventListener('pointerleave',()=>{hover=false;start()});slider.addEventListener('focusin',e=>{if(e.target.matches(':focus-visible'))stop()});slider.addEventListener('focusout',start);document.addEventListener('visibilitychange',()=>document.hidden?stop():start());slides[0].classList.remove('is-active');void slides[0].offsetWidth;requestAnimationFrame(()=>go(0));start();}
// Horizontal card controls
const strip=document.querySelector('.research-strip');if(strip&&strip.children.length){const orig=[...strip.children],n=orig.length;orig.forEach(c=>{const k=c.cloneNode(true);k.setAttribute('aria-hidden','true');k.setAttribute('tabindex','-1');k.setAttribute('inert','');k.classList.add('is-clone');k.querySelectorAll('img').forEach(i=>i.loading='eager');strip.appendChild(k)});strip.style.scrollSnapType='none';strip.style.scrollBehavior='auto';const loopW=()=>strip.children[n].offsetLeft-strip.children[0].offsetLeft;const cardW=()=>strip.children[1].offsetLeft-strip.children[0].offsetLeft;const SPEED=26;let pos=0,last=null,hover=false,user=false,seen=true,tw=null,resume=null;const wrap=()=>{const w=loopW();if(w<=0)return;let s=0;while(pos>=w){pos-=w;s-=w}while(pos<0){pos+=w;s+=w}if(tw&&s){tw.a+=s;tw.b+=s}};const frame=(t)=>{if(last===null)last=t;const dt=Math.min(t-last,80)/1000;last=t;if(!user){if(tw){const k=Math.min((t-tw.t0)/650,1),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;pos=tw.a+(tw.b-tw.a)*e;if(k>=1)tw=null}else if(!hover&&seen&&!document.hidden)pos+=SPEED*dt;wrap();strip.scrollLeft=pos}requestAnimationFrame(frame)};requestAnimationFrame(frame);const nudge=(d)=>{pos=strip.scrollLeft;if(d<0&&pos-cardW()<0)pos+=loopW();tw={a:pos,b:pos+d*cardW(),t0:performance.now()}};document.querySelector('.scroll-left')?.addEventListener('click',()=>nudge(-1));document.querySelector('.scroll-right')?.addEventListener('click',()=>nudge(1));const shell=strip.closest('.carousel-shell')||strip;shell.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hover=true});shell.addEventListener('pointerleave',()=>{hover=false});strip.addEventListener('focusin',e=>{if(e.target.matches(':focus-visible'))hover=true});strip.addEventListener('focusout',()=>{hover=false});const grab=()=>{user=true;tw=null;clearTimeout(resume)};const release=(ms)=>{clearTimeout(resume);resume=setTimeout(()=>{pos=strip.scrollLeft;last=null;user=false},ms)};strip.addEventListener('touchstart',grab,{passive:true});strip.addEventListener('touchend',()=>release(2500),{passive:true});strip.addEventListener('wheel',()=>{grab();release(1500)},{passive:true});if('IntersectionObserver' in window)new IntersectionObserver(es=>{seen=es[0].isIntersecting}).observe(strip);}
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
