let defaultPersonalInfo = {}; // List of form values used by default in "register merchant view"
let newPersonalInfo = {}; // List of form values used by default in "register merchant view"
let paymentMethods = null; // List of payment methods

export default class SharedDataService {
  /**
   * Save default personal info locally
   * 
   * @param {} data
   */
  static setDefaultPersonalInfo(data) {
    defaultPersonalInfo = data;
  }

  /**
   * Get default personal info
   */
  static getDefaultPersonalInfo() {
    return defaultPersonalInfo;
  }

  /**
   * Save new personal info locally
   * 
   * @param {} data
   */
  static setNewPersonalInfo(data) {
    newPersonalInfo = data;
  }

  /**
   * Get new personal info
   */
  static getNewPersonalInfo() {
    return newPersonalInfo;
  }

  /**
   * Delete new personal info
   */
  static removeNewPersonalInfo() {
    newPersonalInfo = {};
  }

  /**
   * There is new personal info
   */
  static thereIsNewPersonalInfo() {
    return Object.entries(newPersonalInfo).length > 0;
  }

  /**
   * Save payments methods locally
   */
  static setPaymentMethods(data) {
    paymentMethods = data;
  }

  /**
   * Get payments methods
   */
  static getPaymentMethods() {
    return paymentMethods;
  }

  /**
   * Has payments methods
   */
  static hasPaymentMethods() {
    return (paymentMethods.creditCards && paymentMethods.creditCards.length > 0) || (paymentMethods.bankAccounts && paymentMethods.bankAccounts.length > 0);
  }
}