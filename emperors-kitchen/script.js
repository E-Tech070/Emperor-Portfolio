// Nav scroll
window.addEventListener("scroll", () => {
  document
    .getElementById("nav")
    .classList.toggle("scrolled", window.scrollY > 60);
});

// Menu tabs
function switchTab(id, btn) {
  document
    .querySelectorAll(".menu-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  btn.classList.add("active");
}

// Scroll reveal
const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting)
        setTimeout(() => e.target.classList.add("visible"), i * 60);
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));

// Send order to WhatsApp
function sendOrder() {
  const name = document.getElementById("orderName").value.trim();
  const phone = document.getElementById("orderPhone").value.trim();
  const type = document.getElementById("orderType").value;
  const date = document.getElementById("orderDate").value;
  const address = document.getElementById("orderAddress").value.trim();
  const details = document.getElementById("orderDetails").value.trim();

  if (!name || !phone || !details) {
    alert(
      "Please fill in your name, phone number and what you would like to order.",
    );
    return;
  }

  let message = "New order from Prissy's Kitchen website:\n";
  message += "Name: " + name + "\n";
  message += "Phone: " + phone + "\n";
  message += "Order Type: " + type + "\n";
  if (date) message += "Preferred Date: " + date + "\n";
  if (address) message += "Delivery Address: " + address + "\n";
  message += "Order: " + details;

  window.open(
    "https://wa.me/2348117927514?text=" + encodeURIComponent(message),
    "_blank",
  );
}
