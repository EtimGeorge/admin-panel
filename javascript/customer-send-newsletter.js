const form = document.getElementById('newsletterForm');
const previewBtn = document.getElementById('previewBtn');
const useTemplateBtn = document.getElementById('useTemplateBtn');
const addTemplateBtn = document.getElementById('addTemplateBtn');
const editTemplatesBtn = document.getElementById('editTemplatesBtn');
const saveDraftBtn = document.getElementById('saveDraftBtn');
const viewDraftsBtn = document.getElementById('viewDraftsBtn');
const previewModal = document.getElementById('previewModal');
const templateModal = document.getElementById('templateModal');
const addTemplateModal = document.getElementById('addTemplateModal');
const editTemplatesModal = document.getElementById('editTemplatesModal');
const draftsModal = document.getElementById('draftsModal');
const closeBtns = document.getElementsByClassName('close');
const previewContent = document.getElementById('previewContent');
const templateList = document.getElementById('templateList');
const editTemplatesList = document.getElementById('editTemplatesList');
const draftsList = document.getElementById('draftsList');
const addTemplateForm = document.getElementById('addTemplateForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  // Here you would typically handle sending the newsletter
  alert('Newsletter sent successfully!');
});

previewBtn.onclick = function() {
  const subject = document.getElementById('subject').value;
  const content = document.getElementById('content').value;
  previewContent.innerHTML = `
    <h3>${subject}</h3>
    <div>${content}</div>
  `;
  previewModal.style.display = "block";
}

useTemplateBtn.onclick = function() {
  loadTemplates();
  templateModal.style.display = "block";
}

addTemplateBtn.onclick = function() {
  addTemplateModal.style.display = "block";
}

editTemplatesBtn.onclick = function() {
  loadEditTemplates();
  editTemplatesModal.style.display = "block";
}

saveDraftBtn.onclick = function() {
  const draftId = Date.now();
  const draftSubject = document.getElementById('subject').value;
  localStorage.setItem(`draft_${draftId}`, JSON.stringify({
    id: draftId,
    subject: draftSubject,
    content: document.getElementById('content').value,
    recipientGroup: document.getElementById('recipient-group').value,
    timestamp: new Date().toLocaleString()
  }));
  alert('Draft saved successfully!');
}

viewDraftsBtn.onclick = function() {
  loadDrafts();
  draftsModal.style.display = "block";
}

function loadTemplates() {
  templateList.innerHTML = '';
  const templates = JSON.parse(localStorage.getItem('templates')) || {};
  for (const [name, template] of Object.entries(templates)) {
    const templateElement = document.createElement('div');
    templateElement.innerHTML = `
      <h3>${name}</h3>
      <p>${template.subject}</p>
      <button onclick="loadTemplate('${name}')">Use Template</button>
    `;
    templateList.appendChild(templateElement);
  }
}

function loadEditTemplates() {
  editTemplatesList.innerHTML = '';
  const templates = JSON.parse(localStorage.getItem('templates')) || {};
  for (const [name, template] of Object.entries(templates)) {
    const templateElement = document.createElement('div');
    templateElement.innerHTML = `
      <h3>${name}</h3>
      <p>${template.subject}</p>
      <button onclick="editTemplate('${name}')">Edit</button>
      <button onclick="deleteTemplate('${name}')">Delete</button>
    `;
    editTemplatesList.appendChild(templateElement);
  }
}

function loadTemplate(templateName) {
  const templates = JSON.parse(localStorage.getItem('templates')) || {};
  const template = templates[templateName];
  document.getElementById('subject').value = template.subject;
  document.getElementById('content').value = template.content;
  templateModal.style.display = "none";
}

function editTemplate(templateName) {
  const templates = JSON.parse(localStorage.getItem('templates')) || {};
  const template = templates[templateName];
  document.getElementById('templateName').value = templateName;
  document.getElementById('templateSubject').value = template.subject;
  document.getElementById('templateContent').value = template.content;
  editTemplatesModal.style.display = "none";
  addTemplateModal.style.display = "block";
}

function deleteTemplate(templateName) {
  const templates = JSON.parse(localStorage.getItem('templates')) || {};
  delete templates[templateName];
  localStorage.setItem('templates', JSON.stringify(templates));
  loadEditTemplates();
}

addTemplateForm.onsubmit = function(e) {
  e.preventDefault();
  const templateName = document.getElementById('templateName').value;
  const templateSubject = document.getElementById('templateSubject').value;
  const templateContent = document.getElementById('templateContent').value;
  
  const templates = JSON.parse(localStorage.getItem('templates')) || {};
  templates[templateName] = {
    subject: templateSubject,
    content: templateContent
  };
  localStorage.setItem('templates', JSON.stringify(templates));
  
  alert('Template saved successfully!');
  addTemplateModal.style.display = "none";
  addTemplateForm.reset();
}

function loadDrafts() {
  draftsList.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('draft_')) {
      const draft = JSON.parse(localStorage.getItem(key));
      const draftElement = document.createElement('div');
      draftElement.innerHTML = `
        <h3>${draft.subject}</h3>
        <p>Created: ${draft.timestamp}</p>
        <button onclick="loadDraft(${draft.id})">Load Draft</button>
        <button onclick="deleteDraft(${draft.id})">Delete Draft</button>
      `;
      draftsList.appendChild(draftElement);
    }
  }
}

function loadDraft(id) {
  const draft = JSON.parse(localStorage.getItem(`draft_${id}`));
  document.getElementById('subject').value = draft.subject;
  document.getElementById('content').value = draft.content;
  document.getElementById('recipient-group').value = draft.recipientGroup;
  draftsModal.style.display = "none";
}

function deleteDraft(id) {
  localStorage.removeItem(`draft_${id}`);
  loadDrafts();
}

// Close button functionality for all modals
for (let i = 0; i < closeBtns.length; i++) {
  closeBtns[i].onclick = function() {
    previewModal.style.display = "none";
    templateModal.style.display = "none";
    addTemplateModal.style.display = "none";
    editTemplatesModal.style.display = "none";
    draftsModal.style.display = "none";
  }
}

// Close modals when clicking outside
window.onclick = function(event) {
  if (event.target == previewModal || event.target == templateModal || event.target == addTemplateModal || event.target == editTemplatesModal || event.target == draftsModal) {
    previewModal.style.display = "none";
    templateModal.style.display = "none";
    addTemplateModal.style.display = "none";
    editTemplatesModal.style.display = "none";
    draftsModal.style.display = "none";
  }
}

// Log admin activity
function logAdminActivity(activity) {
  console.log('Admin activity:', activity);
  // In a real implementation, this would send logs to a secure server
}

// Log page access
logAdminActivity('Accessed Send Newsletter page');

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