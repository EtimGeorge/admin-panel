const modal = document.getElementById("segmentationModal");
const span = document.getElementsByClassName("close")[0];
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function showSegmentationModal(criteria) {
  modalTitle.textContent = `Group Customers by ${criteria.charAt(0).toUpperCase() + criteria.slice(1)}`;
  
  let content = `
    <p>Select the grouping criteria for ${criteria}:</p>
    <form id="segmentationForm">
  `;
  
  switch(criteria) {
    case 'purchases':
      content += `
        <label><input type="checkbox" name="group" value="high"> High Spenders</label><br>
        <label><input type="checkbox" name="group" value="medium"> Medium Spenders</label><br>
        <label><input type="checkbox" name="group" value="low"> Low Spenders</label><br>
      `;
      break;
    case 'location':
      content += `
        <label><input type="checkbox" name="group" value="urban"> Urban</label><br>
        <label><input type="checkbox" name="group" value="suburban"> Suburban</label><br>
        <label><input type="checkbox" name="group" value="rural"> Rural</label><br>
      `;
      break;
    case 'age':
      content += `
        <label><input type="checkbox" name="group" value="18-24"> 18-24</label><br>
        <label><input type="checkbox" name="group" value="25-34"> 25-34</label><br>
        <label><input type="checkbox" name="group" value="35-44"> 35-44</label><br>
        <label><input type="checkbox" name="group" value="45+"> 45+</label><br>
      `;
      break;
    case 'preferences':
      content += `
        <label><input type="checkbox" name="group" value="athletic"> Athletic</label><br>
        <label><input type="checkbox" name="group" value="casual"> Casual</label><br>
        <label><input type="checkbox" name="group" value="formal"> Formal</label><br>
        <label><input type="checkbox" name="group" value="specialty"> Specialty</label><br>
      `;
      break;
    case 'lifetime_value':
      content += `
        <label><input type="checkbox" name="group" value="high"> High CLV</label><br>
        <label><input type="checkbox" name="group" value="medium"> Medium CLV</label><br>
        <label><input type="checkbox" name="group" value="low"> Low CLV</label><br>
      `;
      break;
    case 'engagement':
      content += `
        <label><input type="checkbox" name="group" value="high"> Highly Engaged</label><br>
        <label><input type="checkbox" name="group" value="moderate"> Moderately Engaged</label><br>
        <label><input type="checkbox" name="group" value="low"> Rarely Engaged</label><br>
      `;
      break;
  }
  
  content += `
      <br>
      <button type="submit">Group Customers</button>
    </form>
  `;
  
  modalContent.innerHTML = content;
  
  document.getElementById('segmentationForm').onsubmit = function(e) {
    e.preventDefault();
    const selectedGroups = Array.from(document.querySelectorAll('input[name="group"]:checked')).map(input => input.value);
    segmentCustomers(criteria, selectedGroups);
    modal.style.display = "none";
  };
  
  modal.style.display = "block";
}

function segmentCustomers(criteria, selectedGroups) {
  // Simulated segmentation data
  const segmentationData = {
    purchases: [
      {name: "High Spenders", value: 30},
      {name: "Medium Spenders", value: 45},
      {name: "Low Spenders", value: 25}
    ],
    location: [
      {name: "Urban", value: 60},
      {name: "Suburban", value: 30},
      {name: "Rural", value: 10}
    ],
    age: [
      {name: "18-24", value: 20},
      {name: "25-34", value: 35},
      {name: "35-44", value: 25},
      {name: "45+", value: 20}
    ],
    preferences: [
      {name: "Athletic", value: 40},
      {name: "Casual", value: 30},
      {name: "Formal", value: 20},
      {name: "Specialty", value: 10}
    ],
    lifetime_value: [
      {name: "High CLV", value: 20},
      {name: "Medium CLV", value: 50},
      {name: "Low CLV", value: 30}
    ],
    engagement: [
      {name: "Highly Engaged", value: 25},
      {name: "Moderately Engaged", value: 40},
      {name: "Rarely Engaged", value: 35}
    ]
  };

  const data = segmentationData[criteria].filter(segment => 
    selectedGroups.includes(segment.name.toLowerCase().split(' ')[0])
  );
  
  // Clear previous chart and table
  document.getElementById('segmentationChart').innerHTML = '';
  document.getElementById('customerTable').innerHTML = '';
  
  // Create new chart
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "400");
  svg.setAttribute("viewBox", "0 0 400 400");
  
  const total = data.reduce((sum, segment) => sum + segment.value, 0);
  let startAngle = 0;
  
  data.forEach((segment, index) => {
    const percentage = segment.value / total;
    const endAngle = startAngle + percentage * 2 * Math.PI;
    
    const x1 = 200 + 180 * Math.cos(startAngle);
    const y1 = 200 + 180 * Math.sin(startAngle);
    const x2 = 200 + 180 * Math.cos(endAngle);
    const y2 = 200 + 180 * Math.sin(endAngle);
    
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M200,200 L${x1},${y1} A180,180 0 ${percentage > 0.5 ? 1 : 0},1 ${x2},${y2} Z`);
    path.setAttribute("fill", `hsl(${index * 360 / data.length}, 70%, 50%)`);
    
    svg.appendChild(path);
    
    // Add label
    const labelAngle = startAngle + percentage * Math.PI;
    const labelX = 200 + 210 * Math.cos(labelAngle);
    const labelY = 200 + 210 * Math.sin(labelAngle);
    
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", labelX);
    text.setAttribute("y", labelY);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#FFFFFF");
    text.textContent = `${segment.name} (${Math.round(percentage * 100)}%)`;
    
    svg.appendChild(text);
    
    startAngle = endAngle;
  });
  
  document.getElementById('segmentationChart').appendChild(svg);

  // Create customer table
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>${criteria.charAt(0).toUpperCase() + criteria.slice(1)}</th>
        <th>Last Purchase</th>
        <th>Total Spent</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

  // Simulated customer data
  const customers = [
    { name: "John Doe", email: "john@example.com", segment: "High Spenders", lastPurchase: "2023-06-15", totalSpent: "$1,200" },
    { name: "Jane Smith", email: "jane@example.com", segment: "Medium Spenders", lastPurchase: "2023-06-10", totalSpent: "$650" },
    { name: "Bob Johnson", email: "bob@example.com", segment: "Low Spenders", lastPurchase: "2023-05-28", totalSpent: "$150" },
    { name: "Alice Brown", email: "alice@example.com", segment: "High Spenders", lastPurchase: "2023-06-18", totalSpent: "$980" },
    { name: "Charlie Wilson", email: "charlie@example.com", segment: "Medium Spenders", lastPurchase: "2023-06-05", totalSpent: "$520" },
  ];

  const tbody = table.querySelector('tbody');
  customers.forEach(customer => {
    if (selectedGroups.includes(customer.segment.toLowerCase().split(' ')[0])) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${customer.name}</td>
        <td>${customer.email}</td>
        <td>${customer.segment}</td>
        <td>${customer.lastPurchase}</td>
        <td>${customer.totalSpent}</td>
      `;
      tbody.appendChild(row);
    }
  });

  document.getElementById('customerTable').appendChild(table);
}

// Log admin activity
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page access
logAdminActivity('Accessed Customer Segmentation page');

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