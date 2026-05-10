/* ============================================================
   animations.js — Scroll fade-in + Konami Code easter egg
   ============================================================ */

/* ── FADE-IN ON SCROLL ── */
(function () {
  const els = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.08 }
  );
  els.forEach(el => observer.observe(el));
})();


/* ── KONAMI CODE EASTER EGG ── */
(function () {
  const SEQUENCE = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
    'b','a'
  ];
  let idx = 0;

  document.addEventListener('keydown', e => {
    if (e.key === SEQUENCE[idx]) {
      idx++;
      if (idx === SEQUENCE.length) {
        idx = 0;
        triggerKonami();
      }
    } else {
      idx = 0;
    }
  });

  function triggerKonami() {
    // Max out score display
    document.querySelectorAll('.score-val').forEach(el => el.textContent = '999999');

    // Pop-up message
    const msg = document.createElement('div');
    msg.style.cssText = [
      'position:fixed', 'top:50%', 'left:50%',
      'transform:translate(-50%,-50%)',
      'font-family:"Press Start 2P",monospace',
      'font-size:clamp(14px,2vw,22px)',
      'color:#ffe600',
      'text-shadow:0 0 20px #ffe600',
      'z-index:99999',
      'text-align:center',
      'pointer-events:none',
      'line-height:2',
      'background:rgba(7,4,15,0.92)',
      'border:3px solid #ffe600',
      'padding:2rem 3rem',
      'box-shadow:0 0 40px rgba(255,230,0,0.5)'
    ].join(';');
    msg.innerHTML = '★ CHEAT CODE ACTIVATED ★<br><br>+99999 BONUS POINTS!<br><br><span style="font-size:0.6em;color:#ff00cc">you found the secret 👾</span>';
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3500);
  }
})();
