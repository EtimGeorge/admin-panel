 // Modal functionality
 const modal = document.getElementById("modal");
 const span = document.getElementsByClassName("close")[0];
 const modalTitle = document.getElementById("modalTitle");
 const modalContent = document.getElementById("modalContent");

 function openModal(title, content) {
   modalTitle.textContent = title;
   modalContent.innerHTML = content;
   modal.style.display = "block";
 }

 span.onclick = function() {
   modal.style.display = "none";
 }

 window.onclick = function(event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }

 // Edit Tier
 document.querySelectorAll('.edit-tier').forEach(button => {
   button.addEventListener('click', function() {
     const tier = this.getAttribute('data-tier');
     const content = `
       <form id="editTierForm">
         <label for="tierName">Tier Name:</label>
         <input type="text" id="tierName" value="${tier}" required><br><br>
         <label for="tierBenefits">Tier Benefits (one per line):</label><br>
         <textarea id="tierBenefits" rows="5" cols="50" required></textarea><br><br>
         <label for="tierThreshold">Spending Threshold:</label>
         <input type="number" id="tierThreshold" required><br><br>
         <button type="submit">Save Changes</button>
       </form>
     `;
     openModal(`Edit ${tier} Tier`, content);

     document.getElementById('editTierForm').onsubmit = function(e) {
       e.preventDefault();
       // Here you would typically send this data to your backend
       alert(`${tier} tier updated successfully!`);
       modal.style.display = "none";
     };
   });
 });

 // View Members
 document.querySelectorAll('.view-members').forEach(button => {
   button.addEventListener('click', function() {
     const tier = this.getAttribute('data-tier');
     const content = `
       <table>
         <thead>
           <tr>
             <th>Name</th>
             <th>Email</th>
             <th>Total Spent</th>
             <th>Join Date</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>John Doe</td>
             <td>john@example.com</td>
             <td>$1,200</td>
             <td>2023-01-15</td>
           </tr>
           <tr>
             <td>Jane Smith</td>
             <td>jane@example.com</td>
             <td>$950</td>
             <td>2023-02-22</td>
           </tr>
           <!-- Add more rows as needed -->
         </tbody>
       </table>
     `;
     openModal(`${tier} Tier Members`, content);
   });
 });

 // Add New Tier
 document.getElementById('addTier').addEventListener('click', function() {
   const content = `
     <form id="addTierForm">
       <label for="newTierName">Tier Name:</label>
       <input type="text" id="newTierName" required><br><br>
       <label for="newTierBenefits">Tier Benefits (one per line):</label><br>
       <textarea id="newTierBenefits" rows="5" cols="50" required></textarea><br><br>
       <label for="newTierThreshold">Spending Threshold:</label>
       <input type="number" id="newTierThreshold" required><br><br>
       <button type="submit">Create Tier</button>
     </form>
   `;
   openModal('Add New Loyalty Tier', content);

   document.getElementById('addTierForm').onsubmit = function(e) {
     e.preventDefault();
     // Here you would typically send this data to your backend
     alert('New tier created successfully!');
     modal.style.display = "none";
   };
 });

 // Edit Offer
 document.querySelectorAll('.edit-offer').forEach(button => {
   button.addEventListener('click', function() {
     const offerName = this.parentElement.querySelector('h3').textContent;
     const content = `
       <form id="editOfferForm">
         <label for="offerName">Offer Name:</label>
         <input type="text" id="offerName" value="${offerName}" required><br><br>
         <label for="offerDescription">Offer Description:</label><br>
         <textarea id="offerDescription" rows="3" cols="50" required></textarea><br><br>
         <label for="offerValidUntil">Valid Until:</label>
         <input type="date" id="offerValidUntil" required><br><br>
         <label for="offerTiers">Available for Tiers:</label><br>
         <input type="checkbox" id="bronzeTier" name="tiers" value="Bronze">
         <label for="bronzeTier">Bronze</label><br>
         <input type="checkbox" id="silverTier" name="tiers" value="Silver">
         <label for="silverTier">Silver</label><br>
         <input type="checkbox" id="goldTier" name="tiers" value="Gold">
         <label for="goldTier">Gold</label><br><br>
         <button type="submit">Save Changes</button>
       </form>
     `;
     openModal(`Edit Offer: ${offerName}`, content);

     document.getElementById('editOfferForm').onsubmit = function(e) {
       e.preventDefault();
       // Here you would typically send this data to your backend
       alert('Offer updated successfully!');
       modal.style.display = "none";
     };
   });
 });

 // Add New Offer
 document.getElementById('addOffer').addEventListener('click', function() {
   const content = `
     <form id="addOfferForm">
       <label for="newOfferName">Offer Name:</label>
       <input type="text" id="newOfferName" required><br><br>
       <label for="newOfferDescription">Offer Description:</label><br>
       <textarea id="newOfferDescription" rows="3" cols="50" required></textarea><br><br>
       <label for="newOfferValidUntil">Valid Until:</label>
       <input type="date" id="newOfferValidUntil" required><br><br>
       <label for="newOfferTiers">Available for Tiers:</label><br>
       <input type="checkbox" id="newBronzeTier" name="tiers" value="Bronze">
       <label for="newBronzeTier">Bronze</label><br>
       <input type="checkbox" id="newSilverTier" name="tiers" value="Silver">
       <label for="newSilverTier">Silver</label><br>
       <input type="checkbox" id="newGoldTier" name="tiers" value="Gold">
       <label for="newGoldTier">Gold</label><br><br>
       <button type="submit">Create Offer</button>
     </form>
   `;
   openModal('Create New Loyalty Offer', content);

   document.getElementById('addOfferForm').onsubmit = function(e) {
     e.preventDefault();
     // Here you would typically send this data to your backend
     alert('New offer created successfully!');
     modal.style.display = "none";
   };
 });

 // Logout functionality
 document.querySelector('.logout-btn').addEventListener('click', () => {
   alert('Logging out...');
   // In a real application, this would handle the logout process
   window.location.href = '/admin/logout';
 });

 // Log admin activity
 function logAdminActivity(activity) {
   console.log('Admin activity:', activity);
   // In a real implementation, this would send logs to a secure server
 }

 // Log page access
 logAdminActivity('Accessed Loyalty Program Management page');

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
