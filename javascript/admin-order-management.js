document.querySelector('.logout-btn').addEventListener('click', function() {
  alert('Logging out...');
  // In a real application, this would handle the logout process
  window.location.href = '/admin/logout';
});

document.getElementById('filterOrdersBtn').addEventListener('click', function() {
  alert('Opening order filter options...');
  // In a real application, this would open a modal or expand a section with filter options
});

document.getElementById('exportOrdersBtn').addEventListener('click', function() {
  alert('Exporting orders...');
  // In a real application, this would trigger an export of the orders data
});

// View buttons functionality
document.querySelectorAll('.orders-table .action-btn').forEach(button => {
  button.addEventListener('click', function() {
    const orderId = this.closest('tr').querySelector('td:first-child').textContent;
    alert('Viewing details for order: ' + orderId);
    // In a real application, this would open a detailed view of the specific order
  });
});

// Activity logging
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page load
logAdminActivity('Accessed order management');

// Log navigation clicks
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent actual navigation for this demo
    logAdminActivity('Clicked: ' + this.textContent);
  });
});

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