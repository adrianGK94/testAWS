import addMerchantView from '../views/addMerchantView';

/**
 * @param { title: string, body: string, btn: 1 | 2 } args 
 */
export default function createModal(args) {
  Object.assign(modalData, args);
  // Create view in HTML
  createView(modalData);
  // Listeners configuration
  setListeners();
}

// Modal variables
let modalData = {
  title: '',
  body: '',
  btn: 1
};

function createView(data) {
  const modal = document.createElement('div');
  const button = data.btn === 1 ?
  '<a class="modal-btn type2" id="btn-modal-close">Accept</a>' :
  `<a class="modal-btn type3" id="btn-modal-cancel">Cancel</a>
   <a class="modal-btn type2" id="btn-modal-close">Try again</a>`;
  const html = `
    <!--modal-->
    <div class="modal-container">
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-desc">${data.body}</p>
      <div class="btn-modal-container">
        ${button}
      </div>
    </div>
    <!--END OF modal-->`;
  modal.innerHTML = html;
  modal.className = 'modal';
  modal.id = 'modal';
  modal.style.display = 'flex';
  // Add to DOM
  document.body.appendChild(modal);
}

function setListeners() {
  // Close btn click
  const closeButton = document.getElementById('btn-modal-close');
  if (closeButton) closeButton.onclick = () => closeModal();
  // Cancel btn click
  const cancelButton = document.getElementById('btn-modal-cancel');
  if (cancelButton) cancelButton.addEventListener('click', (e) => addMerchantView());
}

function closeModal() {
  const modal = document.getElementById('modal');
  document.body.removeChild(modal);
}