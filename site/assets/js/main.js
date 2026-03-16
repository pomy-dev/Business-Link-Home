// Shared small helpers for the static site

// Update footer year if span with id="year" exists
(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();

