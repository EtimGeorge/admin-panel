document.querySelector('.logout-btn').addEventListener('click', function() {
  alert('Logging out...');
  // In a real application, this would handle the logout process
  window.location.href = '/admin/logout';
});

document.getElementById('updateStatusForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const newStatus = document.getElementById('newStatus').value;
  const statusNote = document.getElementById('statusNote').value;
  const notifyCustomer = document.getElementById('notifyCustomer').checked;
  
  alert(`Status updated to ${newStatus}.\nNote: ${statusNote}\nNotify customer: ${notifyCustomer}`);
  
  // In a real application, this would send the update to the server
  // and refresh the page or update the UI accordingly
  
  // Add new status to history
  const statusHistory = document.querySelector('.status-history ul');
  const newStatusItem = document.createElement('li');
  const now = new Date();
  newStatusItem.innerHTML = `
    <span class="status-date">${now.toLocaleString()}</span>
    <span class="status-label" style="background-color: var(--primary-color); color: var(--background-color);">${newStatus}</span>
    <p>${statusNote}</p>
  `;
  statusHistory.insertBefore(newStatusItem, statusHistory.firstChild);
  
  // Reset form
  this.reset();
});

document.getElementById('cancelBtn').addEventListener('click', function() {
  if (confirm('Are you sure you want to cancel this update?')) {
    window.location.href = '#orders/view/written';
  }
});

// Activity logging
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page load
logAdminActivity('Accessed order status update page for order #12346');

// Session timeout simulation
let sessionTimeout;
function resetSessionTimeout() {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(() => {
    alert('Your session has expired. Please log in again.');
    window.location.href = '/admin/logout';
  }, 5 * 60 * 1000); // 5 minutes
}

// Reset timeout on user activity
document.addEventListener('click', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);

// Initial call to start the timeout
resetSessionTimeout();