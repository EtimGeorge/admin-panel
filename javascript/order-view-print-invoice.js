 // Print the invoice automatically when the page loads
 window.onload = function() {
  window.print();
}

// Activity logging
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log invoice generation
logAdminActivity('Generated invoice for order #12346');

// Prevent accidental navigation away from the page
window.onbeforeunload = function() {
  return "Are you sure you want to leave this page? The invoice may not be printed if you continue.";
}