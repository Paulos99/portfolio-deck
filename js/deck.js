/* Движок презентации: сборка слайдов из DECK, масштаб сцены, навигация и общий переход. */
(() => {
  'use strict';
  const D = window.DECK;
  const stage = document.getElementById('stage');
  const counter = document.getElementById('counter');
  const progress = document.getElementById('progress');
  const live = document.getElementById('live');
  const btnPrev = document.getElementById('prev');
  const btnNext = document.getElementById('next');
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const EASE_MOVE = 'cubic-bezier(0.33,0,0.15,1)';
  const EASE_OUT = 'cubic-bezier(0.16,1,0.3,1)';
  const T = { exit: 340, exitStep: 45, wipe: 640, band: 40, bgLag: 110, enterAt: 230, enterStep: 55, enter: 500, push: 16000 };

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const pad = n => String(n).padStart(2, '0');

  function themeVars(t) {
    const map = { bgA: '--bgA', bgB: '--bgB', bgC: '--bgC', ink: '--ink', muted: '--muted', accent: '--accent', band: '--band',
      chrome: '--chrome', chromeBg: '--chromeBg', screenBg: '--screenBg', fontTitle: '--fontTitle', fontText: '--fontText',
      titleWeight: '--titleWeight', titleTracking: '--titleTracking', tape1: '--tape1', tapeInk1: '--tapeInk1', tape2: '--tape2', tapeInk2: '--tapeInk2' };
    let css = '';
    for (const k in map) if (t[k] != null) css += `${map[k]}:${t[k]};`;
    if (t.titleSize) css += `--titleSize:${t.titleSize}px;`;
    return css;
  }
  const laptop = m => `<div class="laptop"><div class="lid"><div class="screen">
      <video muted loop playsinline preload="metadata" poster="${m.poster}" aria-label="${esc(m.label || '')}" src="${m.video}"></video>
    </div></div><div class="base"></div></div>`;
  const phone = m => `<div class="phone"><div class="screen">
      <video muted loop playsinline preload="metadata" poster="${m.poster}" aria-label="${esc(m.label || '')}" src="${m.video}"></video>
    </div></div>`;
  const wall = cols => `<div class="wall" aria-hidden="true">${cols.map(c => {
      const tiles = c.map(g => `<div class="tile"><img src="assets/glimpse/${g}.jpg" alt="" decoding="async"></div>`).join('');
      return `<div class="col"><div class="track">${tiles}${tiles}</div></div>`; }).join('')}</div><div class="veil"></div>`;

  const builders = {
    cover(s) {
      return { bg: wall(s.columns), body: `
        <h1 class="name"><span class="el" style="--i:0">${esc(s.name[0])}</span><span class="el" style="--i:1">${esc(s.name[1])}</span></h1>
        <p class="sub el" style="--i:2">${esc(s.sub)}</p>
        <div class="foot el" style="--i:3"><a href="${s.link.href}" target="_blank" rel="noopener">${esc(s.link.text)}</a><span>${esc(s.hint)}</span></div>` };
    },
    case(s) {
      const d = s.device || {};
      const logo = `<img src="${s.logo.src}" alt="${esc(s.logo.alt)}" style="height:${s.logo.height}px">${s.logo.text ? `<span>${esc(s.logo.text)}</span>` : ''}`;
      const tape = s.decor === 'tape' ? (() => {
        const words = s.tape.map(w => `<b>${esc(w)}</b><i></i>`).join('');
        return `${s.tapeRows === 1 ? '' : `<div class="tape t2" aria-hidden="true"><div class="run">${words.repeat(6)}</div></div>`}<div class="tape t1" aria-hidden="true"><div class="run">${words.repeat(6)}</div></div>`; })() : '';
      return { bg: `<div class="glow"></div>${tape}`, body: `
        <div class="copy">
          <div class="brand el" style="--i:0">${logo}</div>
          <h2 class="title el" style="--i:1">${s.title.map(t => `<span>${esc(t)}</span>`).join('')}</h2>
          <p class="caption el" style="--i:2">${esc(s.caption)}</p>
          ${s.facts && s.facts.length ? `<ul class="facts el" style="--i:3">${s.facts.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
          <a class="url el" style="--i:4" href="https://${s.url}" target="_blank" rel="noopener">${esc(s.url)}</a>
        </div>
        <div class="device el ${d.phone ? 'has-phone' : ''}" style="--i:2"><div class="cam"><div class="tilt">
          ${d.laptop ? laptop(d.laptop) : ''}${d.phone ? phone(d.phone) : ''}
        </div></div></div>` };
    },
    contacts(s) {
      const rows = s.rows.map(r => `<li><span class="k">${esc(r.label)}</span>${r.href
        ? `<a class="v" href="${r.href}" target="_blank" rel="noopener">${esc(r.value)}</a>`
        : `<span class="v${r.placeholder ? ' ph' : ''}">${esc(r.value)}</span>`}</li>`).join('');
      return { bg: wall(s.columns), body: `
        <h2 class="title el" style="--i:0">${esc(s.title)}</h2>
        <p class="who el" style="--i:1">${esc(s.name)}</p>
        <ul class="rows el" style="--i:2">${rows}</ul>` };
    }
  };

  const S = D.slides.map((s, idx) => {
    const sec = el('section', `slide ${s.type}`);
    sec.id = 's-' + s.id;
    sec.setAttribute('aria-roledescription', 'слайд');
    sec.setAttribute('aria-label', `${idx + 1} из ${D.slides.length}`);
    sec.setAttribute('aria-hidden', 'true');
    sec.style.cssText = themeVars(s.theme);
    if (s.theme.frame) sec.dataset.frame = s.theme.frame;
    if (s.decor) sec.dataset.decor = s.decor;
    const b = builders[s.type](s);
    sec.innerHTML = `<div class="band"></div><div class="bg">${b.bg}</div>${b.body}`;
    stage.appendChild(sec);
    return { data: s, node: sec, band: sec.querySelector('.band'), bg: sec.querySelector('.bg'),
      els: [...sec.querySelectorAll('.el')], videos: [...sec.querySelectorAll('video')], cam: sec.querySelector('.cam'), push: null };
  });
  const N = S.length;

  /* ----- масштаб сцены ----- */
  function fit() {
    const s = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.setProperty('--s', s);
  }
  addEventListener('resize', fit); fit();

  /* ----- видео ----- */
  function play(sl) { sl.videos.forEach(v => { const p = v.play(); if (p) p.catch(() => {}); }); }
  function pause(sl) { sl.videos.forEach(v => v.pause()); }
  document.addEventListener('visibilitychange', () => { if (cur >= 0) (document.hidden ? pause : play)(S[cur]); });

  /* ----- переход ----- */
  let cur = -1, job = null;
  const idx = n => +n.style.getPropertyValue('--i') || 0;
  const wipe = (dir, x) => dir > 0
    ? `polygon(${x}% 0%, 160% 0%, 160% 100%, ${x - 28}% 100%)`
    : `polygon(-60% 0%, ${x}% 0%, ${x + 28}% 100%, -60% 100%)`;

  function startPush(sl) {
    if (!sl.cam || RM.matches) return;
    sl.push = sl.cam.animate([{ transform: 'scale(1) translate3d(0,0,0)' }, { transform: 'scale(1.07) translate3d(-18px,-10px,0)' }],
      { duration: T.push, easing: EASE_MOVE, fill: 'forwards' });
  }
  function stopPush(sl) { if (sl.push) { sl.push.cancel(); sl.push = null; } }

  function finishJob() { if (!job) return; const j = job; job = null; j.anims.forEach(a => { try { a.finish(); } catch (e) {} }); j.done(); }

  function go(to, opts = {}) {
    to = Math.max(0, Math.min(N - 1, to));
    if (to === cur && !opts.force) return;
    finishJob();
    const from = cur >= 0 ? S[cur] : null, next = S[to];
    const dir = opts.dir || (to > cur ? 1 : -1);
    const anims = [];
    next.node.classList.add('is-entering');
    next.node.setAttribute('aria-hidden', 'false');
    if (from) { from.node.classList.remove('is-active'); from.node.classList.add('is-leaving'); from.node.setAttribute('aria-hidden', 'true'); }
    play(next); startPush(next);
    document.body.style.setProperty('--letterbox', next.data.theme.bgC);
    document.documentElement.style.setProperty('--chrome', next.data.theme.chrome);
    const ch = document.getElementById('chrome');
    ch.style.setProperty('--chrome', next.data.theme.chrome); ch.style.setProperty('--chromeBg', next.data.theme.chromeBg);
    progress.style.setProperty('--chrome', next.data.theme.chrome);

    if (RM.matches || opts.instant) {
      if (!opts.instant) anims.push(next.node.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: 'linear', fill: 'backwards' }));
    } else {
      if (from) from.els.forEach(n => anims.push(n.animate(
        [{ transform: 'translate3d(0,0,0)', opacity: 1 }, { transform: `translate3d(${-dir * 90}px,0,0)`, opacity: 0 }],
        { duration: T.exit, delay: idx(n) * T.exitStep, easing: EASE_MOVE, fill: 'forwards' })));
      const kf = dir > 0 ? [wipe(1, 128), wipe(1, 0)] : [wipe(-1, -28), wipe(-1, 100)];
      anims.push(next.band.animate([{ clipPath: kf[0] }, { clipPath: kf[1] }], { duration: T.wipe, delay: T.band, easing: EASE_MOVE, fill: 'both' }));
      anims.push(next.bg.animate([{ clipPath: kf[0] }, { clipPath: kf[1] }], { duration: T.wipe, delay: T.bgLag, easing: EASE_MOVE, fill: 'both' }));
      next.els.forEach(n => anims.push(n.animate(
        [{ transform: `translate3d(${dir * 110}px,0,0)`, opacity: 0 }, { transform: 'translate3d(0,0,0)', opacity: 1 }],
        { duration: T.enter, delay: T.enterAt + idx(n) * T.enterStep, easing: EASE_OUT, fill: 'backwards' })));
    }
    cur = to;
    const done = () => {
      if (from) { from.node.classList.remove('is-leaving'); pause(from); stopPush(from); }
      next.node.classList.remove('is-entering'); next.node.classList.add('is-active');
      anims.forEach(a => a.cancel());
    };
    const j = { anims, done };
    job = j;
    Promise.all(anims.map(a => a.finished)).then(() => { if (job === j) { job = null; done(); } }, () => {});
    if (!anims.length) finishJob();

    counter.innerHTML = `<b>${pad(to + 1)}</b> / ${pad(N)}`;
    progress.style.width = `${((to + 1) / N) * 100}%`;
    btnPrev.disabled = to === 0; btnNext.disabled = to === N - 1;
    live.textContent = `Слайд ${to + 1} из ${N}`;
    if (!opts.fromHash) history.replaceState(null, '', '#' + (to + 1));
  }
  const next = () => go(cur + 1), prev = () => go(cur - 1);

  /* ----- управление ----- */
  addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const k = e.key;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter'].includes(k)) { if (k === 'Enter' && e.target.closest('a,button')) return; e.preventDefault(); next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') { e.preventDefault(); go(0); }
    else if (k === 'End') { e.preventDefault(); go(N - 1); }
  });
  btnPrev.addEventListener('click', e => { e.stopPropagation(); prev(); });
  btnNext.addEventListener('click', e => { e.stopPropagation(); next(); });

  let p0 = null;
  const vp = document.getElementById('viewport');
  vp.addEventListener('pointerdown', e => { p0 = { x: e.clientX, y: e.clientY, t: performance.now() }; });
  vp.addEventListener('pointerup', e => {
    if (!p0) return; const dx = e.clientX - p0.x, dy = e.clientY - p0.y; const start = p0; p0 = null;
    if (e.target.closest('a,button')) return;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) { dx < 0 ? next() : prev(); return; }
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && performance.now() - start.t < 600) { e.clientX < innerWidth * 0.3 ? prev() : next(); }
  });
  addEventListener('hashchange', () => { const n = parseInt(location.hash.slice(1), 10); if (n >= 1 && n <= N) go(n - 1, { fromHash: true }); });

  /* ----- старт ----- */
  const params = new URLSearchParams(location.search);
  const startAt = Math.max(0, Math.min(N - 1, (parseInt(location.hash.slice(1), 10) || 1) - 1));
  const ready = Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 2500))]);
  ready.then(() => {
    document.documentElement.classList.remove('booting');
    go(startAt, { force: true, dir: 1, instant: params.has('instant') });
    const auto = parseInt(params.get('auto'), 10);
    if (auto > 0) { setInterval(() => { if (cur < N - 1) next(); }, auto); }
  });
  window.__deck = { go, get cur() { return cur; }, N, S };
})();
