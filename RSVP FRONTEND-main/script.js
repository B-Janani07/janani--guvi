document.getElementById("rsvp-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const attendance = document.getElementById("attendance").value;
    const message = document.getElementById("message").value;
  
    const responseMessage = document.getElementById("response-message");
  
    fetch("http://localhost:3000/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, attendance, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          responseMessage.innerText = Error: ${data.error};
          responseMessage.style.color = "red";
        } else {
          responseMessage.innerText = "Thank you! Your RSVP has been submitted.";
          responseMessage.style.color = "green";
          document.getElementById("rsvp-form").reset();
        }
      })
      .catch((error) => {
        responseMessage.innerText = "Failed to submit RSVP.";
        responseMessage.style.color = "red";
      });
  });ss