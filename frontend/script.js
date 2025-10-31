// --- Panel Animation Logic ---
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Helper to show messages
function showMessage(elementId, message, type = "success") {
  const el = document.getElementById(elementId);
  el.textContent = message;
  el.className = `form-msg ${type}`;
  
  // Trigger the fade-in animation
  setTimeout(() => el.classList.add("show"), 10);

  // Optionally fade out after a few seconds
  setTimeout(() => el.classList.remove("show"), 4000);
}


// --- Register Form ---
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone: "9999999999",
        password,
        confirm: password,
      }),
    });

    const data = await res.json();
    if (data.success) {
      showMessage("registerMsg", data.message || "Registration successful!", "success");
      setTimeout(() => container.classList.remove("right-panel-active"), 1500);
    } else {
      showMessage("registerMsg", data.message || "Registration failed!", "error");
    }
  } catch (err) {
    console.error(err);
    showMessage("registerMsg", "Server error during registration.", "error");
  }
});

// --- Login Form ---
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      showMessage("loginMsg", "Login successful! Redirecting...", "success");
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userName", data.name || "User");
      setTimeout(() => (window.location.href = "dashboard.html"), 1500);
    } else {
      showMessage("loginMsg", data.message || "Invalid login details", "error");
    }
  } catch (err) {
    console.error(err);
    showMessage("loginMsg", "Server error during login.", "error");
  }
});
