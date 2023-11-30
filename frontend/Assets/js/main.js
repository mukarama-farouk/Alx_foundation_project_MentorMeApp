document.addEventListener('DOMContentLoaded', function () {
    // Get all elements with the 'book-now' class
    var bookNowButtons = document.querySelectorAll('.book-now');
  
    // Attach click event listeners to each 'Book Now' button
    bookNowButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Get the modal ID from the data-modal attribute
        var modalId = button.getAttribute('data-modal');
  
        // Show the modal
        showAndBlur(modalId);
      });
    });
  
    // Function to show modal and apply blur to background
    function showAndBlur(modalId) {
      // Display the modal
      document.getElementById(modalId).style.display = 'block';
  
      // Apply blur to the background
      document.body.classList.add('blur-background');
    }
  
    // Function to hide modal and remove blur from background
    function hideAndUnblur(modalId) {
      // Hide the modal
      document.getElementById(modalId).style.display = 'none';
  
      // Remove blur from the background
      document.body.classList.remove('blur-background');
    }
  
    // Attach click event listeners to close buttons
    var closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(function (closeButton) {
      closeButton.addEventListener('click', function () {
        // Get the modal ID from the data-close attribute
        var modalId = closeButton.getAttribute('data-close');
  
        // Hide the modal
        hideAndUnblur(modalId);
      });
    });

    // Get all elements with the 'loginBtn' and 'signupBtn' classes
  var loginButtons = document.querySelectorAll('.loginBtn');
  var signupButtons = document.querySelectorAll('.signupBtn');

  // Attach click event listeners to each login button
  loginButtons.forEach(function (loginButton) {
    loginButton.addEventListener('click', function () {
      // Get the modal ID from the data-modal attribute
      var modalId = loginButton.getAttribute('data-modal');

      // Redirect to the login page associated with the mentor
      window.location.href = 'pages/auth/login.htm?mentor=' + modalId;
    });
  });

  // Attach click event listeners to each signup button
  signupButtons.forEach(function (signupButton) {
    signupButton.addEventListener('click', function () {
      // Get the modal ID from the data-modal attribute
      var modalId = signupButton.getAttribute('data-modal');

      // Redirect to the signup page associated with the mentor
      window.location.href = 'pages/auth/signup.html?mentor=' + modalId;
    });
  });


  // Assuming you have a login page named login.html and a signup page named signup.html
  document.querySelector('.auth-loginBtn').addEventListener('click', function () {
    window.location.href = 'booking.html';
  });

  document.querySelector('.auth-signupBtn').addEventListener('click', function () {
    window.location.href = 'booking.html';
  });


  document.getElementById('bookingForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Perform any necessary form validation or data submission logic here
  
    // Display the confirmation message
    document.getElementById('confirmationMessage').style.display = 'block';
  });


});
  