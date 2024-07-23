function editCustomer() {
  const customerId = getCurrentCustomerId(); // Implement this function to get the current customer's ID
  window.location.href = `../html/customer-edit-customer.html?id=${customerId}`;
}
  // function editCustomer() {
  //   window.location.href = '../html/customer-edit-customer.html';
  // }
  
  function sendEmail() {
    alert('Opening email composer...');
    // In a real application, this would open an email composition interface
  }
  
  function addNote() {
    const note = prompt('Enter a note for Alice Johnson:');
    if (note) {
      alert('Note added successfully!');
      // In a real application, this would save the note to the customer's record
    }
  }
  
  function viewNotes() {
    alert('Opening customer notes...');
    // In a real application, this would display a list of notes for the customer
  }
  
  // Log admin activity
  function logAdminActivity(activity) {
    console.log('Admin activity:', activity);
    // In a real implementation, this would send logs to a secure server
  }
  
  // Log page access
  logAdminActivity('Viewed customer profile for Alice Johnson');
  
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