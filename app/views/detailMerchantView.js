import locale from "../config/locale/i18n";
import addMerchantView from "./addMerchantView";
import registerMerchantView from "./registerMerchantView";
import SharedDataService from "../services/shared-data-service";
import createModal from "../components/modal-component";
import gtag from "ga-gtag";

export default function detailMerchantView(merchant) {
  // Create HTML parent view
  createViewInHtml(merchant);
  // Listeners configuration
  setEventListeners(merchant);
}

function createViewInHtml(merchant) {
  const i18n = locale();

  let html = `
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
    <div role="main" class="merchant-detail">
      <div class="row">
        <!--intro-->
        <div class="merchant-detail-intro">
            <p>${merchant.merchantDetails.merchantDescription}</p>
        </div>
        <!--END OF intro-->
        
        <!-- promo -->
        ${paintPromotionDetail(merchant.promoSelected)}
        <!-- END OF promo -->
        
        <div class="btn-container">
            <!--AÑADIDO-->
            <a href="javascript:void(0)" title="Go back" id="btn-back" class="btn-back">${i18n.merchantDetail.button.back}</a>
            <!--END OF AÑADIDO-->
            <button type="button" id="btn-continue" name="btn-continue" class="form-btn-type2">${i18n.merchantDetail.button.apply}</button>
        </div>
      </div>
    </div>
    <!--END OF main-->

  </body>`;
  // Add to DOM
  document.body.outerHTML = html;
}

function paintPromotionDetail(promoDetail) {
  const i18n = locale();
  if (promoDetail) {
    const url = validateUrl(promoDetail.offerTerms);
    let html = '<div class="merchant-detail-available">';
    html += `<div class="detail-available-header"><h3 class="detail-available-title">${i18n.merchantDetail.campaign.title}</h3>`;
    if (promoDetail.validDate) {
      html += `<span class="detail-available-date">${i18n.merchantDetail.valid.title} ${promoDetail.validDate}</span>`;
    }
    html += `
      </div>
      <div class="detail-available-content"><p>${promoDetail.offerDetails}</p></div>
      <!--terms-->
      <a href="${url}" target="_blank" class="merchant-detail-terms">
          <span class="detail-link">${i18n.merchantDetail.terms.title}</span>
          <span class="icon-arrow"></span>
      </a>
      <br/>
      <!--END OF terms-->`;
    html += '</div>';
    return html;
  }
  return '';
}

function setEventListeners(merchant) {
  const i18n = locale();
  // Back button go to home
  const backBtn = document.getElementById("btn-back");
  backBtn.addEventListener('click', () => addMerchantView());
  // Click apply button
  const applyBtn = document.getElementById("btn-continue");
  applyBtn.addEventListener('click', () => {
    if (SharedDataService.hasPaymentMethods()) {
      gtag('event', 'Merchant_'+merchant.cdMerchantId, {
        'event_category': 'Detalle',
        'event_label': 'Registrarme'
      });
      registerMerchantView(merchant);
    } else {
      createModal({
        title: i18n.merchantDetail.error.title,
        body: i18n.merchantDetail.error.description,
        btn: 1
      });
    }
  });
}

function validateUrl(url) {
  if (url !== '' && url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
    url = 'https://' + url;
  }
  return url;
}