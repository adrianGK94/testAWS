import locale from "../config/locale/i18n";
import loadingView from './loadingView';
import addMerchantView from "./addMerchantView";
import MerchantService from '../services/merchant-service';
import SharedDataService from "../services/shared-data-service";
import createModal from "../components/modal-component";
import gtag from "ga-gtag";

export default function verificationView(merchant, data) {
  //try {
    // Show loading until screen been prepared
    loadingView();
    // Create HTML view
    createViewInHtml(merchant, data);
    // Listeners configuration
    setEventListeners(merchant, data);

    if (data.message !== ''){
      createModal({
        title: '',
        body: data.message,
        btn: 1
      });
    }
  /*} catch (error) {
    window.location = '/';
  }*/
}

function createViewInHtml(merchant, data) {
  const disabled = 'disabled';
  const i18n = locale();

  const html = `
  <body class="bg-gray">
    <!--header-->
    <header role="banner">
      <div class="row">
          <div class="header-account">
              <div class="header-account-container">
                  <img src="${merchant.merchantDetails.merchantLogo}" alt="">
                  <span class="header-account-text">${merchant.merchantDetails.merchantBrand}</span>
              </div>
          </div>
  
      </div>
    </header>
    <!--END OF header-->
  
    <!--main-->
    <div role="main" class="account-form">
      <div class="row">
      
        <!--form-->
        <form id="verification-form">
          <fieldset>
            ${paintVerificationForm(data)}
        
            <div class="btn-container">
              <a href="#" title="Go back" id="btn-back" class="btn-back">${i18n.verification.button.cancel}</a>
              <button type="submit" id="btn-continue" name="btn-continue" class="form-btn-type2" ${disabled}>${i18n.verification.button.verify}</button>
            </div>
          </fieldset>
        </form>
        <!--END OF form-->
  
      </div>
    </div>
    <!--END OF main-->
    
    <!--modal back-->
    <div class="modal" id="backModal">
      <div class="modal-container">
          <p class="modal-desc">${i18n.verification.backModal.description}</p>
          <div class="btn-modal-container">
              <a href="#" id="btn-cancel" class="modal-btn type3">${i18n.verification.backModal.cancel}</a>
              <a href="#" id="btn-home" class="modal-btn type2">${i18n.verification.backModal.back}</a>
          </div>
      </div>
    </div>
    <!--END OF modal back-->
    
    <!--modal loader-->
    <div class="modal modal-white" id="loader">
        <div class="modal-container">
    
            <img src="loading-desktop.gif" alt="Loading" class="loading-image desktop">
            <img src="loading-mobile.gif" alt="Loading" class="loading-image mobile">
    
        </div>
    </div>
    <!--END OF loader-->
    
    <!--modal congratulations-->
    <div class="modal" id="congratulationsModal">
        <div class="modal-container">
            <button type="button" class="btn-close" id="modal-congrats-btn-close"><span class="icon-close"></span></button>
            <h2 class="modal-title type2 title-congratulations">${i18n.congratulations.title}</h2>
            <div class="modal-content-scroll scroll-type2">
                <p class="centered-p">${i18n.congratulations.description}</p>
                ​
                ${paintEmailBox('congrats')}
                ​
                ${paintDownloadBox(merchant.merchantDetails)}
            </div>
        </div>
    </div>
    <!--END OF modal congratulations-->`;
  // Add to DOM
  document.body.outerHTML = html;
}

function paintVerificationForm(data) {
  const i18n = locale();
  let html = '';
  if (data.validationType === 'CODE') {
    html = `
    <div class="account-form-header">
      <h2 class="account-form-title">${i18n.verification.code.title}</h2>
    </div>
    
    <p class="account-form-desc">${data.message}</p>
    
    <div class="form-row-account">
      <div class="row-account-container" id="txt-code-input-cont">
        <label for="txt-code" class="form-label">${i18n.verification.code.title}</label>
        <input type="text" id="txt-code" name="txt-code" class="form-txt">
      </div>
    </div>`;
  }else if (data.validationType === 'CONFIRMATION'){
    html = `
    <div class="account-form-header">
      <h2 class="account-form-title">${i18n.verification.email.title}</h2>
    </div>
    
    <p class="account-form-desc">${data.message}</p>
    
    <!--verification check-->
    <div class="verification-row">
      <div class="verification-checkbox">
        <input type="checkbox" id="ch-verification" name="ch-verification">
        <label for="ch-verification"><span>${i18n.verification.check.title}</span></label>
      </div>
    
    </div>
  <!--END OF verification check-->`;
  }
  return html;
}

function paintEmailBox(name) {
  if (SharedDataService.getNewPersonalInfo().email) {
    return `
  <div class="input-container">
    <input type="text" id="${name}-copy-txt" class="form-txt" value="${SharedDataService.getNewPersonalInfo().email}">
    <button type="button" id="modal-${name}-btn-copy" class="btn-copy"><span class="icon-copy"></span></button>
  </div>`;
  }
  return '';
}

function paintDownloadBox(details) {
    const i18n = locale();
    let iOSStoreUrl = '';
    let androidStoreUrl = '';
    let html = '';
    if (details.iOSStoreUrl || details.androidStoreUrl) {
        html += `<p class="line-p mobile">${i18n.congratulations.forget.title}</p> `;
    }
    html += `<div class="logo-container">`;
    if (details.iOSStoreUrl) {
        iOSStoreUrl = validateUrl(details.iOSStoreUrl);
        html += `
        <a href="${iOSStoreUrl}" target="_blank" class="btn-app" data-app="IOS">
          <img src="app-store.svg" alt="Download on the App Store">
        </a>`;
    }
    if (details.androidStoreUrl) {
        androidStoreUrl = validateUrl(details.androidStoreUrl);
        html += ` 
        <a href="${androidStoreUrl}" target="_blank" class="btn-app" data-app="Android">
         <img src="google-play.svg" alt="Download from Google Play">
        </a>`;
    }
    html += `</div>`;
    if (details.webUrl) {
        const webUrl = validateUrl(details.webUrl);
        const text = iOSStoreUrl || androidStoreUrl ? i18n.congratulations.or.title : '';
        html += `
        <p class="download-p mobile" data-i18n="congratulations.or.title">${text}</p>
        <p class="download-p web">${i18n.congratulations.enjoy.title}</p>
        <a href="${webUrl}" id="btn-web" class="modal-btn type3" target="_blank">${i18n.congratulations.button.login}</a> `;
    }
    return html;
}

function setEventListeners(merchant, data) {
  // Back button go to home
  const backBtn = document.getElementById('btn-back');
  backBtn.addEventListener("click", () => clickBackBtn());
  // Apply buttons listeners
  const continueBtn = document.getElementById('btn-continue');
  continueBtn.addEventListener("click", () => clickApplyBtn(merchant, data));
  // Form validation when some value change
  const submitForm = document.getElementById('verification-form');
  submitForm.addEventListener("change", () => continueBtn.disabled = !isValidForm(false));
  const inputCode = document.getElementById('txt-code');
  if (inputCode) {
    inputCode.addEventListener("keyup", () => {
      continueBtn.disabled = !isValidForm(false);
    });
  }
  // Modal close copy btn click
  const closeEmailModal = document.getElementById('modal-congrats-btn-close');
  if (closeEmailModal) closeEmailModal.addEventListener("click", () => addMerchantView());
  // Modal email copy btn click
  const copyEmailModal = document.getElementById('modal-congrats-btn-copy');
  if (copyEmailModal) copyEmailModal.addEventListener("click", () => copyContentToClipboard('congrats-copy-txt'));

  const cancelBtn = document.getElementById('btn-cancel');
  cancelBtn.addEventListener("click", () => closeModal('backModal'));
  const homeBtn = document.getElementById('btn-home');
  homeBtn.addEventListener("click", () => addMerchantView());
  let appBtnModal = document.getElementsByClassName('btn-app');
  for(let i = 0; i < appBtnModal.length; i++) {
      appBtnModal[i].addEventListener("click", (e) => {
      gtag('event', 'Descarga_' + appBtnModal[i].getAttribute('data-app') + '_' + merchant.cdMerchantId, {
        'event_category': 'Descarga_store',
        'event_label': 'Descargar'
      });
    });
  }
  let webBtnModal = document.getElementById('btn-web');
    webBtnModal.addEventListener("click", (e) => {
    gtag('event', 'Merchant_' + merchant.cdMerchantId, {
      'event_category': 'Validación_registro',
      'event_label': 'Inicio_sesión'
    });
  });
}

function isValidForm(showInputError) {
  let verificationCheck = document.getElementById('ch-verification');
  if (verificationCheck && !verificationCheck.checked) return false;
  // Validate input code
  const input = document.getElementById('txt-code');
  if (input) {
      const isValid = isValidInput(input, showInputError);
      return (isValid === true);
  }
  return true;
}

function isValidInput(input, showInputError = true) {
  const parent = document.getElementById(`${input.inputName}-input-cont`);
  const tooltipLabel = document.getElementById(`tooltip-${input.inputName}`);
  const errorLabel = document.getElementById(`error-txt-${input.inputName}`);
  if (input.value === ''){
    if (showInputError) parent.classList.add('form-error');
    if (showInputError && tooltipLabel) tooltipLabel.classList.add('tooltip-error');
    return false;
  }
  return true;
}

function clickBackBtn() {
  //window.location = '/';
  const modal = document.getElementById("backModal");
  modal.style.display = "block";
}

function clickApplyBtn(merchant, data) {
  const i18n = locale();
  let message = i18n.error.default.description;
  let eventLabel = 'Verificar_cuenta';
  const inputCode = document.getElementById('txt-code');
  const continueBtn = document.getElementById('btn-continue');
  continueBtn.disabled = true;
  const requestForm = {
    "enrollmentId" : data.enrollmentId,
    "validationType" : data.validationType
  }
  if (data.validationType === 'CODE'){
    requestForm.code = inputCode.value;
    eventLabel = 'Verificar_Mail/SMS';
  }
  gtag('event', 'Merchant_'+merchant.cdMerchantId, {
    'event_category': 'Validación_registro',
    'event_label': eventLabel
  });
  loader('block');
  MerchantService.enrollmentConfirmation(requestForm).then(response => {
    continueBtn.disabled = false;
    console.debug(response);
    loader('none');
    if (response.status === 200) {
      response.json().then(data => {
        if (data.status !== 'ERROR') {
          if (data.validationType !== null){
            gtag('event', 'OK_con_verificacion_' + merchant.cdMerchantId, {
              'event_category': 'Validación_registro',
              'event_label': 'Verificar'
            });
            verificationView(merchant, data);
          }else {
            gtag('event', 'OK_' + merchant.cdMerchantId, {
              'event_category': 'Validación_registro',
              'event_label': 'Verificar'
            });
            showModal();
          }
        } else {
          gtag('event', 'KO_' + merchant.cdMerchantId, {
            'event_category': 'Validación_registro',
            'event_label': 'Verificar'
          });
          if (data.message) message = data.message;
          createModal({
            title: '',
            body: message,
            btn: 1,
            eventAction: 'Error_registro_verificacion',
            eventCategory: 'Merchant_' + merchant.cdMerchantId,
            eventLabel: 'Aceptar',
          });
        }
      });
    } else {
      gtag('event', 'KO_' + merchant.cdMerchantId, {
        'event_category': 'Validación_registro',
        'event_label': 'Verificar'
      });
      response.json().then(data => {
        if (data.message) message = data.message;
        createModal({
          title: '',
          body: message,
          btn: 1,
          eventAction: 'Error_registro_verificacion',
          eventCategory: 'Merchant_' + merchant.cdMerchantId,
          eventLabel: 'Aceptar',
        });
      });
    }
  }).catch((err) => {
    gtag('event', 'KO_' + merchant.cdMerchantId, {
      'event_category': 'Validación_registro',
      'event_label': 'Verificar'
    });
    continueBtn.disabled = false;
    createModal({
      title: '',
      body: message,
      btn: 1,
      eventAction: 'Error_registro_verificacion',
      eventCategory: 'Merchant_' + merchant.cdMerchantId,
      eventLabel: 'Aceptar',
    });
  });
}

function showModal(){
  const modal = document.getElementById("congratulationsModal");
  modal.style.display = "block";
}

function closeModal(modalId){
  //e.preventDefault();
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

function copyContentToClipboard(id) {
  let copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');
}

function validateUrl(url) {
  if (url !== '' && url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
    url = 'https://' + url;
  }
  return url;
}

function loader(style){
    const loader = document.getElementById("loader");
    loader.style.display = style;
}