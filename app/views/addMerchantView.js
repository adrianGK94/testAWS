import locale from "../config/locale/i18n";
import registerMerchantView from "./registerMerchantView";
import loadingView from './loadingView';
import detailMerchantView from "./detailMerchantView";
import MerchantService from '../services/merchant-service';
import SharedDataService from "../services/shared-data-service";
import createModal from "../components/modal-component";

let originalMerchantList = [];
let filteredList = [];

export default function addMerchant() {
  try {
    // Show loading until screen been prepared
    loadingView();
    // Get merchant list
    MerchantService.getMerchantList().then((list) => {
      originalMerchantList = list;
      filteredList = list;
      // Create HTML view
      createViewInHtml();
      // Paint merchant list
      paintMerchantList(list);
      // Listeners configuration
      setEventListeners();
    });
    // Remove locally data
    SharedDataService.removeNewPersonalInfo();
  } catch (error) {
    window.location = '/';
  }
}

function createViewInHtml() {
  const i18n = locale();

  const html = `
  <body class="bg-gray">
    <!--header-->
    <header role="banner">
      <div class="row">
        <div class="header-main">
          <a class="header-link" id="back-button"><span class="icon-back"></span></a>
          <h1 class="header-title">${i18n.merchantList.title}</h1>
        </div>
      </div>
    </header>
    <!--END OF header-->

    <!--main-->
    <div role="main" class="merchants-content">
      <div class="row">
      
         <form>
            <fieldset>
                <div class="search-form-row">
                    <input type="text" id="txt-search" name="txt-search" class="search-form-txt" placeholder="${i18n.merchantList.searchMerchants}">
                    <button type="button" id="btn-search" name="btn-search" class="btn-search"><span class="icon-search"></span></button>
                </div>
            </fieldset>
         </form>
         
        <!--list-->
        <div class="merchants-scroll-container" id="merchants-scroll-container"></div>
        <!--END OF list-->

      </div>
    </div>
    <!--END OF main-->
  </body>`;
  // Add to DOM
  document.body.outerHTML = html;
}

function paintMerchantList(list) {
  const container = document.getElementById('merchants-scroll-container');
  let isEmpty = true;
  list.forEach(group => {
    // Add title group
    if (group.merchants.length > 0 && list.length >= 2) {
      const title = document.createElement('h2');
      title.className = 'merchant-title';
      title.innerHTML = `<h2 class="merchant-title">${group.merchantType.toUpperCase()}</h2>`;
      container.appendChild(title);
    }
    // Set empty flag
    if (group.merchants.length > 0) {
      isEmpty = false;
    }
    // Add cards
    group.merchants.forEach(merchant => {
      // Only set merchant if the promotion list is empty
      if (merchant.promotions.length <= 0) {
        paintItemInList(container, merchant);
      } else {
        merchant.promotions.forEach(promo => {
          paintItemInList(container, merchant, promo);
        });
      }
    });
  });
  // Empty list
  if (isEmpty) {
    const child = document.createElement('p');
    child.className = 'empty-list';
    child.innerHTML = 'No results found';
    container.appendChild(child);
  }
}

function paintItemInList(container, merchant, promo) {
  let html = `
  <div class="merchant-card-content">
    <img src="${merchant.merchantDetails.merchantLogo}" alt="" class="card-logo">
    <div class="merchant-card-detail">
      <h3 class="merchant-detail-title">${merchant.merchantDetails.merchantBrand}</h3>
      <p class="merchant-detail-highlight">${merchant.merchantDetails.enrollmentShort}</p>
      <p class="merchant-detail-desc">${merchant.merchantDetails.enrollmentShort}</p>
      <a class="merchant-detail-link button-detail" data-merchantId="${merchant.cdMerchantId}" data-promoId="${promo ? promo.promoId : 'no-promo'}">View details</a>
    </div>
  </div>
  <button type="button" data-merchantId="${merchant.cdMerchantId}" data-promoId="${promo ? promo.promoId : 'no-promo'}" name="btn-apply" class="btn-card">Apply</button>`;
  const child = document.createElement('div');
  child.className = 'merchant-card';
  child.innerHTML = html;
  container.appendChild(child);
}

function setEventListeners() {
  // Back button go to home
  clickBackBtn();
  // Detail buttons listeners
  clickDetailBtn();
  // Apply buttons listeners
  clickApplyBtn();
  // Reactive searcher
  const searcher = document.getElementById('txt-search');
  searcher.addEventListener('keyup', delay((e) => {
    if (e.target.value === undefined || e.target.value === null || e.target.value === '') {
      filteredList = originalMerchantList;
    } else {
      filteredList = originalMerchantList.map(group => {
        return {
          merchantType: group.merchantType,
          merchants: group.merchants.filter(merchant => {
            const txt = e.target.value.toLowerCase();
            const title = merchant.merchantDetails.enrollmentTitle.toLowerCase();
            const brand = merchant.merchantDetails.merchantBrand.toLowerCase();
            return title.includes(txt) || brand.includes(txt);
          })
        };
      });
    }
    // Remove previous childs
    const container = document.getElementById('merchants-scroll-container');
    container.innerHTML = '';
    // Paint new list
    paintMerchantList(filteredList);
    // Detail buttons listeners
    clickDetailBtn();
    // Apply buttons listeners
    clickApplyBtn();
  }, 350));
}

function clickBackBtn() {
  const backBtn = document.getElementById("back-button");
  backBtn.addEventListener('click', () => {
    window.location = '/';
  });
}

function clickDetailBtn() {
  const detailButton = document.querySelectorAll(".button-detail");
  for (let i = 0; i < detailButton.length; i++) {
    detailButton[i].addEventListener('click', e => {
      const merchantId = e.target.getAttribute('data-merchantId');
      const promoId = e.target.getAttribute('data-promoId');
      openMerchantDetails(merchantId, promoId);
    });
  }
}

function clickApplyBtn() {
  const applyMerchant = document.querySelectorAll(".btn-card");
  for (let i = 0; i < applyMerchant.length; i++) {
    applyMerchant[i].addEventListener('click', (e) => {
      if (SharedDataService.hasPaymentMethods()) {
        const merchantId = e.target.getAttribute('data-merchantId');
        const promoId = e.target.getAttribute('data-promoId');
        openRegister(merchantId, promoId);
      } else {
        createModal({
          title: 'Error',
          body: 'To apply for this service it is necessary to have a bank card. Please, contact your bank to hire it.',
          btn: 1
        });
      }
    });
  }
}

function openMerchantDetails(merchantId, promoId) {
  // Show merchant detail view
  const merchantSelected = getMerchantByPromoId(merchantId, promoId);
  if (merchantSelected) {
    detailMerchantView(merchantSelected);
  }
}

function openRegister(merchantId, promoId) {
  // Show merchant register view
  const merchantSelected = getMerchantByPromoId(merchantId, promoId);
  if (merchantSelected) {
    registerMerchantView(merchantSelected);
  }
}

function getMerchantByPromoId(merchantId, promoId) {
  let merchantSelected;
  for (const group of originalMerchantList) {
    for (const merchant of group.merchants) {
      if (promoId !== 'no-promo') {
        const promoSelected = merchant.promotions.find(promo => '' + promo.promoId === '' + promoId);
        if (promoSelected) {
          merchantSelected = merchant;
          merchantSelected.promoSelected = promoSelected;
          break;
        }
      } else if (merchant.cdMerchantId === +merchantId) {
        merchantSelected = merchant;
        break;
      }
    }
    if (merchantSelected) {
      break;
    }
  }
  return merchantSelected;
}

function delay(callback, ms) {
  var timer = 0;
  return function () {
    var context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}