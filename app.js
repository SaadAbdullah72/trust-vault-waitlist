// --- CONFIGURATION ---
// PASTE YOUR WEB APP URL HERE
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyKfW36_JzrrtiUqYu8ZbrwGliw46_Twl37hgZdrRq2DP2542AHSpGpX4b5Ee6humv4/exec'; 

// --- FORM SUBMISSION ---
function handleForm(form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const originalText = btn.textContent;

    // 1. Loading State
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // 2. Prepare Data
    // The script expects: name, email, wallet (matching your input 'name' attributes)
    const formData = new FormData(form);

    // 3. Send to Google Sheets
    fetch(SCRIPT_URL, { 
      method: 'POST', 
      body: formData 
    })
    .then(response => {
      // With this method, we can actually check if it worked!
      if (response.ok) {
        // Success UI
        form.reset();
        const popup = document.getElementById('successPopup');
        if (popup) popup.style.display = 'grid';
      } else {
        alert('Something went wrong. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error!', error.message);
      alert('Error connecting to the server.');
    })
    .finally(() => {
      // Reset button
      btn.textContent = originalText;
      btn.disabled = false;
    });
  });
}

// Initialize forms
const mainForm = document.getElementById('waitlistForm');
const miniForm = document.getElementById('miniWaitlist');
if (mainForm) handleForm(mainForm);
if (miniForm) handleForm(miniForm);

// Close Popup Logic
const closeSuccess = document.getElementById('closeSuccess');
if (closeSuccess) {
  closeSuccess.addEventListener('click', () => {
    document.getElementById('successPopup').style.display = 'none';
  });
}