import addNewCardView from './addNewCardView';
import updateCardView from './updateCardView';
import IMask from "imask";
import locale from '../config/locale/i18n';
import Card from "../model/card";

export default function setViewToAddNewCardForm(cardDynamic) {
  let html = createViewHtml();
  setViewHtml(html);
  setValidationMasks();
  setEventListeners(cardDynamic);
}

function createViewHtml() {
  const i18n = locale();

  let html = `
    <body>
      <!--header-->
      <header role="banner">
        <div class="row">
          <div class="header-main">
            <a href="#" class="header-link" id="back-button"><span class="icon-back"></span></a>
            <h1 class="header-title">${i18n.updateCard.title}</h1>
          </div>
        </div>
      </header>
      <!--END OF header-->

      <!--main-->
      <div role="main" class="main-form">
        <div class="row">
          <!--form-->
          <form>
            <fieldset>
              <div class="form-row">
                <label for="txt-name" class="form-label">${i18n.cardDetail.name}</label>
                <input type="text" id="txt-name" name="txt-name" class="form-txt" placeholder="${i18n.cardDetail.required}" minlength="1" maxlength="100" required>
              </div>
              <div class="form-row">
                <label for="txt-number" class="form-label">${i18n.cardDetail.number}</label>
                <input type="text" id="txt-number" name="txt-number" class="form-txt" placeholder="${i18n.cardDetail.required}" minlength="13" maxlength="19" required>
              </div>
              <div class="form-row">
                <div class="form-item">
                  <label for="txt-expiry" class="form-label">${i18n.cardDetail.expirationDate}</label>
                  <input type="text" id="txt-expiry" name="txt-expiry" class="form-txt" placeholder="${i18n.cardDetail.expiryHint}" minlength="5" maxlength="5" required>
                </div>
                <div class="form-item">
                  <label for="txt-cvv" class="form-label">${i18n.cardDetail.cvv}</label>
                  <input type="text" id="txt-cvv" name="txt-cvv" class="form-txt" placeholder="${i18n.cardDetail.required}" minlength="3" maxlength="4" required>
                </div>
              </div>
              <button id="btn-send" name="btn-send" class="form-btn" disabled>${i18n.cardDetail.saveCard}</button>
            </fieldset>
          </form>
          <!--END OF form-->
        </div>
      </div>
      <!--END OF main-->
      <!--modal-->
      <div class="modal" id="error-modal">
        <div class="modal-container">
          <h2 class="modal-title">${i18n.error.title}</h2>
          <div id="error-messages"></div>
          <a href="#" class="modal-btn" id="btn-modal-close">${i18n.error.retry}</a>
        </div>
      </div>
      <!--END OF modal-->
    </body>
  `;

  return html;
}

function setViewHtml(html) {
  document.body.outerHTML = html;
};

function setValidationMasks() {
  const numberInput = document.getElementById("txt-number");
  var maskOptions = {
    mask: '0000000000000000000',
  };
  var mask = IMask(numberInput, maskOptions);
  
  const cvvInput = document.getElementById("txt-cvv");
  var maskOptions = {
    mask: '000',
  };
  var mask = IMask(cvvInput, maskOptions);

  const expiryInput = document.getElementById("txt-expiry");
  var maskOptions = {
    mask: '00/00'
  };
  var mask = IMask(expiryInput, maskOptions);
}

function setEventListeners(cardDynamic) {
  const backButton = document.getElementById("back-button");
  backButton.addEventListener("click", (e) => {
    e.preventDefault();
    addNewCardView(cardDynamic);
  });

  const inputs = [];

  const nameInput = document.getElementById("txt-name");
  inputs.push(nameInput);
  nameInput.addEventListener("input", () => {
    enableSendButton(inputs);
  });

  const numberInput = document.getElementById("txt-number");
  inputs.push(numberInput);
  numberInput.addEventListener("input", () => {
    enableSendButton(inputs);
  });

  const expiryInput = document.getElementById("txt-expiry");
  inputs.push(expiryInput);
  expiryInput.addEventListener("input", () => {
    enableSendButton(inputs);
  });

  const cvvInput = document.getElementById("txt-cvv");
  inputs.push(cvvInput);
  cvvInput.addEventListener("input", () => {
    enableSendButton(inputs);
  });

  const sendButton = document.getElementById("btn-send");
  sendButton.addEventListener("click", (event) => {
    event.preventDefault();
    const formValidations = getFormValidations(inputs);
  
    if (formValidations) {
      openModal(formValidations);
    } else {
      const card = {
        name: nameInput.value,
        number: numberInput.value,
        expiry: expiryInput.value,
        cvv: cvvInput.value
      };
      let month = card.expiry.substring(0,2);
      let currentYear =  new Date().getFullYear().toString().substring(0,2);
      let year = currentYear+card.expiry.substring(3,5);
      let oldCard = new Card(card.number, month+year);
      cardDynamic.setOldCard(oldCard);
      updateCardView(cardDynamic);
    }
  });
}

function enableSendButton(inputs) {
  const disableSendButton = inputs.some(input => {
    return input.validity.valid === false;
  });

  const sendButton = document.getElementById("btn-send");
  if (disableSendButton === true) {
    sendButton.setAttribute("disabled", "disabled");
  } else {
    sendButton.removeAttribute("disabled");
  }
}

function openModal(formValidations) {
  const modal = document.getElementById('error-modal');
  const closeButton = document.getElementById('btn-modal-close');
  const errorMessage = document.getElementById('error-messages');
  errorMessage.innerHTML = formValidations;

  modal.style.display = 'block';

  closeButton.onclick = () => {
    modal.style.display = 'none';
  }

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}

function getFormValidations(inputs) {
  const i18n = locale();

  let errorMessage = '';

  inputs.forEach(input => {
    switch(input.id) {
      case 'txt-name':
        break;
      case 'txt-number':
        errorMessage += (input.value.length < 13 || input.value.length > 19)
          ? `<p class="modal-desc" id="modal-desc">${i18n.newCreditCard.error.numberFormat}</p>`
          : '';
        break;
      case 'txt-expiry':
        errorMessage += (input.value.length != 5)
          ? `<p class="modal-desc" id="modal-desc">${i18n.newCreditCard.error.dateFormat}</p>`
          : (parseInt(input.value, 10) < 1 || parseInt(input.value, 10) > 12)
            ? `<p class="modal-desc" id="modal-desc">${i18n.newCreditCard.error.wrongMonth}</p>`
            : '';
        break;
      case 'txt-cvv':
        errorMessage += (input.value.length < 3 || input.value.length > 4)
          ? `<p class="modal-desc" id="modal-desc">${i18n.newCreditCard.error.cvvFormat}</p>`
          : '';
        break;
    }
  });
  
  return (errorMessage !== '') ? errorMessage : undefined;
}
