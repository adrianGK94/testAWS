import {
  mockMerchantList
} from '../config/mockups';
import cryptoUtil from '../config/cryptoUtil';
import {
  xApiKey,
  baseUrl
} from "../config/api-data";

let merchantList = []; // Saved list. If there is data saved don't call service again

export default class MerchantService {
  /**
   * GET  With this method the Issuer will request all the merchants available to push an Enrollment
   *      Request and get an array with all the details to render the promotions and registration
   *      forms of all the merchants available to receive new Registrations.
   */
  static getMerchantList() {
    if (merchantList.length <= 0) {
      return fetch(`${baseUrl}/enrollment/merchants`, {
          method: 'get',
          mode: 'cors',
          headers: {
            'x-api-key': xApiKey
          }
        })
        /* DON'T REMOVE */
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject({
              status: res.status,
              statusText: res.statusText
            });
          }
        })
        .then(res => res.map(resJson => {
          const secret = sessionStorage.getItem('secret');
          return {
            merchantType: resJson.merchantType,
            merchants: resJson.merchants.map(merchant => {
              return {
                cdMerchantId: merchant.cdMerchantId,
                promotions: cryptoUtil.decrypt(secret, merchant.promotions),
                form: cryptoUtil.decrypt(secret, merchant.form),
                merchantDetails: cryptoUtil.decrypt(secret, merchant.merchantDetails)
              };
            })
          };
        }))
        .then(decryptedRes => merchantList = decryptedRes)
        /* MOCK */
        // .then(() => mockMerchantList)
        // .then(res => merchantList = res)
        .catch(error => console.log('Request failed', error));
    } else {
      return new Promise(resolve => resolve(merchantList));
    }
  }

  /**
   * POST  The Issuer can send the full list of values to attempt the customer registration on merchant.
   * 
   * @param {registrationForm: {}, cdMerchantId: string, integrityCheckinputName: string} data 
   */
  static merchantRegistration(data) {
    return fetch(`${baseUrl}/enrollment/register`, {
        method: 'post',
        mode: 'cors',
        headers: {
          'x-api-key': xApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res)
      .catch(error => console.log('Request failed', error));
  }

  /**
   * POST  After having registered a new customer on merchant, the Issuer can add a customer’s Card Account to the merchant.
   * 
   * @param {enrollmentId: string, customerId: string, cardData: object, integrityCheck: string} data 
   */
  static cardRegistration(data) {
    return fetch(`${baseUrl}/enrollment/register/card`, {
        method: 'post',
        mode: 'cors',
        headers: {
          'x-api-key': xApiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => res)
      .catch(error => console.log('Request failed', error));
  }

  /**
   * POST  After having registered a new customer on merchant, the Issuer can add a customer’s Bank Account to the merchant.
   *
   * @param {enrollmentId: string, customerId: string, bankAccountData: object, integrityCheck: string} data
   */
  static bankAccountRegistration(data) {
    return fetch(`${baseUrl}/enrollment/register/bankaccount`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'x-api-key': xApiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res)
        .catch(error => console.log('Request failed', error));
  }

  /**
   * POST  The Issuer can send the full list of values to attempt the customer registration on merchant with payment data.
   *
   * @param {registrationData: {}, cdMerchantId: string, cardData: object, bankData: object, promoId: string, integrityCheck: string} data
   */
  static merchantRegistrationWithPayment(data) {
    return fetch(`${baseUrl}/enrollment/register-with-payment`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'x-api-key': xApiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res)
        .catch(error => console.log('Request failed', error));
  }

  /**
   * POST  The Issuer can send validation code from EMAIL or CODE.
   *
   * @param {enrollmentRequestId: string, validationType: string, code: string} data
   */
  static enrollmentConfirmation(data) {
    return fetch(`${baseUrl}/enrollment/confirmation`, {
        method: 'post',
        mode: 'cors',
        headers: {
            'x-api-key': xApiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res)
        .catch(error => console.log('Request failed', error));
  }
}