/* AIM Client Portal — behaviour. Generic across clients: everything
   client-specific comes from clip-data.js (AIM_CLIENT / AIM_CLIP_GROUPS /
   AIM_GRADES / AIM_STRATEGY), nothing is hardcoded here. */
(function () {
  const C = window.AIM_CLIENT, GROUPS = window.AIM_CLIP_GROUPS, GRADES = window.AIM_GRADES, S = window.AIM_STRATEGY;
  const $ = id => document.getElementById(id);
  const el = (t, c, h) => { const n = document.createElement(t); if (c) n.className = c; if (h != null) n.innerHTML = h; return n; };
  const allClips = () => GROUPS.flatMap(g => g.clips.map((c, i) => ({ clip: c, group: g, label: g.title + ' · ' + String(i + 1).padStart(2, '0') })));

  let toastT;
  function toast(m) { const t = $('toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 1900); }

  /* ---------- Gate ---------- */
  const SKEY = 'aim-portal-' + C.slug;
  function unlock() { $('gate').classList.add('hidden'); $('app').classList.add('on'); }
  try { if (sessionStorage.getItem(SKEY) === '1') unlock(); } catch (e) {}
  function tryGate() {
    if ($('pw').value.trim().toLowerCase() === C.password) {
      try { sessionStorage.setItem(SKEY, '1'); } catch (e) {}
      unlock(); return;
    }
    const box = document.querySelector('.gate-in');
    $('gerr').classList.add('show'); box.classList.remove('shk'); void box.offsetWidth; box.classList.add('shk');
  }
  $('go').addEventListener('click', tryGate);
  $('pw').addEventListener('keydown', e => { if (e.key === 'Enter') tryGate(); });
  $('logout').addEventListener('click', () => { try { sessionStorage.removeItem(SKEY); } catch (e) {} location.reload(); });

  /* ---------- Theme ---------- */
  $('theme').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('aim-theme', next); } catch (e) {}
  });

  /* ---------- Nav ---------- */
  document.querySelectorAll('nav.tabs button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('nav.tabs button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    $('v-' + b.dataset.v).classList.add('active');
    window.scrollTo(0, 0);
  }));
  const goto = v => document.querySelector(`nav.tabs button[data-v="${v}"]`).click();

  /* ---------- Dashboard ---------- */
  const heroImg = GROUPS[0].clips[0].frames[0];
  $('greet').textContent = C.name + '.';
  $('who-nm').textContent = C.name;
  // Avatar: click the name row to pick any still from the vault as the portrait.
  let avatar = null;
  try { avatar = localStorage.getItem('aim-avatar-' + C.slug); } catch (e) {}
  $('who-av').src = avatar || heroImg;
  $('who').addEventListener('click', () => openPicker(c => {
    avatar = c.clip.frames[0];
    $('who-av').src = avatar;
    try { localStorage.setItem('aim-avatar-' + C.slug, avatar); } catch (e) {}
    toast('Photo updated');
  }));
  $('phase').textContent = C.phase;
  (function phases() {
    const list = C.phases || [{ name: C.phase, note: '' }];
    const at = Math.max(0, list.findIndex(p => p.name === C.phase));
    // Explicit per-phase status wins; index order is only a fallback for
    // clients whose phases haven't been marked up yet.
    const st = (p, i) => p.status || (i < at ? 'done' : i === at ? 'now' : 'open');
    const LBL = { done: ' · done', now: ' · now', open: '' };
    $('phase-dots').innerHTML = list.map((p, i) => `<i class="${st(p, i) === 'open' ? '' : st(p, i)}"></i>`).join('');
    $('phase-list').innerHTML = list.map((p, i) => {
      const s = st(p, i);
      return `<div class="ph-r ${s}">
        <span class="n">${String(i + 1).padStart(2, '0')}</span>
        <span class="b"><b>${p.name}${LBL[s] || ''}</b><span>${p.note}</span></span>
      </div>`;
    }).join('');
    $('phase-card').addEventListener('click', () => $('phase-card').classList.toggle('open'));
  })();
  // Quote is AIM's own language, taken from the practice's site copy, not the client's.
  $('sq').innerHTML = `<p class="q"><span class="mark">&ldquo;</span>You've started solving before you've fully understood what needed solving.</p><img class="sg" src="assets/logos/aim-monogram-ivory.png" alt="An Ideas Merchant">`;
  $('qc').innerHTML = `<img src="${heroImg}" alt=""><p><span class="mk">&ldquo;</span>The goal is not just to document the process, but to create something that moves people.</p>`;
  $('s-clips').textContent = $('q-s1').textContent = allClips().length;

  (function countdown() {
    const t = new Date(C.countdown.dateISO + 'T00:00:00'), n = new Date(); n.setHours(0, 0, 0, 0);
    const d = Math.round((t - n) / 864e5);
    $('cd-n').textContent = d >= 0 ? d : 0;
    $('cd-m').innerHTML = `to ${C.countdown.label}<br>${C.countdown.date}`;
  })();

  const W = S.window;
  const fmt = iso => new Date(iso + 'T00:00:00').toLocaleDateString('en-NZ', { day: 'numeric', month: 'short' });
  $('win-range').textContent = fmt(W.start) + ' to ' + fmt(W.end) + '.';
  $('win-note').textContent = W.note;

  // events store: { 'YYYY-MM-DD': {title, cat, time, loc, notes} }
  let events = {};
  try { events = JSON.parse(localStorage.getItem('aim-events-' + C.slug) || '{}'); } catch (e) {}
  const saveEvents = () => { try { localStorage.setItem('aim-events-' + C.slug, JSON.stringify(events)); } catch (e) {} };

  function renderCal() {
    const start = new Date(W.start + 'T00:00:00'), end = new Date(W.end + 'T00:00:00');
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const shoots = new Set(W.shootDates);
    const n = Math.round((end - start) / 864e5) + 1;
    const g = $('cal'); g.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const d = new Date(start.getTime() + i * 864e5), iso = d.toISOString().slice(0, 10);
      const c = el('div', 'c');
      if (iso === W.competitionDate) c.classList.add('comp');
      else if (shoots.has(iso)) c.classList.add('shoot');
      if (d.getTime() === today.getTime()) c.classList.add('today');
      if (events[iso]) c.classList.add('ev');
      c.title = d.toLocaleDateString('en-NZ', { weekday: 'short', day: 'numeric', month: 'short' }) + (events[iso] ? ' · ' + events[iso].title : '');
      c.addEventListener('click', () => openEvent(iso));
      g.appendChild(c);
    }
  }
  renderCal();

  /* ---------- What's coming up ---------- */
  const localEvents = [
    { date: '05 SEP', label: 'Regional posing clinic', idea: 'Community event in your space — showing up is content, and it builds trust before the stage.' },
    { date: '14 SEP', label: 'Fitness expo weekend', idea: 'Strong b-roll opportunity and a natural place to meet people in the industry.' },
    { date: '21 SEP', label: 'Athlete meet-up', idea: 'Being part of the community reads as credibility, not self-promotion.' }
  ];
  function renderCU(kind) {
    const list = kind === 'ev' ? localEvents : C.milestones;
    $('cu-body').innerHTML = list.map((m, i) => `
      <div class="ms">
        <span class="dt"></span>
        <div class="dy"><b>${m.date.split(' ')[0]}</b><span>${m.date.split(' ')[1] || ''}</span></div>
        <div class="bd"><h4>${m.label}</h4><p>${m.idea}</p></div>
        ${m.img ? `<img class="th" src="${m.img}" alt="">` : ''}
      </div>`).join('');
  }
  renderCU('ms');
  document.querySelectorAll('.cu-tabs button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.cu-tabs button').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); renderCU(b.dataset.cu);
  }));
  $('q-ms').innerHTML = C.milestones.map(m => `
    <div class="ms">
      <span class="dt"></span>
      <div class="dy"><b>${m.date.split(' ')[0]}</b><span>${m.date.split(' ')[1] || ''}</span></div>
      <div class="bd"><h4>${m.label}</h4><p>${m.idea}</p></div>
      ${m.img ? `<img class="th" src="${m.img}" alt="">` : ''}
    </div>`).join('');
  $('sync-cal').addEventListener('click', e => { e.preventDefault(); toast('Calendar sync needs a server connection — coming when the portal goes live.'); });
  $('full-plan').addEventListener('click', () => goto('queue'));
  $('q-cal').addEventListener('click', e => { e.preventDefault(); goto('dash'); });
  $('new-shoot').addEventListener('click', () => openEvent(new Date().toISOString().slice(0, 10), 'Shoot Day'));
  $('v-new').addEventListener('click', () => { goto('dash'); openEvent(new Date().toISOString().slice(0, 10), 'Shoot Day'); });
  $('q-add').addEventListener('click', () => openEvent(new Date().toISOString().slice(0, 10)));
  $('q-filter').addEventListener('click', () => toast('Filtering lands with the live data connection.'));

  /* ---------- Event modal ---------- */
  let evDate = null;
  function openEvent(iso, cat) {
    evDate = iso;
    const ex = events[iso] || {};
    $('ev-title-h').textContent = ex.title ? 'Manage Day' : 'Add Event';
    $('ev-t').value = ex.title || ''; $('ev-d').value = iso; $('ev-tm').value = ex.time || '';
    $('ev-c').value = ex.cat || cat || 'Shoot Day'; $('ev-l').value = ex.loc || ''; $('ev-n').value = ex.notes || '';
    $('ev-ai-out').innerHTML = '';
    $('ev-modal').classList.remove('hidden');
  }
  const closeEvent = () => $('ev-modal').classList.add('hidden');
  $('ev-x').addEventListener('click', closeEvent);
  $('ev-cancel').addEventListener('click', closeEvent);
  $('ev-modal').addEventListener('click', e => { if (e.target === $('ev-modal')) closeEvent(); });
  $('ev-save').addEventListener('click', () => {
    const iso = $('ev-d').value || evDate;
    if (!$('ev-t').value.trim()) { toast('Give the event a title first.'); return; }
    events[iso] = { title: $('ev-t').value.trim(), time: $('ev-tm').value, cat: $('ev-c').value, loc: $('ev-l').value, notes: $('ev-n').value };
    saveEvents(); renderCal(); closeEvent(); toast('Event saved');
  });
  $('ev-ai').addEventListener('click', async () => {
    const title = $('ev-t').value.trim();
    if (!title) { toast('Add a title first.'); return; }
    const b = $('ev-ai'); b.disabled = true; b.textContent = 'Thinking…';
    try {
      const sys = `You are the AI Creative Director for ${C.name}. You translate everyday moments in the ${C.niche_keywords.join(', ')} space into high-end 9:16 vertical video shot suggestions. Reply ONLY with a JSON array of exactly 3 short strings, each one concrete shot idea.`;
      const txt = await window.claude.complete({ system: sys, messages: [{ role: 'user', content: `Event: ${title}${$('ev-l').value ? ' at ' + $('ev-l').value : ''}. Location context: ${C.location}.` }] });
      const arr = JSON.parse(txt.slice(txt.indexOf('['), txt.lastIndexOf(']') + 1));
      $('ev-ai-out').innerHTML = '<ul style="margin:0;padding-left:16px">' + arr.map(a => `<li>${a}</li>`).join('') + '</ul>';
    } catch (e) { $('ev-ai-out').textContent = "Couldn't generate right now, try again in a moment."; }
    b.disabled = false; b.textContent = 'Generate ideas';
  });

  /* ---------- Idea generator ---------- */
  $('idea-th').innerHTML = allClips().slice(0, 4).map(c => `<img src="${c.clip.frames[0]}" alt="">`).join('');
  let ideas = [], ideaI = 0;
  function showIdea() {
    if (!ideas.length) return;
    const i = ideas[ideaI];
    $('i-card').innerHTML = `<span class="tg">${i.pillar}</span><p class="an">${i.angle}</p><p class="hk">"${i.hook}"</p>`;
    $('i-count').textContent = (ideaI + 1) + ' / ' + ideas.length;
    $('i-out').classList.add('on');
  }
  $('i-prev').addEventListener('click', () => { ideaI = (ideaI - 1 + ideas.length) % ideas.length; showIdea(); });
  $('i-next').addEventListener('click', () => { ideaI = (ideaI + 1) % ideas.length; showIdea(); });
  $('gen-ideas').addEventListener('click', async () => {
    const b = $('gen-ideas'); b.disabled = true; b.textContent = 'Thinking…'; $('i-err').style.display = 'none';
    try {
      const sys = `You are the AI Creative Director for ${C.name}, working in the ${C.niche_keywords.join(', ')} space. You will be given their Core Tension Statement, their own words, and their content pillars from a completed strategy framework. Generate content angles specific to their real situation, never generic advice. Respond with ONLY a JSON array of exactly 5 objects: {"pillar": string (one of their pillar names verbatim), "angle": string (one concrete idea, one sentence), "hook": string (a short caption hook)}.`;
      const usr = `Client: ${C.name}, based in ${C.location}, working towards ${C.countdown.label} on ${C.countdown.date}.\nCore Tension Statement: "${C.origin.coreTension}"\nTheir own words: "${C.origin.quote}"\nContent pillars:\n${S.pillars.map(p => '- ' + p.name + ': ' + p.body).join('\n')}`;
      const txt = await window.claude.complete({ system: sys, messages: [{ role: 'user', content: usr }] });
      ideas = JSON.parse(txt.slice(txt.indexOf('['), txt.lastIndexOf(']') + 1));
      ideaI = 0; showIdea();
      $('s-ideas').textContent = $('q-s3').textContent = ideas.length;
    } catch (e) { $('i-err').textContent = "Couldn't generate ideas right now, try again in a moment."; $('i-err').style.display = 'block'; }
    b.disabled = false; b.innerHTML = 'Generate ideas <svg class="icn" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>';
  });

  /* ---------- Strategy: the "why" ---------- */
  $('why-status').textContent = C.targetPractice[0].note;
  $('why-prop').textContent = '"' + C.origin.proposition + '"';
  $('why-tension').textContent = C.origin.coreTension;
  $('why-quote').textContent = '"' + C.origin.quote + '"';

  document.querySelectorAll('.sec .sec-h').forEach(h => h.addEventListener('click', () => h.parentElement.classList.toggle('open')));

  $('act-body').innerHTML = `
    <div class="act-c"><h4>Now</h4><ul>${S.actions.now.map(a => `<li>${a}</li>`).join('')}</ul></div>
    <div class="act-c"><h4>Next meeting · ${S.actions.nextTopic}</h4><p>${S.actions.nextOutcome}</p></div>
    <div class="act-c"><h4>Before ${C.countdown.label}</h4><p>${S.actions.beforeIfbb}</p></div>`;

  function tpBody(s) {
    let o = `<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:20px;margin-bottom:20px"><div><p class="rl">Stage ${s.num} · ${s.role}</p><h4>${s.name}</h4><span class="sl2">${s.statusLabel}</span></div><span class="tp-fig${s.status === 'locked' ? ' lk' : ''}" style="-webkit-mask-image:url('${s.figure}');mask-image:url('${s.figure}')"></span></div>`;
    if (s.whatWeKnow) o += `<div class="tp-f"><p class="k">What we know</p><p class="v">${s.whatWeKnow}</p></div>`;
    if (s.decisions) o += `<div class="tp-f"><p class="k">Decisions</p><p class="v">${s.decisions}</p></div>`;
    if (s.why) o += `<div class="tp-f"><p class="k">Why this matters</p><p class="v">${s.why}</p></div>`;
    o += `<div class="tp-o"><span style="color:var(--gold)">→</span><span><span class="k">Output</span><span class="v${s.status === 'locked' ? ' lk' : ''}">${s.status === 'locked' ? 'Not unlocked yet' : s.output}</span></span></div>`;
    return o;
  }
  const rail = $('tp-rail');
  S.targetPractice.forEach((s, i) => {
    const b = el('button', '', `<span><span class="nm">${s.name}</span><span class="st">${s.status === 'done' ? 'Complete' : s.status === 'current' ? 'In progress' : 'Locked'}</span></span><span class="n">${s.num}</span>`);
    b.setAttribute('aria-current', i === 0 ? 'true' : 'false');
    b.addEventListener('click', () => {
      rail.querySelectorAll('button').forEach(x => x.setAttribute('aria-current', 'false'));
      b.setAttribute('aria-current', 'true');
      $('tp-panel').innerHTML = tpBody(s);
    });
    rail.appendChild(b);
  });
  $('tp-panel').innerHTML = tpBody(S.targetPractice[0]);

  $('pil-grid').innerHTML = S.pillars.map(p => `<div class="pil-c"><h4>${p.name}</h4><p>${p.body}</p></div>`).join('');

  /* ---------- Media Vault ---------- */
  $('vault-hero').innerHTML = GROUPS.map((g, i) => `
    <div class="vh-card" data-g="${i}">
      <img src="${g.clips[0].frames[0]}" alt="">
      ${g.date ? `<span class="tag">${g.date}</span>` : ''}
      <div class="cap">
        <h3>${g.title}</h3>
        <span class="l">${g.location || 'Behind the scenes'}</span>
        <span class="d">${g.date || ''}${g.date ? ' · ' : ''}${g.clips.length} ${g.clips[0].dur === 'Photo' ? 'photos' : 'clips'}</span>
      </div>
    </div>`).join('');
  document.querySelectorAll('.vh-card').forEach(c => c.addEventListener('click', () => openShoot(+c.dataset.g)));

  let shownCount = 10, openGroup = 0;
  function buildClipCard(entry, list, idx) {
    const { clip, label } = entry;
    const card = el('div', 'cc');
    const fr = el('div', 'fr');
    fr.innerHTML = clip.frames.map((f, i) => `<img src="${f}" class="${i === 0 ? 'on' : ''}" alt="">`).join('')
      + `<span class="dur">${clip.dur}</span>`
      + `<div class="btns"><button class="b-dl" title="Download"><svg viewBox="0 0 24 24"><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></svg></button><button class="b-reel" title="Add to editor"><svg viewBox="0 0 24 24"><polygon points="5 4 19 12 5 20"/></svg></button></div>`;
    const imgs = [...fr.querySelectorAll('img')];
    if (clip.frames.length > 1) {
      fr.addEventListener('mousemove', e => {
        const r = fr.getBoundingClientRect();
        const p = Math.min(.999, Math.max(0, (e.clientX - r.left) / r.width));
        const n = Math.floor(p * imgs.length);
        imgs.forEach((im, i) => im.classList.toggle('on', i === n));
      });
      fr.addEventListener('mouseleave', () => imgs.forEach((im, i) => im.classList.toggle('on', i === 0)));
    }
    fr.addEventListener('click', e => { if (!e.target.closest('button')) openLB(list, idx); });
    card.appendChild(fr);

    let gi = 0;
    const mt = el('div', 'mt', `<span class="id">${label.split('·')[1] ? 'C' + label.split('·')[1].trim().padStart(3, '0') : label}</span><button class="lut">Apply LUT</button>`);
    const lut = mt.querySelector('.lut');
    lut.addEventListener('click', e => {
      e.stopPropagation();
      gi = (gi + 1) % GRADES.length;
      imgs.forEach(im => im.style.filter = GRADES[gi].filter);
      lut.textContent = gi === 0 ? 'Apply LUT' : GRADES[gi].label;
      lut.classList.toggle('on', gi !== 0);
    });
    card.appendChild(mt);

    card.draggable = true;
    card.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', JSON.stringify({ frames: clip.frames, dur: clip.dur, _label: label })));
    fr.querySelector('.b-dl').addEventListener('click', e => { e.stopPropagation(); dl(clip.frames[0]); });
    fr.querySelector('.b-reel').addEventListener('click', e => { e.stopPropagation(); addToSeq(clip, label); });
    return card;
  }
  function dl(src) { const a = document.createElement('a'); a.href = src; a.download = src.split('/').pop(); document.body.appendChild(a); a.click(); a.remove(); }

  function openShoot(gi) {
    openGroup = gi; shownCount = 10;
    const g = GROUPS[gi];
    $('sd-title').textContent = g.title;
    $('sd-date').textContent = g.date || '';
    $('shoot-open').style.display = 'block';
    renderShoot();
    $('shoot-open').scrollIntoView ? window.scrollTo({ top: $('shoot-open').offsetTop - 20, behavior: 'smooth' }) : null;
  }
  function renderShoot() {
    const g = GROUPS[openGroup];
    const list = g.clips.map((c, i) => ({ clip: c, group: g, label: g.title + ' · ' + String(i + 1).padStart(2, '0') }));
    const grid = $('sd-grid'); grid.innerHTML = '';
    list.slice(0, shownCount).forEach((e, i) => grid.appendChild(buildClipCard(e, list, i)));
    $('sd-more').style.display = shownCount >= list.length ? 'none' : '';
  }
  $('sd-more').addEventListener('click', () => { shownCount += 10; renderShoot(); });
  $('sd-back').addEventListener('click', () => { $('shoot-open').style.display = 'none'; window.scrollTo({ top: 0, behavior: 'smooth' }); });
  $('v-all').addEventListener('click', () => openShoot(0));

  /* ---------- Lightbox ---------- */
  let lbList = [], lbI = 0, lbG = 0;
  function renderLB() {
    const { clip, label } = lbList[lbI];
    $('lb-img').src = clip.frames[0];
    $('lb-img').style.filter = GRADES[lbG].filter;
    $('lb-cap').textContent = label + (clip.frames.length > 1 ? ' · move your cursor to scrub' : '');
    $('lb-lut').textContent = lbG === 0 ? 'Apply LUT' : GRADES[lbG].label;
    $('lb-lut').classList.toggle('on', lbG !== 0);
    $('lb-box').onmousemove = clip.frames.length > 1 ? (e => {
      const r = $('lb-box').getBoundingClientRect();
      const p = Math.min(.999, Math.max(0, (e.clientX - r.left) / r.width));
      $('lb-img').src = clip.frames[Math.floor(p * clip.frames.length)];
      $('lb-img').style.filter = GRADES[lbG].filter;
    }) : null;
    const many = lbList.length > 1;
    $('lb-prev').style.display = many ? 'flex' : 'none';
    $('lb-next').style.display = many ? 'flex' : 'none';
  }
  function openLB(list, i) { lbList = list; lbI = i; lbG = 0; renderLB(); $('lb').classList.remove('hidden'); }
  const closeLB = () => $('lb').classList.add('hidden');
  $('lb-x').addEventListener('click', closeLB);
  $('lb').addEventListener('click', e => { if (e.target === $('lb')) closeLB(); });
  $('lb-prev').addEventListener('click', () => { lbI = (lbI - 1 + lbList.length) % lbList.length; lbG = 0; renderLB(); });
  $('lb-next').addEventListener('click', () => { lbI = (lbI + 1) % lbList.length; lbG = 0; renderLB(); });
  $('lb-lut').addEventListener('click', () => { lbG = (lbG + 1) % GRADES.length; renderLB(); });
  $('lb-dl').addEventListener('click', () => dl(lbList[lbI].clip.frames[0]));
  $('lb-reel').addEventListener('click', () => { addToSeq(lbList[lbI].clip, lbList[lbI].label); closeLB(); });
  document.addEventListener('keydown', e => {
    if ($('lb').classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') $('lb-prev').click();
    if (e.key === 'ArrowRight') $('lb-next').click();
  });

  /* ---------- Editor ---------- */
  const cv = $('cv'), ctx = cv.getContext('2d');
  const imgCache = {};
  const getImg = src => { if (!imgCache[src]) { const i = new Image(); i.onload = () => draw(playT); i.src = src; imgCache[src] = i; } return imgCache[src]; };
  let mode = 'reel', seq = [], selI = -1, target = 30, gradeF = 'none', film5d = false, photoSrc = allClips()[0].clip.frames[0];

  const TONE = [['brightness', 'Brightness'], ['contrast', 'Contrast'], ['saturation', 'Saturation'], ['ambience', 'Ambience'], ['highlights', 'Highlights'], ['shadows', 'Shadows'], ['temperature', 'Temperature']];
  const DETAIL = [['structure', 'Structure'], ['sharpness', 'Sharpness'], ['dehaze', 'Dehaze']];
  let adj = {};
  [...TONE, ...DETAIL].forEach(([k]) => adj[k] = 0);

  function buildSliders(host, defs) {
    host.innerHTML = defs.map(([k, lbl]) => `
      <div class="sl"><div class="rw"><span>${lbl}</span><b id="v-${k}">0</b></div>
      <input type="range" id="r-${k}" min="-100" max="100" value="0"></div>`).join('');
    defs.forEach(([k]) => $('r-' + k).addEventListener('input', e => { adj[k] = +e.target.value; $('v-' + k).textContent = (adj[k] > 0 ? '+' : '') + adj[k]; draw(playT); }));
  }
  buildSliders($('a-tone'), TONE);
  buildSliders($('a-detail'), DETAIL);
  document.querySelectorAll('.adj-tabs button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.adj-tabs button').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    $('a-tone').style.display = b.dataset.a === 'tone' ? '' : 'none';
    $('a-detail').style.display = b.dataset.a === 'detail' ? '' : 'none';
  }));
  $('reset-adj').addEventListener('click', () => {
    Object.keys(adj).forEach(k => { adj[k] = 0; const r = $('r-' + k), v = $('v-' + k); if (r) r.value = 0; if (v) v.textContent = '0'; });
    film5d = false; $('film5d').classList.remove('on'); draw(playT); toast('Adjustments reset');
  });
  $('film5d').addEventListener('click', () => {
    film5d = !film5d; $('film5d').classList.toggle('on', film5d);
    draw(playT); toast(film5d ? '5D film emulation on' : '5D emulation off');
  });

  function filterStr() {
    const a = adj;
    let f = [];
    const b = 1 + a.brightness / 220 + a.ambience / 400 + (film5d ? .02 : 0);
    const c = 1 + a.contrast / 200 + a.structure / 260 + (film5d ? .06 : 0);
    const s = 1 + a.saturation / 180 + (film5d ? .05 : 0);
    if (b !== 1) f.push(`brightness(${b.toFixed(3)})`);
    if (c !== 1) f.push(`contrast(${c.toFixed(3)})`);
    if (s !== 1) f.push(`saturate(${s.toFixed(3)})`);
    const warm = a.temperature / 100 + (film5d ? .18 : 0);
    if (warm > 0) f.push(`sepia(${Math.min(.5, warm * .42).toFixed(3)})`);
    else if (warm < 0) f.push(`hue-rotate(${(warm * 12).toFixed(1)}deg)`);
    if (a.dehaze < 0 || film5d) f.push(`blur(${(Math.abs(Math.min(0, a.dehaze)) / 180 + (film5d ? .35 : 0)).toFixed(2)}px)`);
    if (gradeF !== 'none') f.push(gradeF);
    return f.length ? f.join(' ') : 'none';
  }
  function grainOverlay(w, h) {
    ctx.save(); ctx.globalAlpha = .05; ctx.globalCompositeOperation = 'overlay';
    for (let i = 0; i < 900; i++) {
      const g = Math.random() * 255 | 0;
      ctx.fillStyle = `rgb(${g},${g},${g})`;
      ctx.fillRect(Math.random() * w, Math.random() * h, 1.3, 1.3);
    }
    ctx.restore();
  }
  function coverDraw(img, w, h) {
    const sc = Math.max(w / img.naturalWidth, h / img.naturalHeight);
    const dw = img.naturalWidth * sc, dh = img.naturalHeight * sc;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }
  const seqTotal = () => seq.reduce((a, s) => a + s.dur, 0);

  function draw(t) {
    const w = cv.width, h = cv.height;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = '#0C0B0A'; ctx.fillRect(0, 0, w, h);
    let img = null, ttl = '', sub = '';
    if (mode === 'photo') { img = getImg(photoSrc); ttl = 'Still'; sub = 'Photo edit'; }
    else if (seq.length) {
      let acc = 0, it = null, into = 0;
      for (const s of seq) { if (t < acc + s.dur) { it = s; into = t - acc; break; } acc += s.dur; }
      if (!it) { it = seq[seq.length - 1]; into = it.dur - .01; }
      const fr = it.clip.frames;
      img = getImg(fr[Math.min(fr.length - 1, Math.floor((into / it.dur) * fr.length))]);
      ttl = it.label.split('·')[0].trim(); sub = it.label;
    }
    if (img && img.complete && img.naturalWidth) {
      ctx.filter = filterStr();
      coverDraw(img, w, h);
      ctx.filter = 'none';
      if (film5d) grainOverlay(w, h);
    } else {
      ctx.fillStyle = '#4A443B'; ctx.font = '500 13px Inter, sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(mode === 'reel' ? 'Add clips from the Media Vault to build your reel' : 'Pick a still to edit', w / 2, h / 2);
    }
    const cap = $('cap').value.trim();
    if (cap && mode === 'reel') {
      ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, h - 74, w, 74);
      ctx.fillStyle = '#F7F5F0'; ctx.font = '500 26px "Playfair Display", Georgia, serif'; ctx.textAlign = 'center';
      ctx.fillText(cap, w / 2, h - 30);
    }
    $('ov-t').textContent = ttl; $('ov-d').textContent = sub;
    $('ov-r').textContent = mode === 'reel' ? '9:16' : 'Still';
  }

  const fmtT = s => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  function renderSeq() {
    const st = $('strip'); st.innerHTML = '';
    seq.forEach((s, i) => {
      const d = el('div', 'sq-i' + (i === selI ? ' sel' : ''), `<img src="${s.clip.frames[0]}" alt=""><span class="d">0:0${s.dur}</span><button class="x">×</button>`);
      d.draggable = true;
      d.addEventListener('dragstart', e => { e.dataTransfer.setData('aim/seq', String(i)); e.dataTransfer.effectAllowed = 'move'; });
      d.addEventListener('dragover', e => e.preventDefault());
      d.addEventListener('drop', e => {
        e.preventDefault(); e.stopPropagation();
        const from = e.dataTransfer.getData('aim/seq');
        if (from === '') return;
        const [m] = seq.splice(+from, 1); seq.splice(i, 0, m); selI = i; renderSeq(); draw(0);
      });
      d.addEventListener('click', e => { if (e.target.classList.contains('x')) return; selI = i; renderSeq(); });
      d.querySelector('.x').addEventListener('click', e => { e.stopPropagation(); seq.splice(i, 1); if (selI >= seq.length) selI = seq.length - 1; renderSeq(); draw(0); });
      st.appendChild(d);
    });
    const add = el('button', 'sq-add', '+');
    add.title = 'Add from vault';
    add.addEventListener('click', () => openPicker(c => addToSeq(c.clip, c.label)));
    st.appendChild(add);
    const tot = seqTotal();
    $('seq-tot').textContent = tot + 's of ' + target + 's target';
    $('seq-tot').classList.toggle('over', tot > target);
    $('tm').textContent = '0:00 / ' + fmtT(tot);
    $('s-sched').textContent = $('q-s2').textContent = Object.keys(plan).length;
  }
  function addToSeq(clip, label) {
    seq.push({ clip, label: label || 'Vault clip', dur: 3 });
    renderSeq(); draw(0);
    toast('Added to Media Editor');
  }
  $('strip').addEventListener('dragover', e => { e.preventDefault(); $('strip').classList.add('dz'); });
  $('strip').addEventListener('dragleave', () => $('strip').classList.remove('dz'));
  $('strip').addEventListener('drop', e => {
    e.preventDefault(); $('strip').classList.remove('dz');
    const raw = e.dataTransfer.getData('text/plain');
    if (!raw) return;
    try { const c = JSON.parse(raw); addToSeq({ frames: c.frames, dur: c.dur }, c._label); } catch (err) {}
  });

  document.querySelectorAll('.ed-tabs button').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.ed-tabs button').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); mode = b.dataset.m;
    const reel = mode === 'reel';
    $('seq-wrap').style.display = reel ? '' : 'none';
    $('vo-wrap').style.display = reel ? '' : 'none';
    $('reel-opts').style.display = reel ? '' : 'none';
    $('cap-row').style.display = reel ? '' : 'none';
    $('ph-strip').style.display = reel ? 'none' : '';
    document.querySelector('.ed-canvas-box').classList.toggle('photo', !reel);
    if (reel) { cv.width = 405; cv.height = 720; } else { sizePhotoCanvas(); }
    draw(0);
  }));
  $('cap').addEventListener('input', () => draw(playT));

  // Photo mode exports at the still's own aspect, so nothing is cropped away.
  function sizePhotoCanvas() {
    const im = getImg(photoSrc);
    const apply = () => {
      const w = im.naturalWidth || 1080, h = im.naturalHeight || 1350;
      const sc = Math.min(1, 1080 / Math.max(w, h));
      cv.width = Math.round(w * sc); cv.height = Math.round(h * sc);
      draw(0);
    };
    if (im.complete && im.naturalWidth) apply(); else im.addEventListener('load', apply, { once: true });
  }

  // photo stills strip
  const stills = allClips();
  $('ph-thumbs').innerHTML = stills.map((c, i) => `<img src="${c.clip.frames[0]}" data-i="${i}" class="${i === 0 ? 'sel' : ''}" alt="">`).join('');
  $('ph-thumbs').addEventListener('click', e => {
    if (e.target.tagName !== 'IMG') return;
    $('ph-thumbs').querySelectorAll('img').forEach(x => x.classList.remove('sel'));
    e.target.classList.add('sel');
    photoSrc = stills[+e.target.dataset.i].clip.frames[0];
    sizePhotoCanvas();
  });

  // grade + length
  $('grade').innerHTML = GRADES.map((g, i) => `<button data-i="${i}" class="${i === 0 ? 'on' : ''}">${g.label.split(' ')[0]}</button>`).join('');
  $('grade').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $('grade').querySelectorAll('button').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); gradeF = GRADES[+b.dataset.i].filter; draw(playT);
  });
  $('len').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    $('len').querySelectorAll('button').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); target = +b.dataset.d; renderSeq();
  });

  // playback
  let playing = false, playT = 0, rafId = null, startTs = 0;
  function step(now) {
    if (!playing) return;
    const tot = seqTotal();
    playT = (now - startTs) / 1000;
    if (playT >= tot) { playing = false; playT = 0; $('play').innerHTML = '<svg class="icn" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 4 20 12 6 20"/></svg>'; draw(0); $('track-f').style.width = '0%'; $('tm').textContent = '0:00 / ' + fmtT(tot); return; }
    draw(playT);
    $('track-f').style.width = (playT / tot * 100) + '%';
    $('tm').textContent = fmtT(playT) + ' / ' + fmtT(tot);
    rafId = requestAnimationFrame(step);
  }
  function togglePlay() {
    if (mode !== 'reel' || !seq.length) { toast('Add clips to your sequence first.'); return; }
    playing = !playing;
    if (playing) { startTs = performance.now(); $('play').innerHTML = '<svg class="icn" viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'; rafId = requestAnimationFrame(step); }
    else { cancelAnimationFrame(rafId); $('play').innerHTML = '<svg class="icn" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6 4 20 12 6 20"/></svg>'; }
  }
  $('play').addEventListener('click', togglePlay);
  $('ed-preview').addEventListener('click', togglePlay);
  $('track').addEventListener('click', e => {
    const tot = seqTotal(); if (!tot) return;
    const r = $('track').getBoundingClientRect();
    playT = Math.max(0, Math.min(tot, (e.clientX - r.left) / r.width * tot));
    draw(playT); $('track-f').style.width = (playT / tot * 100) + '%'; $('tm').textContent = fmtT(playT) + ' / ' + fmtT(tot);
  });

  /* ---------- Voiceover ---------- */
  let voBuf = null, actx = null;
  const getCtx = () => actx || (actx = new (window.AudioContext || window.webkitAudioContext)());
  $('vo-up').addEventListener('click', () => $('vo-file').click());
  $('vo-file').addEventListener('change', async () => {
    const f = $('vo-file').files[0]; if (!f) return;
    try { voBuf = await getCtx().decodeAudioData(await f.arrayBuffer()); }
    catch (e) { toast("Couldn't read that audio file"); return; }
    drawWave(); $('vo-mix').style.display = 'grid'; $('vo-up').textContent = 'Replace';
    $('vo-tm').textContent = '0:00 / ' + fmtT(voBuf.duration);
    toast('Voiceover loaded');
  });
  function drawWave() {
    if (!voBuf) return;
    const c = $('vo-wave'), x = c.getContext('2d'), d = voBuf.getChannelData(0);
    const w = c.width, h = c.height;
    x.clearRect(0, 0, w, h);
    const st = Math.max(1, Math.floor(d.length / w));
    x.fillStyle = 'rgba(176,135,63,.8)';
    for (let i = 0; i < w; i++) {
      let mn = 1, mx = -1;
      for (let j = 0; j < st; j++) { const v = d[i * st + j] || 0; if (v < mn) mn = v; if (v > mx) mx = v; }
      x.fillRect(i, (1 + mn) * h / 2, 1, Math.max(1, (mx - mn) * h / 2));
    }
  }
  $('vo-v').addEventListener('input', e => $('vv').textContent = e.target.value + '%');
  $('vo-b').addEventListener('input', e => $('bv').textContent = e.target.value + '%');

  /* ---------- Export ---------- */
  $('ed-export').addEventListener('click', async () => {
    const msg = $('ed-msg'); msg.className = 'ed-msg'; msg.textContent = '';
    if (mode === 'photo') {
      const a = document.createElement('a');
      a.href = cv.toDataURL('image/jpeg', .92);
      a.download = 'still-' + C.slug + '-' + Date.now() + '.jpg';
      document.body.appendChild(a); a.click(); a.remove();
      msg.textContent = 'Still exported.'; return;
    }
    if (!seq.length) { msg.className = 'ed-msg err'; msg.textContent = 'Add at least one clip first.'; return; }
    const tot = seqTotal();
    const mime = ['video/mp4;codecs=avc1', 'video/webm;codecs=vp9', 'video/webm'].find(m => window.MediaRecorder && MediaRecorder.isTypeSupported(m));
    if (!mime) { msg.className = 'ed-msg err'; msg.textContent = "This browser can't export video. Try Chrome or Edge."; return; }
    const stream = cv.captureStream(30);
    const tracks = [...stream.getVideoTracks()];
    let src = null;
    if (voBuf) {
      const c = getCtx(), dest = c.createMediaStreamDestination();
      src = c.createBufferSource(); src.buffer = voBuf;
      const g = c.createGain(); g.gain.value = (+$('vo-v').value) / 100;
      src.connect(g).connect(dest);
      tracks.push(...dest.stream.getAudioTracks());
      src.start(0, 0, Math.min(voBuf.duration, tot));
    }
    const chunks = [], rec = new MediaRecorder(new MediaStream(tracks), { mimeType: mime });
    rec.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
    const btn = $('ed-export'); btn.disabled = true; const oldHTML = btn.innerHTML; btn.textContent = 'Exporting…';
    rec.onstop = () => {
      if (src) { try { src.stop(); } catch (e) {} }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob(chunks, { type: mime }));
      a.download = 'reel-' + C.slug + '-' + Date.now() + (mime.includes('mp4') ? '.mp4' : '.webm');
      document.body.appendChild(a); a.click(); a.remove();
      btn.disabled = false; btn.innerHTML = oldHTML;
      msg.textContent = 'Reel downloaded. Add music natively in Instagram or TikTok when you post.';
    };
    rec.start();
    const t0 = performance.now();
    (function recStep(now) {
      const t = (now - t0) / 1000;
      if (t >= tot) { rec.stop(); return; }
      draw(t); requestAnimationFrame(recStep);
    })(t0);
  });

  /* ---------- Stills picker ---------- */
  let pickCb = null;
  function openPicker(cb) {
    pickCb = cb;
    $('pick-grid').innerHTML = stills.map((c, i) => `<div class="cc"><div class="fr" data-i="${i}"><img src="${c.clip.frames[0]}" class="on" alt=""></div></div>`).join('');
    $('pick-modal').classList.remove('hidden');
  }
  $('pick-grid').addEventListener('click', e => {
    const fr = e.target.closest('.fr'); if (!fr) return;
    if (pickCb) pickCb(stills[+fr.dataset.i]);
    $('pick-modal').classList.add('hidden');
  });
  $('pick-x').addEventListener('click', () => $('pick-modal').classList.add('hidden'));
  $('pick-modal').addEventListener('click', e => { if (e.target === $('pick-modal')) $('pick-modal').classList.add('hidden'); });

  /* ---------- Content Queue ---------- */
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let plan = {};
  try { plan = JSON.parse(localStorage.getItem('aim-plan-' + C.slug) || '{}'); } catch (e) {}
  const savePlan = () => { try { localStorage.setItem('aim-plan-' + C.slug, JSON.stringify(plan)); } catch (e) {} };

  function renderWeek() {
    const wk = $('week'); wk.innerHTML = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      const col = el('div', 'dcol');
      col.innerHTML = `<div class="dh"><b>${DAYS[d.getDay()]}</b><span>${d.getDate()} ${d.toLocaleDateString('en-NZ', { month: 'short' }).toUpperCase()}</span></div>`;
      const slot = el('div', 'slot');
      const p = plan[iso];
      if (p) {
        slot.classList.add('full');
        slot.innerHTML = `<div class="im"><img src="${p.frame}" alt=""><span class="d">${p.dur}</span><button class="x">×</button></div><span class="lb">${p.label}</span>`;
        slot.querySelector('.x').addEventListener('click', e => { e.stopPropagation(); delete plan[iso]; savePlan(); renderWeek(); renderSeq(); });
      } else {
        slot.innerHTML = `<svg class="icn" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg><span class="ad">Add clip</span>`;
      }
      slot.addEventListener('click', e => { if (e.target.classList.contains('x')) return; openPicker(c => { plan[iso] = { frame: c.clip.frames[0], dur: c.clip.dur, label: c.label }; savePlan(); renderWeek(); renderSeq(); }); });
      slot.addEventListener('dragover', e => { e.preventDefault(); slot.classList.add('dz'); });
      slot.addEventListener('dragleave', () => slot.classList.remove('dz'));
      slot.addEventListener('drop', e => {
        e.preventDefault(); slot.classList.remove('dz');
        try {
          const c = JSON.parse(e.dataTransfer.getData('text/plain'));
          plan[iso] = { frame: c.frames[0], dur: c.dur, label: c._label || 'Vault clip' };
          savePlan(); renderWeek(); renderSeq();
        } catch (err) {}
      });
      col.appendChild(slot);
      wk.appendChild(col);
    }
  }
  renderWeek();
  $('dz').addEventListener('dragover', e => { e.preventDefault(); $('dz').classList.add('dz'); });
  $('dz').addEventListener('dragleave', () => $('dz').classList.remove('dz'));
  $('dz').addEventListener('drop', e => {
    e.preventDefault(); $('dz').classList.remove('dz');
    try {
      const c = JSON.parse(e.dataTransfer.getData('text/plain'));
      const d = new Date(); d.setHours(0, 0, 0, 0);
      for (let i = 0; i < 7; i++) {
        const iso = new Date(d.getTime() + i * 864e5).toISOString().slice(0, 10);
        if (!plan[iso]) { plan[iso] = { frame: c.frames[0], dur: c.dur, label: c._label || 'Vault clip' }; savePlan(); renderWeek(); renderSeq(); toast('Scheduled'); return; }
      }
      toast('This week is full — clear a day first');
    } catch (err) {}
  });

  const UPNEXT = [
    { t: 'Training Mindset', tag: 'Idea', d: 'Capture authentic focus moments.' },
    { t: 'Lower Body Strength', tag: 'Workout', d: 'Glute & quad training session.' },
    { t: 'Behind the Discipline', tag: 'Lifestyle', d: 'Show the daily discipline behind the results.' },
    { t: 'Physique Progress', tag: 'Check-in', d: 'Monthly progress check-in.' }
  ];
  $('up-grid').innerHTML = UPNEXT.map((u, i) => {
    const c = allClips()[(i * 3) % allClips().length];
    return `<div class="up-c"><div class="im"><img src="${c.clip.frames[0]}" alt=""><h4>${u.t}</h4><span class="tg">${u.tag}</span></div><div class="bd"><p>${u.d}</p><button class="bm" title="Save idea"><svg class="icn" viewBox="0 0 24 24"><path d="M6 4h12v16l-6-4-6 4z"/></svg></button></div></div>`;
  }).join('');
  let saved = 0;
  $('up-grid').addEventListener('click', e => {
    const b = e.target.closest('.bm'); if (!b) return;
    b.classList.toggle('on');
    saved += b.classList.contains('on') ? 1 : -1;
    $('s-ideas').textContent = $('q-s3').textContent = Math.max(0, saved + ideas.length);
  });

  renderSeq();
  draw(0);
})();
