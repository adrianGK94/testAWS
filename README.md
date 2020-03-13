# Deep Payments

## Built With:

- [AES256] A Node.js module to simplify using the built-in crypto module for AES-256 encryption with random initialization vectors.
- [Crypto-JS] JavaScript library of crypto standards.
- [imaskjs] Vanilla javascript input mask.
- [md5] A JavaScript function for hashing messages with MD5.
- [SHA256] JavaScript component to compute the SHA256 of strings or bytes.

## Usage

Just add a link to the js file in your `<head>`

```javascript
<script type="text/javascript" src="deep-payments.js"></script>
```

## Settings

```javascript
deepPayments.setUp(issuerId, secret, merchantsFileCsv);
```

- issuerId, every bank provide its ID [Required]
- secret, provide by EasyPayments [Required]
- merchantsFileCsv, a merchants available list in a CSV file [Required]

In order to add the new card, call to the method

```javascript
deepPayments.newCard(ncPan, ncExpDate);
```

- ncPan, payment card number [Required]
- ncExpDate, card expiration date [Required]

Optionally, you can also add the data of the old card

```javascript
deepPayments.oldCard(ocPan, ocExpDate);
```

- ocPan, payment card number [Required]
- ocExpDate, card expiration date [Required]

```javascript
deepPayments.setMerchantList(changeMerchants);
```

You can add a list of merchant additionally (optional)

- changeMerchants, optional merchant list to add in the new card. [Opcional]

To initialize the **enrollment** funcionality the `addNewMerchant` method is to be called, passing following parameters:

```javascript
deepPayments.addNewMerchant(paymentMethods, personalInfo);
```

- paymentMethods, user's bank card/account list [Required]
- personalInfo, user data available to autofill the register form fields of the merchants [Optional]

Data example:

```javascript
personalInfo = {
  email: "pedro@mail.com",
  country: "portugal"
};
paymentMethods = {
  creditCards: [
    {
      cardHolder: "Pedro", // Required
      pan: "400000000000018", // Required
      expDate: "1125", // Required
      cvv: "815", // Optional
      country: "es", // Required
      currency: "eur", // Required
      cardBackground: "assets/img/bg-card-bbva.jpg", // Optional
      bankLogo: "assets/img/logo-bbva.png" // Optional
    }
  ],
  bankAccounts: [
    {
      iban: "ES00 0000 0000 0002", // Required
      bicSwift: "09138", // Optional
      accountHolder: "Juan García Riveiros", // Optional
      bankAccountType: "SAVINGS", // Optional
      bankName: "BBVA", // Optional
      bankAccountNum: "123", // Optional
      bankAccountName: "bankAccountName", // Optional
      bankRoutingNum: "bankRoutingNum", // Optional
      bankCurrency: "eur", // Optional
      bankCountry: "es", // Optional
      bankCode: "bankCode", // Optional
      bankAddress: "bankAddress", // Optional
      bankBranchCode: "bankBranchCode", // Optional
      bankBranchName: "bankBranchName", // Optional
      bankSubBranchCode: "bankSubBranchCode", // Optional
      bankSortCode: "bankSortCode", // Optional
      bankBsbCode: "bankBsbCode", // Optional
      bankInstitutionNo: "991823912368320", // Optional
      accountBackground: "assets/img/bg-card-bbva.jpg", // Optional
      bankLogo: "assets/img/logo-bbva.png" // Optional
    }
  ]
};
```

Finally, run the library

```javascript
deepPayments.run();
```

## Init

In order to use the library, you have initialize it:

```javascript
const deepPayments = CardDynamics.init();
deepPayments.setUp(issuerId, secret, merchantsFileCsv);
deepPayments.newCard(ncPan, ncExpDate);
deepPayments.run();
```
