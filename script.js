// Smooth scrolling for all in‑page links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Mobile menu toggle
const btn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");

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

// Light/Dark theme switcher
const toggle = document.getElementById("theme-switch");

// Save theme preference in localStorage
toggle.addEventListener("click", () => {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  toggle.textContent = isDark ? "🌙" : "☀️";
  localStorage.setItem("theme", newTheme); // Save the theme preference
});

// Load saved theme on page load
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
toggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";

// EmailJS integration for contact form
emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this).then(
    function () {
      alert("Message sent successfully!");
    },
    function (error) {
      alert("Failed to send message. Please try again.");
    }
  );
});

