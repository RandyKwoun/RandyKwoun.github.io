const toggle = document.getElementById("modeToggle");

// Only run if button exists on page
if (toggle) {
  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      toggle.textContent = "☀️";
    } else {
      toggle.textContent = "🌙";
    }
  });
}
