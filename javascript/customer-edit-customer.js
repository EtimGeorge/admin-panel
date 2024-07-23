// At the beginning of your script
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  const customerId = urlParams.get('id');
  
  if (customerId) {
      fetchCustomerData(customerId);
  } else {
      console.error('No customer ID provided');
      // Handle the error - maybe redirect to the customer list or show an error message
  }
});

function fetchCustomerData(customerId) {

  // Remember to replace the fetchCustomerData function with an actual API call to your backend in a real application. Also, ensure that your backend can handle receiving and updating customer data based on the customer ID.
  // In a real application, you would make an API call here
  // For now, we'll simulate it with a timeout
  setTimeout(() => {
      // This is dummy data. In a real app, this would come from your server
      const customerData = {
          name: 'Alice Johnson',
          email: 'alice@example.com',
          phone: '+1 555-0101',
          birthdate: '1985-07-15',
          address: '123 Main St, Anytown, USA',
          shoeSize: '8',
          preferredStyle: 'casual',
          loyaltyTier: 'silver',
          newsletter: true,
          smsNotifications: true
      };
      populateForm(customerData);
  }, 500);
}

function populateForm(customerData) {
  document.getElementById('name').value = customerData.name;
  document.getElementById('email').value = customerData.email;
  
  // Handle phone number
  const [countryCode, ...phoneRest] = customerData.phone.split(' ');
  document.getElementById('countryCode').value = countryCode;
  document.getElementById('phone').value = phoneRest.join(' ');
  
  document.getElementById('birthdate').value = customerData.birthdate;
  document.getElementById('address').value = customerData.address;
  document.getElementById('shoeSize').value = customerData.shoeSize;
  document.getElementById('preferredStyle').value = customerData.preferredStyle;
  document.getElementById('loyaltyTier').value = customerData.loyaltyTier;
  document.getElementById('newsletter').checked = customerData.newsletter;
  document.getElementById('smsNotifications').checked = customerData.smsNotifications;

  // Update customer avatar
  const avatar = document.getElementById('customerAvatar');
  avatar.textContent = customerData.name.split(' ').map(n => n[0]).join('').toUpperCase();
}



// Customer avatar interaction
const customerAvatar = document.getElementById('customerAvatar');
customerAvatar.addEventListener('click', () => {
  alert('Feature coming soon: Upload customer profile picture');
});

// Form submission
const editCustomerForm = document.getElementById('editCustomerForm');

editCustomerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(editCustomerForm);
  const customerData = Object.fromEntries(formData.entries());
  
  // Add the customer ID to the data being sent
  const urlParams = new URLSearchParams(window.location.search);
  customerData.id = urlParams.get('id');

  // Combine country code and phone number
  customerData.phone = `${customerData.countryCode} ${customerData.phone}`;
  delete customerData.countryCode;

  console.log('Customer data to be sent:', customerData);
  // Here you would typically send the customerData to your backend
  alert('Customer information updated successfully!');
  // Redirect to customer list or show success message
});

// editCustomerForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const formData = new FormData(editCustomerForm);
//   const customerData = Object.fromEntries(formData.entries());
  
  // Combine country code and phone number
  // customerData.phone = `${customerData.countryCode} ${customerData.phone}`;
  // delete customerData.countryCode;

  // console.log('Customer data to be sent:', customerData);
  // Here you would typically send the customerData to your backend
  // alert('Customer information updated successfully!');
  // Redirect to customer list or show success message
// });

// Cancel button
const cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
    // Redirect back to customer list
    window.location.href = 'https://barbshoestore.com/admin/#customers';
  }
});

// Logout functionality
const logoutBtn = document.querySelector('.logout-btn');
logoutBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to log out?')) {
    // Perform logout action here
    alert('Logging out...');
    // Redirect to login page
    window.location.href = 'https://barbshoestore.com/admin/login';
  }
});

// Log admin activity
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page access
logAdminActivity('Accessed Edit Customer page');

// Session timeout simulation
let sessionTimeout;
function resetSessionTimeout() {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(() => {
    alert('Your session has expired. Please log in again.');
    window.location.href = 'https://barbshoestore.com/admin/logout';
  }, 30 * 60 * 1000); // 30 minutes
}

// Reset timeout on user activity
document.addEventListener('click', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);

// Initial call to start the timeout
resetSessionTimeout();

// Initialize country code select
const countryCodeSelect = document.getElementById('countryCode');
const phoneInput = document.getElementById('phone');

// Set initial country code based on the existing phone number
function setInitialCountryCode() {
  const phoneNumber = phoneInput.value;
  if (phoneNumber.startsWith('+')) {
    const code = phoneNumber.split(' ')[0];
    countryCodeSelect.value = code;
    phoneInput.value = phoneNumber.replace(code + ' ', '');
  }
}

setInitialCountryCode();

// Update phone input placeholder based on selected country
countryCodeSelect.addEventListener('change', () => {
  const selectedCountry = countryCodeSelect.options[countryCodeSelect.selectedIndex].text;
  const countryName = selectedCountry.split(' ')[1].replace(/[()]/g, '');
  phoneInput.placeholder = `Enter ${countryName} phone number`;
});