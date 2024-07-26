const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const twoFactorAuth = document.getElementById('twoFactorAuth');
    const twoFactorCode = document.getElementById('twoFactorCode');
    const verifyCodeButton = document.getElementById('verifyCode');

    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Simulate API call to verify credentials
      if (username === 'admin' && password === 'password123') {
        errorMessage.textContent = '';
        loginForm.style.display = 'none';
        twoFactorAuth.style.display = 'block';
        // In a real scenario, this would trigger sending a 2FA code to the admin's device
        console.log('2FA code sent to admin\'s device');
      } else {
        errorMessage.textContent = 'Invalid username or password';
      }
    });

    verifyCodeButton.addEventListener('click', function() {
      const code = twoFactorCode.value;
      // Simulate API call to verify 2FA code
      if (code === '123456') {
        // Redirect to admin dashboard
        window.location.href ="./html/admin-dashboard.html";
      } else {
        errorMessage.textContent = 'Invalid verification code';
      }
    });

    // Implement secure session management
    function setSecureSession() {
      // In a real implementation, this would set a secure, HttpOnly cookie
      // and possibly store some session data in server-side storage
      console.log('Secure session established');
    }

    // Implement CSRF protection
    function addCSRFProtection() {
      // In a real implementation, this would add a CSRF token to all forms and AJAX requests
      console.log('CSRF protection added');
    }

    // Implement rate limiting
    let loginAttempts = 0;
    function checkRateLimit() {
      loginAttempts++;
      if (loginAttempts > 5) {
        errorMessage.textContent = 'Too many login attempts. Please try again later.';
        loginForm.querySelector('button').disabled = true;
      }
    }

    // Simulated admin dashboard redirect
    function redirectToDashboard() {
      console.log('Redirecting to admin dashboard...');
      // In a real scenario, this would navigate to the actual dashboard page
      alert('Welcome to the admin dashboard!');
    }

    // Add these security measures to the login process
    loginForm.addEventListener('submit', function(e) {
      checkRateLimit();
      // Other login logic...
    });

    verifyCodeButton.addEventListener('click', function() {
      // Verify 2FA code logic...
      setSecureSession();
      addCSRFProtection();
      redirectToDashboard();
    });


     // Add a custom cursor effect
     const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    cursor.style.pointerEvents = 'none';
    cursor.style.transition = 'transform 0.1s ease';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'scale(1)';
    });
    
    // Add some visual flair with animated background particles
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '-1';
    document.body.appendChild(particlesContainer);
    
    function createParticle() {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.width = '5px';
      particle.style.height = '5px';
      particle.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      const endX = Math.random() * window.innerWidth;
      const endY = Math.random() * window.innerHeight;
      
      particle.style.left = startX + 'px';
      particle.style.top = startY + 'px';
      
      particlesContainer.appendChild(particle);
      
      particle.animate([
        { transform: `translate(0, 0)`, opacity: 0 },
        { opacity: 1, offset: 0.2 },
        { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
      ], {
        duration: 5000 + Math.random() * 5000,
        easing: 'ease-out'
      }).onfinish = () => {
        particle.remove();
        createParticle();
      };
    }
    
    for (let i = 0; i < 50; i++) {
      createParticle();
    }