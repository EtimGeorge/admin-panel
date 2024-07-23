document.getElementById('addCustomerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate form
  let isValid = true;
  let errorMessage = '';
  
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  
  if (!firstName) {
    isValid = false;
    errorMessage += 'First name is required. ';
  }
  
  if (!lastName) {
    isValid = false;
    errorMessage += 'Last name is required. ';
  }
  
  if (!email) {
    isValid = false;
    errorMessage += 'Email is required. ';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    isValid = false;
    errorMessage += 'Email is invalid. ';
  }
  
  if (!phone) {
    isValid = false;
    errorMessage += 'Phone number is required. ';
  }
  
  if (isValid) {
    // Here you would typically send this data to your backend
    console.log('Customer data:', {
      firstName,
      lastName,
      email,
      phone,
      address: document.getElementById('address').value,
      birthDate: document.getElementById('birthDate').value,
      preferredContact: document.getElementById('preferredContact').value,
      shoeSize: document.getElementById('shoeSize').value,
      preferences: document.getElementById('preferences').value,
      newsletter: document.getElementById('newsletter').checked
    });
    
    alert('Customer added successfully!');
    this.reset();
  } else {
    alert('Please correct the following errors: ' + errorMessage);
  }
});

// Log admin activity
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page access
logAdminActivity('Accessed Add New Customer page');

// Session timeout simulation
let sessionTimeout;
function resetSessionTimeout() {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(() => {
    alert('Your session has expired. Please log in again.');
    window.location.href = '/admin/logout';
  }, 30 * 60 * 1000); // 30 minutes
}

// Reset timeout on user activity
document.addEventListener('click', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);

// Initial call to start the timeout
resetSessionTimeout();

// Logout functionality
document.querySelector('.logout-btn').addEventListener('click', () => {
  logAdminActivity('Logged out');
  alert('Logging out...');
  // In a real application, this would handle the logout process
  window.location.href = '/admin/logout';
});