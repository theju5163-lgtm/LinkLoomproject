// LinkLoom Authentication System using localStorage

// Signup logic
function createAccount() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const mobileEl = document.getElementById("mobile");
  const passwordEl = document.getElementById("password");

  if (!nameEl || !emailEl || !mobileEl || !passwordEl) {
    alert("Error: Auth elements missing from the page.");
    return;
  }

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const mobile = mobileEl.value.trim();
  const password = passwordEl.value.trim();

  // Basic validation checks
  if (name === "" || email === "" || mobile === "" || password === "") {
    alert("Please fill in all details.");
    return;
  }

  // Email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Mobile check
  if (mobile.length < 10) {
    alert("Please enter a valid mobile number.");
    return;
  }

  // Password strength check
  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  // Fetch existing users
  let users = JSON.parse(localStorage.getItem("users")) || [];
  
  // Check if email already registered
  const userExists = users.some(u => u.email === email);
  if (userExists) {
    alert("An account with this email already exists.");
    return;
  }

  // Create new user object
  const newUser = {
    name,
    email,
    mobile,
    password
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  
  // Set current user (in key 'user' as requested and expected by other pages)
  localStorage.setItem("user", JSON.stringify(newUser));
  localStorage.setItem("loggedIn", "true");

  alert("Account created successfully!");
  window.location.href = "marketplace.html";
}

// Login logic
function login() {
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");

  if (!emailEl || !passwordEl) {
    alert("Error: Login fields are missing.");
    return;
  }

  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();

  if (email === "" || password === "") {
    alert("Please enter both email and password.");
    return;
  }

  // Fetch users array from localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  
  // Find matching user
  const matchedUser = users.find(u => u.email === email && u.password === password);

  if (matchedUser) {
    // Save state
    localStorage.setItem("user", JSON.stringify(matchedUser));
    localStorage.setItem("loggedIn", "true");
    
    alert("Welcome back to LinkLoom!");
    window.location.href = "marketplace.html";
  } else {
    // If no users registered yet, check default test account
    if (email === "test@linkloom.com" && password === "password") {
      const defaultUser = { name: "Test User", email: "test@linkloom.com", mobile: "1234567890" };
      localStorage.setItem("user", JSON.stringify(defaultUser));
      localStorage.setItem("loggedIn", "true");
      alert("Logged in using trial credentials!");
      window.location.href = "marketplace.html";
      return;
    }
    alert("Invalid email or password.");
  }
}
