document.querySelector('.logout-btn').addEventListener('click', function() {
  alert('Logging out...');
  // In a real application, this would handle the logout process
  window.location.href = '/admin/logout';
});

document.getElementById('cancel-btn').addEventListener('click', function() {
  if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
    window.location.href = '/admin/#inventory';
  }
});

document.getElementById('add-product-form').addEventListener('submit', function(e) {
  e.preventDefault();
  // In a real application, this would handle form submission
  alert('Product added successfully!');
  window.location.href = '/admin/#inventory';
});

// Activity logging
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page load
logAdminActivity('Accessed Add New Product form');

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