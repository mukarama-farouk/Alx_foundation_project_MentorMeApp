const userName = sessionStorage.getItem('userName');

    // Display the welcome message with the user's name
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.textContent = `Welcome to the booking page, ${userName || 'Guest'}!`;
