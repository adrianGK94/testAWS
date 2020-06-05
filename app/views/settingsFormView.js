import locale from "../config/locale/i18n";
import loadingView from './loadingView';
import SharedDataService from "../services/shared-data-service";
import cryptoUtil from '../config/cryptoUtil';
import createModal from "../components/modal-component";

export default function settingsForm() {
  try {
    // Show loading until screen been prepared
    loadingView();
    // Create HTML view
    createViewInHtml();
    // Listeners configuration
    setEventListeners();
  } catch (error) {
    window.location = '/';
  }
}

function createViewInHtml() {
  const i18n = locale();

  const defaultPersonalInfo = localStorage.getItem('defaultPersonalInfo');

  const html = `
  <body class="bg-gray">
    <!--main-->
    <div role="main" class="main-register-form">
      <div class="row">
    
        <!--form-->
        <form id="personalForm">
          <fieldset>
    
            <div class="account-form-header">
              <h2 class="account-form-title">Personal information</h2>
            </div>
    
            <!--Personal data-->
            <div class="register-form-container">
    
              <div class="col-left">

                <!--Email-->
                <div class="form-row-account">
                  <div class="row-account-container form-error">
                    <label for="txt-email" class="form-label">Email</label>
                    <input type="text" id="txt-email" name="txt-email" class="form-txt">
                  </div>
                  <span class="txt-error">Error lorem ipsum sit amet</span>
                </div>
  
                <!--Document number-->
                <div class="form-row-account">
                  <div class="row-account-container">
                    <label for="txt-document" class="form-label">Document Number (optional)</label>
                    <input type="text" id="txt-document" name="txt-document" class="form-txt">
                  </div>
                </div>
  
                <!--Name-->
                <div class="form-row-account">
                  <div class="row-account-container">
                    <label for="txt-name" class="form-label">Name (optional)</label>
                    <input type="text" id="txt-name" name="txt-name" class="form-txt">
                  </div>
                </div>
  
                <!--Surname-->
                <div class="form-row-account">
                  <div class="row-account-container">
                    <label for="txt-surname" class="form-label">Surname (optional)</label>
                    <input type="text" id="txt-surname" name="txt-surname" class="form-txt">
                  </div>
                </div>
  
  
                <!--Surname2-->
                <div class="form-row-account">
                  <div class="row-account-container">
                    <label for="txt-surname2" class="form-label">2nd Surname (optional)</label>
                    <input type="text" id="txt-surname2" name="txt-surname2" class="form-txt">
                  </div>
                </div>
  
                <!--Birthday-->
                <div class="form-row-account">
                  <div class="row-account-container">
                    <label for="txt-birthday" class="form-label">Birthday (optional)</label>
                    <input type="text" id="txt-birthday" name="txt-birthday" class="form-txt">
                  </div>
                </div>
  
                <div class="form-row-account two-cols">
  
                  <!--Prefix-->
                  <div class="row-account-container size1">
                    <label for="select-prefix" class="form-label">Prefix (optional)</label>
                    <div class="form-select-container">
                      <select id="select-prefix" name="select-prefix" class="form-select">
                        <option>+34</option>
                      </select>
                    </div>
                  </div>

                  <!--Phone number-->
                  <div class="row-account-container size2">
                      <label for="txt-phone" class="form-label">Phone number (optional)</label>
                      <input type="text" id="txt-phone" name="txt-phone" class="form-txt">
                  </div>
  
                </div>
              </div>
    
    
              <div class="col-right">

                <!--Address-->
                <div class="form-row-account">
                  <div class="row-account-container">
                    <label for="txt-address" class="form-label">Address (optional)</label>
                    <input type="text" id="txt-address" name="txt-address" class="form-txt">
                  </div>
                </div>

                <div class="form-row-account two-cols">
                  <!--Number-->
                  <div class="row-account-container size3">
                    <label for="txt-number" class="form-label">Number (optional)</label>
                    <input type="text" id="txt-number" name="txt-number" class="form-txt">
                  </div>

                  <!--Other info-->
                  <div class="row-account-container size3">
                    <label for="txt-other" class="form-label">Other info (optional)</label>
                    <input type="text" id="txt-other" name="txt-other" class="form-txt">
                  </div>

                </div>

                <!--Country-->
                <div class="form-row-account">
                  <div class="row-account-container">
                    <label for="select-country" class="form-label">Country (optional)</label>
                    <div class="form-select-container">
                      <select id="select-country" name="select-country" class="form-select">
                        <option>Spain</option>
                      </select>
                    </div>
                  </div>
                </div>


                <!--Location-->
                <div class="form-row-account">
                  <div class="row-account-container">
                    <label for="select-location" class="form-label">Country (optional)</label>
                    <div class="form-select-container">
                      <select id="select-location" name="select-location" class="form-select">
                         <option>Madrid</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!--City-->
                <div class="form-row-account">
                  <div class="row-account-container">
                    <label for="txt-city" class="form-label">City (optional)</label>
                    <input type="text" id="txt-city" name="txt-city" class="form-txt">
                  </div>
                </div>


                <!--Postal code-->
                <div class="form-row-account">
                  <div class="row-account-container">
                    <label for="txt-postal" class="form-label">Postal Code (optional)</label>
                    <input type="text" id="txt-postal" name="txt-postal" class="form-txt">
                  </div>
                </div>

              </div>
    
            </div>
            <!--END OF Personal data-->
    
    
              <!--Cards & Account data-->
              <div class="register-form-container">
                <!--Cards-->
                <div class="col-left">
                  <h3 class="account-form-title">Cards</h3>

                  <!--CARD REPEATER BLOCK-->
                  <div class="repeater-block card-block">
                          <div class="account-form-actions">
                              <h4 class="account-form-title2">Card data 1</h4>
                          </div>
                          <p class="account-form-desc">Select a card background:</p>

                          <!--cards list-->
                          <ul class="select-item-list">
                              <li>
                                  <div class="credit-card select-item">
                                      <div class="select-item-radio">
                                          <input type="radio" id="card-radio-item1-1" name="card-radio-item" >
                                          <label for="card-radio-item1-1"></label>
                                      </div>
                                      <img src="assets/img/backgrounds/orange.svg" alt="" class="bg-card">
                                  </div>
                              </li>
                              <li>
                                  <div class="credit-card select-item">
                                      <div class="select-item-radio">
                                          <input type="radio" id="card-radio-item1-2" name="card-radio-item" >
                                          <label for="card-radio-item1-2"></label>
                                      </div>
                                      <img src="assets/img/backgrounds/blue.svg" alt="" class="bg-card">
                                  </div>
                              </li>
                              <li>
                                  <div class="credit-card select-item">
                                      <div class="select-item-radio">
                                          <input type="radio" id="card-radio-item1-3" name="card-radio-item" >
                                          <label for="card-radio-item1-3"></label>
                                      </div>
                                      <img src="assets/img/backgrounds/green.svg" alt="" class="bg-card">
                                  </div>
                              </li>
                              <li>
                                  <div class="credit-card select-item">
                                      <div class="select-item-radio">
                                          <input type="radio" id="card-radio-item1-4" name="card-radio-item" >
                                          <label for="card-radio-item1-4"></label>
                                      </div>
                                      <img src="assets/img/backgrounds/purple.svg" alt="" class="bg-card">
                                  </div>
                              </li>
                              <li>
                                  <div class="credit-card select-item">
                                      <div class="select-item-radio">
                                          <input type="radio" id="card-radio-item1-5" name="card-radio-item" >
                                          <label for="card-radio-item1-5"></label>
                                      </div>
                                      <img src="assets/img/backgrounds/red.svg" alt="" class="bg-card">
                                  </div>
                              </li>
                              <li>
                                  <div class="credit-card select-item">
                                      <div class="select-item-radio">
                                          <input type="radio" id="card-radio-item1-6" name="card-radio-item" >
                                          <label for="card-radio-item1-6"></label>
                                      </div>
                                      <img src="assets/img/backgrounds/darkblue.svg" alt="" class="bg-card">
                                  </div>
                              </li>
                              <li>
                                  <div class="credit-card select-item">
                                      <div class="select-item-radio">
                                          <input type="radio" id="card-radio-item1-7" name="card-radio-item" >
                                          <label for="card-radio-item1-7"></label>
                                      </div>
                                      <img src="assets/img/backgrounds/gray.svg" alt="" class="bg-card">
                                  </div>
                              </li>
                          </ul>
                          <!--END OF cards list-->
                          
                          <div class="form-row-account two-cols">

                            <!--Card Country-->
                            <div class="row-account-container size2">
                                <label for="select-card-country2" class="form-label">Country</label>
                                <div class="form-select-container">
                                    <select id="select-card-country2" name="select-card-country2" class="form-select">
                                        <option></option>
                                        <option>España</option>
                                    </select>
                                </div>
                                <span class="txt-error">Error lorem ipsum sit amet</span>
                            </div>

                            <!--Card Currency-->
                            <div class="row-account-container size1">
                                <label for="select-card-currency2" class="form-label">Currency</label>
                                <div class="form-select-container">
                                    <select id="select-card-currency2" name="select-card-currency2" class="form-select">
                                        <option></option>
                                        <option>Euro(€)</option>
                                    </select>
                                </div>
                                <span class="txt-error">Error lorem ipsum sit amet</span>
                            </div>

                        </div>

                          <!--Card holder-->
                          <div class="form-row-account">
                              <div class="row-account-container">
                                  <label for="txt-cardHolder1" class="form-label">Card holder</label>
                                  <input type="text" id="txt-cardHolder1" name="txt-cardHolder1" class="form-txt">
                              </div>
                              <span class="txt-error">Error lorem ipsum sit amet</span>
                          </div>

                          <!--Card pan-->
                          <div class="form-row-account">
                              <div class="row-account-container">
                                  <label for="txt-cardPan1" class="form-label">Card pan</label>
                                  <input type="text" id="txt-cardPan1" name="txt-cardPan1" class="form-txt">
                              </div>
                              <span class="txt-error">Error lorem ipsum sit amet</span>
                          </div>

                          <!--Card expiry date-->
                          <div class="form-row-account">
                              <div class="row-account-container size3">
                                  <label for="txt-cardExpiry1" class="form-label">Card expiry date</label>
                                  <input type="text" id="txt-cardExpiry1" name="txt-cardExpiry1" class="form-txt">
                              </div>
                              <span class="txt-error">Error lorem ipsum sit amet</span>
                          </div>


                  </div>
                  <!--END OF CARD REPEATER BLOCK-->

                  <a href="#" id="btn-new-card" class="add-new-link">Add new</a>

                </div>
                <!--END OF Cards-->

                <!--Accounts-->
                <div class="col-right">
                  <h3 id="account-bank" class="account-form-title">Bank accounts</h3>

                  <a href="#" id="btn-new-bank" class="add-new-link">Add new</a>

                </div>
                <!--END OF Accounts-->

              </div>
              <!--END OF Cards & Account data-->
    
              <div class="btn-container">
                <a href="#" title="Cancel" id="btn-back" class="btn-back">Cancel</a>
                <button type="button" id="btn-continue" name="btn-continue" class="form-btn-type2" disabled>Save</button>
              </div>
            </fieldset>
          </form>
          <!--END OF form-->
    
        </div>
    </div>
    <!--END OF main-->

  </body>`;
  // Add to DOM
  document.body.outerHTML = html;
}

function setEventListeners() {
  // Back button go to home
  clickBackBtn();
  // Apply buttons listeners
  clickApplyBtn();

  const btnNewCard = document.getElementById("btn-new-card");
  btnNewCard.addEventListener("click", (e) => {
    e.preventDefault();
    addCard();
  });

  const btnNewBank = document.getElementById("btn-new-bank");
    btnNewBank.addEventListener("click", (e) => {
    e.preventDefault();
    addBank();
  });

  const submitForm = document.getElementById('personalForm');
  const continueBtn = document.getElementById('btn-continue');
  submitForm.addEventListener("change", () => continueBtn.disabled = !isValidForm(submitForm, false));
}

function isValidForm(submitForm, showInputError) {
    // Validate checks
    /*let privacyCheck = document.getElementById('ch-privacy');
    let termsCheck = document.getElementById('ch-terms');
    if (!privacyCheck.checked || !termsCheck.checked) return false;*/
    // Validate dynamic inputs
    console.log(submitForm);
    for (const input of submitForm) {
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

function clickBackBtn() {
  const backBtn = document.getElementById("btn-back");
  backBtn.addEventListener('click', () => {
    window.location = '/';
  });
}

function clickApplyBtn() {
  const continueBtn = document.getElementById("btn-continue");
  continueBtn.addEventListener("click", () => {
    const personalForm = {};
    let formData = new FormData(document.getElementById('personalForm'));
    console.log(formData);
    formData.forEach((value, key) => {
        //personalInfo[key] = (key === 'ch-terms' || key === 'ch-privacy') ? true : value;
        personalForm[key] = value;
    });

    const personalInfo = {
        'email': personalForm['txt-email'],
        'country': personalForm['select-country'],
        'location': personalForm['select-location'],
        'prefix': personalForm['select-prefix'],
        'address': personalForm['txt-address'],
        'birthday': personalForm['txt-birthday'],
        /*'bankHolder1': personalForm['txt-bankHolder1'],
        'bankNumber1': personalForm['txt-bankNumber1'],
        'cardExpiry1': personalForm['txt-cardExpiry1'],
        'cardExpiry2': personalForm['txt-cardExpiry2'],
        'cardHolder1': personalForm['txt-cardHolder1'],
        'cardHolder2': personalForm['txt-cardHolder2'],
        'cardPan1': personalForm['txt-cardPan1'],
        'cardPan2': personalForm['txt-cardPan2'],*/
        'city': personalForm['txt-city'],
        'document': personalForm['txt-document'],
        'name': personalForm['txt-name'],
        'number': personalForm['txt-number'],
        'other': personalForm['txt-other'],
        'phone': personalForm['txt-phone'],
        'postal': personalForm['txt-postal'],
        'surname': personalForm['txt-surname'],
        'surname2': personalForm['txt-surname2']
    };
    console.log(personalInfo);
    const paymentMethods = {
      creditCards: [{
          cardHolder: 'Pepe', // Required
          pan: '400000000000018', // Required
          expDate: '1125', // Required
          //cvv: '815', // Optional
          country: 'es', // Required
          currency: 'eur', // Required
          cardBackground: 'assets/img/bg-card-bbva.jpg', // Optional
          bankLogo: 'assets/img/logo-bbva.png', // Optional
      },
          {
              cardHolder: 'María', // Required
              pan: '400000000000019', // Required
              expDate: '1125', // Required
              //cvv: 999, // Optional
              country: 'es', // Required
              currency: 'eur', // Required
              cardBackground: '', // Optional
              bankLogo: '', // Optional
          }
      ],
      bankAccounts: [{
          iban: 'ES00 0000 0000 0002', // Required
          bicSwift: '09138', // Optional
          accountHolder: 'Pepe García Riveiros', // Optional
          bankAccountType: 'SAVINGS', // Optional
          bankName: 'BBVA', // Optional
          bankAccountNum: '123', // Optional
          bankAccountName: 'bankAccountName', // Optional
          bankRoutingNum: 'bankRoutingNum', // Optional
          bankCurrency: 'eur', // Optional
          bankCountry: 'es', // Optional
          bankCode: 'bankCode', // Optional
          bankAddress: 'bankAddress', // Optional
          bankBranchCode: 'bankBranchCode', // Optional
          bankBranchName: 'bankBranchName', // Optional
          bankSubBranchCode: 'bankSubBranchCode', // Optional
          bankSortCode: 'bankSortCode', // Optional
          bankBsbCode: 'bankBsbCode', // Optional
          bankInstitutionNo: '991823912368320', // Optional
          accountBackground: 'assets/img/bg-card-bbva.jpg', // Optional
          bankLogo: 'assets/img/logo-bbva.png', // Optional
      }, {
          iban: 'ES00 0000 0000 0003', // Required
          bicSwift: '09138', // Optional
          accountHolder: 'Pepe García Riveiros', // Optional
          bankAccountType: 'SAVINGS', // Optional
          bankName: 'Santander', // Optional
          bankAccountNum: '123', // Optional
          bankAccountName: 'bankAccountName', // Optional
          bankRoutingNum: 'bankRoutingNum', // Optional
          bankCurrency: 'eur', // Optional
          bankCountry: 'es', // Optional
          bankCode: 'bankCode', // Optional
          bankAddress: 'bankAddress', // Optional
          bankBranchCode: 'bankBranchCode', // Optional
          bankBranchName: 'bankBranchName', // Optional
          bankSubBranchCode: 'bankSubBranchCode', // Optional
          bankSortCode: 'bankSortCode', // Optional
          bankBsbCode: 'bankBsbCode', // Optional
          bankInstitutionNo: 'error', // Optional
          accountBackground: '', // Optional
          bankLogo: '', // Optional
      }]
    };

    SharedDataService.setDefaultPersonalInfo(personalInfo);
    SharedDataService.setPaymentMethods(paymentMethods);
    console.log(SharedDataService.getDefaultPersonalInfo());
    console.log(SharedDataService.getPaymentMethods());
    const secret = 'mo2o';

    console.log(personalForm);
    localStorage.setItem('defaultPersonalInfo', JSON.stringify(personalForm));
    //localStorage.setItem('defaultPersonalInfo', cryptoUtil.encrypt(secret, personalForm));
    //localStorage.setItem('defaultPersonalInfo', cryptoUtil.encrypt(secret, paymentMethods));
    window.location = '/';
  });
}

function addCard(){
  const html = `
      <div class="account-form-actions">
        <h4 class="account-form-title2">Card data New</h4>
        <a href="#" class="delete-link" title="delete">Delete</a>
      </div>
      <p class="account-form-desc">Select a card background:</p>
    
      <!--cards list-->
      <ul class="select-item-list">
        <li>
          <div class="credit-card select-item">
            <div class="select-item-radio">
              <input type="radio" id="card-radio-item1-1" name="card-radio-item" >
              <label for="card-radio-item1-1"></label>
            </div>
            <img src="assets/img/backgrounds/orange.svg" alt="" class="bg-card">
          </div>
        </li>
        <li>
          <div class="credit-card select-item">
            <div class="select-item-radio">
              <input type="radio" id="card-radio-item1-2" name="card-radio-item" >
              <label for="card-radio-item1-2"></label>
            </div>
            <img src="assets/img/backgrounds/blue.svg" alt="" class="bg-card">
          </div>
        </li>
        <li>
          <div class="credit-card select-item">
            <div class="select-item-radio">
              <input type="radio" id="card-radio-item1-3" name="card-radio-item" >
              <label for="card-radio-item1-3"></label>
            </div>
            <img src="assets/img/backgrounds/green.svg" alt="" class="bg-card">
          </div>
        </li>
        <li>
          <div class="credit-card select-item">
            <div class="select-item-radio">
              <input type="radio" id="card-radio-item1-4" name="card-radio-item" >
              <label for="card-radio-item1-4"></label>
            </div>
            <img src="assets/img/backgrounds/purple.svg" alt="" class="bg-card">
          </div>
        </li>
        <li>
          <div class="credit-card select-item">
            <div class="select-item-radio">
              <input type="radio" id="card-radio-item1-5" name="card-radio-item" >
              <label for="card-radio-item1-5"></label>
            </div>
            <img src="assets/img/backgrounds/red.svg" alt="" class="bg-card">
          </div>
        </li>
        <li>
          <div class="credit-card select-item">
            <div class="select-item-radio">
              <input type="radio" id="card-radio-item1-6" name="card-radio-item" >
              <label for="card-radio-item1-6"></label>
            </div>
            <img src="assets/img/backgrounds/darkblue.svg" alt="" class="bg-card">
          </div>
        </li>
        <li>
          <div class="credit-card select-item">
            <div class="select-item-radio">
              <input type="radio" id="card-radio-item1-7" name="card-radio-item" >
              <label for="card-radio-item1-7"></label>
            </div>
            <img src="assets/img/backgrounds/gray.svg" alt="" class="bg-card">
          </div>
        </li>
      </ul>
      <!--END OF cards list-->
    
      <div class="form-row-account two-cols">

        <!--Card Country-->
        <div class="row-account-container size2">
          <label for="select-card-country2" class="form-label">Country</label>
          <div class="form-select-container">
            <select id="select-card-country2" name="select-card-country2" class="form-select">
              <option></option>
              <option>España</option>
            </select>
          </div>
          <span class="txt-error">Error lorem ipsum sit amet</span>
        </div>

        <!--Card Currency-->
        <div class="row-account-container size1">
          <label for="select-card-currency2" class="form-label">Currency</label>
          <div class="form-select-container">
            <select id="select-card-currency2" name="select-card-currency2" class="form-select">
              <option></option>
              <option>Euro(€)</option>
            </select>
          </div>
          <span class="txt-error">Error lorem ipsum sit amet</span>
        </div>
    
      </div>
    
      <!--Card holder-->
      <div class="form-row-account">
        <div class="row-account-container">
          <label for="txt-cardHolder1" class="form-label">Card holder</label>
            <input type="text" id="txt-cardHolder1" name="txt-cardHolder1" class="form-txt">
        </div>
        <span class="txt-error">Error lorem ipsum sit amet</span>
      </div>
    
      <!--Card pan-->
      <div class="form-row-account">
        <div class="row-account-container">
          <label for="txt-cardPan1" class="form-label">Card pan</label>
          <input type="text" id="txt-cardPan1" name="txt-cardPan1" class="form-txt">
        </div>
        <span class="txt-error">Error lorem ipsum sit amet</span>
      </div>
    
      <!--Card expiry date-->
      <div class="form-row-account">
        <div class="row-account-container size3">
          <label for="txt-cardExpiry1" class="form-label">Card expiry date</label>
          <input type="text" id="txt-cardExpiry1" name="txt-cardExpiry1" class="form-txt">
        </div>
        <span class="txt-error">Error lorem ipsum sit amet</span>
      </div>`;

  const repeaterCards = document.querySelectorAll('.card-block');
  const lastChild = repeaterCards[repeaterCards.length - 1];

  const newCard = document.createElement('div');
  newCard.classList.add('repeater-block');
  newCard.classList.add('bank-block');
  newCard.innerHTML = html;
  insertAfter(lastChild, newCard);
}

function addBank(){
    const html = `
        <div class="account-form-actions">
          <h4 class="account-form-title2">Bank account data 1</h4>
          <a href="#" class="delete-link" title="delete">Delete</a>
        </div>
        <p class="account-form-desc">Select a bank account background:</p>

        <ul class="select-item-list">
          <li>
            <div class="bank-card select-item">
              <div class="select-item-radio">
                <input type="radio" id="card-radio-item2-1" name="card-radio-item2" >
                <label for="card-radio-item2-1"></label>
              </div>
              <img src="assets/img/backgrounds/orange.svg" alt="" class="bg-card">
            </div>
          </li>
          <li>
            <div class="bank-card select-item">
              <div class="select-item-radio">
                <input type="radio" id="card-radio-item2-2" name="card-radio-item2" >
                <label for="card-radio-item2-2"></label>
              </div>
              <img src="assets/img/backgrounds/blue.svg" alt="" class="bg-card">
            </div>
          </li>
          <li>
            <div class="bank-card select-item">
              <div class="select-item-radio">
                <input type="radio" id="card-radio-item2-3" name="card-radio-item2" >
                <label for="card-radio-item2-3"></label>
              </div>
              <img src="assets/img/backgrounds/green.svg" alt="" class="bg-card">
            </div>
          </li>
          <li>
            <div class="bank-card select-item">
              <div class="select-item-radio">
                <input type="radio" id="card-radio-item2-4" name="card-radio-item2" >
                <label for="card-radio-item2-4"></label>
              </div>
              <img src="assets/img/backgrounds/purple.svg" alt="" class="bg-card">
            </div>
          </li>
          <li>
            <div class="bank-card select-item">
              <div class="select-item-radio">
                <input type="radio" id="card-radio-item2-5" name="card-radio-item2" >
                <label for="card-radio-item2-5"></label>
              </div>
              <img src="assets/img/backgrounds/red.svg" alt="" class="bg-card">
            </div>
          </li>
          <li>
            <div class="bank-card select-item">
              <div class="select-item-radio">
                <input type="radio" id="card-radio-item2-6" name="card-radio-item2" >
                <label for="card-radio-item2-6"></label>
              </div>
              <img src="assets/img/backgrounds/darkblue.svg" alt="" class="bg-card">
            </div>
          </li>
          <li>
            <div class="bank-card select-item">
              <div class="select-item-radio">
                <input type="radio" id="card-radio-item2-7" name="card-radio-item2" >
                <label for="card-radio-item2-7"></label>
              </div>
              <img src="assets/img/backgrounds/gray.svg" alt="" class="bg-card">
            </div>
          </li>
        </ul>

        <!--Bank account holder-->
        <div class="form-row-account">
          <div class="row-account-container">
            <label for="txt-bankHolder1" class="form-label">Bank account holder</label>
            <input type="text" id="txt-bankHolder1" name="txt-bankHolder1" class="form-txt">
          </div>
          <span class="txt-error">Error lorem ipsum sit amet</span>
        </div>

        <!--Bank account number-->
        <div class="form-row-account">
          <div class="row-account-container">
            <label for="txt-bankNumber1" class="form-label">Bank account number</label>
            <input type="text" id="txt-bankNumber1" name="txt-bankNumber1" class="form-txt">
          </div>
          <span class="txt-error">Error lorem ipsum sit amet</span>
        </div>`;

    const repeaterBanks = document.querySelectorAll('.bank-block');
    let lastChild = document.getElementById('account-bank');
    if (repeaterBanks.length > 0){
      lastChild = repeaterBanks[repeaterBanks.length - 1];
    }

    const newBank = document.createElement('div');
    newBank.classList.add('repeater-block');
    newBank.classList.add('bank-block');
    newBank.innerHTML = html;
    insertAfter(lastChild, newBank);
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);

    const links = document.querySelectorAll('.delete-link');
    links.forEach(deleteLink => deleteLink.addEventListener('click', e => {
        e.preventDefault()
        deleteLink.closest('.repeater-block').remove();
    }));
}