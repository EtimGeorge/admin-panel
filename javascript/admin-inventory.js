document.querySelector('.logout-btn').addEventListener('click', function() {
  alert('Logging out...');
  // In a real application, this would handle the logout process
  window.location.href = '/admin/logout';
});

document.getElementById('addProductBtn').addEventListener('click', function() {
  alert('Opening add product form...');
  // In a real application, this would open a form to add a new product
});

document.getElementById('exportInventoryBtn').addEventListener('click', function() {
  alert('Exporting inventory...');
  // In a real application, this would trigger an export of the inventory data
});

// Edit buttons functionality
document.querySelectorAll('.inventory-table .action-btn').forEach(button => {
  button.addEventListener('click', function() {
    const sku = this.closest('tr').querySelector('td:first-child').textContent;
    alert('Editing product with SKU: ' + sku);
    // In a real application, this would open an edit form for the specific product
  });
});

// Activity logging
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page load
logAdminActivity('Accessed inventory management');

// Log navigation clicks without preventing navigation
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', function() {
    logAdminActivity('Clicked: ' + this.textContent);
    // Navigation will proceed normally
  });
});

// Log navigation clicks
// document.querySelectorAll('.sidebar a').forEach(link => {
//   link.addEventListener('click', function(e) {
//     e.preventDefault(); // Prevent actual navigation for this demo
//     logAdminActivity('Clicked: ' + this.textContent);
//   });
// });

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