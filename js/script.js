// Wait for page to load before running any code
document.addEventListener("DOMContentLoaded", function() {

  /* HAMBURGER MENU*/
 

  var hamburger = document.getElementById("hamburger");
  var navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", function() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  // Close nav when a link is clicked
  var links = document.querySelectorAll(".nav-links a");
  links.forEach(function(link) {
    link.addEventListener("click", function() {
      hamburger.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });


  /* NAVBAR SHADOW ON SCROLL*/
  

  var navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function() {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });


  /*BACK TO TOP BUTTON */
 

  var backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function() {
    if (window.scrollY > 400) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  /* CONTACT FORM */
  
  var form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();

      form.innerHTML =
        "<div style='text-align: center; padding: 40px 20px;'>" +
        "<div style='font-size: 50px; margin-bottom: 15px;'>⚡</div>" +
        "<h3 style='font-family: Syne, sans-serif; font-size: 22px; color: #ffffff; margin-bottom: 10px;'>Message Sent!</h3>" +
        "<p style='font-size: 14px; color: #888888;'>Thank you for reaching out. I will get back to you as soon as possible!</p>" +
        "</div>";
    });
  }


  /* FADE IN SECTIONS ON SCROLL*/
  

  // Add a fade-in class to cards when they appear on screen
  var cards = document.querySelectorAll(".skill-card, .project-card, .contact-card, .why-card");

  cards.forEach(function(card) {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  function checkFade() {
    cards.forEach(function(card) {
      var cardTop = card.getBoundingClientRect().top;
      var windowHeight = window.innerHeight;

      if (cardTop < windowHeight - 80) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  }

  // Run on scroll and on page load
  window.addEventListener("scroll", checkFade);
  checkFade();

});