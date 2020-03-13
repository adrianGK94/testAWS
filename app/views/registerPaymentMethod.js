import addMerchantView from './addMerchantView';
import registerMerchantView from './registerMerchantView';
import {
  tns
} from 'tiny-slider/src/tiny-slider';
import MerchantService from '../services/merchant-service';
import SharedDataService from '../services/shared-data-service';
import CryptoJS from "crypto-js";
import cryptoUtil from '../config/cryptoUtil';
import createModal from '../components/modal-component';

// Variables
let merchantData = null;
let previousData = null;
let methodSelected = 'creditCards';
let creditSliderIndex = 0;
let bankSliderIndex = 0;

/**
 * 
 * @param {cdMerchantId: number, promotions: any[], form: any[], merchantDetails: object} merchantItem 
 * @param {enrollmentId: string, customerId: string, hasPaymentMethod: boolean} registerData 
 */
export default function registerPaymentMethod(merchantItem, registerData) {
  merchantData = merchantItem;
  previousData = registerData;
  // Create HTML view
  createViewInHtml(merchantData);
  // Listeners configuration
  setEventListeners();
  // Carousel settings
  initializeCarrousel();
  // Set default payment method
  methodSelected = getMethodByDefault(merchantData.merchantDetails.paymentMethod);
}

function createViewInHtml(merchant) {
  let paymentMethods = SharedDataService.getPaymentMethods();
  let html = `
  <body class="bg-selection">
    <!--header-->
    <header role="banner">
        <div class="row">
            <div class="header-main">
                <a class="header-link" id="back-button"><span class="icon-back"></span></a>
                <h1 class="header-title">Create account</h1>
            </div>
            <div class="header-account">
                <div class="header-account-container">
                    <img src="${merchant.merchantDetails.merchantLogo}" alt="">
                    <span class="header-account-text">${merchant.merchantDetails.merchantBrand}</span>
                </div>
            </div>
        </div>
    </header>
    <!--END OF header-->
​
    <!--main-->
    <div role="main" class="account-form">
        <div class="row">
            ​
            <div class="account-form-header">
                <h2 class="account-form-title">Payment method</h2>
                <span class="account-form-step">Step 2 of 2</span>
            </div>
            ​
            <p class="account-form-desc">Choose a payment method</p>
            ​
            <!-- Tabs -->
            ${paintTabs(merchant.merchantDetails.paymentMethod)}
            <!-- END OF Tabs -->

            <!--Credit card block-->
            ${printCreditCards(paymentMethods.creditCards, merchant.merchantDetails.paymentMethod)}
            <!--END OF Credit card block-->
            ​
            <!--Bank account block-->
            ${printBankAccounts(paymentMethods.bankAccounts, merchant.merchantDetails.paymentMethod)}
            <!--END OF Bank account block-->
            ​
            <div class="btn-container">
                <button type="button" id="btn-continue" name="btn-continue" class="form-btn-type2">Continue</button>
            </div>
            ​
        </div>
    </div>
    <!--END OF main-->
    
    <!--modal validate email-->
    <div class="modal" id="validateModal">
        <div class="modal-container">
            <button type="button" class="btn-close" id="modal-email-btn-close"><span class="icon-close"></span></button>
            <h2 class="modal-title type2 title-validate">Validate your email</h2>
            <div class="modal-content-scroll scroll-type2">
                <p class="centered-p">A verification email will be sent to you. Please follow the email instructions to validate your account</p>
                ​
                ${paintEmailBox('email')}
                ​
                ${paintDownloadBox(merchant.merchantDetails)}
            </div>
        </div>
    </div>
    <!--END OF modal validate email-->

    <!--modal congratulations-->
    <div class="modal" id="congratulationsModal">
        <div class="modal-container">
            <button type="button" class="btn-close" id="modal-congrats-btn-close"><span class="icon-close"></span></button>
            <h2 class="modal-title type2 title-congratulations">Congratulations</h2>
            <div class="modal-content-scroll scroll-type2">
                <p class="centered-p">The registration has been completed successfully</p>
                ​
                ${paintEmailBox('congrats')}
                ​
                ${paintDownloadBox(merchant.merchantDetails)}
            </div>
        </div>
    </div>
    <!--END OF modal congratulations-->
  </body>`;
  // Add to DOM
  document.body.outerHTML = html;
}

function paintTabs(paymentMethod) {
  return +paymentMethod === 3 ? `    
    <ul class="account-tabs" id="paymentTabs">
      <li class="active" id="creditCard">
          Credit cards
      </li>
      <li id="accounts">
          Bank accounts
      </li>
    </ul>` : '';
}

function printCreditCards(creditCards, paymentMethod) {
  const show = +paymentMethod === 3 || +paymentMethod === 1 ? 'show' : '';
  let html = `<div id="paymentCredit" class="account-bl ${show}"><ul id="slider-credit">`;
  creditCards.forEach(card => {
    const cardBg = card.cardBackground || 'bg-card-default.png';
    html += `    
    <li>
      <!--credit card-->
      <div class="credit-card" data-pan="${card.pan}">
        <img src="${cardBg}" alt="" class="bg-card">
        <div style="background-image:url(${card.bankLogo});" alt="" class="card-logo"></div>
        <div class="card-data">
          <span class="card-number">**** ${card.pan.slice(card.pan.length - 4)}</span>
          <div class="card-expired">
            <span class="card-expired-desc">Expiration date</span>
            <span class="card-expired-date">${card.expDate}</span>
          </div>
        </div>
      </div>
      <!--END OF credit card-->
    </li>`;
  });
  html += `</ul></div>`;
  return html;
}

function printBankAccounts(bankAccounts, paymentMethod) {
  const show = +paymentMethod === 2 ? 'show' : '';
  let html = `<div id="paymentBank" class="account-bl ${show}"><ul id="slider-account">`;
  bankAccounts.forEach(bank => {
    const bankBg = bank.accountBackground || 'bg-card-default.png';
    html += `    
    <li>
      <!--bank card-->
      <div class="bank-card" data-iban="${bank.iban}">
        <img src="${bankBg}" alt="" class="bg-card">
        <div style="background-image:url(${bank.bankLogo});" alt="" class="card-logo"></div>
        <div class="card-data">
          <span class="card-number">${bank.iban}</span>
        </div>
      </div>
      <!--END OF bank card-->
    </li>`;
  });
  html += `</ul></div>`;
  return html;
}

function setEventListeners() {
  // Back button click
  const backButton = document.getElementById('back-button');
  backButton.addEventListener("click", (e) => registerMerchantView(merchantData));
  // Tabs toggle
  var tabs = document.getElementById("paymentTabs");
  var creditLayer = document.getElementById("paymentCredit");
  var bankLayer = document.getElementById("paymentBank");
  if (tabs && creditLayer && bankLayer) {
    const creditCard = document.getElementById("creditCard");
    creditCard.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.children[1].classList.remove("active");
      tabs.children[0].classList.add("active");
      creditLayer.classList.add("show");
      bankLayer.classList.remove("show");
      methodSelected = 'creditCards';
    });
    const accounts = document.getElementById("accounts");
    accounts.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.children[0].classList.remove("active");
      tabs.children[1].classList.add("active");
      creditLayer.classList.remove("show");
      bankLayer.classList.add("show");
      methodSelected = 'bankAccounts';
    });
  }
  // Submit button click
  const continueButton = document.getElementById('btn-continue');
  continueButton.addEventListener("click", () => submit());
  // Modal email close btn click
  const closeEmailModal = document.getElementById('modal-email-btn-close');
  closeEmailModal.addEventListener("click", () => addMerchantView());
  // Modal email copy btn click
  const copyEmailModal = document.getElementById('modal-email-btn-copy');
  if (copyEmailModal) copyEmailModal.addEventListener("click", () => copyContentToClipboard('email-copy-txt'));
  // Modal congrats close btn click
  const closeCongratsModal = document.getElementById('modal-congrats-btn-close');
  closeCongratsModal.addEventListener("click", () => addMerchantView());
  // Modal congrats copy btn click
  const copyCongratsModal = document.getElementById('modal-congrats-btn-copy');
  if (copyCongratsModal) copyCongratsModal.addEventListener("click", () => copyContentToClipboard('congrats-copy-txt'));
}

function initializeCarrousel() {
  const creditSlider = tns({
    container: '#slider-credit',
    center: true,
    items: 1,
    autoWidth: true,
    gutter: 10,
    swipeAngle: false,
    mouseDrag: true,
    loop: false,
    slideBy: 1,
    autoplay: false,
    controls: false,
    navPosition: 'bottom',
    preventScrollOnTouch: 'auto',
  });
  const bankSlider = tns({
    container: '#slider-account',
    center: true,
    items: 1,
    autoWidth: true,
    gutter: 10,
    swipeAngle: false,
    mouseDrag: true,
    loop: false,
    slideBy: 1,
    autoplay: false,
    controls: false,
    navPosition: 'bottom',
    preventScrollOnTouch: 'auto',
  });
  // Sliders events
  creditSlider.events.on('indexChanged', info => creditSliderIndex = info.index);
  bankSlider.events.on('indexChanged', info => bankSliderIndex = info.index);
}

function getMethodByDefault(methodOpt) {
  if (methodOpt === 1 || methodOpt === 3) {
    return 'creditCards';
  } else if (methodOpt === 2) {
    return 'bankAccounts';
  }
  return 'creditCards';
}

function submit() {
  const secret = sessionStorage.getItem('secret');
  const continueBtn = document.getElementById('btn-continue');
  const enrollmentId = previousData.enrollmentId;
  const customerId = previousData.customerId || SharedDataService.getDefaultPersonalInfo().email;
  const index = methodSelected === 'creditCards' ? creditSliderIndex : bankSliderIndex;
  const paymentMethods = SharedDataService.getPaymentMethods();
  const selection = paymentMethods[methodSelected][index];
  let serviceName = '';
  let integrityCheck = '';
  // Integrity check cryptography
  integrityCheck = CryptoJS.SHA256(JSON.stringify(customerId) + JSON.stringify(selection)).toString();
  // Prepare request data
  const requestForm = {
    cdMerchantId: merchantData.cdMerchantId,
    enrollmentId: enrollmentId,
    customerId: cryptoUtil.encrypt(secret, JSON.stringify(customerId)),
    integrityCheck: integrityCheck
  };
  if (methodSelected === 'creditCards') {
    requestForm.cardData = cryptoUtil.encrypt(secret, JSON.stringify(selection));
    serviceName = 'cardRegistration';
  } else {
    requestForm.bankAccountData = cryptoUtil.encrypt(secret, JSON.stringify(selection));
    serviceName = 'bankAccountRegistration';
  }
  // Send POST req
  continueBtn.disabled = true;
  MerchantService[serviceName](requestForm).then(response => {
    continueBtn.disabled = false;
    if (response.status === 200) {
      response.json().then(data => {
        if (data.status !== 'ERROR') {
          if (merchantData.merchantDetails.emailVerification) {
            openEmailModal();
          } else {
            openCongratsModal();
          }
        } else {
          createModal({
            title: 'Error',
            body: 'Invalid payment method. <br>Try again with another payment method.',
            btn: 1
          });
        }
      });
    } else {
      createModal({
        title: 'Error',
        body: 'Something went wrong. <br>Try again.',
        btn: 1
      });
    }
  }).catch((err) => {
    continueBtn.disabled = false;
    createModal({
      title: 'Error',
      body: 'Something went wrong. <br>Try again.',
      btn: 1
    });
  });
}

function openEmailModal() {
  const modal = document.getElementById('validateModal');
  modal.style.display = 'flex';
}

function openCongratsModal() {
  const modal = document.getElementById('congratulationsModal');
  modal.style.display = 'flex';
}

function copyContentToClipboard(id) {
  var copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');
}

function paintEmailBox(name) {
  if (previousData.email) {
    return `
    <div class="input-container">
      <input type="text" id="${name}-copy-txt" class="form-txt" value="${previousData.email}">
      <button type="button" id="modal-${name}-btn-copy" class="btn-copy"><span class="icon-copy"></span></button>
    </div>`;
  }
  return '';
}

function paintDownloadBox(details) {
  let html = '';
  if (details.iOSStoreUrl || details.androidStoreUrl) {
    html += `<p class="line-p">and don't forget</p> <p class="download-p">Download the app now and enjoy!</p>`;
  }
  html += `<div class="logo-container">`;
  if (details.iOSStoreUrl) {
    html += `
    <a href="${details.iOSStoreUrl}" target="_blank">
      <img src="app-store.svg" alt="Download on the App Store">
    </a>`;
  }
  if (details.androidStoreUrl) {
    html += ` 
    <a href="${details.androidStoreUrl}" target="_blank">
     <img src="google-play.svg" alt="Download from Google Play">
    </a>`;
  }
  html += `</div>`;
  if (details.webUrl) {
    const text = details.iOSStoreUrl || details.androidStoreUrl ? 'or' : 'Go to the website now and enjoy!';
    html += `
    <div class="web-logo-container">
      <p class="download-p">${text}</p>
      <a href="${details.webUrl}" target="_blank">Log in to the web</a>
    </div>`;
  }
  return html;
}