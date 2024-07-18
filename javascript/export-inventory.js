
    document.querySelector('.logout-btn').addEventListener('click', function() {
      alert('Logging out...');
      // In a real application, this would handle the logout process
      window.location.href = '/admin/logout';
    });

    document.getElementById('inventoryExportForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const format = document.getElementById('exportFormat').value;
      const startDate = document.getElementById('startDate').value;
      const endDate = document.getElementById('endDate').value;
      const fields = Array.from(document.querySelectorAll('input[name="fields"]:checked')).map(cb => cb.value);
      
      // Simulated export data
      const exportData = [
        {sku: 'SHO001', name: 'Classic Oxford', category: "Men's Formal", price: 89.99, stock: 50, status: 'In Stock'},
        {sku: 'SHO002', name: 'Running Sneaker', category: 'Sports', price: 129.99, stock: 75, status: 'In Stock'},
        {sku: 'SHO003', name: 'High Heels', category: "Women's Formal", price: 99.99, stock: 10, status: 'Low Stock'},
      ];

      let preview = '';
      
      if (format === 'csv') {
        preview = fields.join(',') + '\n';
        exportData.forEach(item => {
          preview += fields.map(field => item[field]).join(',') + '\n';
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
        preview = '<?xml version="1.0" encoding="UTF-8"?>\n<inventory>\n';
        exportData.forEach(item => {
          preview += '  <product>\n';
          fields.forEach(field => {
            preview += `    <${field}>${item[field]}</${field}>\n`;
          });
          preview += '  </product>\n';
        });
        preview += '</inventory>';
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
    logAdminActivity('Accessed inventory export page');

    // Log export generation
    document.getElementById('inventoryExportForm').addEventListener('submit', function() {
      logAdminActivity('Generated inventory export');
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
  