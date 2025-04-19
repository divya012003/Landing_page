function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  function isValidURL(url) {
    return /^(https?:\/\/)?([\w\d\-_]+\.+\S+)$/.test(url);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const company = form.company.value.trim();
      const website = form.website.value.trim();
  
      if (!name || !email || !company || !website) {
        alert("All fields are required.");
        return;
      }
  
      if (!isValidEmail(email)) {
        alert("Invalid email format.");
        return;
      }
  
      if (!isValidURL(website)) {
        alert("Invalid website URL.");
        return;
      }
  
      const formData = { name, email, company, website };
  
      try {
        const response = await fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          alert(result.message || "Submission failed.");
          return;
        }
  
        alert("Form submitted successfully!");
        form.reset();
      } catch (error) {
        alert("Failed to send form data.");
        console.error(error);
      }
    });
  });
  