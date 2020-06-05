import locale from "../config/locale/i18n";
import registerMerchantView from "./registerMerchantView";
import loadingView from './loadingView';
import detailMerchantView from "./detailMerchantView";
import MerchantService from '../services/merchant-service';
import SharedDataService from "../services/shared-data-service";
import createModal from "../components/modal-component";
import gtag from 'ga-gtag';

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


    <!--main-->
    <div role="main" class="merchants-content">
      <div class="row">
      
        <!--AÑADIDO-->
        <div class="back-link-container">
          <a href="#" id="btn-back" class="back-link icon-back">${i18n.merchants.back.title}</a>
        </div>
        <!--END OF AÑADIDO-->

      
        <form>
          <fieldset>
            <div class="search-form-row">
              <input type="text" id="txt-search" name="txt-search" class="search-form-txt" placeholder="${i18n.merchants.search.title}">
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
  const i18n = locale();
  const container = document.getElementById('merchants-scroll-container');
  let isEmpty = true;
  list.forEach(group => {
    // Add title group
    if (group.merchants.length > 0 && list.length >= 2) {
      const title = document.createElement('h2');
      title.className = 'merchant-title';
      title.innerHTML = `<h2 class="merchant-title">${group.merchantType.toUpperCase()}</h2>`;
      container.appendChild(title);
      const childcontainer = document.createElement('div');
      childcontainer.className = 'merchant-card-container';
      container.appendChild(childcontainer);

    }
    // Set empty flag
    if (group.merchants.length > 0) {
      isEmpty = false;
    }
    // Add cards
    group.merchants.forEach(merchant => {
      // Only set merchant if the promotion list is empty
      if (merchant.promotions.length <= 0) {
        paintItemInList(container.lastChild, merchant, );
      } else {
        merchant.promotions.forEach(promo => {
          paintItemInList(container.lastChild, merchant, promo);
        });
      }
    });
  });
  // Empty list
  if (isEmpty) {
    const child = document.createElement('p');
    child.className = 'empty-list';
    child.innerHTML = i18n.merchants.noResults.title;
    container.appendChild(child);
  }
}

function paintItemInList(container, merchant, promo) {
  const i18n = locale();
  let html = `
  <div class="merchant-card-content">
    <img src="${merchant.merchantDetails.merchantLogo}" alt="" class="card-logo">
    <div class="merchant-card-detail">
      <h3 class="merchant-detail-title">${merchant.merchantDetails.merchantBrand}</h3>
      <p class="merchant-detail-highlight">${merchant.merchantDetails.enrollmentTitle}</p>
      <p class="merchant-detail-desc">${merchant.merchantDetails.enrollmentShort}</p>
      <a class="merchant-detail-link button-detail" data-merchantId="${merchant.cdMerchantId}" data-promoId="${promo ? promo.promoId : 'no-promo'}">${i18n.merchants.details.title}</a>
    </div>
  </div>
  <button type="button" data-merchantId="${merchant.cdMerchantId}" data-promoId="${promo ? promo.promoId : 'no-promo'}" name="btn-apply" class="btn-card">${i18n.merchants.button.apply}</button>`;
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
      gtag('event', 'Buscar_Merchant', {
        'event_category': 'Lista_merchants',
        'event_label': 'Búsqueda'
      });
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
  const backBtn = document.getElementById("btn-back");
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
      gtag('event', 'Merchant_'+merchantId, {
        'event_category': 'Lista_merchants',
        'event_label': 'Ver_detalle'
      });
      openMerchantDetails(merchantId, promoId);
    });
  }
}

function clickApplyBtn() {
  const i18n = locale();
  const applyMerchant = document.querySelectorAll(".btn-card");
  for (let i = 0; i < applyMerchant.length; i++) {
    applyMerchant[i].addEventListener('click', (e) => {
      SharedDataService.getPaymentMethods();
      if (SharedDataService.hasPaymentMethods()) {
        const merchantId = e.target.getAttribute('data-merchantId');
        const promoId = e.target.getAttribute('data-promoId');
        gtag('event', 'Registrarme_'+merchantId, {
          'event_category': 'Lista_merchants',
          'event_label': 'Registrarme'
        });
        openRegister(merchantId, promoId);
      } else {
        createModal({
          title: i18n.merchants.error.title,
          body: i18n.merchants.error.description,
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
        if (promoSelected && merchant.cdMerchantId.toString() === merchantId.toString()) {
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