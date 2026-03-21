(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const themeStorageKey = 'doubleknott-theme';
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem(themeStorageKey);

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      const nextTheme = theme === 'dark' ? 'light' : 'dark';
      themeToggle.textContent = nextTheme === 'dark' ? 'Dark Mode' : 'White Mode';
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
      themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    }
  }

  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      const nextTheme = isDark ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem(themeStorageKey, nextTheme);
    });
  }

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');

  if (toggle && header) {
    toggle.addEventListener('click', () => {
      const open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        header.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();
