 // Simulated customer data
 const customers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "555-0101", totalOrders: 5, totalSpent: 450.00, lastOrderDate: "2023-05-15" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "555-0102", totalOrders: 3, totalSpent: 275.50, lastOrderDate: "2023-04-22" },
  { id: 3, name: "Carol Davis", email: "carol@example.com", phone: "555-0103", totalOrders: 8, totalSpent: 720.75, lastOrderDate: "2023-05-18" },
  { id: 4, name: "David Brown", email: "david@example.com", phone: "555-0104", totalOrders: 2, totalSpent: 150.25, lastOrderDate: "2023-03-10" },
  { id: 5, name: "Eve Wilson", email: "eve@example.com", phone: "555-0105", totalOrders: 6, totalSpent: 550.00, lastOrderDate: "2023-05-05" },
];

// Function to display customers
function displayCustomers(customersToDisplay = customers) {
  const tableBody = document.getElementById('customerTableBody');
  tableBody.innerHTML = '';
  
  customersToDisplay.forEach(customer => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${customer.id}</td>
      <td>${customer.name}</td>
      <td>${customer.email}</td>
      <td>${customer.phone}</td>
      <td>${customer.totalOrders}</td>
      <td>$${customer.totalSpent.toFixed(2)}</td>
      <td>${customer.lastOrderDate}</td>
      <td>
        <button onclick="viewCustomer(${customer.id})">View</button>
        <button onclick="editCustomer(${customer.id})">Edit</button>
        <button onclick="deleteCustomer(${customer.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

// Search functionality
document.getElementById('customerSearch').addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm) ||
    customer.email.toLowerCase().includes(searchTerm) ||
    customer.phone.includes(searchTerm)
  );
  displayCustomers(filteredCustomers);
});

// Modal functionality
const modal = document.getElementById("customerModal");
const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function openModal(title, content) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalContent").innerHTML = content;
  modal.style.display = "block";
}

// Customer actions
function viewCustomer(id) {
  const customer = customers.find(c => c.id === id);
  if (customer) {
    const content = `
      <p><strong>Name:</strong> ${customer.name}</p>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>Total Orders:</strong> ${customer.totalOrders}</p>
      <p><strong>Total Spent:</strong> $${customer.totalSpent.toFixed(2)}</p>
      <p><strong>Last Order Date:</strong> ${customer.lastOrderDate}</p>
    `;
    openModal(`Customer Details: ${customer.name}`, content);
  }
}

function editCustomer(id) {
  const customer = customers.find(c => c.id === id);
  if (customer) {
    const content = `
      <form id="editCustomerForm">
        <label for="name">Name:</label>
        <input type="text" id="name" value="${customer.name}" required><br><br>
        <label for="email">Email:</label>
        <input type="email" id="email" value="${customer.email}" required><br><br>
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" value="${customer.phone}" required><br><br>
        <button type="submit">Save Changes</button>
      </form>
    `;
    openModal(`Edit Customer: ${customer.name}`, content);

    document.getElementById('editCustomerForm').onsubmit = function(e) {
      e.preventDefault();
      // Here you would typically send this data to your backend
      alert('Customer details updated!');
      modal.style.display = "none";
    };
  }
}

function deleteCustomer(id) {
  if (confirm(`Are you sure you want to delete customer with ID ${id}?`)) {
    // Here you would typically send a delete request to your backend
    alert(`Customer with ID ${id} deleted!`);
    // Refresh the customer list
    displayCustomers(customers.filter(c => c.id !== id));
  }
}

// Action buttons
document.getElementById('addCustomer').onclick = function() {
  const content = `
    <form id="addCustomerForm">
      <label for="name">Name:</label>
      <input type="text" id="name" required><br><br>
      <label for="email">Email:</label>
      <input type="email" id="email" required><br><br>
      <label for="phone">Phone:</label>
      <input type="tel" id="phone" required><br><br>
      <button type="submit">Add Customer</button>
    </form>
  `;
  openModal('Add New Customer', content);

  document.getElementById('addCustomerForm').onsubmit = function(e) {
    e.preventDefault();
    // Here you would typically send this data to your backend
    alert('New customer added!');
    modal.style.display = "none";
  };
};

document.getElementById('viewCustomer').onclick = function() {
  const content = `
    <p>Please select a customer from the table to view their details.</p>
  `;
  openModal('View Customer', content);
};

document.getElementById('editCustomer').onclick = function() {
  const content = `
    <p>Please select a customer from the table to edit their details.</p>
  `;
  openModal('Edit Customer', content);
};

document.getElementById('deleteCustomer').onclick = function() {
  const content = `
    <p>Please select a customer from the table to delete them.</p>
  `;
  openModal('Delete Customer', content);
};

document.getElementById('exportCustomers').onclick = function() {
  const content = `
    <p>Export your customer data in various formats:</p>
    <button onclick="exportData('csv')">Export as CSV</button>
    <button onclick="exportData('excel')">Export as Excel</button>
    <button onclick="exportData('json')">Export as JSON</button>
  `;
  openModal('Export Customer Data', content);
};

document.getElementById('importCustomers').onclick = function() {
  const content = `
    <form id="importForm">
      <label for="importFile">Choose file to import:</label>
      <input type="file" id="importFile" accept=".csv,.xlsx,.json" required><br><br>
      <button type="submit">Import Data</button>
    </form>
  `;
  openModal('Import Customer Data', content);

  document.getElementById('importForm').onsubmit = function(e) {
    e.preventDefault();
    // Here you would typically handle the file upload and import process
    alert('Customer data imported successfully!');
    modal.style.display = "none";
  };
};

document.getElementById('sendNewsletter').onclick = function() {
  const content = `
    <form id="newsletterForm">
      <label for="subject">Subject:</label>
      <input type="text" id="subject" required><br><br>
      <label for="content">Newsletter Content:</label><br>
      <textarea id="content" rows="10" cols="50" required></textarea><br><br>
      <button type="submit">Send Newsletter</button>
    </form>
  `;
  openModal('Send Newsletter', content);

  document.getElementById('newsletterForm').onsubmit = function(e) {
    e.preventDefault();
    // Here you would typically handle sending the newsletter
    alert('Newsletter sent successfully!');
    modal.style.display = "none";
  };
};

document.getElementById('customerSegmentation').onclick = function() {
  const content = `
    <p>Segment your customers based on:</p>
    <button onclick="segmentCustomers('purchases')">Purchase History</button>
    <button onclick="segmentCustomers('location')">Location</button>
    <button onclick="segmentCustomers('age')">Age Group</button>
  `;
  openModal('Customer Segmentation', content);
};

document.getElementById('loyaltyProgram').onclick = function() {
  const content = `
    <h3>Loyalty Program Management</h3>
    <button onclick="manageLoyaltyTiers()">Manage Loyalty Tiers</button>
    <button onclick="createLoyaltyOffer()">Create Special Offer</button>
    <button onclick="viewLoyaltyStats()">View Loyalty Statistics</button>
  `;
  openModal('Loyalty Program', content);
};

// Initial display of customers
displayCustomers();

// Log admin activity
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}



document.addEventListener('DOMContentLoaded', function() {
  
  // Log page access
logAdminActivity('Accessed Customer Management page');

  // Select all links in the sidebar
  const sidebarLinks = document.querySelectorAll('.sidebar a');
  
  // Add event listeners to each sidebar link
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent immediate navigation
      
      logAdminActivity('Clicked: ' + this.textContent);
      
      // Prompt the user for confirmation
      const confirmNavigation = confirm('Are you sure you want to navigate to ' + this.textContent + '?');
      
      if (confirmNavigation) {
        // If user confirms, navigate to the link's target
        window.location.href = this.href;
      } else {
        // If user cancels, explicitly do nothing (stay on the current page)
        console.log('Navigation cancelled by user');
      }
    });
  });

  console.log(`Added event listeners to ${sidebarLinks.length} sidebar links`);
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

// Logout functionality
document.querySelector('.logout-btn').addEventListener('click', () => {
  logAdminActivity('Logged out');
  alert('Logging out...');
  // In a real application, this would handle the logout process
  window.location.href = '/admin/logout';
});

// Additional functions (not implemented, just placeholders)
function exportData(format) {
  alert(`Exporting data in ${format} format...`);
}

function segmentCustomers(criteria) {
  alert(`Segmenting customers based on ${criteria}...`);
}

function manageLoyaltyTiers() {
  alert('Opening loyalty tier management...');
}

function createLoyaltyOffer() {
  alert('Creating new loyalty offer...');
}

function viewLoyaltyStats() {
  alert('Viewing loyalty program statistics...');
}