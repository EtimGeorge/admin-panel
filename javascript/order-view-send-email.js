document.querySelector('.logout-btn').addEventListener('click', function() {
  alert('Logging out...');
  // In a real application, this would handle the logout process
  window.location.href = '/admin/logout';
});

document.getElementById('sendEmailForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  const attachInvoice = document.getElementById('attachInvoice').checked;
  
  alert(`Email sent to customer:\nSubject: ${subject}\nMessage: ${message}\nInvoice attached: ${attachInvoice}`);
  
  // In a real application, this would send the email and possibly log the action
  logAdminActivity(`Sent email to customer (Order #12346) - Subject: ${subject}`);
  
  // Reset form
  this.reset();
});

document.getElementById('cancelBtn').addEventListener('click', function() {
  if (confirm('Are you sure you want to cancel this email?')) {
    window.location.href = '#orders/view/written';
  }
});

// Email template functionality
document.querySelectorAll('.template-item').forEach(item => {
  item.addEventListener('click', function() {
    const template = this.dataset.template;
    let subject, message;
    
    switch(template) {
      case 'order-confirmation':
        subject = 'Your Order #12346 Has Been Confirmed';
        message = 'Dear Jane Smith,\n\nThank you for your order! This email is to confirm that your order #12346 has been received and is being processed.\n\nWe will notify you once your order has shipped.\n\nBest regards,\nBarb\'s Shoe Store';
        break;
      case 'shipping-update':
        subject = 'Your Order #12346 Has Shipped';
        message = 'Dear Jane Smith,\n\nGreat news! Your order #12346 has been shipped.\n\nYou can track your package using the following tracking number: ABC123XYZ.\n\nThank you for choosing Barb\'s Shoe Store!\n\nBest regards,\nBarb\'s Shoe Store';
        break;
      case 'order-delivered':
        subject = 'Your Order #12346 Has Been Delivered';
        message = 'Dear Jane Smith,\n\nYour order #12346 has been delivered! We hope you love your new shoes.\n\nIf you have any issues or questions, please don\'t hesitate to contact us.\n\nEnjoy your purchase!\n\nBest regards,\nBarb\'s Shoe Store';
        break;
      case 'feedback-request':
        subject = 'How Did We Do? Feedback for Order #12346';
        message = 'Dear Jane Smith,\n\nWe hope you\'re enjoying your recent purchase from Barb\'s Shoe Store.\n\nWe\'d love to hear about your experience. Could you take a moment to leave us a review?\n\nYour feedback helps us improve and assists other customers in making informed decisions.\n\nThank you for your time!\n\nBest regards,\nBarb\'s Shoe Store';
        break;
      case 'return-instructions':
        subject = 'Return Instructions for Order #12346';
        message = 'Dear Jane Smith,\n\nWe\'re sorry to hear that you wish to return your order #12346. Please follow these steps to process your return:\n\n1. Pack the item(s) in their original packaging.\n2. Include a copy of your order invoice.\n3. Ship the package to our returns address: 123 Return St, Returnville, ST 54321\n\nOnce we receive and process your return, we\'ll issue a refund to your original payment method.\n\nIf you have any questions, please don\'t hesitate to contact us.\n\nBest regards,\nBarb\'s Shoe Store';
        break;
    }
    
    document.getElementById('subject').value = subject;
    document.getElementById('message').value = message;
  });
});

// Activity logging
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page load
logAdminActivity('Accessed email composition page for order #12346');

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