document.querySelector('.logout-btn').addEventListener('click', function() {
  alert('Logging out...');
  // In a real application, this would handle the logout process
  window.location.href = '/admin/logout';
});

document.getElementById('updateStatusBtn').addEventListener('click', function() {
  const newStatus = prompt('Enter new status (e.g., SHIPPED, DELIVERED):');
  if (newStatus) {
    alert('Order status updated to: ' + newStatus);
    // In a real app, this would update the status in the database
    document.querySelector('.order-status').textContent = newStatus.toUpperCase();
    document.querySelector('.order-status').className = 'order-status status-' + newStatus.toLowerCase();
  }
});

document.getElementById('sendEmailBtn').addEventListener('click', function() {
  alert('Sending email to customer...');
  // In a real app, this would trigger an email sending process
});

document.getElementById('printInvoiceBtn').addEventListener('click', function() {
  alert('Generating invoice for printing...');
  // In a real app, this would generate and open a printable invoice
});

document.getElementById('cancelOrderBtn').addEventListener('click', function() {
  if (confirm('Are you sure you want to cancel this order?')) {
    alert('Order cancelled.');
    // In a real app, this would update the order status to cancelled
    document.querySelector('.order-status').textContent = 'CANCELLED';
    document.querySelector('.order-status').className = 'order-status status-cancelled';
  }
});

// Activity logging
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page load
logAdminActivity('Viewed order #12346');

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