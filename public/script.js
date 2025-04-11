document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.querySelector('input[name="name"]').value,
    email: form.querySelector('input[name="email"]').value,
    message: form.querySelector('textarea[name="message"]').value
  };

  try {
    const response = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert("Thanks for reaching out! I’ll get back to you soon.");
      form.reset();
    } else {
      alert("Error sending message. Please try again.");
    }
  } catch (error) {
    alert("Could not connect to the server. Please try later.");
  }
});
