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
  document.documentElement.setAttribute("data-theme", newTheme);
  themeSwitch.textContent = newTheme === "dark" ? "☀️" : "🌙";
  localStorage.setItem("theme", newTheme);
});