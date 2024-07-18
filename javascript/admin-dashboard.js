{/* <script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script> */}
    document.querySelector('.logout-btn').addEventListener('click', function() {
      alert('Logging out...');
      // In a real application, this would handle the logout process. but we can still make the href to redirect to the clint side page?
      window.location.href = '/admin/logout';
    });

    // Simulated real-time updates
    setInterval(function() {
      const newOrders = document.querySelector('.stat-item:nth-child(2) .stat-value');
      const currentOrders = parseInt(newOrders.textContent);
      newOrders.textContent = currentOrders + Math.floor(Math.random() * 3);
    }, 5000);

    // Activity logging
    function logAdminActivity(activity) {
      console.log('Admin activity:', activity);
      // In a real implementation, this would send logs to a secure server
    }

    document.addEventListener('DOMContentLoaded', function() {
      // Log page load
      logAdminActivity('Accessed written dashboard');
    
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

    // Log page load
    // logAdminActivity('Accessed written dashboard');

    // Log navigation clicks
    // document.querySelectorAll('.sidebar a, .quick-actions a').forEach(link => {
      // link.addEventListener('click', function(e) {
      //   e.preventDefault(); // Prevent actual navigation for this demo
    //     logAdminActivity('Clicked: ' + this.textContent);
    //   });
    // });

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
  