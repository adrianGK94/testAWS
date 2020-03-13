import dummySvg from '../../assets/img/dummy.svg';
import updateCardView from './updateCardView';
import locale from '../config/locale/i18n';

export default function setViewToSearchMerchants(cardDynamic) {
  let html = createViewHtml();
  setViewHtml(html);
  createMerchantListViewHtml(cardDynamic);
  setEventListeners(cardDynamic);
}

function createViewHtml() {
  const i18n = locale();

  return `
    <body>
      <!--header-->
      <header role="banner">
        <div class="row">
          <div class="header-main">
            <a href="#" class="header-link" id="back-button"><span class="icon-back"></span></a>
            <h1 class="header-title">${i18n.updateCard.title}</h1>
          </div>
        </div>
      </header>
      <!--END OF header-->
      <!--main-->
      <div role="main" class="search-form">
        <div class="row">
          <!--form-->
          <form>
            <fieldset>
              <div class="search-form-row">
                <input type="text" id="txt-search" name="txt-search" class="search-form-txt" placeholder="${i18n.updateCard.searchMerchants}">
                <button type="button" id="btn-search" name="btn-search" class="btn-search"><span class="icon-search"></span></button>
              </div>
            </fieldset>
            <fieldset class="merchants-list" id="merchants-list">
            </fieldset>
            <button type="submit" id="btn-save" name="btn-save" class="form-btn">${i18n.merchants.saveSelection}</button>
          </form>
          <!--END OF form-->
        </div>
      </div>
      <!--END OF main-->
       <!--modal-->
      <div class="modal" id="error-modal">
        <div class="modal-container">
          <h2 class="modal-title">${i18n.error.title}</h2>
          <div class="modal-body" id="error-messages">${i18n.merchants.notFound}</div>
          <a href="#" class="modal-btn" id="btn-modal-close">${i18n.error.retry}</a>
        </div>
      </div>
      <!--END OF modal-->
    </body>
  `;
}

function createMerchantListViewHtml(cardDynamic) {
  let currentMerchantList = cardDynamic.getMerchantList();
  let availableMerchantList = getAvailableMerchantList(currentMerchantList);
  sessionStorage.setItem('tempList', JSON.stringify(availableMerchantList));

  if (availableMerchantList && availableMerchantList.length > 0 ) {

    let html = `<fieldset class="merchants-list" id="merchants-list">`;

    availableMerchantList.forEach(function(merchant) {
        let icon = merchant.Logo;
        if(!icon){
            icon = dummySvg
        }
        html += `
        <!--search-item-->
        <div class="checkbox-bl-type2">
          <input type="checkbox" id="ch-${merchant.issuerMerchantId}" name="ch-${merchant.issuerMerchantId}" data-signed-contract="${merchant.cdSignedContract}">
          <label for="ch-${merchant.issuerMerchantId}" class="checkbox-label"><img src="${icon}" alt="">${merchant.issuerMerchantName}</label>
        </div>
        <!--END OF search-item-->
      `;
    });

    html += `</fieldset>`;

    const merchantListFieldset = document.getElementById('merchants-list');
    merchantListFieldset.outerHTML = html;
  }
}

function setViewHtml(html) {
  document.body.outerHTML = html;
}

function setEventListeners(cardDynamic) {
  setBackButtonEventListener(cardDynamic);
  setSearchBarEventListener(cardDynamic);
  setSaveButtonEventListener(cardDynamic);
}

function setSearchBarEventListener(cardDynamic) {
  const searchInput = document.getElementById("txt-search");
  let currentMerchantList = cardDynamic.getMerchantList();
  let availableMerchantList = getAvailableMerchantList(currentMerchantList);
  sessionStorage.setItem('tempList', JSON.stringify(availableMerchantList));

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      let list = JSON.parse(sessionStorage.getItem('tempList'));
      let tempList = [];

      list.filter(function(item) {
        if(item.issuerMerchantName.toLocaleLowerCase().indexOf(prepareStringForComparison(searchInput.value)) > -1){
          tempList.push(item);
        }
      });

      if(tempList.length===0){
        openModal();
        console.log('no matches found');
      }

      if(tempList.length>0 && tempList.length<list.length){
        updateMerchantListView(tempList);
      }

      if(tempList.length==list.length){
        updateMerchantListView(list);
      }

    });
  }
}

function setBackButtonEventListener(cardDynamic) {
  const backButton = document.getElementById("back-button");
  if (backButton) {
    backButton.addEventListener("click", (e) => {
      e.preventDefault();
      updateCardView(cardDynamic);
    });
  }
}

function updateMerchantListView(merchantList) {
  if (merchantList && merchantList.length > 0) {
    let html = `
      <fieldset class="merchants-list" id="merchants-list">
    `;
    merchantList.forEach(function(merchant) {

        let icon = merchant.Logo;
        if(!icon){
            icon = dummySvg
        }
      html += `
        <!--search-item-->
        <div class="checkbox-bl-type2">
          <input type="checkbox" id="ch-${merchant.issuerMerchantId}" name="ch-${merchant.issuerMerchantId}" data-signed-contract="${merchant.cdSignedContract}">
          <label for="ch-${merchant.issuerMerchantId}" class="checkbox-label"><img src="${icon}" alt="">${merchant.issuerMerchantName}</label>
        </div>
        <!--END OF search-item-->
      `;
    });
    html += `</fieldset>`;
    const merchantListFieldset = document.getElementById('merchants-list');
    merchantListFieldset.outerHTML = html;
  }
}

function getSelectedMerchants(){
  let mInputs = Array.from(document.getElementsByTagName('input'));
  let mLabels = Array.from(document.getElementsByTagName('label'));
  let mList = [];

  if (mInputs && mInputs.length > 0) {
    mInputs.forEach(item => {
      if (item.checked) {
        const id = item.id.substring(3);
        const cdSignedContract = item.getAttribute("data-signed-contract");
        let name;

        mLabels.forEach(label=>{
          if(label.htmlFor === item.id){
            name = label.innerText;
          }
        });
        mList.push({issuerMerchantId : id, issuerMerchantName : name, cdSignedContract: cdSignedContract});
      }
    });
  }
  return mList;
}

function setSaveButtonEventListener(cardDynamic) {
  const saveButton = document.getElementById('btn-save');
  saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    let selectedMerchants = getSelectedMerchants();
    let currentMerchants = cardDynamic.getMerchantList();
    if(!currentMerchants) {
      currentMerchants = [];
    }
    selectedMerchants.forEach(item => {
      currentMerchants.push(item);
    });

    cardDynamic.setMerchantList(currentMerchants);
    updateCardView(cardDynamic);
  });
}

function prepareStringForComparison(string) {
  return (string)
    ? string.toLocaleLowerCase().normalize('NFD')
    .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
    .replace(/\s/g,'').replace('-','').normalize()
    : '';
}

function getAvailableMerchantList(list) {
  let text = getTextFromCsvFile();
  text = removeFirstLine(text);
  let dataJSON = csvJSON(text);

  if(!list)list = [];

  return dataJSON.filter(function (el) {
    var found = false, x = 0;
    while (x < list.length && !found) {
      if (el.issuerMerchantId === list[x].issuerMerchantId && el.issuerMerchantName.toLowerCase() === list[x].issuerMerchantName.toLowerCase()) found = true;
      x++;
    }
    if (!found) return el;
  });
}

function removeFirstLine(text){
  var lines = text.split('\n');
  lines.splice(0,1);
  lines.unshift("issuerId;issuerMerchantId;issuerMerchantName;Country;Channel;NumerTRX;Logo;cdSignedContract");
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

function openModal() {
  const modal = document.getElementById('error-modal');
  const closeButton = document.getElementById('btn-modal-close');

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

/*
    Polyfill Arrays to IE11

 */

if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
