// Smooth scrolling for all in‑page links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Mobile menu toggle
const btn = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav"); // Define the nav element

if (btn && nav) {
  btn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen); // Accessibility: Update aria-expanded
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });
}

// Theme toggle logic
const themeSwitch = document.getElementById("theme-switch");

// Check for saved theme in localStorage
const savedTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", savedTheme);
themeSwitch.textContent = savedTheme === "dark" ? "☀️" : "🌙";

// Add event listener for theme toggle
themeSwitch.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  console.log(`Switching theme from ${currentTheme} to ${newTheme}`);
  document.documentElement.setAttribute("data-theme", newTheme);
  themeSwitch.textContent = newTheme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", newTheme);
});

document.getElementById("theme-switch").onclick = function () {
  document.body.classList.toggle("dark-mode");
};

// EmailJS integration for contact form
emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID

document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
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

const element = document.querySelector(".non-existent-class");
if (element) {
  element.addEventListener("click", () => {
    console.log("Element clicked");
  });
}
