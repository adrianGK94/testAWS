import locale from "../config/locale/i18n";
import datepicker from 'js-datepicker';
import addMerchantView from './addMerchantView';
import registerPaymentMethod from './registerPaymentMethod';
import MerchantService from '../services/merchant-service';
import SharedDataService from '../services/shared-data-service';
import CryptoJS from "crypto-js";
import cryptoUtil from '../config/cryptoUtil';
import createModal from '../components/modal-component';
import gtag from "ga-gtag";

require("babel-core/register");
require("babel-polyfill");

let countriesProvinces = [];
let provinces = [];
let defaultPersonalInfo = '';

export default function registerMerchantView(merchant, fieldsInError = '') {
  defaultPersonalInfo = localStorage.getItem('defaultPersonalInfo');
  init(merchant, fieldsInError);
}

async function init(merchant, fieldsInError) {
  try {
    countriesProvinces = await getLocalJSON('../assets/data/countriesProvinces.json');
    provinces = await getLocalJSON('../assets/data/provinces.json');

    // Create HTML view
    createViewInHtml(merchant, fieldsInError);

    // Listeners configuration
    setEventListeners(merchant, fieldsInError);

    if (!fieldsInError) {
        isValidForm(merchant, fieldsInError, true);
    }
  } catch (error) {
      console.error(error);
  }
}

function getLocalJSON(path) {
  return fetch(path)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err));
}

function createViewInHtml(merchant, fieldsInError) {
  const i18n = locale();

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
    <div role="main" class="account-form">
        <div class="row">
        ​
          <!--form-->
          ${paintForm(merchant, fieldsInError)}
          <!--END OF form-->
            ​
        </div>
    </div>
    <!--END OF main-->
  </body>`;
  // Add to DOM
  document.body.outerHTML = html;
}

function setEventListeners(merchant, fieldsInError) {
    // Back button click
    const backButton = document.getElementById('btn-back');
    backButton.addEventListener("click", () => addMerchantView());
    // Form validation when some value change
    const submitForm = document.getElementById('dynamic-form');
    const continueBtn = document.getElementById('btn-continue');
    submitForm.addEventListener("change", () => continueBtn.disabled = !isValidForm(merchant, null, true));
    // Input validation when value change
    merchant.form.forEach(input => {
        const inputEl = document.getElementById(input.inputName.trim());
        inputEl.addEventListener("keyup", () => {
            continueBtn.disabled = !isValidForm(merchant, null, true);
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
    const linkBtn = document.getElementsByClassName('btn-link');
    for(let i = 0; i < linkBtn.length; i++) {
        linkBtn[i].addEventListener("click", (e) => {
            gtag('event', 'Merchant_' + merchant.cdMerchantId, {
                'event_category': 'Registro',
                'event_label': linkBtn[i].text.replace(' ','_')
            });
        });
    }
    configureInputDate();
}

function paintForm(merchant, fieldsInError) {
  const i18n = locale();
  const checked = SharedDataService.thereIsNewPersonalInfo() ? 'checked' : '';
  const disabled = SharedDataService.thereIsNewPersonalInfo() ? '' : 'disabled';
  let privacyPolicy = validateUrl(merchant.merchantDetails.privacyPolicy);
  let termsConditions = validateUrl(merchant.merchantDetails.termsConditions);
  let html = `
  <form id="dynamic-form" novalidate>
    <fieldset>
      ​
      <div class="account-form-header">
          <h2 class="account-form-title">${i18n.enrollmentForm.title}</h2>
          <span class="account-form-step">${i18n.enrollmentForm.step}</span>
      </div>
      ​
      <p class="account-form-desc">${i18n.enrollmentForm.description}</p>
      
      ${paintFormInputs(merchant.form, fieldsInError)} 

      <div class="privacy-row">
          <div class="checkbox-simple">
              <input type="checkbox" id="ch-privacy" name="ch-privacy" ${checked}>
              <label for="ch-privacy" class="checkbox-label">${i18n.enrollmentForm.privacy.text} <a href="${privacyPolicy}" target="_blank" class="btn-link">${i18n.enrollmentForm.privacy.title}</a></label>
          </div>
          <div class="checkbox-simple">
              <input type="checkbox" id="ch-terms" name="ch-terms" ${checked}>
              <label for="ch-terms" class="checkbox-label">${i18n.enrollmentForm.terms.text} <a href="${termsConditions}" target="_blank" class="btn-link">${i18n.enrollmentForm.terms.title}</a></label>
          </div>
          ${paintAdditionalCheck(merchant)}
      </div>
      ​
      <div class="btn-container">
          <!--AÑADIDO-->
          <a href="javascript:void(0)" title="Go back" id="btn-back" class="btn-back">${i18n.enrollmentForm.button.back}</a>
          <!--END OF AÑADIDO-->
          <button type="button" id="btn-continue" name="btn-continue" class="form-btn-type2" ${disabled}>${i18n.enrollmentForm.button.continue}</button>
      </div>
    </fieldset>
  </form>
  <!--END OF form-->`;
  return html;
}

function paintFormInputs(form, fieldsInError) {
    let html = '';
    let name = false;
    const personalInfo = SharedDataService.thereIsNewPersonalInfo() ? SharedDataService.getNewPersonalInfo() : SharedDataService.getDefaultPersonalInfo();
    form.forEach(input => {
        let text = '';
        input.value = '';
        if (input.issuerFieldsName === 'address-country'){
            text = personalInfo['address-country-name'];
        } else if (input.issuerFieldsName === 'address-province'){
            text = personalInfo['address-province-name'];
        }
        input.text = text;

        const issuerFieldsName = input.issuerFieldsName.split(',');
        if (issuerFieldsName.length > 1){
            issuerFieldsName.forEach (inputFieldName => {
                if (input.value !== '')
                    input.value += ' ';
                input.value += personalInfo[inputFieldName.replace( /\s/g, '')];
            });
        }else {
            if (SharedDataService.thereIsNewPersonalInfo()) {
                input.value = personalInfo[input.inputName.trim()] ? personalInfo[input.inputName.trim()] : '';
            } else {
                input.value = personalInfo[input.issuerFieldsName.trim()] ? personalInfo[input.issuerFieldsName.trim()] : '';
            }
        }
        const dataType = input.dataType.split('(');
        let dateFormat = 'dd-mm-yyyy';
        if (dataType[0] === 'date' && dataType.length > 1){
            dateFormat = dataType[1].substr(0, dataType[1].length -1);
        }

        switch (dataType[0].trim().toLowerCase()) {
            case 'text':
                html += createInputText(input, fieldsInError);
                break;
            case 'email':
                html += createInputText(input, fieldsInError);
                break;
            case 'number':
                html += createInputNumber(input, fieldsInError);
                break;
            case 'password':
                html += createInputPassword(input, fieldsInError);
                break;
            case 'dropdown':
                html += createInputDropDown(input, fieldsInError);
                break;
            case 'date':
                html += createInputDate(input, dateFormat, fieldsInError);
                break;
            default:
                return '';
        }
    });
    return html;
}

function createInputText(input, fieldsInError) {
  let errorClass = '';
  let errorInfo = '';
  if (fieldsInError !== '') {
      const fields = Object.keys(fieldsInError);
      fields.forEach(field => {
        if (field.toString() === input.inputName.trim().toString()){
          errorClass = 'form-error';
          errorInfo = fieldsInError[field];
        }
      });
  }
  let value = input.value;
  if (input.issuerFieldsName === 'address-country' || input.issuerFieldsName === 'address-province'){
    value = input.text;
  }
  let tooltip = !!input.toolTip ? `<span class="txt-info" id="tooltip-${input.inputName.trim()}">${input.toolTip}</span>` : '';
  let html = `
  <div class="form-row-account">
    <div class="row-account-container ${errorClass}" id="${input.inputName.trim()}-input-cont">
      <label for="${input.inputName.trim()}" class="form-label">${input.label}</label>
      <input type="text" class="form-txt" value="${value}" id="${input.inputName.trim()}" name="${input.inputName.trim()}" pattern="${input.regexValidation}">
    </div>
    ${tooltip}
    <span class="txt-error" id="error-txt-${input.inputName.trim()}">${errorInfo}</span>
  </div>`;
  return html;
}

function createInputNumber(input, fieldsInError) {
  let errorClass = '';
  let errorInfo = '';
  if (fieldsInError !== '') {
    const fields = Object.keys(fieldsInError);
    fields.forEach(field => {
        if (field.toString() === input.inputName.trim().toString()){
            errorClass = 'form-error';
            errorInfo = fieldsInError[field];
        }
    });
  }
  let tooltip = !!input.toolTip ? `<span class="txt-info" id="tooltip-${input.inputName.trim()}">${input.toolTip}</span>` : '';
  let html = `
  <div class="form-row-account">
    <div class="row-account-container ${errorClass}" id="${input.inputName.trim()}-input-cont">
      <label for="${input.inputName.trim()}" class="form-label">${input.label}</label>
      <input type="number" class="form-txt" min="${input.minSize}" max="${input.maxSize}" value="${input.value}" id="${input.inputName.trim()}" name="${input.inputName.trim()}" pattern="${input.regexValidation}">
    </div>
    ${tooltip}
    <span class="txt-error" id="error-txt-${input.inputName.trim()}">${errorInfo}</span>
  </div>`;
  return html;
}

function createInputPassword(input, fieldsInError) {
  let errorClass = '';
  let errorInfo = '';
  if (fieldsInError !== '') {
    const fields = Object.keys(fieldsInError);
    fields.forEach(field => {
        if (field.toString() === input.inputName.trim().toString()){
            errorClass = 'form-error';
            errorInfo = fieldsInError[field];
        }
    });
  }
  let tooltip = !!input.toolTip ? `<span class="txt-info" id="tooltip-${input.inputName.trim()}">${input.toolTip}</span>` : '';
  let html = `
  <div class="form-row-account">
    <div class="row-account-container ${errorClass}" id="${input.inputName.trim()}-input-cont">
      <label for="${input.inputName.trim()}" class="form-label">${input.label}</label>
      <input type="password" class="form-txt form-pass" minlength="${input.minSize}" maxlength="${input.maxSize}" value="${input.value}" id="${input.inputName.trim()}" name="${input.inputName.trim()}" pattern="${input.regexValidation}">
      <button type="button" data-input-id="${input.inputName.trim()}" class="icon-pass icon-show"></button>
    </div>
    ${tooltip}
    <span class="txt-error" id="error-txt-${input.inputName.trim()}">${errorInfo}</span>
  </div>`;
  return html;
}

function createInputDropDown(input, fieldsInError) {
  let errorClass = '';
  let errorInfo = '';
  if (fieldsInError !== '') {
    const fields = Object.keys(fieldsInError);
    fields.forEach(field => {
        if (field.toString() === input.inputName.trim().toString()){
            errorClass = 'form-error';
            errorInfo = fieldsInError[field];
        }
    });
  }
  const phonesList = countriesProvinces.map(x => {
    return {
        val: x.prefix_phone,
        name: x.prefix_phone
    };
  });
  sortList(phonesList);
  const countryList = countriesProvinces.map(x => {
    return {
        val: x.code,
        name: x.name_es
    };
  });
  sortList(countryList);
  const provinceList = provinces
    .filter(x => x.country === SharedDataService.getDefaultPersonalInfo()['address-country'])
    .map(x => {
      return {
        val: x.short ? x.short : x.name,
        name: x.english ? x.english : x.name
      };
    });
  sortList(provinceList);

  let dropDown = `<option></option>`;
  let tooltip = !!input.toolTip ? `<span class="txt-info" id="tooltip-${input.inputName.trim()}">${input.toolTip}</span>` : '';
  if (input.dropDown !== '') {
    dropDown = !!input.dropDown ? input.dropDown.split(',').map(txt => {
      if (JSON.stringify(input.value).toLowerCase() === JSON.stringify(txt).toLowerCase()) {
        return `<option selected>${txt}</option>`;
      }
      return `<option>${txt}</option>`;
    }) : [];
  }else{
    if (input.issuerFieldsName === 'country') {
      countryList.forEach(country => {
        const selected = JSON.stringify(input.value).toLowerCase() === JSON.stringify(country.val).toLowerCase() ? 'selected' : '';
        dropDown += `<option value="${country.val}" ${selected}>${country.name}</option>`;
      });
    }else if (input.issuerFieldsName === 'address-province') {
      provinceList.forEach(province => {
        const selected = JSON.stringify(input.value).toLowerCase() === JSON.stringify(province.val).toLowerCase() ? 'selected' : '';
        dropDown += `<option value="${province.val}" ${selected}>${province.name}</option>`;
      });
    }else if (input.issuerFieldsName === 'phone-prefix') {
      phonesList.forEach(prefix => {
        const selected = JSON.stringify(input.value).toLowerCase() === JSON.stringify(prefix.val).toLowerCase() ? 'selected' : '';
        dropDown += `<option value="${prefix.val}" ${selected}>${prefix.name}</option>`;
      });
    }
  }
  let html = `
  <div class="form-row-account">
    <div class="row-account-container ${errorClass}" id="${input.inputName.trim()}-input-cont">
      <label for="${input.inputName.trim()}y" class="form-label">${input.label}</label>
      <div class="form-select-container">
        <select id="${input.inputName.trim()}" name="${input.inputName.trim()}" class="form-select">
          ${dropDown}
        </select>
      </div>
    </div>
    ${tooltip}
    <span class="txt-error" id="error-txt-${input.inputName.trim()}">${errorInfo}</span>
  </div>`;
  return html;
}

function createInputDate(input, dateFormat, fieldsInError) {
  let errorClass = '';
  let errorInfo = '';
  if (fieldsInError !== '') {
    const fields = Object.keys(fieldsInError);
    fields.forEach(field => {
        if (field.toString() === input.inputName.trim().toString()){
            errorClass = 'form-error';
            errorInfo = fieldsInError[field];
        }
    });
  }
  let dateValue = '';
  if (input.value !== ''){
      dateValue = input.value.split('-').join('/');
  }
  let tooltip = !!input.toolTip ? `<span class="txt-info" id="tooltip-${input.inputName.trim()}">${input.toolTip}</span>` : '';
  let html = `
  <div class="form-row-account">
    <div class="row-account-container ${errorClass}" id="${input.inputName.trim()}-input-cont">
      <label for="${input.inputName.trim()}" class="form-label">${input.label}</label>
      <input type="text" class="form-txt inputDate" value="${dateValue}" id="${input.inputName.trim()}" name="${input.inputName.trim()}" attr-format="${dateFormat}">
    </div>
    ${tooltip}
    <span class="txt-error" id="error-txt-${input.inputName.trim()}">${errorInfo}</span>
  </div>`;
  return html;
}

function configureInputDate(){
  let inputs = document.getElementsByClassName('inputDate');
  for(let i = 0; i < inputs.length; i++) {
    const picker = datepicker('#' + inputs[i].id, {
      formatter: (input, date, instance) => {
        const value = date.toLocaleDateString()
        input.value = value
      },
      customDays: ['Lu.', 'Ma.', 'Mi.', 'Ju.', 'Vi.', 'Sa.', 'Do.'],
      customMonths: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    });

    if (inputs[i].value !== '') {
      const date = inputs[i].value.split('/');
      picker.setDate(new Date(date[2], parseInt(date[1]) - 1, date[0]), true);
    }
  }
}

function changeCountryDropdown() {
  const countryDropdown = document.getElementById('address-country');
  countryDropdown.addEventListener('change', (ev) => {
    const provinceList = provinces
      .filter(x => x.country === ev.target.value)
      .map(x => {
        return {
          val: x.short ? x.short : x.name,
          name: x.english ? x.english : x.name
      };
    });
    sortList(provinceList);
    /*defaultPersonalInfo['address-province'] = ''; // Reset province
    const html = createInputDropDownHtml(defaultPersonalInfo['address-province'], 'address-province',
      'address-province', provinceList);
    const provinceContainer = document.getElementById('province-container').innerHTML = html;*/
  });
}

function paintAdditionalCheck(merchant){
  const i18n = locale();
  const checked = SharedDataService.thereIsNewPersonalInfo() ? 'checked' : '';
  let html = '';
  if (merchant.merchantDetails.additionalConditionsUrl) {
    let additionalConditionsUrl = validateUrl(merchant.merchantDetails.additionalConditionsUrl);
    if (additionalConditionsUrl.indexOf("http://") === -1 && additionalConditionsUrl.indexOf("https://") === -1) {
        additionalConditionsUrl = 'https://' + additionalConditionsUrl;
    }
    html = `
    <div class="checkbox-simple">
      <input type="checkbox" id="ch-additional" name="ch-additional" ${checked}>
      <label for="ch-additional" class="checkbox-label">${i18n.enrollmentForm.additional.text} <a href="${additionalConditionsUrl}" target="_blank" class="btn-link">${i18n.enrollmentForm.additional.title}</a></label>
    </div>`;
  }
  return html;
}

function isValidForm(merchant, fieldsInError, showInputError) {
  // Validate dynamic inputs
  let isValid = true;
  for (const input of merchant.form) {
    let isValidField = isValidInput(input, fieldsInError, showInputError);
    if (isValidField === false) isValid = false;
  }
  if (isValid === false) return false;
  // Validate checks
  let privacyCheck = document.getElementById('ch-privacy');
  let termsCheck = document.getElementById('ch-terms');
  let additionalCheck = document.getElementById('ch-additional');
  if (!privacyCheck.checked || !termsCheck.checked) return false;
  if (additionalCheck && !additionalCheck.checked) return false;
  return true;
}

function isValidInput(input, fieldsInError, showInputError = true) {
  const child = document.getElementById(input.inputName.trim());
  const parent = document.getElementById(`${input.inputName.trim()}-input-cont`);
  const tooltipLabel = document.getElementById(`tooltip-${input.inputName.trim()}`);
  const errorLabel = document.getElementById(`error-txt-${input.inputName.trim()}`);
  if (errorLabel) errorLabel.innerHTML = '';
  if (child && parent) {
    if (fieldsInError && parent.classList.contains('form-error')) return false;
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
 let registrationForm = {};
 // Get form values in JSON format
 let formData = new FormData(document.getElementById('dynamic-form'));
 formData.forEach((value, key) => {
   if (document.getElementById(key).hasAttribute('attr-format')){
     const dateFormat = document.getElementById(key).getAttribute('attr-format');
     const birthdate = value.split('/');
     registrationForm[key] = dateFormat.replace('dd',birthdate[0]).replace('mm',(parseInt(birthdate[1])).toString()).replace('yyyy',birthdate[2].toString());
   } else {
     registrationForm[key] = (key === 'ch-terms' || key === 'ch-privacy') ? true : value;
     if (key === 'addressCountry') registrationForm['address-country-name'] = value;
     if (key === 'addressLocation') registrationForm['address-province-name'] = value;
   }
 });
 gtag('event', 'Merchant_'+merchant.cdMerchantId, {
   'event_category': 'Registro',
   'event_label': 'Continuar'
 });
 SharedDataService.setNewPersonalInfo(registrationForm);
 registerPaymentMethod(merchant, registrationForm);
}

function validateUrl(url) {
  if (url !== '' && url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
    url = 'https://' + url;
  }
  return url;
}

function sortList(list){
    list.sort(function (a, b) {
        return a.name.localeCompare(b.name);
    });
}