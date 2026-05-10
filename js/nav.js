/* ============================================================
   nav.js — Active nav link tracking on scroll
   ============================================================ */

(function () {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  // Map section id → nav anchor for fast lookup
  const linkMap = {};
  navLinks.forEach(a => {
    const id = a.getAttribute('href')?.replace('#', '');
    if (id) linkMap[id] = a;
  });

  function setActive(id) {
    navLinks.forEach(a => a.classList.remove('active'));
    if (linkMap[id]) linkMap[id].classList.add('active');
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => observer.observe(s));
})();
