import addMerchantView from "./addMerchantView";
import registerMerchantView from "./registerMerchantView";
import SharedDataService from "../services/shared-data-service";
import createModal from "../components/modal-component";

export default function detailMerchantView(merchant) {
  // Create HTML parent view
  createViewInHtml(merchant);
  // Listeners configuration
  setEventListeners(merchant);
}

function createViewInHtml(merchant) {
  let html = `
   <body class="bg-gray">
    <!--header-->
    <header role="banner">
      <div class="row">
        <div class="header-main">
            <a class="header-link" id="back-button"><span class="icon-back"></span></a>
            <h1 class="header-title">Details</h1>
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
            <button type="button" id="btn-continue" name="btn-continue" class="form-btn-type2">Apply</button>
        </div>
      </div>
    </div>
    <!--END OF main-->

    <!--modal error-->
    <div class="modal" id="errorModal">
      <div class="modal-container">
        <h2 class="modal-title">Error</h2>
        <p class="modal-desc">To apply for this service it is necessary to have a bank card.<br>
          Please, contact your bank to hire it.</p>
        <div class="btn-modal-container">
          <a href="#" class="modal-btn type3">Cancel</a>
          <a href="#" class="modal-btn type2">Try again</a>
        </div>
      </div>
    </div>
    <!--END OF modal error-->

  </body>`;
  // Add to DOM
  document.body.outerHTML = html;
}

function paintPromotionDetail(promoDetail) {
  if (promoDetail) {
    let html = '<div class="merchant-detail-available">';
    html += `<div class="detail-available-header"><h3 class="detail-available-title">Available campaign</h3>`;
    if (promoDetail.validDate) {
      html += `<span class="detail-available-date">Valid until ${promoDetail.validDate}</span>`;
    }
    html += `
      </div>
      <div class="detail-available-content"><p>${promoDetail.offerDetails}</p></div>
      <!--terms-->
      <a href="${promoDetail.offerTerms}" target="_blank" class="merchant-detail-terms">
          <span class="detail-link">Legal Terms and Conditions of the offer</span>
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
  // Back button go to home
  const backBtn = document.getElementById("back-button");
  backBtn.addEventListener('click', () => addMerchantView());
  // Click apply button
  const applyBtn = document.getElementById("btn-continue");
  applyBtn.addEventListener('click', () => {
    if (SharedDataService.hasPaymentMethods()) {
      registerMerchantView(merchant);
    } else {
      createModal({
        title: 'Error',
        body: 'To apply for this service it is necessary to have a bank card. Please, contact your bank to hire it.',
        btn: 1
      });
    }
  });
}