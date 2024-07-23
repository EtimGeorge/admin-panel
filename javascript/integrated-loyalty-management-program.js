let tiers = [
  { name: 'Bronze', minPoints: 0, discountPercentage: 5, benefits: ['5% off all purchases', 'Free shipping over $50', 'Early sale access'] },
  { name: 'Silver', minPoints: 1000, discountPercentage: 10, benefits: ['10% off all purchases', 'Free shipping always', 'Exclusive member events'] },
  { name: 'Gold', minPoints: 5000, discountPercentage: 15, benefits: ['15% off all purchases', 'Free next-day shipping', 'Annual complimentary pair'] }
];

function renderTierConfigs() {
  const tierConfigsContainer = document.getElementById('tierConfigs');
  tierConfigsContainer.innerHTML = '';
  
  tiers.forEach((tier, index) => {
    const tierConfig = document.createElement('div');
    tierConfig.className = 'tier-config';
    tierConfig.innerHTML = `
      <h4>Tier ${index + 1}</h4>
      <label for="tierName${index}">Name:</label>
      <input type="text" id="tierName${index}" value="${tier.name}" required>
      
      <label for="minPoints${index}">Minimum Points:</label>
      <input type="number" id="minPoints${index}" value="${tier.minPoints}" min="0" required>
      
      <label for="discountPercentage${index}">Discount Percentage:</label>
      <input type="number" id="discountPercentage${index}" value="${tier.discountPercentage}" min="0" max="100" required>
      
      <label for="benefits${index}">Benefits (comma-separated):</label>
      <input type="text" id="benefits${index}" value="${tier.benefits.join(', ')}" required>
      
      <button type="button" class="remove-tier-btn" onclick="removeTierConfig(${index})">Remove Tier</button>
    `;
    tierConfigsContainer.appendChild(tierConfig);
  });
}

function addTierConfig() {
  tiers.push({ name: 'New Tier', minPoints: 0, discountPercentage: 0, benefits: ['New benefit'] });
  renderTierConfigs();
  updateClientPreview();
}

function removeTierConfig(index) {
  tiers.splice(index, 1);
  renderTierConfigs();
  updateClientPreview();
}

function updateClientPreview() {
  const clientPreview = document.getElementById('clientPreview');
  const programName = document.getElementById('programName').value;
  const pointsPerDollar = document.getElementById('pointsPerDollar').value;
  
  let previewHTML = `
    <div class="loyalty-banner">
      <h3>Welcome to ${programName}!</h3>
      <p>Earn ${pointsPerDollar} points for every dollar spent!</p>
    </div>
    
    <div class="loyalty-benefits">
  `;
  
  tiers.forEach(tier => {
    previewHTML += `
      <div class="benefit-card">
        <h4>${tier.name} Tier</h4>
        <p>Minimum Points: ${tier.minPoints}</p>
        <p>Discount: ${tier.discountPercentage}% off</p>
        <ul>
          ${tier.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
      </div>
    `;
  });
  
  previewHTML += `
    </div>
    <button class="cta-button">Join Now and Start Earning!</button>
  `;
  
  clientPreview.innerHTML = previewHTML;
}

document.getElementById('loyaltyProgramForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  tiers = tiers.map((tier, index) => ({
    name: document.getElementById(`tierName${index}`).value,
    minPoints: parseInt(document.getElementById(`minPoints${index}`).value),
    discountPercentage: parseInt(document.getElementById(`discountPercentage${index}`).value),
    benefits: document.getElementById(`benefits${index}`).value.split(',').map(b => b.trim())
  }));
  
  updateClientPreview();
  alert('Loyalty Program updated successfully!');
});

// Initialize the page
renderTierConfigs();
updateClientPreview();

// Log admin activity
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

logAdminActivity('Accessed Integrated Loyalty Program Management page');

// Session timeout simulation
let sessionTimeout;
function resetSessionTimeout() {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(() => {
    alert('Your session has expired. Please log in again to continue managing the loyalty program.');
    window.location.href = '/admin/logout';
  }, 30 * 60 * 1000); // 30 minutes
}

// Reset timeout on user activity
document.addEventListener('click', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);

// Initial call to start the timeout
resetSessionTimeout();

// Add some flair with a custom cursor
const customCursor = document.createElement('div');
customCursor.style.position = 'fixed';
customCursor.style.width = '20px';
customCursor.style.height = '20px';
customCursor.style.borderRadius = '50%';
customCursor.style.backgroundColor = 'rgba(0, 255, 255, 0.5)';
customCursor.style.pointerEvents = 'none';
customCursor.style.zIndex = '9999';
customCursor.style.transition = 'transform 0.1s ease';
document.body.appendChild(customCursor);

document.addEventListener('mousemove', (e) => {
  customCursor.style.left = e.clientX + 'px';
  customCursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  customCursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
  customCursor.style.transform = 'scale(1)';
});