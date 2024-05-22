function checkPasswordMatch() {
    const password = document.getElementById("password").value;
    const password1 = document.getElementById("password1").value;

    if (password === password1) {
      document.getElementById("password1").setCustomValidity('');
    } else {
      document.getElementById("password1").setCustomValidity("Passwords do not match.");
    }
  }