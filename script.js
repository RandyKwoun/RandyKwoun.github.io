const toggle = document.getElementById("modeToggle");
const langToggle = document.getElementById("langToggle");

// localStorage can throw in private mode; fall back gracefully
function load(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}

function save(key, value) {
  try { localStorage.setItem(key, value); } catch (e) {}
}

// Load saved settings
const savedTheme = load("theme");
let currentLang = load("lang") || "en";

// Apply theme
if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

// Apply language
function applyLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  document.documentElement.lang = lang;

  if (langToggle) {
    langToggle.textContent = lang === "en" ? "KO" : "EN";
  }
}

applyLanguage(currentLang);

// DARK MODE
function updateThemeIcon() {
  if (!toggle) return;
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

updateThemeIcon();

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    save("theme", document.body.classList.contains("dark") ? "dark" : "light");

    updateThemeIcon();
  });
}

// LANGUAGE TOGGLE
if (langToggle) {
  langToggle.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ko" : "en";

    save("lang", currentLang);
    applyLanguage(currentLang);
  });
}

// SCROLL REVEAL
const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  revealEls.forEach((el, i) => {
    // Stagger siblings slightly for a cascading entrance
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    observer.observe(el);
  });
} else {
  revealEls.forEach(el => el.classList.add("visible"));
}
