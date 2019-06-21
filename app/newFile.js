import blueCardSvg from "../assets/img/blue-card.svg";
import dummySvg from "../assets/img/dummy.svg";

export default function setViewToUpdateCard2(deepPaymentObject) {
    deepPaymentObject.views.updateCard = `
  <body class="bg-selection">

  <!--header-->
  <header role="banner">
      <div class="row">
          <div class="header-main">
              <a href="#" class="header-link"><span class="icon-back"></span></a>
              <h1 class="header-title">Update card details</h1>
          </div>
          <p class="header-desc">
              Select the merchants at which you would like to update your payment information. The process can take up to 24 hrs.
          </p>

      </div>
  </header>
  <!--END OF header-->

  <!--main-->
  <div role="main" class="main-selection">
      <div class="row">

        <!--card-main-->
          <div class="card-main">
              <div class="card-main-left">
                <h2 class="card-title">Credit Card</h2>
                <div class="credit-card-image">
                    <img src="${blueCardSvg}" alt="">
                    <span class="icon-info"></span>
                </div>
                <span class="credit-card-desc">*1235</span>
              </div>

              <div class="card-main-right">
                  <div class="account-bl">
                    <span class="account-title">Linked account</span>
                    <span class="account-desc">Account *7895</span>
                  </div>

                  <div class="expiration-bl">
                      <span class="expiration-title">Expiration date</span>
                      <span class="expiration-desc">06 January 2018</span>
                  </div>
              </div>

          </div>
        <!--END OF card-main-->
        `;

    if (deepPaymentObject.merchantList.length > -1) {
        deepPaymentObject.views.updateCard += `
            <!--all-merchants-->
            <div class="all-merchants-bl">
                <div class="checkbox-bl">
                    <input type="checkbox" id="ch-all" name="ch-all">
                    <label for="ch-all" class="checkbox-label">Update all merchants</label>
                </div>
            </div>
            <!--END OF all-merchants-->`
        ;

        deepPaymentObject.merchantList.forEach(merchant => {
            deepPaymentObject.views.updateCard += `
            <!--card-item-->
              <div class="card-item">
                  <div class="checkbox-bl">
                      <input type="checkbox" id="ch-${merchant}" name="ch-${merchant}">
                      <label for="ch-${merchant}" class="checkbox-label"><img src="${dummySvg}" alt="">Amazon</label>
                  </div>

                  <!--card-item-state-->
                  <div class="card-item-state">
                      <span class="ic-state icon-updated"></span>
                      <span class="state-desc">Updated</span>
                  </div>
                  <!--END OF card-item-state-->
              </div>
            <!--END OF card-item-->`
        });
    }
    deepPaymentObject.views.updateCard +=
        `</div>
      </div>
      <!--END OF main-->
    </body>`;

    deepPaymentObject.setView = function () {
        document.body.innerHTML += deepPaymentObject.views.updateCard;
    };

    deepPaymentObject.setView();

    if (deepPaymentObject.merchantList.length > -1) {
        const chAllToggle = document.getElementById("ch-all");

        chAllToggle.addEventListener("click", function() {
            if (chAllToggle.checked === true) {
                deepPaymentObject.merchantList.forEach(merchant => {
                    document.getElementById(`ch-${merchant}`).checked = true;
                });
            }
        });

        deepPaymentObject.merchantList.forEach(merchant => {
            const merchantToggle = document.getElementById("ch-all");
            merchantToggle.addEventListener("click", function() {
            });
        });
    }
}
