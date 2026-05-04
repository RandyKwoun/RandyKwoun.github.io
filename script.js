const toggle = document.getElementById("modeToggle");
const langToggle = document.getElementById("langToggle");

// Load saved settings
const savedTheme = localStorage.getItem("theme");
const savedLang = localStorage.getItem("lang") || "en";

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

  if (langToggle) {
    langToggle.textContent = lang.toUpperCase();
  }
}

applyLanguage(savedLang);

// DARK MODE
function updateThemeIcon() {
  if (!toggle) return;
  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

updateThemeIcon();

if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );

    updateThemeIcon();
  });
}

// LANGUAGE TOGGLE
if (langToggle) {
  langToggle.addEventListener("click", () => {
    const current = localStorage.getItem("lang") || "en";
    const next = current === "en" ? "ko" : "en";

    localStorage.setItem("lang", next);
    applyLanguage(next);
  });
}
