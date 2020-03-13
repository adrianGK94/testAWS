export default function i18n() {
	/* Spanish translation */
	if (navigator.language.indexOf('es-') !== -1) {
		return {
			"updateCard": {
				"title": "Update card details",
				"selectMerchants": "Select the merchants at which you would like to update your payment information. The process can take up to 24 hrs.",
				"updateAllMerchants": "Update all merchants",
				"addCardDescription": "Enter the card details of your previous card, select the merchants at which the card was registered and we will update your payment information. The process can take up to 24 hrs.",
				"addNewCard": "Add old Card",
				"searchMerchants": "Search or type merchant name",
				"scanNewCard": "Scan old card"
			},
			"creditCard": {
				"title": "Credit Card",
				"linkedAccount": "Linked account",
				"account": "Account %1$s",
				"expiration": "Expiration date",
				"expirationFormat": "dd MMM yyyy",
				"noAccount": "There is no account."
			},
			"merchants": {
				"stateUpdated": "Updated",
				"statePending": "Pending",
				"stateDenied": "Denied",
				"saveSelection": "Save selection",
				"notFound": "No matches were found."
			},
			"cardDetail": {
				"name": "Name",
				"number": "Number",
				"expirationDate": "Expiry Date",
				"expiryHint": "MM/YY",
				"cvv": "cvv",
				"required": "Required",
				"saveCard": "Save Card"
			},
			"newCreditCard": {
				"title": "Add old Credit Card",
				"positionHint": "Position your card in the frame",
				"manually": "Enter Card Details Manually",
				"error": {
					"cvvFormat": "Cvv needs at least 3 characters",
					"numberFormat": "Credit card number is not valid",
					"dateFormat": "Date format should be MM/YY",
					"wrongMonth": "Month is not valid"
				}
			},
			"error": {
				"title": "Error",
				"description": "Something wents wrog. Let´s give this another try.",
				"retry": "Try again"
			},
			"loading": {
				"title": "Loading…",
				"description": "Give us a few moments to leave everything ready."
			},
			"saveMerchants": {
				"button": {
					"title": "Save merchants"
				},
				"disclaimer": {
					"text": "Some listed merchants may not be affiliated with the service yet.",
					"reminder": "Reminder"
				},
				"owner": "I am the owner of the provided card."
			},
			"signedContract": {
				"alert": {
					"description": "Card update will become effective by the next payment for the following merchants:",
					"accept": "Accept"
				}
			},
			"modal": {
				"title": {
					"info": "Information",
					"warning": "Warning"
				},
				"message": {
					"delayedChangeMerchants": "Card update will become effective by the next payment for the following merchants:",
					"noChanges": "No changes were made."
				},
				"button": {
					"understood": "Understood"
				}
      },
      "merchantList": {
				"title": "E-comm Dynamics",
				"selectMerchants": "Select the merchants at which you would like to update your payment information. The process can take up to 24 hrs.",
				"updateAllMerchants": "Update all merchants",
				"addCardDescription": "Enter the card details of your previous card, select the merchants at which the card was registered and we will update your payment information. The process can take up to 24 hrs.",
				"addNewCard": "Add old Card",
				"searchMerchants": "Search or type merchant name",
				"scanNewCard": "Scan old card"
			},
		};		
	} 
	/* END OF spanish translation*/
	/* Default language translation */
	else {
		return {
			"updateCard": {
				"title": "Update card details",
				"selectMerchants": "Select the merchants at which you would like to update your payment information. The process can take up to 24 hrs.",
				"updateAllMerchants": "Update all merchants",
				"addCardDescription": "Enter the card details of your previous card, select the merchants at which the card was registered and we will update your payment information. The process can take up to 24 hrs.",
				"addNewCard": "Add old Card",
				"searchMerchants": "Search or type merchant name",
				"scanNewCard": "Scan old card"
			},
			"creditCard": {
				"title": "Credit Card",
				"linkedAccount": "Linked account",
				"account": "Account %1$s",
				"expiration": "Expiration date",
				"expirationFormat": "dd MMM yyyy",
				"noAccount": "There is no account."
			},
			"merchants": {
				"stateUpdated": "Updated",
				"statePending": "Pending",
				"stateDenied": "Denied",
				"saveSelection": "Save selection",
				"notFound": "No matches were found."
			},
			"cardDetail": {
				"name": "Name",
				"number": "Number",
				"expirationDate": "Expiry Date",
				"expiryHint": "MM/YY",
				"cvv": "cvv",
				"required": "Required",
				"saveCard": "Save Card"
			},
			"newCreditCard": {
				"title": "Add old Credit Card",
				"positionHint": "Position your card in the frame",
				"manually": "Enter Card Details Manually",
				"error": {
					"cvvFormat": "Cvv needs at least 3 characters",
					"numberFormat": "Credit card number is not valid",
					"dateFormat": "Date format should be MM/YY",
					"wrongMonth": "Month is not valid"
				}
			},
			"error": {
				"title": "Error",
				"description": "Something wents wrog. Let´s give this another try.",
				"retry": "Try again"
			},
			"loading": {
				"title": "Loading…",
				"description": "Give us a few moments to leave everything ready."
			},
			"saveMerchants": {
				"button": {
					"title": "Save merchants"
				},
				"disclaimer": {
					"text": "Some listed merchants may not be affiliated with the service yet.",
					"reminder": "Reminder"
				},
				"owner": "I am the owner of the provided card."
			},
			"signedContract": {
				"alert": {
					"description": "Card update will become effective by the next payment for the following merchants:",
					"accept": "Accept"
				}
			},
			"modal": {
				"title": {
					"info": "Information",
					"warning": "Warning"
				},
				"message": {
					"delayedChangeMerchants": "Card update will become effective by the next payment for the following merchants:",
					"noChanges": "No changes were made."
				},
				"button": {
					"understood": "Understood"
				}
			}
		};		
	}
	/* Default language translation */
}