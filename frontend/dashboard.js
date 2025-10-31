// Fetch and display user data on dashboard
async function loadDashboard() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    alert("Session expired. Please log in again.");
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/dashboard", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.user) {
      document.getElementById("welcomeText").textContent = `Welcome, ${data.user.name}!`;
      document.getElementById("emailText").textContent = `📧 Email : ${data.user.email}`;
      document.getElementById("phoneText").textContent = `📞 Phone : ${data.user.phone}`;
    } else {
      alert("Unable to load user details. Please log in again.");
      window.location.href = "index.html";
    }
  } catch (err) {
    console.error(err);
    alert("Error loading dashboard.");
    window.location.href = "index.html";
  }
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userName");
  window.location.href = "index.html";
});

loadDashboard();
