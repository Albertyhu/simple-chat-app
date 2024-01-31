const LoginForm = document.getElementById("login-form");
UsernameInput.addEventListener("change", (e) => {
  if (!LoginErrorMessage.classList.contains("hideLoginError")) {
    LoginErrorMessage.classList.add("hideLoginError");
  }
});

LoginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const Username = UsernameInput.value.trim();
  AuthenticateUsername(Username)
  localStorage.setItem("username", Username);
});

