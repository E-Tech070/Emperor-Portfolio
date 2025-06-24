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