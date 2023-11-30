document.querySelectorAll('.book-now').forEach(function(button) {
  button.addEventListener('click', function() {
    // Get the data-mentor attribute value to identify the selected mentor
    var mentorId = button.getAttribute('data-modal');
    
    // Call a function to update the modal content based on the selected mentor
    updateModalContent(mentorId);

    // Display the modal
    document.getElementById('mentorModal').style.display = 'block';
  });
});

// Close the booking modal
document.getElementById('closeModal').addEventListener('click', function() {
  document.getElementById('bookingModal').style.display = 'none';
});

