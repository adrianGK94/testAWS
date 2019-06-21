import blueCardSvg from '../../assets/img/blue-card.svg';
import dummySvg from '../../assets/img/dummy.svg';
import locale from '../config/locale/i18n';
import addNewCardView from './addNewCardView';
import searchMerchantView from './searchMerchantView';
import cryptoUtil from '../config/cryptoUtil';
import CryptoJS from "crypto-js";

export default function setViewToUpdateCard(cardDynamic) {
  let card = cardDynamic.getNewCard();
  let currentMerchantList = cardDynamic.getMerchantList();
  let html = createViewHtml(card, currentMerchantList);

  setViewHtml(html);
  setEventListeners(cardDynamic);
}

function createViewHtml(card, currentMerchantList) {
  const i18n = locale();
  let cardNumber = card.getCardNumber();
  let expDate = card.getExpDate();

  let html = `
  <body class="bg-selection">
    <header role="banner">
      <div class="row">
        <div class="header-main">
          <a href="/" class="header-link"><span class="icon-back"></span></a>
          <h1 class="header-title">${i18n.updateCard.title}</h1>
        </div>
        <p class="header-desc">${i18n.updateCard.selectMerchants}</p>
      </div>
    </header>
    <!--main-->
    <div role="main" class="main-selection">
      <div class="row">
        <!--card-main-->
          <div class="card-main">
            <div class="card-main-left" id="card-main-left">
              <h2 class="card-title">${i18n.creditCard.title}</h2>
              <div class="credit-card-image">
                <img src="${blueCardSvg}" alt="">
                <span class="icon-info"></span>
              </div>
              <span class="credit-card-desc">*${cardNumber}</span>
            </div>
            <div class="card-main-right">
              <div class="account-bl">
                <span class="account-title">${i18n.creditCard.linkedAccount}</span>
                <span class="account-desc">${i18n.creditCard.account.replace('%1$s', '****')}</span>
              </div>
              <div class="expiration-bl">
                <span class="expiration-title">${i18n.creditCard.expiration}</span>
                <span class="expiration-desc">${expDate}</span>
              </div>
            </div>
          </div>
        <!--END OF card-main-->`;

  if (card.pan && card.expDate && !currentMerchantList) {
    html += `
      <!--search-bl-->
      <div class="search-bl">
        <a href="#" class="search-btn" id="search"><span class="search-txt">${i18n.updateCard.searchMerchants}</span><span class="icon-search"></span></a>
      </div>
      <!--END OF search-bl-->`;

  }else{

    if (currentMerchantList.length > 0) {

      let pendingMerchants = 0;

      currentMerchantList.forEach(merchant => {
        if(merchant.responseCode === '999' || merchant.responseCode === undefined){
          pendingMerchants++;
        }
      });

      if(pendingMerchants>0){
        html += `
        <!--all-merchants-->
        <div class="all-merchants-bl">
          <div class="checkbox-bl">
            <input type="checkbox" id="ch-all" name="ch-all" checked>
            <label for="ch-all" class="checkbox-label">${i18n.updateCard.updateAllMerchants}</label>
          </div>
        </div>
        <!--END OF all-merchants-->`;
      }
    }

    currentMerchantList.forEach(merchant => {
      let stateString;
      let stateClass;

      html += `
        <!--card-item-->
        <div class="card-item">`;

      if(merchant.responseCode === '' || merchant.responseCode == null){

        html +=`
            <div class="checkbox-bl">
                <input type="checkbox" id="ch-${merchant.issuerMerchantId}" name="ch-${merchant.issuerMerchantId}" checked="true">
                <label for="ch-${merchant.issuerMerchantId}" class="checkbox-label"><img src="${getIcon(merchant.issuerMerchantId)}" alt="">${merchant.issuerMerchantName}</label>
            </div>`;
      }else{

        html +=`
            <div class="checkbox-bl">
                <label class="checkbox-no-switch"><img src="${getIcon(merchant.issuerMerchantId)}" alt="">${merchant.issuerMerchantName}</label>
            </div>`;
      }

      switch (merchant.responseCode){
        case "000":
        case "302":
          stateClass = "icon-updated";
          stateString = i18n.merchants.stateUpdated;
          break;
        case "301":
        case "304":
        case "305":
        case "701":
        case "702":
        case "703":
        case "501":
          stateClass = "icon-denied";
          stateString = i18n.merchants.stateDenied;
          break;
        case "999":
          stateClass = "icon-pending";
          stateString = i18n.merchants.statePending;
          break;
        default:
          stateClass = "";
          stateString = "";
          break;
      }

      if(merchant.responseCode==="" || merchant.responseCode==null) {
        html += ``;
      }else{
        html += `
          <!--card-item-state-->
          <div class="card-item-state">
            <span class="ic-state ${stateClass}"></span>
            <span class="state-desc">${stateString}</span>
          </div>
          <!--END OF card-item-state-->`
      }

      html +=`
            </div>
        <!--END OF card-item-->
        `;
    });
    html +=`
          </div>
              <div class="save-merchants-bl">
                  <button class="save-btn" id="save-btn">${i18n.saveMerchants.button.title} </button>
              </div>
          <!--END OF main-->`;
    }
  html += `   
    </body>`;

  return html;
}

function setViewHtml(html) {
  document.body.outerHTML = html;
}

function setEventListeners(cardDynamic) {

  const cardButton = document.getElementById("card-main-left");
  const saveButton = document.getElementById("save-btn");
  const search = document.getElementById("search");

  if(saveButton) saveButton.addEventListener("click", (e) => {
    e.preventDefault();

    saveMerchants(cardDynamic);
  });

  if(search) search.addEventListener("click", (e) => {
    e.preventDefault();
    searchMerchantView(cardDynamic);
  });

  updateToggle(cardDynamic);
}

function updateToggle(cardDynamic){

  let selectedMerchantList = cardDynamic.getMerchantList();

  if (selectedMerchantList!=null && selectedMerchantList.length > 0) {
    const chAllToggle = document.getElementById("ch-all");

    if(chAllToggle){
      chAllToggle.addEventListener("click", function () {
        selectedMerchantList.forEach(merchant => {
          let checkbox = document.getElementById(`ch-${merchant.issuerMerchantId}`);

          if(checkbox!=null && chAllToggle.checked)checkbox.checked = true;
          if(checkbox!=null && !chAllToggle.checked)checkbox.checked = false;

        });
      });
    }

    selectedMerchantList.forEach(merchant => {
      const merchantToggle = document.getElementById(`ch-${merchant.issuerMerchantId}`);

      if(merchantToggle)merchantToggle.addEventListener("click", function () {
        let areAllMerchantsTurnedOn = true;
        for (let i = 0; i < selectedMerchantList.length; i++) {
          const merchant = document.getElementById(`ch-${selectedMerchantList[i].issuerMerchantId}`);
          if (merchant && merchant.checked === false) {
            areAllMerchantsTurnedOn = false;
            break;
          }
        }
      });
    });
  }
}

function saveMerchants(cardDynamic){

  let merchantList = getSelectedMerchants();
  let currentMerchantList = cardDynamic.getMerchantList();

  let pendingMerchants = merchantList.filter(function (el) {
    var found = false, x = 0;
    while (x < currentMerchantList.length && !found) {
      if (el.issuerMerchantId === currentMerchantList[x].issuerMerchantId && el.issuerMerchantName.toLowerCase() === currentMerchantList[x].issuerMerchantName.toLowerCase()) found = false;
      x++;
    }
    if (!found) return el;
  });

  pendingMerchants = currentMerchantList.filter(function (el) {
    var found = false, x = 0;
    while (x < merchantList.length && !found) {
      if (el.issuerMerchantId === merchantList[x].issuerMerchantId && el.issuerMerchantName.toLowerCase() === merchantList[x].issuerMerchantName.toLowerCase()){
        if(el.responseCode!== "999"){
          el.responseCode = "999";
        }
        found = false;
      }
      x++;
    }
    if (!found) return el;
  });

  cardDynamic.setMerchantList(pendingMerchants);

  if(merchantList!= null && merchantList.length>0){

    let merchantListEnc = encryptList(merchantList);
    let dataJSON = buildDataJSON(merchantListEnc, cardDynamic);
    postDataJSON(dataJSON);
    setViewToUpdateCard(cardDynamic)

  }else{
    console.log('No changes');
  }
}

function getSelectedMerchants(){
  let mInputs = Array.from(document.getElementsByTagName('input'));
  let mLabels = Array.from(document.getElementsByTagName('label'));
  let mList = [];

  if (mInputs && mInputs.length > 0) {

    mInputs.forEach(item => {

      if (item.checked && item.id != 'ch-all') {

        let id = item.id.substring(3);
        let name;

        mLabels.forEach(label=>{
          if(label.htmlFor==item.id){
            name = label.innerText;
          }
        });

        mList.push({issuerMerchantId : id, issuerMerchantName : name, responseCode: 999});
      }

    });

  }

  return mList;
}

function encryptList(list){

  let country = 'ES';
  let channel = 'web'; //mobile
  let numberTrx = 1;
  let json =[];

  list.forEach(item =>{
    json.push({
      'merchantIssuerId' : item.issuerMerchantId,
      'merchantName': item.issuerMerchantName,
      'country': country,
      'channel': channel,
      'numberTrx': numberTrx
    })
  });


  let secret = sessionStorage.getItem('secret');
  return cryptoUtil.encrypt(secret, JSON.stringify(json));
}

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder('utf-8').encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}

function buildDataJSON(merchantListEnc, cardDynamic) {

  const secret = sessionStorage.getItem('secret');
  let timestamp = new Date().getTime();
  let issuerId = localStorage.getItem('issuerid');
  let newCard = cardDynamic.getNewCard();
  let oldCard = cardDynamic.getOldCard();
  let ncExpDate = cryptoUtil.encrypt(secret, newCard.expDate);
  let ncPan = cryptoUtil.encrypt(secret, newCard.pan);
  let ocExpDate = cryptoUtil.encrypt(secret, oldCard.expDate);
  let ocPan = cryptoUtil.encrypt(secret, oldCard.pan);

  let integrityCheck = CryptoJS.SHA256(oldCard.pan + oldCard.expDate + newCard.pan + newCard.expDate).toString();

  //let integrityCheck = CryptoJS.SHA256(newCard.expDate + newCard.pan + oldCard.expDate + oldCard.pan).toString();

  let replacementReason = 'Case: OK, card successfully updated';

  return {
    "integrityCheck" : integrityCheck,
    "issuerChangeRequestId" : timestamp,
    "issuerId" : issuerId,
    "merchantList" : merchantListEnc,
    "ncExpDate" : ncExpDate,
    "ncPan" : ncPan,
    "ocExpDate" : ocExpDate,
    "ocPan" : ocPan,
    "replacementReason" : replacementReason
  }

  /*return {
    "integrityCheck" : 'de7b1316dfbf58815c2eac4a6e044498d1842ce309c8cfed3d7d4dbe5e3eedae',
    "issuerChangeRequestId" : timestamp,
    "issuerId" : issuerId,
    "merchantList" : 'j/onsr5oX81NNPkQKy/UA6hTx86AkGg+5m68lkX8yQO5lpTgEKrFV85nopcIwBbomTz0Af+DvC+TiUUaE+lG2VFNztuQd+82XDiHwJS6gXQWf9bAZXmxEJJz+Y7w2uMRRmXLQWCC04ebydROrUnBnFy/JX1KcMS8aF0icDqxuKL2Z8JsJxcs+LFSMP/GOcV+NSz1OWSi4LkHSv3d7X9alSnjNm7iOmwLFAkpa6IZ6zCM95HMLIZ+ZK+d8rCXUlnUFn/WwGV5sRCSc/mO8NrjEdbiBYDeisjvwPNTxM8aFGM=',
    "ncExpDate" : "3n22jDQf/55zzMo0eusjPA==",
    "ncPan" : "MP5WPpnOFUXsIKZgrZtC/DLqdHbgBHPnSUqJIvDI64Q=",
    "ocExpDate" : "h4lKXXH7VQ3tw53Sz0Gg7A==",
    "ocPan" : "Na1o5DtozZc6sHDbttGGfzLqdHbgBHPnSUqJIvDI64Q=",
    "replacementReason" : replacementReason
  }*/
}

function postDataJSON(data){
  var xhr = new XMLHttpRequest();
  var url = "https://cd-proxy-service.stg-eu-west1.epgint.com/changerequest/issuerrequest/change/";
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {


    if (xhr.readyState === 4 && xhr.status === 200) {

        try {

            let json = xhr.responseText !== '' ? JSON.parse(xhr.responseText) : null;
            localStorage.setItem('cdChangeRequestId', json.cdChangeRequestId);


        } catch (error) {
            console.log(error);
        }
    }
  };

  xhr.send(JSON.stringify(data));
}

function getIcon(id){
  let text = getTextFromCsvFile();
  text = removeFirstLine(text);
  let dataJSON = csvJSON(text);



  for(let i = 0; i < dataJSON.length; i++){

    if(dataJSON[i].issuerMerchantId===id){
      return dataJSON[i].Logo.toString();
    }

  }

  return dummySvg;
}

function getTextFromCsvFile() {

  let fileName = localStorage.getItem('fileName')+'.csv';
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", fileName, false);

  rawFile.onreadystatechange = function ()
  {
    if(rawFile.readyState === 4)
    {
      if(rawFile.status === 200 || rawFile.status === 0)
      {
        var allText = rawFile.responseText;
      }
    }
  };

  rawFile.send(null);

  return rawFile.responseText
}

function removeFirstLine(text){
  var lines = text.split('\n');
  lines.splice(0,1);
  lines.unshift("issuerId;issuerMerchantId;issuerMerchantName;Country;Channel;NumerTRX;Logo");
  return  lines.join('\n');
}

function csvJSON(csv){
  let lines=csv.split("\n");
  let result = [];
  let headers=lines[0].split(";");

  for(let i=1;i<lines.length-1;i++){
    let obj = {};
    let currentline=lines[i].split(";");

    for(let j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}
