import locale from "../config/locale/i18n";
import loadingView from './loadingView';
import addMerchantView from './addMerchantView';
import registerMerchantView from './registerMerchantView';
import verificationView from './verificationView';
import {
    tns
} from 'tiny-slider/src/tiny-slider';
import MerchantService from '../services/merchant-service';
import SharedDataService from '../services/shared-data-service';
import CryptoJS from "crypto-js";
import cryptoUtil from '../config/cryptoUtil';
import createModal from '../components/modal-component';
import gtag from "ga-gtag";

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
  const i18n = locale();
  let paymentMethods = SharedDataService.getPaymentMethods();
  let html = `
  <body class="bg-selection">
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
​
    <!--main-->
    <div role="main" class="account-form payment-form">
        <div class="row">
            ​
            <div class="account-form-header">
                <h2 class="account-form-title">${i18n.enrollmentPayment.title}</h2>
                <span class="account-form-step">${i18n.enrollmentPayment.step}</span>
            </div>
            ​
            <p class="account-form-desc">${i18n.enrollmentPayment.description}</p>
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
            
            <!--Additional check block-->
            ${paintAdditionalCheck(merchant)}
            <!--END OF Additional check block-->
            ​
            <div class="btn-container">
                <!--AÑADIDO-->
                <a href="#" title="Go back" id="btn-back" class="btn-back">${i18n.enrollmentPayment.button.back}</a>
                <!--END OF AÑADIDO-->
                <button type="button" id="btn-continue" name="btn-continue" class="form-btn-type2" disabled>${i18n.enrollmentPayment.button.apply}</button>
            </div>
            ​
        </div>
    </div>
    <!--END OF main-->
    
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
    <!--END OF modal congratulations-->
  </body>`;
    // Add to DOM
    document.body.outerHTML = html;
}

function paintTabs(paymentMethod) {
    const i18n = locale();
    return '';
    /*return +paymentMethod === 3 ? `
    <ul class="account-tabs" id="paymentTabs">
      <li class="active" id="creditCard">
          Credit cards
      </li>
      <li id="accounts">
          Bank accounts
      </li>
    </ul>` : '';*/
}

function printCreditCards(creditCards, paymentMethod) {
    const i18n = locale();
    const show = +paymentMethod === 3 || +paymentMethod === 1 ? 'show' : '';
    let html = `<div id="paymentCredit" class="account-bl ${show}"><ul id="slider-credit">`;
    creditCards.forEach((card, key) => {
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
      
      <!--AÑADIDO-->
      <div class="form-row-account">
        <div class="row-account-container" id="txt-cvv${key}-input-cont">
          <label for="txt-cvv${key}" class="form-label">${i18n.enrollmentPayment.cvv.title}</label>
          <input type="text" id="txt-cvv${key}" name="txt-cvv${key}" minlength="3" maxlength="4" class="form-txt cvv" value="" pattern="^[0-9]{3,4}$" required>
        </div>
        <span class="txt-error" id="error-txt-cvv${key}">${i18n.enrollmentPayment.cvv.error}</span>
      </div>
      <!--END OF AÑADIDO-->
      
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
    const backButton = document.getElementById('btn-back');
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

    //Validate cvv inputs
    const cardsCvv = document.querySelectorAll('.cvv');
    cardsCvv.forEach(input => {
        const inputEl = document.getElementById(input.id.trim());
        inputEl.addEventListener("keyup", () => {
            continueButton.disabled = !isValidForm(true);
            isValidInput(input, true);
        });
    });
    // Additional check change
    let additionalCheck = document.getElementById('ch-additional');
    if (additionalCheck) {
        //continueButton.disabled = true;
        additionalCheck.addEventListener("change", () => continueButton.disabled = !isValidForm(true));
        let linkBtn = document.getElementsByClassName('btn-link');
        for(let i = 0; i < linkBtn.length; i++) {
            linkBtn[i].addEventListener("click", (e) => {
                console.log(linkBtn[i].text.replace(' ', '_'));
                gtag('event', 'Merchant_' + merchantData.cdMerchantId, {
                    'event_category': 'Registro_Pago',
                    'event_label': linkBtn[i].text.replace(' ', '_')
                });
            });
        }
    }
    const appBtnModal = document.getElementsByClassName('btn-app');
    console.log(appBtnModal);
    for(let i = 0; i < appBtnModal.length; i++) {
        appBtnModal[i].addEventListener("click", (e) => {
            gtag('event', 'Descarga_' + appBtnModal[i].getAttribute('data-app') + '_' + merchantData.cdMerchantId, {
                'event_category': 'Descarga_store',
                'event_label': 'Descargar'
            });
        });
    }
    const webBtnModal = document.getElementById('btn-web');
    console.log(webBtnModal);
    webBtnModal.addEventListener("click", (e) => {
        gtag('event', 'Merchant_' + merchantData.cdMerchantId, {
            'event_category': 'Validación_registro',
            'event_label': 'Inicio_sesión'
        });
    });
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
        controls: true,
        navPosition: 'bottom',
        preventScrollOnTouch: 'auto',
    });
    /*const bankSlider = tns({
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
        controls: true,
        navPosition: 'bottom',
        preventScrollOnTouch: 'auto',
    });*/
    // Sliders events
    creditSlider.events.on('indexChanged', info => creditSliderIndex = info.index);
    //bankSlider.events.on('indexChanged', info => bankSliderIndex = info.index);

    /*AÑADIDO*/
    var infoCredit = creditSlider.getInfo(), indexCurrentCredit = infoCredit.index;
    infoCredit.slideItems[indexCurrentCredit].classList.add('active');


    creditSlider.events.on('indexChanged', function () {
            // get slider info
            var infoCredit = creditSlider.getInfo(),
                indexPrev = infoCredit.indexCached,
                indexCurrent = infoCredit.index;

            // update style based on index
            infoCredit.slideItems[indexPrev].classList.remove('active');
            infoCredit.slideItems[indexCurrent].classList.add('active');
        }
    );


    /*var infoBank = bankSlider.getInfo(), indexCurrentBank = infoBank.index;
    infoBank.slideItems[indexCurrentBank].classList.add('active');

    bankSlider.events.on('indexChanged', function () {
            // get slider info
            var infoBank = bankSlider.getInfo(),
                indexPrev = infoBank.indexCached,
                indexCurrent = infoBank.index;

            // update style based on index
            infoBank.slideItems[indexPrev].classList.remove('active');
            infoBank.slideItems[indexCurrent].classList.add('active');
        }
    );*/

    /*END OF AÑADIDO*/
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
    const i18n = locale();
    let message = i18n.error.default.description;
    const secret = sessionStorage.getItem('secret');
    const continueBtn = document.getElementById('btn-continue');
    const index = methodSelected === 'creditCards' ? creditSliderIndex : bankSliderIndex;
    const paymentMethods = SharedDataService.getPaymentMethods();
    const cardData = paymentMethods[methodSelected][index];
    const cvv = document.getElementById('txt-cvv'+index);
    const personalData = SharedDataService.getNewPersonalInfo();

    if (!isValidForm(true)) return false;

    cardData.cvv = cvv.value;

    // Integrity check cryptography
    const integrityCheck = CryptoJS.SHA256(JSON.stringify(personalData) + JSON.stringify(cardData)).toString();
    // Prepare request data
    const requestForm = {
        cdMerchantId: merchantData.cdMerchantId,
        registrationData: cryptoUtil.encrypt(secret, JSON.stringify(personalData)),
        cardData: cryptoUtil.encrypt(secret, JSON.stringify(cardData)),
        promoId: merchantData.promoSelected ? cryptoUtil.encrypt(secret, JSON.stringify(merchantData.promoSelected.promoId)) : null,
        integrityCheck: integrityCheck
    };

    gtag('event', 'Merchant_'+merchantData.cdMerchantId, {
        'event_category': 'Registro_Pago',
        'event_label': 'Registrarme'
    });

    // Send POST req
    continueBtn.disabled = true;
    loader('block');
    MerchantService.merchantRegistrationWithPayment(requestForm).then(response => {
      continueBtn.disabled = false;
      loader('none');
      if (response.status === 200) {
          response.json().then(data => {
              if (data.status !== 'ERROR') {
                  if (data.validationType === null) {
                      gtag('event', 'OK_'+merchantData.cdMerchantId, {
                          'event_category': 'Registro',
                          'event_label': 'Registrar'
                      });
                      openCongratsModal();
                  } else {
                      gtag('event', 'OK_con_verificacion_'+merchantData.cdMerchantId, {
                          'event_category': 'Registro',
                          'event_label': 'Registrar'
                      });
                      verificationView(merchantData, data);
                  }
              } else {
                  gtag('event', 'KO_'+merchantData.cdMerchantId, {
                      'event_category': 'Registro',
                      'event_label': 'Registrar'
                  });
                  if (data.message) message = data.message;
                  createModal({
                      title: '',
                      body: message,
                      btn: 1,
                      eventAction: 'Error_registro_pago',
                      eventCategory: 'Merchant_' + merchantData.cdMerchantId,
                      eventLabel: 'Aceptar',
                  });
              }
          })
      } else if (response.status !== 500){
        gtag('event', 'KO_'+merchantData.cdMerchantId, {
              'event_category': 'Registro',
              'event_label': 'Registrar'
        });
        response.json().then(data => {
          if (data.fieldsInError !== null) {
              createModal({
                  title: '',
                  body: 'Revisa los campos marcados en rojo',
                  btn: 1,
                  eventAction: 'Error_registro_pago',
                  eventCategory: 'Merchant_' + merchantData.cdMerchantId,
                  eventLabel: 'Aceptar',
              });
              const btnAccept = document.getElementById('btn-modal-close');
              btnAccept.addEventListener("click", () => registerMerchantView(merchantData, data.fieldsInError));

          }else{
              if (data.message) message = data.message;
              createModal({
                  title: '',
                  body: message,
                  btn: 1,
                  eventAction: 'Error_registro_pago',
                  eventCategory: 'Merchant_' + merchantData.cdMerchantId,
                  eventLabel: 'Aceptar',
              });
          }
        });
      } else {
        gtag('event', 'KO_'+merchantData.cdMerchantId, {
           'event_category': 'Registro',
           'event_label': 'Registrar'
        });
        createModal({
          title: '',
          body: message,
          btn: 1,
          eventAction: 'Error_registro_pago',
          eventCategory: 'Merchant_' + merchantData.cdMerchantId,
          eventLabel: 'Aceptar',
        });
      }
    }).catch((err) => {
      gtag('event', 'KO_'+merchantData.cdMerchantId, {
        'event_category': 'Registro',
        'event_label': 'Registrar'
      });
      continueBtn.disabled = false;
      createModal({
        title: '',
        body: message,
        btn: 1,
        eventAction: 'Error_registro_pago',
        eventCategory: 'Merchant_' + merchantData.cdMerchantId,
        eventLabel: 'Aceptar',
      });
    });
}

function openCongratsModal() {
    const modal = document.getElementById('congratulationsModal');
    modal.style.display = 'block';
}

function copyContentToClipboard(id) {
    let copyText = document.getElementById(id);
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

function paintAdditionalCheck(merchant){
  const i18n = locale();
  let html = '';
  if (merchant.merchantDetails.cardConditionsUrl) {
    const cardConditionsUrl = validateUrl(merchant.merchantDetails.cardConditionsUrl);
    html = `
      <div class="privacy-row">
        <div class="checkbox-simple">
          <input type="checkbox" id="ch-additional" name="ch-additional">
          <label for="ch-additional" class="checkbox-label">${i18n.enrollmentPayment.additional.text} <a href="${cardConditionsUrl}" target="_blank" class="btn-link">${i18n.enrollmentPayment.additional.title}</a></label>
        </div>
      </div>`;
    }
    return html;
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
      <p class="download-p">${i18n.congratulations.enjoy.title}</p>
      <a href="${webUrl}" id="btn-web" class="modal-btn type3" target="_blank">${i18n.congratulations.button.login}</a> `;
    }
    return html;
}

function isValidForm(showInputError) {
    let isValidField = isValidInput(showInputError);
    // Validate checks
    let additionalCheck = document.getElementById('ch-additional');
    if (additionalCheck && !additionalCheck.checked) isValidField = false;
    return isValidField;
}

function isValidInput(showInputError = true) {
    const index = methodSelected === 'creditCards' ? creditSliderIndex : bankSliderIndex;
    const child = document.getElementById('txt-cvv'+index);
    const parent = document.getElementById('txt-cvv'+index+'-input-cont');
    if (child && parent) {
        // Regex ALL
        const regex = new RegExp(child.pattern);
        if (child.pattern && !regex.test(child.value)) {
            if (showInputError) parent.classList.add('form-error');
            return false;
        } else {
            parent.classList.remove('form-error');
        }
        // Required ALL
        if (!child.value || child.value === undefined || child.value === null || child.value === '') {
            if (showInputError) parent.classList.add('form-error');
            return false;
        } else {
            parent.classList.remove('form-error');
        }
    }
    return true;
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