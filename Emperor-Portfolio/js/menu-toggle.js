// Mobile menu toggle
const btn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav"); // Define the nav element

if (btn && nav) {
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen); // Accessibility: Update aria-expanded
  });

  // Close menu on outside click
  document.addEventListener("click", e => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}