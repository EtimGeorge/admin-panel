function startExport(format) {
  const progressBar = document.getElementById(`${format}Progress`);
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = `${progress}%`;
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        alert(`${format.toUpperCase()} export completed successfully!`);
        progressBar.style.width = '0%';
        generatePreview(format);
      }, 500);
    }
  }, 200);
}

function updateDataSource() {
  const dataSource = document.getElementById('dataSource').value;
  logAdminActivity(`Changed data source to: ${dataSource}`);
  // In a real implementation, this would update the data source for exports
}

function updateSelectionType() {
  const selectionType = document.getElementById('selectionType').value;
  const individualSelection = document.getElementById('individualSelection');
  const groupSelection = document.getElementById('groupSelection');

  individualSelection.style.display = selectionType === 'individual' ? 'block' : 'none';
  groupSelection.style.display = selectionType === 'group' ? 'block' : 'none';

  logAdminActivity(`Changed customer selection type to: ${selectionType}`);
}

function toggleAllCustomers() {
  const selectAll = document.getElementById('selectAll');
  const customerCheckboxes = document.querySelectorAll('.customer-item input[type="checkbox"]');

  customerCheckboxes.forEach(checkbox => {
    checkbox.checked = selectAll.checked;
  });

  logAdminActivity(`${selectAll.checked ? 'Selected' : 'Deselected'} all customers`);
}

function generatePreview(format) {
  const previewContent = document.getElementById('previewContent');
  let preview = '';

  switch (format) {
    case 'csv':
      preview = 'ID,Name,Email,Phone,Last Purchase\n1001,Alice Johnson,alice@example.com,555-0101,2023-05-15\n1002,Bob Smith,bob@example.com,555-0102,2023-06-01\n1003,Carol Davis,carol@example.com,555-0103,2023-05-30';
      break;
    case 'excel':
      preview = 'Excel export preview not available in this interface.\nActual export would be a .xlsx file.';
      break;
    case 'json':
      preview = '[\n  {\n    "id": 1001,\n    "name": "Alice Johnson",\n    "email": "alice@example.com",\n    "phone": "555-0101",\n    "lastPurchase": "2023-05-15"\n  },\n  {\n    "id": 1002,\n    "name": "Bob Smith",\n    "email": "bob@example.com",\n    "phone": "555-0102",\n    "lastPurchase": "2023-06-01"\n  }\n]';
      break;
    case 'xml':
      preview = '<?xml version="1.0" encoding="UTF-8"?>\n<customers>\n  <customer>\n    <id>1001</id>\n    <name>Alice Johnson</name>\n    <email>alice@example.com</email>\n    <phone>555-0101</phone>\n    <lastPurchase>2023-05-15</lastPurchase>\n  </customer>\n  <customer>\n    <id>1002</id>\n    <name>Bob Smith</name>\n    <email>bob@example.com</email>\n    <phone>555-0102</phone>\n    <lastPurchase>2023-06-01</lastPurchase>\n  </customer>\n</customers>';
      break;
    case 'pdf':
      preview = 'PDF export preview not available in this interface.\nActual export would be a formatted PDF document.';
      break;
    case 'word':
      preview = 'MS Word export preview not available in this interface.\nActual export would be a formatted .docx file.';
      break;
    default:
      preview = 'Preview not available for this format.';
  }

  previewContent.textContent = preview;
}

// Log admin activity
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page access
logAdminActivity('Accessed Customer Data Export page');

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