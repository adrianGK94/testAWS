import addMerchantView from '../views/addMerchantView';
import locale from "../config/locale/i18n";
import gtag from "ga-gtag";

/**
 * @param { title: string, body: string, btn: 1 | 2 } args 
 */
export default function createModal(args) {
  Object.assign(modalData, args);
  // Create view in HTML
  createView(modalData);
  // Listeners configuration
  setListeners(modalData);
}

// Modal variables
let modalData = {
  title: '',
  body: '',
  btn: 1,
  eventCategory: '',
  eventAction: '',
  eventLabel: ''
};

function createView(data) {
  const i18n = locale();
  const modal = document.createElement('div');
  const button = data.btn === 1 ?
  '<a class="modal-btn type2" id="btn-modal-close">'+i18n.modal.button.accept+'</a>' :
  `<a class="modal-btn type3" id="btn-modal-cancel">'+i18n.modal.button.cancel+'</a>
   <a class="modal-btn type2" id="btn-modal-close">'+i18n.modal.button.try+'</a>`;
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
  modal.style.display = 'block';
  // Add to DOM
  document.body.appendChild(modal);
}

function setListeners(data) {
  // Close btn click
  const closeButton = document.getElementById('btn-modal-close');
  if (closeButton) {
    //closeButton.onclick = () => closeModal();
    closeButton.addEventListener('click', (e) => {
      gtag('event', data.eventAction, {
        'event_category': data.eventCategory,
        'event_label': data.eventLabel
      });
      closeModal();
    });
  }
  // Cancel btn click
  const cancelButton = document.getElementById('btn-modal-cancel');
  if (cancelButton) {
    cancelButton.addEventListener('click', (e) => {
      gtag('event', data.eventAction, {
        'event_category': data.eventCategory,
        'event_label': 'Cancelar'
      });
      addMerchantView();
    });
  }
}

function closeModal() {
  const modal = document.getElementById('modal');
  document.body.removeChild(modal);
}