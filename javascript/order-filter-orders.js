document.querySelector('.logout-btn').addEventListener('click', function() {
  alert('Logging out...');
  // In a real application, this would handle the logout process
  window.location.href = '/admin/logout';
});

document.getElementById('orderFilterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Simulate filtering process
  const filteredOrders = [
    {id: '#12345', customer: 'John Doe', date: '2023-07-15', total: '$189.98', status: 'Shipped', paymentMethod: 'Credit Card'},
    {id: '#12346', customer: 'Jane Smith', date: '2023-07-16', total: '$259.97', status: 'Processing', paymentMethod: 'PayPal'},
    {id: '#12347', customer: 'Bob Johnson', date: '2023-07-17', total: '$99.99', status: 'Pending', paymentMethod: 'Bank Transfer'}
  ];
  
  const resultsBody = document.getElementById('filterResultsBody');
  resultsBody.innerHTML = '';
  
  filteredOrders.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.customer}</td>
      <td>${order.date}</td>
      <td>${order.total}</td>
      <td>${order.status}</td>
      <td>${order.paymentMethod}</td>
    `;
    resultsBody.appendChild(row);
  });
  
  alert('Filters applied! Check the results table below.');
});

// Activity logging
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page load
logAdminActivity('Accessed order filter page');

// Log filter application
document.getElementById('orderFilterForm').addEventListener('submit', function() {
  logAdminActivity('Applied order filters');
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