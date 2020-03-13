import blueCardSvg from '../../assets/img/blue-card.svg';
import dummySvg from '../../assets/img/dummy.svg';
import locale from '../config/locale/i18n';
import searchMerchantView from './searchMerchantView';
import cryptoUtil from '../config/cryptoUtil';
import CryptoJS from "crypto-js";
import { xApiKey, baseUrl } from "../config/api-data";

const i18n = locale();

export default function setViewToUpdateCard(cardDynamic) {
  const card = cardDynamic.getNewCard();

  const currentMerchantList = cardDynamic.getMerchantList();
  const html = createViewHtml(card, currentMerchantList);


  setViewHtml(html);
  setEventListeners(cardDynamic);
}

function createViewHtml(card, currentMerchantList) {
  const cardNumber = card.getCardNumber();
  const expDate = card.getExpDate();

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
  } else {
    if (currentMerchantList.length > 0) {
      let pendingMerchants = 0;

      currentMerchantList.forEach(merchant => {
        if (merchant.responseCode === '999' || merchant.responseCode === undefined) {
          pendingMerchants++;
        }
      });

      if (pendingMerchants > 0) {
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

      if (merchant.responseCode === '' || merchant.responseCode == null) {
        html += `
          <div class="checkbox-bl">
              <input type="checkbox" id="ch-${merchant.issuerMerchantId}" name="ch-${merchant.issuerMerchantId}" data-signed-contract="${merchant.cdSignedContract}" checked="true">
              <label for="ch-${merchant.issuerMerchantId}" class="checkbox-label"><img src="${getIcon(merchant.issuerMerchantId)}" alt="">${merchant.issuerMerchantName}</label>
          </div>`;
      } else {
        html += `
          <div class="checkbox-bl">
              <label class="checkbox-no-switch"><img src="${getIcon(merchant.issuerMerchantId)}" alt="">${merchant.issuerMerchantName}</label>
          </div>`;
      }

      switch (merchant.responseCode) {
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

      if (merchant.responseCode === "" || merchant.responseCode == null) {
        html += ``;
      } else {
        html += `
          <!--card-item-state-->
          <div class="card-item-state">
            <span class="ic-state ${stateClass}"></span>
            <span class="state-desc">${stateString}</span>
          </div>
          <!--END OF card-item-state-->`;
      }

      html += `
        </div>
        <!--END OF card-item-->`;
    });

    html += `
      <div class="card-item disclaimer">
        <p><span class="reminder">${i18n.saveMerchants.disclaimer.reminder}:</span> ${i18n.saveMerchants.disclaimer.text}</p>
      </div>
    </div>
    <div class="save-merchants-bl">
      <input type="checkbox" class="card-owner" name="owner" id="owner" value="false">
      <label for="owner" class="card-owner">${i18n.saveMerchants.owner}</label>
      <button class="save-btn" id="save-btn">${i18n.saveMerchants.button.title}</button>
    </div>
    <!--END OF main-->`;
  }

  html += `
      </div>
    </div>
    <!--modal-->
    <div class="modal" id="info-modal">
      <div class="modal-container">
        <h2 class="modal-title">${i18n.modal.title.warning}</h2>
        <div class="modal-body" id="info-messages"></div>
        <a href="#" class="modal-btn" id="btn-modal-close">${i18n.modal.button.understood}</a>
      </div>
    </div>
    <!--END OF modal-->
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
  const ownerCheck = document.getElementById("owner");

  if (saveButton) {
    saveButton.disabled = true;
    saveButton.style.opacity = 0.6;

    saveButton.addEventListener("click", (e) => {
      e.preventDefault();
      saveMerchants(cardDynamic);
    })
  };

  if (search) search.addEventListener("click", (e) => {
    e.preventDefault();
    searchMerchantView(cardDynamic);
  });

  if (ownerCheck) {
    ownerCheck.addEventListener("input", (e) => {
      if (e.srcElement.checked) {
        if (saveButton) {
          saveButton.disabled = false;
          saveButton.style.opacity = 1;
        }
      } else {
        if (saveButton) {
          saveButton.disabled = true;
          saveButton.style.opacity = 0.6;
        }
      }

      e.preventDefault();
    });
  }

  updateToggle(cardDynamic);
}

function updateToggle(cardDynamic) {
  const selectedMerchantList = cardDynamic.getMerchantList();

  if (selectedMerchantList != null && selectedMerchantList.length > 0) {
    const chAllToggle = document.getElementById("ch-all");

    if (chAllToggle) {
      chAllToggle.addEventListener("click", function () {
        selectedMerchantList.forEach(merchant => {
          const checkbox = document.getElementById(`ch-${merchant.issuerMerchantId}`);

          if (checkbox != null && chAllToggle.checked) {
            checkbox.checked = true;
          }
          if (checkbox != null && !chAllToggle.checked) {
            checkbox.checked = false;
          }
        });
      });
    }

    selectedMerchantList.forEach(merchant => {
      const merchantToggle = document.getElementById(`ch-${merchant.issuerMerchantId}`);

      if (merchantToggle) merchantToggle.addEventListener("click", function () {
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

function saveMerchants(cardDynamic) {
  const merchantList = getSelectedMerchants();
  const currentMerchantList = cardDynamic.getMerchantList();

  let pendingMerchants = merchantList.filter(function (el) {
    var found = false, x = 0;

    while (x < currentMerchantList.length && !found) {
      if (el.issuerMerchantId === currentMerchantList[x].issuerMerchantId && el.issuerMerchantName.toLowerCase() === currentMerchantList[x].issuerMerchantName.toLowerCase()) found = false;
      x++;
    }

    if (!found) {
      return el;
    }
  });

  pendingMerchants = currentMerchantList.filter(function (el) {
    var found = false, x = 0;

    while (x < merchantList.length && !found) {
      if (el.issuerMerchantId === merchantList[x].issuerMerchantId && el.issuerMerchantName.toLowerCase() === merchantList[x].issuerMerchantName.toLowerCase()) {
        if (el.responseCode !== "999") {
          el.responseCode = "999";
        }

        found = false;
      }

      x++;
    }

    if (!found) {
      return el;
    }
  });

  cardDynamic.setMerchantList(pendingMerchants);
  if (merchantList != null && merchantList.length > 0) {
    const merchantListEnc = encryptList(merchantList);
    const merchantNames = getMerchantListNames(merchantList);
    buildDataJSON(merchantListEnc, cardDynamic, function (results) {
      postDataJSON(results, function () {
        setViewToUpdateCard(cardDynamic);

        if (merchantNames.trim().length > 0) {
          openModal(`<p>${i18n.modal.message.delayedChangeMerchants} <strong>${merchantNames}</strong>.</p>`);
        }
      });
    });
  } else {
    openModal(`<p>${i18n.modal.message.noChanges}</p>`);
  }
}

function getMerchantListNames(merchantList) {
  const merchantNames = [];
  merchantList.forEach(merchant => {
    if (merchant.cdSignedContract == '2') {
      merchantNames.push(merchant.issuerMerchantName);
    }
  });

  return merchantNames.join(', ');
}

function getSelectedMerchants() {
  const mInputs = Array.from(document.getElementsByTagName('input'));
  const mLabels = Array.from(document.getElementsByTagName('label'));
  const mList = [];

  if (mInputs && mInputs.length > 0) {
    mInputs.forEach(item => {
      if (item.checked && item.id != 'ch-all' && item.id != 'owner') {
        const id = item.id.substring(3);
        const cdSignedContract = item.getAttribute("data-signed-contract");
        let name;

        mLabels.forEach(label => {
          if (label.htmlFor == item.id) {
            name = label.innerText;
          }
        });

        mList.push({ issuerMerchantId: id, issuerMerchantName: name, cdSignedContract: cdSignedContract, responseCode: 999 });
      }
    });
  }

  return mList;
}

function encryptList(list) {
  const country = 'ES';
  const channel = 'mobile'; // mobile
  const numberTrx = 1;
  let json = [];

  const secret = sessionStorage.getItem('secret');

  list.forEach(item => {
    json.push({
      'cdMerchantId': parseInt(item.issuerMerchantId, 10),
      'merchantName': item.issuerMerchantName,
      'country': country,
      'channel': channel,
      'numberTrx': numberTrx
    })
  });

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

function buildDataJSON(merchantListEnc, cardDynamic, callback) {
  const timestamp = new Date().getTime();
  // const issuerId = localStorage.getItem('issuerid');
  const newCard = cardDynamic.getNewCard();
  const oldCard = cardDynamic.getOldCard();
  const secret = sessionStorage.getItem('secret');

  const ncExpDate = cryptoUtil.encrypt(secret, newCard.expDate);
  const ncPan = cryptoUtil.encrypt(secret, newCard.pan);
  const ocExpDate = cryptoUtil.encrypt(secret, oldCard.expDate);
  const ocPan = cryptoUtil.encrypt(secret, oldCard.pan);

  //let integrityCheck = CryptoJS.SHA256(newCard.expDate + newCard.pan + oldCard.expDate + oldCard.pan);
  const replacementReason = 'Case: OK, card successfully updated';

  const xhrTokenizationNew = new XMLHttpRequest();

  xhrTokenizationNew.open("GET", `${baseUrl}/tokenization/new`, true);
  xhrTokenizationNew.setRequestHeader("Content-Type", "application/json");
  xhrTokenizationNew.setRequestHeader("x-api-key", xApiKey);
  xhrTokenizationNew.onreadystatechange = function () {
    if (xhrTokenizationNew.readyState === 4 && xhrTokenizationNew.status === 200) {
      try {
        const json = (xhrTokenizationNew.responseText !== '')
          ? JSON.parse(xhrTokenizationNew.responseText)
          : null;

        if (json) {
          const tokenizeRequest = {
            operationId: json.operationId,
            pan: oldCard.pan
          }

          const xhrTokenizationTokenize = new XMLHttpRequest();
          xhrTokenizationTokenize.open("POST", `${baseUrl}/tokenization/tokenize`, true);
          xhrTokenizationTokenize.setRequestHeader("Content-Type", "application/json");
          xhrTokenizationTokenize.setRequestHeader("x-api-key", xApiKey);
          xhrTokenizationTokenize.onreadystatechange = function () {
            if (xhrTokenizationTokenize.readyState === 4 && xhrTokenizationTokenize.status === 200) {
              try {
                const json2 = (xhrTokenizationTokenize.responseText !== '')
                  ? JSON.parse(xhrTokenizationTokenize.responseText)
                  : null;

                if (json2) {
                  const ocToken = cryptoUtil.encrypt(secret, json2.token);
                  const integrityCheck = CryptoJS.SHA256(json2.token + oldCard.expDate + newCard.pan + newCard.expDate).toString();


                  callback({
                    "integrityCheck": integrityCheck,
                    "issuerChangeRequestId": timestamp,
                    // "issuerId": issuerId,
                    "merchantList": merchantListEnc,
                    "ncExpDate": ncExpDate,
                    // "ncToken": ncPan,
                    "ncPan": ncPan,
                    "ocExpDate": ocExpDate,
                    "ocToken": ocToken,
                    "replacementReason": replacementReason
                  });
                }
              } catch (error) {
                openModal(`<p>There was an unexpected error with your request. Please, try again.</p>`);
                console.log(error);
              }
            }
          }

          xhrTokenizationTokenize.send(JSON.stringify(tokenizeRequest));
        }
      } catch (error) {
        openModal(`<p>There was an unexpected error with your request. Please, try again.</p>`);
        console.log(error);
      }
    }
  };

  xhrTokenizationNew.send(null);
}

function postDataJSON(data, callback) {
  const xhrChangeRequest = new XMLHttpRequest();

  xhrChangeRequest.open("POST", `${baseUrl}/changerequest/issuerrequest/change`, true);
  xhrChangeRequest.setRequestHeader("Content-Type", "application/json");
  xhrChangeRequest.setRequestHeader("x-api-key", xApiKey);
  xhrChangeRequest.onreadystatechange = function () {
    if (xhrChangeRequest.readyState === 4 && xhrChangeRequest.status === 200) {
      try {
        const json = (xhrChangeRequest.responseText !== '')
          ? JSON.parse(xhrChangeRequest.responseText)
          : null;
        localStorage.setItem('cdChangeRequestId', json.cdChangeRequestId);
        callback();
      } catch (error) {
        openModal(`<p>There was an unexpected error with your request. Please, try again.</p>`);
        console.log(error);
      }
    }
  };

  xhrChangeRequest.send(JSON.stringify(data));
}

function getIcon(id) {
  let text = getTextFromCsvFile();
  text = removeFirstLine(text);
  const dataJSON = csvJSON(text);

  for (let i = 0; i < dataJSON.length; i++) {
    if (dataJSON[i].issuerMerchantId === id) {
      return dataJSON[i].Logo.toString();
    }
  }

  return dummySvg;
}

function getTextFromCsvFile() {
  const fileName = localStorage.getItem('fileName') + '.csv';
  const rawFile = new XMLHttpRequest();

  rawFile.open("GET", fileName, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        var allText = rawFile.responseText;
      }
    }
  };

  rawFile.send(null);

  return rawFile.responseText
}

function removeFirstLine(text) {
  const lines = text.split('\n');
  lines.splice(0, 1);
  lines.unshift("issuerId;issuerMerchantId;issuerMerchantName;Country;Channel;NumerTRX;Logo;cdSignedContract");
  return lines.join('\n');
}

function csvJSON(csv) {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(";");

  for (let i = 1; i < lines.length - 1; i++) {
    const obj = {};
    const currentline = lines[i].split(";");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  return result;
}

function openModal(infoText) {
  const modal = document.getElementById('info-modal');
  const closeButton = document.getElementById('btn-modal-close');
  const infoMessage = document.getElementById('info-messages');
  infoMessage.innerHTML = infoText;

  modal.style.display = 'flex';

  closeButton.onclick = () => {
    modal.style.display = 'none';
  }

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }
}
