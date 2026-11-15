// 1. Dark / light theme (remembered in the browser)
const root = document.documentElement;
const themeBtn = document.getElementById('theme');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn.textContent = theme === 'dark' ? 'Light' : 'Dark';
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  try { localStorage.setItem('theme', theme); } catch (e) {}
}
applyTheme(root.getAttribute('data-theme') || 'light');
themeBtn.addEventListener('click', () => {
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// 2. Project filter chips
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;
    chips.forEach((c) => {
      const on = c === chip;
      c.classList.toggle('on', on);
      c.setAttribute('aria-pressed', String(on));
    });
    projects.forEach((p) => {
      const tags = p.dataset.tags.split(' ');
      p.hidden = !(filter === 'all' || tags.includes(filter));
    });
  });
});

// 3. Scroll progress bar
const bar = document.getElementById('progress');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

// 4. Copy email + small confirmation message
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2200);
}
document.getElementById('copy').addEventListener('click', async (e) => {
  const email = e.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    showToast('Email address copied');
  } catch (err) {
    showToast('Could not copy. Please copy it manually: ' + email);
  }
});

// 5. Current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
