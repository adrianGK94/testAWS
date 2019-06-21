import noCardPng from '../../assets/img/no-card.png';
import updateCardView from './updateCardView';
import addNewCardFormView from './addNewCardFormView';
import locale from '../config/locale/i18n';

export default function setViewToAddNewCard(cardDynamic) {
    let html = createViewHtml();
    setViewHtml(html);
    setEventListeners(cardDynamic);}

function createViewHtml() {
  const i18n = locale();

  return `
  <body class="bg-selection">
    <!--header-->
    <header role="banner">
      <div class="row">
        <div class="header-main">
          <a href="#" class="header-link" id="back-button"><span class="icon-back"></span></a>
          <h1 class="header-title">${i18n.updateCard.title}</h1>
        </div>
        <p class="header-desc">${i18n.updateCard.addCardDescription}</p>
      </div>
    </header>
    <!--END OF header-->

    <!--main-->
    <div role="main" class="main-selection">
      <div class="row">
        <!--card-main-->
          <div class="card-main">
            <div class="card-main-left">
              <div class="credit-card-image">
                <img src="${noCardPng}" alt="">
                <span class="icon-info"></span>
              </div>
            </div>
            <div class="card-main-right">
              <div class="account-bl">
                <span class="account-title">${i18n.creditCard.linkedAccount}</span>
                <span class="account-desc">${i18n.creditCard.noAccount}</span>
              </div>
            </div>
          </div>
        <!--END OF card-main-->

        <!--add-new-->
          <div class="add-new-bl">
            <a href="#" class="new-btn" id="new-btn">${i18n.updateCard.addNewCard}</a>
          </div>
        <!--END OF add-new-->
      </div>
    </div>
    <!--END OF main-->
  </body>`;
}

function setViewHtml(html) {
  document.body.outerHTML = html;
}

function setEventListeners(cardDynamic) {
  const backButton = document.getElementById("back-button");
  backButton.addEventListener("click", (e) => {
    e.preventDefault();
    updateCardView(cardDynamic);
  });

  const newCardButton = document.getElementById("new-btn");
  newCardButton.addEventListener("click", (e) => {
    e.preventDefault();
    addNewCardFormView(cardDynamic);
  });
}