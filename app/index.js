import '../styles/styles.css';
import '../styles/datepicker.min.css';
import Setup from './config/setup';
import CardDynamic from './model/cardDynamic';
import Card from "./model/card";
import loadingView from './views/loadingView';
import updateCardView from "./views/updateCardView";
import addNewCardView from "./views/addNewCardView";
import addMerchantView from "./views/addMerchantView";
import SharedDataService from "./services/shared-data-service";
import gtag, { install } from 'ga-gtag';

(function (window) {

  const _init = (_) => {

    sessionStorage.clear();

    install('UA-XXXXXXXXX-1');

    let CD = new CardDynamic();

    return {
      setUp: function (issuerId, secret, fileName) {
        if (!issuerId || issuerId === '') {
          issuerId = "";
        }
        if (!secret || secret === '') throw 'secret is required';
        if (!fileName || fileName === '') throw 'fileName is required';

        new Setup(issuerId, secret, fileName);
      },
      newCard: function (pan, expDate) {
        if (!pan || pan === '') throw 'pan is required';
        if (!expDate || expDate === '') throw 'expDate is required';

        if (pan && pan !== "" && expDate && expDate !== "") {
          let newCard = new Card(pan, expDate);
          CD.setNewCard(newCard);
        }
      },
      oldCard: function (pan, expDate) {
        if (pan && pan !== "" && expDate && expDate !== "") {
          let oldCard = new Card(pan, expDate);
          CD.setOldCard(oldCard);
        }
      },
      setMerchantList: function (merchantList) {
        if (merchantList && merchantList.length > 0) {
          CD.setMerchantList(merchantList);
        }
      },
      defaultPersonalInfo: function (info) {
        if (info && info.length > 0) {
          CD.defaultPersonalInfo(info);
        }
      },
      run: function () {
        loadingView();

        let oldCard = CD.getOldCard();

        if (oldCard) {
          setTimeout(() => {
            updateCardView(CD);
          }, 1000);
        } else {
          setTimeout(() => {
            addNewCardView(CD);
          }, 1000);
        }
      },
      addNewMerchant: function (paymentMethods = {}, personalInfo = {
        creditCards: [],
        bankAccounts: []
      }) {
        if (paymentMethods) {
          SharedDataService.setPaymentMethods(paymentMethods);
        }
        if (personalInfo) {
          SharedDataService.setDefaultPersonalInfo(personalInfo);
        }
        addMerchantView();
      }
    };
  };
  window.CardDynamics = {
    init: _init
  };
})(window);