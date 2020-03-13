import addMerchantView from './addMerchantView';
import registerPaymentMethod from './registerPaymentMethod';
import MerchantService from '../services/merchant-service';
import SharedDataService from '../services/shared-data-service';
import CryptoJS from "crypto-js";
import cryptoUtil from '../config/cryptoUtil';
import createModal from '../components/modal-component';

export default function registerMerchantView(merchant) {
  // Create HTML view
  createViewInHtml(merchant);
  // Listeners configuration
  setEventListeners(merchant);
}

function createViewInHtml(merchant) {
  let html = `
  <body class="bg-selection">
    <!--header-->
    <header role="banner">
        <div class="row">
            <div class="header-main">
                <a class="header-link"><span class="icon-back" id="back-button"></span></a>
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
          <!--form-->
          ${paintForm(merchant)}
          <!--END OF form-->
            ​
        </div>
    </div>
    <!--END OF main-->
  </body>`;
  // Add to DOM
  document.body.outerHTML = html;
}

function setEventListeners(merchant) {
  // Back button click
  const backButton = document.getElementById('back-button');
  backButton.addEventListener("click", () => addMerchantView());
  // Form validation when some value change
  const submitForm = document.getElementById('dynamic-form');
  const continueBtn = document.getElementById('btn-continue');
  submitForm.addEventListener("change", () => continueBtn.disabled = !isValidForm(merchant, false));
  // Input validation when value change
  merchant.form.forEach(input => {
    const inputEl = document.getElementById(input.inputName);
    inputEl.addEventListener("keyup", () => {
      continueBtn.disabled = !isValidForm(merchant, false);
      isValidInput(input, true);
    });
  });
  // Form submit
  continueBtn.addEventListener("click", () => submit(merchant));
  // Toggle password for every input
  const passwordBtns = document.querySelectorAll('.icon-pass');
  passwordBtns.forEach(pass => {
    pass.addEventListener("click", (e) => {
      const inputAssociated = document.getElementById(pass.getAttribute('data-input-id'));
      if (inputAssociated.type === 'text') {
        inputAssociated.type = 'password';
        pass.classList.add('icon-show');
        pass.classList.remove('icon-hide');
      } else {
        inputAssociated.type = 'text';
        pass.classList.remove('icon-show');
        pass.classList.add('icon-hide');
      }
    });
  });
}

function paintForm(merchant) {
  const checked = SharedDataService.thereIsNewPersonalInfo() ? 'checked' : '';
  const disabled = SharedDataService.thereIsNewPersonalInfo() ? '' : 'disabled';
  let html = `
  <form id="dynamic-form" novalidate>
    <fieldset>
      ​
      <div class="account-form-header">
          <h2 class="account-form-title">Personal information</h2>
          <span class="account-form-step">Step 1 of 2</span>
      </div>
      ​
      <p class="account-form-desc">Validate suggested profile information</p>
      
      ${paintFormInputs(merchant.form)}

      <div class="privacy-row">
          <div class="checkbox-simple">
              <input type="checkbox" id="ch-privacy" name="ch-privacy" ${checked}>
              <label for="ch-privacy" class="checkbox-label">I agree to the <a href="${merchant.merchantDetails.privacyPolicy}" target="_blank">Privacy Policy</a></label>
          </div>
          <div class="checkbox-simple">
              <input type="checkbox" id="ch-terms" name="ch-terms" ${checked}>
              <label for="ch-terms" class="checkbox-label">I agree to the <a href="${merchant.merchantDetails.termsConditions}" target="_blank">Terms and Conditions</a></label>
          </div>
      </div>
      ​
      <div class="btn-container">
          <button type="button" id="btn-continue" name="btn-continue" class="form-btn-type2" ${disabled}>Continue</button>
      </div>
    </fieldset>
  </form>
  <!--END OF form-->`;
  return html;
}

function paintFormInputs(form) {
  let html = '';
  const personalInfo = SharedDataService.thereIsNewPersonalInfo() ? SharedDataService.getNewPersonalInfo() : SharedDataService.getDefaultPersonalInfo();
  form.forEach(input => {
    input.value = personalInfo[input.inputName] ? personalInfo[input.inputName] : '';
    switch (input.dataType) {
      case 'text':
        html += createInputText(input);
        break;
      case 'email':
        html += createInputText(input);
        break;
      case 'number':
        html += createInputNumber(input);
        break;
      case 'password':
        html += createInputPassword(input);
        break;
      case 'dropdown':
        html += createInputDropDown(input);
        break;
      default:
        return '';
    }
  });
  return html;
}

function createInputText(input) {
  let tooltip = !!input.toolTip ? `<span class="txt-info" id="tooltip-${input.inputName}">${input.toolTip}</span>` : '';
  let html = `
  <div class="form-row-account">
    <div class="row-account-container" id="${input.inputName}-input-cont">
      <label for="${input.inputName}" class="form-label">${input.label}</label>
      <input type="text" class="form-txt" value="${input.value}" id="${input.inputName}" name="${input.inputName}" pattern="${input.regexValidation}">
    </div>
    ${tooltip}
    <span class="txt-error" id="error-txt-${input.inputName}"></span>
  </div>`;
  return html;
}

function createInputNumber(input) {
  let tooltip = !!input.toolTip ? `<span class="txt-info" id="tooltip-${input.inputName}">${input.toolTip}</span>` : '';
  let html = `
  <div class="form-row-account">
    <div class="row-account-container" id="${input.inputName}-input-cont">
      <label for="${input.inputName}" class="form-label">${input.label}</label>
      <input type="number" class="form-txt" value="${input.value}" id="${input.inputName}" name="${input.inputName}" pattern="${input.regexValidation}">
    </div>
    ${tooltip}
    <span class="txt-error" id="error-txt-${input.inputName}"></span>
  </div>`;
  return html;
}

function createInputPassword(input) {
  let tooltip = !!input.toolTip ? `<span class="txt-info" id="tooltip-${input.inputName}">${input.toolTip}</span>` : '';
  let html = `
  <div class="form-row-account">
    <div class="row-account-container" id="${input.inputName}-input-cont">
      <label for="${input.inputName}" class="form-label">${input.label}</label>
      <input type="password" class="form-txt form-pass" value="${input.value}" id="${input.inputName}" name="${input.inputName}" pattern="${input.regexValidation}">
      <button type="button" data-input-id="${input.inputName}" class="icon-pass icon-show"></button>
    </div>
    ${tooltip}
    <span class="txt-error" id="error-txt-${input.inputName}"></span>
  </div>`;
  return html;
}

function createInputDropDown(input) {
  let tooltip = !!input.toolTip ? `<span class="txt-info" id="tooltip-${input.inputName}">${input.toolTip}</span>` : '';
  let dropDown = !!input.dropDown ? input.dropDown.split(',').map(txt => {
    if (JSON.stringify(input.value).toLowerCase() === JSON.stringify(txt).toLowerCase()) {
      return `<option selected>${txt}</option>`;
    }
    return `<option>${txt}</option>`;
  }) : [];
  let html = `
  <div class="form-row-account">
    <div class="row-account-container" id="${input.inputName}-input-cont">
      <label for="${input.inputName}y" class="form-label">${input.label}</label>
      <div class="form-select-container">
        <select id="${input.inputName}" name="${input.inputName}" class="form-select">
          ${dropDown}
        </select>
      </div>
    </div>
    ${tooltip}
    <span class="txt-error" id="error-txt-${input.inputName}"></span>
  </div>`;
  return html;
}

function isValidForm(merchant, showInputError) {
  // Validate checks
  let privacyCheck = document.getElementById('ch-privacy');
  let termsCheck = document.getElementById('ch-terms');
  if (!privacyCheck.checked || !termsCheck.checked) return false;
  // Validate dynamic inputs
  for (const input of merchant.form) {
    const isValid = isValidInput(input, showInputError);
    if (isValid === false) return false;
  }
  return true;
}

function isValidInput(input, showInputError = true) {
  const child = document.getElementById(input.inputName);
  const parent = document.getElementById(`${input.inputName}-input-cont`);
  const tooltipLabel = document.getElementById(`tooltip-${input.inputName}`);
  const errorLabel = document.getElementById(`error-txt-${input.inputName}`);
  if (errorLabel) errorLabel.innerHTML = '';
  if (child && parent) {
    // Regex ALL
    const regex = new RegExp(input.regexValidation);
    if (input.regexValidation && !regex.test(child.value)) {
      if (showInputError) parent.classList.add('form-error');
      if (showInputError && tooltipLabel) tooltipLabel.classList.add('tooltip-error');
      return false;
    } else {
      parent.classList.remove('form-error');
      if (showInputError && tooltipLabel) tooltipLabel.classList.remove('tooltip-error');
    }
    // Required ALL
    if (!child.value || child.value === undefined || child.value === null || child.value === '') {
      if (showInputError) parent.classList.add('form-error');
      if (showInputError && tooltipLabel) tooltipLabel.classList.add('tooltip-error');
      return false;
    } else {
      parent.classList.remove('form-error');
      if (showInputError && tooltipLabel) tooltipLabel.classList.remove('tooltip-error');
    }
  }
  return true;
}

function submit(merchant) {
  const secret = sessionStorage.getItem('secret');
  let continueBtn = document.getElementById('btn-continue');
  let registrationForm = {};
  let cdMerchantId = merchant.cdMerchantId;
  let integrityCheck = '';
  // Get form values in JSON format
  let formData = new FormData(document.getElementById('dynamic-form'));
  formData.forEach((value, key) => {
    registrationForm[key] = (key === 'ch-terms' || key === 'ch-privacy') ? true : value;
  });
  // Integrity check cryptography
  integrityCheck = CryptoJS.SHA256(JSON.stringify(registrationForm) + JSON.stringify(cdMerchantId)).toString();
  // Prepare request data
  const requestForm = {
    registrationForm: cryptoUtil.encrypt(secret, JSON.stringify(registrationForm)),
    cdMerchantId: cryptoUtil.encrypt(secret, JSON.stringify(cdMerchantId)),
    promoId: merchant.promoSelected ? cryptoUtil.encrypt(secret, JSON.stringify(merchant.promoSelected.promoId)) : null,
    integrityCheck: integrityCheck
  };
  // Send POST req
  continueBtn.disabled = true;
  MerchantService.merchantRegistration(requestForm).then((response) => {
    continueBtn.disabled = false;
    if (response.status === 200) {
      response.json().then(data => {
        // Save data locally
        SharedDataService.setNewPersonalInfo(registrationForm);
        // Get email to pass to next view
        if (registrationForm.email) {
          data.email = registrationForm.email;
        } else {
          data.email = SharedDataService.getDefaultPersonalInfo().email;
        }
        registerPaymentMethod(merchant, data);
      });
    } else if (response.status === 409) {
      createModal({
        title: 'Error',
        body: 'There is an account associated with this email. Please try again with another email.',
        btn: 2
      });
    } else if (response.status === 400) {
      response.json().then(data => {
        merchant.form.forEach(input => {
          const errorLabel = document.getElementById(`error-txt-${input.inputName}`);
          const parent = document.getElementById(`${input.inputName}-input-cont`);
          if (errorLabel) {
            if (data.fieldsInError[input.inputName]) {
              errorLabel.innerHTML = data.fieldsInError[input.inputName];
              parent.classList.add('form-error');
            } else {
              parent.classList.remove('form-error');
            }
          }
        });
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