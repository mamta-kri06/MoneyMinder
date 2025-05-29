// auth.js for signup and login

// Helper function to get users array from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Helper function to save users array to localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Signup logic
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document
      .getElementById("signupEmail")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("signupPassword").value;

    if (!email || !password) return alert("Please fill all fields");

    let users = getUsers();

    // Check if user already exists
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      return alert("User with this email already exists. Please login.");
    }

    // Add new user
    users.push({ email, password });
    saveUsers(users);

    alert("Signup successful! Please login now.");
    window.location.href = "login.html";
  });
}

// Login logic
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document
      .getElementById("loginEmail")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) return alert("Please fill all fields");

    let users = getUsers();

    // Check if user exists with correct password
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      return alert("Invalid email or password!");
    }

    // Save logged-in user info in localStorage
    localStorage.setItem("loggedInUser", email);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
  });
}
