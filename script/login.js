document.getElementById("login-btn").addEventListener("click", function () {
  const inputUsername = document.getElementById("input-username");
  const username = inputUsername.value;

  const inputPassword = document.getElementById("input-password");
  const password = inputPassword.value;

  if (username === "admin" && password === "admin123") {
    window.location.assign("/main.html");
  } else {
    alert("login failed");
    return;
  }
});
