document.querySelector('.logout-btn').addEventListener('click', function() {
  alert('Logging out...');
  // In a real application, this would handle the logout process
  window.location.href = '/admin/logout';
});

document.getElementById('orderExportForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const format = document.getElementById('exportFormat').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const status = document.getElementById('orderStatus').value;
  const fields = Array.from(document.querySelectorAll('input[name="fields"]:checked')).map(cb => cb.value);
  
  // Simulated export data
  const exportData = [
    {
      orderId: '#12345',
      customerName: 'John Doe',
      orderDate: '2023-07-15',
      totalAmount: 189.98,
      status: 'Shipped',
      items: ['Classic Oxford (1)', 'Running Sneaker (1)'],
      shippingAddress: '123 Main St, Anytown, AN 12345',
      paymentMethod: 'Credit Card'
    },
    {
      orderId: '#12346',
      customerName: 'Jane Smith',
      orderDate: '2023-07-16',
      totalAmount: 259.97,
      status: 'Processing',
      items: ['High Heels (2)', 'Running Sneaker (1)'],
      shippingAddress: '456 Oak Rd, Somewhere, SM 67890',
      paymentMethod: 'PayPal'
    }
  ];

  let preview = '';
  
  if (format === 'csv') {
    preview = fields.join(',') + '\n';
    exportData.forEach(item => {
      preview += fields.map(field => {
        if (field === 'items') return '"' + item[field].join(', ') + '"';
        return item[field];
      }).join(',') + '\n';
    });
  } else if (format === 'json') {
    preview = JSON.stringify(exportData.map(item => {
      const filtered = {};
      fields.forEach(field => {
        filtered[field] = item[field];
      });
      return filtered;
    }), null, 2);
  } else if (format === 'xml') {
    preview = '<?xml version="1.0" encoding="UTF-8"?>\n<orders>\n';
    exportData.forEach(item => {
      preview += '  <order>\n';
      fields.forEach(field => {
        if (field === 'items') {
          preview += '    <items>\n';
          item[field].forEach(i => {
            preview += `      <item>${i}</item>\n`;
          });
          preview += '    </items>\n';
        } else {
          preview += `    <${field}>${item[field]}</${field}>\n`;
        }
      });
      preview += '  </order>\n';
    });
    preview += '</orders>';
  }

  document.getElementById('exportPreview').textContent = preview;
  
  alert('Export generated! Check the preview below.');
});

// Activity logging
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page load
logAdminActivity('Accessed order export page');

// Log export generation
document.getElementById('orderExportForm').addEventListener('submit', function() {
  logAdminActivity('Generated order export');
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