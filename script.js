const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".main-nav");
const year = document.querySelector("#year");
const form = document.querySelector(".booking-form");
const reviewForm = document.querySelector(".review-form");
const serviceSelect = document.querySelector('select[name="service"]');
const whatsappNumber = "12042984337";

function openWhatsApp(message) {
  window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

year.textContent = new Date().getFullYear();

toggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    const title = card.querySelector("h3").textContent;
    const option = Array.from(serviceSelect.options).find((item) =>
      title.toLowerCase().includes(item.textContent.toLowerCase().split(" ")[0])
    );

    if (option) {
      serviceSelect.value = option.textContent;
      document.querySelector("#reservation").scrollIntoView({ behavior: "smooth" });
    }
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const message = [
    "Hello DG Beauty, I would like to book an appointment.",
    "",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Preferred service: ${data.get("service")}`,
    "",
    "Message:",
    data.get("message") || "No message added.",
  ].join("\n");
  const note = form.querySelector(".form-note");
  note.textContent = "Thank you, your WhatsApp message is ready.";
  openWhatsApp(message);
  form.reset();
});

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(reviewForm);
  const message = [
    "Hello DG Beauty, I would like to leave a review.",
    "",
    `Rating: ${data.get("rating")} / 5`,
    `Name: ${data.get("reviewer")}`,
    `Service received: ${data.get("review_service") || "Not specified"}`,
    `Review title: ${data.get("review_title") || "No title"}`,
    `Recommendation: ${data.get("recommend")}`,
    `Email: ${data.get("review_email") || "Not provided"}`,
    "",
    "Review:",
    data.get("review_text"),
  ].join("\n");
  const note = reviewForm.querySelector(".review-note");
  note.textContent = "Thank you, your WhatsApp review message is ready.";
  openWhatsApp(message);
  reviewForm.reset();
});
