# Deep Payments


## Built With:

 - [AES256] A Node.js module to simplify using the built-in crypto module for AES-256 encryption with random initialization vectors.
 - [Crypto-JS] JavaScript library of crypto standards.               
 - [imaskjs] Vanilla javascript input mask.             
 - [md5] A JavaScript function for hashing messages with MD5.
 - [SHA256] JavaScript component to compute the SHA256 of strings or bytes.


## Usage
Just add a link to the js file in your ```<head>```
````javascript
<script type="text/javascript" src="deep-payments.js"></script>
````


## Settings
````javascript
 deepPayments.setUp(issuerId, secret, merchantsFileCsv);
````
*  issuerId, every bank provide its ID [Required]
*  secret, provide by EasyPayments [Required]
*  merchantsFileCsv, a merchants available list in a CSV file [Required]

In order to add the new card, call to the method
````javascript
deepPayments.newCard(ncPan, ncExpDate);
````
*  ncPan, payment card number [Required]
*  ncExpDate, card expiration date [Required]


Optionally, you can also add the data of the old card
````javascript
deepPayments.oldCard(ocPan, ocExpDate);
````
*  ocPan, payment card number [Required]
*  ocExpDate, card expiration date [Required]

````javascript
deepPayments.setMerchantList(changeMerchants);
````
You can add a list of merchant additionally (optional)
* changeMerchants, optional merchant list to add in the new card. [Opcional]


Finally, run the library
````javascript
deepPayments.run();
````

## Init
In order to use the library, you have initialize it:

````javascript

const deepPayments = CardDynamics.init();
        deepPayments.setUp(issuerId, secret, merchantsFileCsv);
        deepPayments.newCard(ncPan, ncExpDate);
        deepPayments.run();
````


