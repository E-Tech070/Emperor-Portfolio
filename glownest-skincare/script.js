// Wait for the page to fully load before running any code
document.addEventListener("DOMContentLoaded", function() {

  // ================================
  // HAMBURGER MENU
  // ================================

  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", function() {
    navLinks.classList.toggle("open");
  });

  // Close the menu when a link is clicked
  var links = document.querySelectorAll(".nav-links a");
  links.forEach(function(link) {
    link.addEventListener("click", function() {
      navLinks.classList.remove("open");
    });
  });


  // ================================
  // BACK TO TOP BUTTON
  // ================================

  var backToTopBtn = document.getElementById("backToTop");

  // Show the button when user scrolls down 400px
  window.addEventListener("scroll", function() {
    if (window.scrollY > 400) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  // Scroll back to top when button is clicked
  backToTopBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  // ================================
  // CONTACT FORM
  // ================================

  var form = document.getElementById("contactForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Show a success message after form is submitted
    form.innerHTML = "<div style='text-align:center; padding: 30px;'>" +
      "<p style='font-size: 40px; margin-bottom: 15px;'>🌿</p>" +
      "<h3 style='color: #d8a48f; font-size: 22px; margin-bottom: 10px;'>Message Sent!</h3>" +
      "<p style='color: #666; font-size: 14px;'>Thank you for reaching out. We will get back to you within 2 hours!</p>" +
      "</div>";
  });


  // ================================
  // NAVBAR SHADOW ON SCROLL
  // ================================

  var navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 4px 20px rgba(216, 164, 143, 0.2)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });

});