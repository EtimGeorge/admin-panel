 // Simulated customer data
 const customers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "555-0101", totalOrders: 5, totalSpent: 450.00 },
  { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "555-0102", totalOrders: 3, totalSpent: 275.50 },
  { id: 3, name: "Carol Davis", email: "carol@example.com", phone: "555-0103", totalOrders: 8, totalSpent: 720.75 },
  { id: 4, name: "David Brown", email: "david@example.com", phone: "555-0104", totalOrders: 2, totalSpent: 150.25 },
  { id: 5, name: "Eve Wilson", email: "eve@example.com", phone: "555-0105", totalOrders: 6, totalSpent: 550.00 },
];

document.getElementById('customerSelect').addEventListener('change', function() {
  const customerId = this.value;
  const customerInfo = document.getElementById('customerInfo');
  
  if (customerId) {
    const customer = customers.find(c => c.id === parseInt(customerId));
    if (customer) {
      document.getElementById('customerName').textContent = `Name: ${customer.name}`;
      document.getElementById('customerEmail').textContent = `Email: ${customer.email}`;
      document.getElementById('customerPhone').textContent = `Phone: ${customer.phone}`;
      document.getElementById('customerOrders').textContent = `Total Orders: ${customer.totalOrders}`;
      document.getElementById('customerSpent').textContent = `Total Spent: $${customer.totalSpent.toFixed(2)}`;
      customerInfo.style.display = 'block';
    }
  } else {
    customerInfo.style.display = 'none';
  }
});

document.getElementById('deleteReason').addEventListener('change', function() {
  const otherReasonGroup = document.getElementById('otherReasonGroup');
  if (this.value === 'other') {
    otherReasonGroup.style.display = 'block';
  } else {
    otherReasonGroup.style.display = 'none';
  }
});

document.getElementById('deleteCustomerForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const customerId = document.getElementById('customerSelect').value;
  const deleteReason = document.getElementById('deleteReason').value;
  const otherReason = document.getElementById('otherReason').value;
  const confirmed = document.getElementById('confirmDelete').checked;

  if (!customerId || !deleteReason || !confirmed) {
    alert('Please fill in all required fields and confirm the deletion.');
    return;
  }

  const reason = deleteReason === 'other' ? otherReason : deleteReason;

  // In a real application, you would send this data to your backend
  console.log(`Deleting customer ${customerId} for reason: ${reason}`);
  alert(`Customer ${customerId} has been deleted from the system.`);

  // Reset form
  this.reset();
  document.getElementById('customerInfo').style.display = 'none';
  document.getElementById('otherReasonGroup').style.display = 'none';
});

// Logout functionality
document.querySelector('.logout-btn').addEventListener('click', () => {
  console.log('Admin logged out');
  alert('Logging out...');
  // In a real application, this would handle the logout process
  window.location.href = '/admin/logout';
});

// Log admin activity
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page access
logAdminActivity('Accessed Delete Customer page');

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