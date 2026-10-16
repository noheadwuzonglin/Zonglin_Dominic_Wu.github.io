(() => {
  'use strict';

  const one = (selector, root = document) => root.querySelector(selector);
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toast = one('#toast');
  let toastTimer;

  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2800);
  }

  // Responsive navigation and contact disclosure. Native details work without JS.
  const menuButton = one('.menu-toggle');
  const navigation = one('#site-nav');
  const contact = one('#contact-menu');
  const header = one('.site-header');
  const mobile = window.matchMedia('(max-width: 680px)');

  function setMenu(open) {
    navigation?.classList.toggle('is-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    const label = one('.menu-label');
    if (label) label.textContent = open ? 'Close' : 'Menu';
    if (!open && contact) contact.open = false;
  }
  menuButton?.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  all('.site-nav > a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (contact?.open && !contact.contains(event.target)) contact.open = false;
    if (mobile.matches && navigation?.classList.contains('is-open') && !header?.contains(event.target)) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (contact?.open) {
      contact.open = false;
      one('summary', contact)?.focus();
    } else if (navigation?.classList.contains('is-open')) {
      setMenu(false);
      menuButton?.focus();
    }
  });
  if (mobile.addEventListener) mobile.addEventListener('change', () => setMenu(false));

  function copyFallback(value) {
    const previousFocus = document.activeElement;
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;';
    document.body.append(field);
    field.select();
    field.setSelectionRange(0, value.length);
    let success = false;
    try { success = document.execCommand('copy'); } catch { /* Show the address below. */ }
    field.remove();
    previousFocus?.focus({ preventScroll: true });
    return success;
  }
  all('[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const email = button.dataset.copy;
      let copied = false;
      try {
        if (window.isSecureContext && navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(email);
          copied = true;
        }
      } catch { /* Clipboard permission is optional. */ }
      if (!copied) copied = copyFallback(email);
      notify(copied ? 'Email copied.' : email);
      if (copied) {
        button.textContent = 'Copied';
        setTimeout(() => { button.textContent = 'Copy'; }, 1600);
      }
    });
  });

  const year = one('#year-now');
  if (year) year.textContent = new Date().getFullYear();
  const progress = one('.reading-progress');
  let scrollPending = false;
  function paintProgress() {
    const distance = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;
    scrollPending = false;
  }
  function scheduleProgress() {
    if (!scrollPending) {
      scrollPending = true;
      requestAnimationFrame(paintProgress);
    }
  }
  window.addEventListener('scroll', scheduleProgress, { passive: true });
  window.addEventListener('resize', scheduleProgress, { passive: true });
  window.addEventListener('load', scheduleProgress, { once: true });
  // Opening abstracts changes the scrollable document height.
  document.addEventListener('toggle', scheduleProgress, true);
  paintProgress();
})();
