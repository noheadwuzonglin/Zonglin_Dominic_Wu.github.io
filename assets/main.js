const toast = document.getElementById('toast');
const navLinks = [...document.querySelectorAll('.nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const scanline = document.querySelector('.scanline');

function showToast(text) {
  toast.textContent = text;
  toast.classList.add('show');
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => toast.classList.remove('show'), 1200);
}

document.querySelectorAll('[data-toggle]').forEach(btn => {
  btn.addEventListener('click', () => {
    const box = document.getElementById(btn.dataset.toggle);
    if (!box) return;
    box.classList.toggle('show');
    btn.classList.toggle('active', box.classList.contains('show'));
    btn.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(1px)' },
      { transform: 'translateY(0)' }
    ], { duration: 130, easing: 'ease-out' });
  });
});

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scanline.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : '0%';
  let current = sections[0]?.id;
  sections.forEach(sec => { if (sec.getBoundingClientRect().top < 120) current = sec.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const nameLine = document.getElementById('nameLine');
if (nameLine) {
  nameLine.addEventListener('click', async () => {
    nameLine.classList.remove('flash');
    void nameLine.offsetWidth;
    nameLine.classList.add('flash');
    try {
      await navigator.clipboard.writeText('noheadwuzonglin@gmail.com');
      showToast('email copied');
    } catch {
      showToast('noheadwuzonglin@gmail.com');
    }
  });
}



document.querySelectorAll('.paper h3').forEach(title => {
  title.addEventListener('click', () => {
    const paper = title.closest('.paper');
    const firstButton = paper?.querySelector('[data-toggle^="abs-"]');
    firstButton?.click();
  });
});

document.getElementById('yearNow').textContent = new Date().getFullYear();


// Tiny tactile details: intentionally quiet, no visible controls.
document.addEventListener('click', event => {
  const dot = document.createElement('span');
  dot.className = 'click-dot';
  dot.style.left = `${event.clientX}px`;
  dot.style.top = `${event.clientY}px`;
  document.body.appendChild(dot);
  dot.addEventListener('animationend', () => dot.remove(), { once: true });

  // A few quiet square pixels, no labels.
  for (let i = 0; i < 3; i += 1) {
    const spark = document.createElement('span');
    spark.className = 'click-spark';
    spark.style.left = `${event.clientX}px`;
    spark.style.top = `${event.clientY}px`;
    const palette = ['#d92d3a', '#ffe4e6', '#111111', '#f4f4f4', '#d92d3a'];
    spark.style.setProperty('--dx', `${(i - 1) * 14 + Math.random() * 8}px`);
    spark.style.setProperty('--dy', `${-10 - Math.random() * 18}px`);
    spark.style.setProperty('--spark', palette[i % palette.length]);
    document.body.appendChild(spark);
    spark.addEventListener('animationend', () => spark.remove(), { once: true });
  }
});

document.querySelectorAll('.paper').forEach((paper, index) => {
  paper.style.setProperty('--delay', `${index * 24}ms`);
});
