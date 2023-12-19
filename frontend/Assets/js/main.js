// Function to check if the user is authenticated
const isAuthenticated = () => {
    // Check if the user is logged in (you might have a different way to determine this)
    return sessionStorage.getItem('userName') !== null;
  };
  
  // Update the visibility of buttons based on authentication status
  const updateButtonVisibility = () => {
    const signupButton = document.getElementById('signupButton');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const userNameDisplay = document.getElementById('userNameDisplay');
  
    if (isAuthenticated()) {
      // User is authenticated, hide signup and login buttons, show logout button
      signupButton.style.display = 'none';
      loginButton.style.display = 'none';
      logoutButton.style.display = 'inline-block'; // or 'block' depending on your styling

      const userName = sessionStorage.getItem('userName');
      userNameDisplay.innerText = ` Hi, ${userName}`;
    } else {
      // User is not authenticated, show signup and login buttons, hide logout button
      signupButton.style.display = 'inline-block';
      loginButton.style.display = 'inline-block';
      logoutButton.style.display = 'none';

      userNameDisplay.innerText = 'Account';
    }
    console.log('Button visibility updated.');
  };
  
  // Call the function initially
  updateButtonVisibility();
    
  logoutButton.addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:7000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
  
      if (response.ok) {
        // Logout successful
        console.log('Before logout:', sessionStorage)
        sessionStorage.removeItem('userName');

        updateButtonVisibility();
        console.log('User logged out successfully.', sessionStorage);
      } else {
        // Handle logout failure
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
});


// Fetching mentors from server-side

document.addEventListener('DOMContentLoaded', function () {
    // Fetch mentors from the server
    fetch('http://localhost:7000/api/mentors/allmentors') 
        .then(response => response.json())
        .then(mentors => {
          
            const mentorListContainer = document.getElementById('mentorList');

            mentors.forEach(mentor => {
              
              const card = createMentorCard(mentor);

              
              mentorListContainer.appendChild(card);
        })
    })
    .catch(error => console.error('Error fetching mentors:', error));

    // Function to create a mentor card based on mentor data
    function createMentorCard(mentor) {
        // Create a new <div> element for the mentor card
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-md-3', 'col-sm-6', 'mb-3', 'd-flex'); // Add Bootstrap classes to style the card

        // Set the inner HTML content for the mentor card using template literals
        cardDiv.innerHTML = `
            <div class="card-group">
                <div class="card p-3 h-100">
                    <!-- Mentor image -->
                    <img src="${mentor.image}" class="card-img-top" alt="...">
                    
                    <!-- Category badge -->
                    <span class="position-absolute badge port start-0">${mentor.category}</span>
                    
                    <div class="card-body d-flex flex-column  ">
                        <!-- Mentor name -->
                        <h5 class="card-title">${mentor.name}</h5>
                        
                        <!-- Mentor category -->
                        <p class="role">${mentor.category}</p>
                        
                        <!-- Mentor description -->
                        <p class="card-text">${mentor.description}</p>
                        
                        <div class="button mt-auto"">
                            <!-- Link to mentor's profile -->
                            <a href="${mentor.profileLink}" class="btn book-now">Book now</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Return the created mentor card
        return cardDiv;
    }
})



