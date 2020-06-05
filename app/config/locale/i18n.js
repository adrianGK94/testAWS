export default function i18n() {
	/* Spanish translation */
	if (navigator.language.indexOf('es-') !== -1) {
		/*return {
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
		};*/
		return {
            "welcome": {
                "title": "¡Bienvenido!",
                "description": "Seleccione una opción para comenzar la experiencia",
                "button": {
                    "title": "¡Comenzar!"
                }
            },
            "enrollment": {
                "title": "Registro completo",
                "cards": {
                    "title": "Tarjetas de crédito"
                },
                "add": {
                    "title": "Añadir nueva"
                },
                "edit": {
                    "title": "Editar"
                },
                "accounts": {
                    "title": "Cuenta bancaria"
                }
            },
            "replacement": {
                "title": "Reemplazos",
                "newCard": {
                    "title": "Nueva tarjeta"
                },
                "oldCard": {
                    "title": "Tarjeta antigua"
                },
                "pan": {
                    "hint": "Pan de la tarjeta"
                }
            },
            "settings": {
                "title": "Ajustes"
            },
            "user": {
                "title": "Usuario",
                "email": {
                    "hint": "Correo"
                },
                "username": {
                    "hint": "Nombre usuario"
                },
                "name": {
                    "hint": "Nombre"
                },
                "lastname": {
                    "hint": "Apellido"
                },
                "lastname2": {
                    "hint": "2º Apellido (opcional)"
                },
                "phoneNumber": {
                    "hint": "Número teléfono"
                },
                "address": {
                    "hint": "Dirección"
                },
                "country": {
                    "hint": "País"
                },
                "province": {
                    "hint": "Provincia"
                },
                "city": {
                    "hint": "Ciudad"
                },
                "postalCode": {
                    "hint": "Código postal"
                },
                "age": {
                    "hint": ""
                }
            },
            "save": {
                "button": "Guardar"
            },
            "addCard": {
                "title": "Añadir tarjeta de crédito"
            },
            "addCards": {
                "data": {
                    "title": "Datos de la tarjeta"
                },
                "cardHolder": {
                    "hint": "Titular de la tarjeta"
                },
                "expiryDate": {
                    "hint": "Fecha de caducidad de la tarjeta"
                },
                "logo": {
                    "title": "Logo de la tarjeta"
                },
                "background": {
                    "title": "Fondo de la tarjeta"
                }
            },
            "editCards": {
                "title": "Editar tarjeta de crédito",
                "delete": {
                    "button": "Eliminar tarjeta"
                }
            },
            "editAccount": {
                "delete": {
                    "button": "Eliminar cuenta"
                },
                "title": "Editar cuenta bancaria"
            },
            "addAccounts": {
                "title": "Añadir cuenta bancaria",
                "data": {
                    "title": "Datos cuenta bancaria"
                },
                "holder": {
                    "hint": "Tiltular de la cuenta bancaria"
                },
                "expiryDate": {
                    "hint": "Fecha de caducidad de la cuenta bancaria"
                },
                "logo": {
                    "title": "Logo cuenta bancaria"
                },
                "background": {
                    "title": "Fondo de la cuenta bancaria"
                }
            },
            "home": {
                "text": "<p>Te invitamos a participar en el piloto de registro completo, una solución de tu banco para facilitarte el proceso de alta en comercios online ¡Esperamos que te guste!</p>\n<p>Si es la primera vez que accedes a la demo, no olvides introducir tus datos en el apartado Configuración</p>",
                "button": {
                    "settings": "Configuración",
                    "go": "Comenzar"
                },
                "popupSettings": {
                    "title": "Error",
                    "description": "Por favor, para continuar completa tu información personal en <strong>configuración</strong>",
                    "accept": "Aceptar"
                }
            },
            "merchants": {
                "back": {
                    "title": "Volver al inicio"
                },
                "search": {
                    "title": "Buscar un comercio"
                },
                "details": {
                    "title": "Ver detalle"
                },
                "button": {
                    "apply": "Registrarme"
                },
                "noResults": {
                    "title": "No se han encontrado resultados"
                },
                "error": {
                    "title": "Error",
                    "description": "Para solicitar este servicio es necesario tener una tarjeta bancaria. Póngase en contacto con su banco para contratarlo."
                },
            },
            "merchantDetail": {
                "button": {
                    "back": "Volver",
                    "apply": "Registrarme"
                },
                "error": {
                    "title": "Error",
                    "description": "Para solicitar este servicio es necesario tener una tarjeta bancaria. Póngase en contacto con su banco para contratarlo."
                },
                "campaign": {
                    "title": "Oferta disponible"
                },
                "valid": {
                    "title": "Valida hasta"
                },
                "terms": {
                    "title": "Términos y condiciones legales de la oferta"
                }
            },
            "modal": {
                "button": {
                    "accept": "Aceptar",
                    "cancel": "Cancelar",
                    "try": "Intentar de nuevo"
                }
            },
            "enrollmentForm": {
                "title": "Registro",
                "step": "Paso 1 de 2",
                "description": "Valida la siguiente información personal:",
                "button": {
                    "back": "Volver",
                    "continue": "Continuar"
                },
                "privacy": {
                    "title": "Política de Privacidad",
                    "text": "Estoy de acuerdo con la"
                },
                "terms": {
                    "title": "Términos y Condiciones",
                    "text": "Estoy de acuerdo con los"
                },
                "additional": {
                    "title": "Condiciones Adicionales",
                    "text": "Estoy de acuerdo con las"
                }
            },
            "enrollmentPayment": {
                "title": "Método de pago",
                "step": "Paso 2 de 2",
                "description": "Selecciona un método de pago",
                "button": {
                    "back": "Volver",
                    "apply": "Registrarme"
                },
                "cvv": {
                    "title": "CVV",
                    "error": "El cvv no es valido"
                },
                "additional": {
                    "title": "Condiciones Adicionales",
                    "text": "Estoy de acuerdo con las"
                }
            },
            "verification": {
                "email": {
                    "title": "Verificación"
                },
                "button": {
                    "cancel": "Cancelar",
                    "verify": "Verificar"
                },
                "code": {
                    "title": "Código de verificación"
                },
                "check": {
                    "title": "Ya he validado mi cuenta"
                },
                "backModal": {
                    "description": "Vas a volver al inicio. Perderás el registro de este comerciante. ¿Estás seguro?",
                    "cancel": "Cancelar",
                    "back": "Volver"
                }
            },
            "congratulations": {
                "title": "Enhorabuena",
                "description": "El proceso de registro se ha completado correctamente.",
                "forget": {
                    "title": "y no olvides"
                },
                "button": {
                    "login": "Iniciar sesión"
                },
                "enjoy": {
                    "title": "¡Ir al sitio y disfrutar!"
                },
                "or": {
                    "title": "o"
                },
                "error": {
                    "noCard": {
                        "title": "Para solicitar este servicio es necesario tener una tarjeta bancaria. Por favor, contacte a su banco para contratarlo."
                    }
                }
            },
            "error": {
                "title": "Error",
                "default": {
                    "description": "Algo fue mal. <br>Intentalo de nuevo."
                }
            },
            "merchantList": {
				"title": "E-comm Dynamics",
				"selectMerchants": "Select the merchants at which you would like to update your payment information. The process can take up to 24 hrs.",
				"updateAllMerchants": "Update all merchants",
				"addCardDescription": "Enter the card details of your previous card, select the merchants at which the card was registered and we will update your payment information. The process can take up to 24 hrs.",
				"addNewCard": "Add old Card",
				"searchMerchants": "Buscar un comercio",
				"scanNewCard": "Scan old card"
			}
        };
	} 
	/* END OF spanish translation*/
	/* Default language translation */
	else {
		/*return {
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
		};*/
		return {
            "welcome": {
                "title": "¡Bienvenido!",
                "description": "Seleccione una opción para comenzar la experiencia",
                "button": {
                    "title": "¡Comenzar!"
                }
            },
            "enrollment": {
                "title": "Registro completo",
                "cards": {
                    "title": "Tarjetas de crédito"
                },
                "add": {
                    "title": "Añadir nueva"
                },
                "edit": {
                    "title": "Editar"
                },
                "accounts": {
                    "title": "Cuenta bancaria"
                }
            },
            "replacement": {
                "title": "Reemplazos",
                "newCard": {
                    "title": "Nueva tarjeta"
                },
                "oldCard": {
                    "title": "Tarjeta antigua"
                },
                "pan": {
                    "hint": "Pan de la tarjeta"
                }
            },
            "settings": {
                "title": "Ajustes"
            },
            "user": {
                "title": "Usuario",
                "email": {
                    "hint": "Correo"
                },
                "username": {
                    "hint": "Nombre usuario"
                },
                "name": {
                    "hint": "Nombre"
                },
                "lastname": {
                    "hint": "Apellido"
                },
                "lastname2": {
                    "hint": "2º Apellido (opcional)"
                },
                "phoneNumber": {
                    "hint": "Número teléfono"
                },
                "address": {
                    "hint": "Dirección"
                },
                "country": {
                    "hint": "País"
                },
                "province": {
                    "hint": "Provincia"
                },
                "city": {
                    "hint": "Ciudad"
                },
                "postalCode": {
                    "hint": "Código postal"
                },
                "age": {
                    "hint": ""
                }
            },
            "save": {
                "button": "Guardar"
            },
            "addCard": {
                "title": "Añadir tarjeta de crédito"
            },
            "addCards": {
                "data": {
                    "title": "Datos de la tarjeta"
                },
                "cardHolder": {
                    "hint": "Titular de la tarjeta"
                },
                "expiryDate": {
                    "hint": "Fecha de caducidad de la tarjeta"
                },
                "logo": {
                    "title": "Logo de la tarjeta"
                },
                "background": {
                    "title": "Fondo de la tarjeta"
                }
            },
            "editCards": {
                "title": "Editar tarjeta de crédito",
                "delete": {
                    "button": "Eliminar tarjeta"
                }
            },
            "editAccount": {
                "delete": {
                    "button": "Eliminar cuenta"
                },
                "title": "Editar cuenta bancaria"
            },
            "addAccounts": {
                "title": "Añadir cuenta bancaria",
                "data": {
                    "title": "Datos cuenta bancaria"
                },
                "holder": {
                    "hint": "Tiltular de la cuenta bancaria"
                },
                "expiryDate": {
                    "hint": "Fecha de caducidad de la cuenta bancaria"
                },
                "logo": {
                    "title": "Logo cuenta bancaria"
                },
                "background": {
                    "title": "Fondo de la cuenta bancaria"
                }
            },
            "home": {
                "text": "<p>Te invitamos a participar en el piloto de registro completo, una solución de tu banco para facilitarte el proceso de alta en comercios online ¡Esperamos que te guste!</p>\n<p>Si es la primera vez que accedes a la demo, no olvides introducir tus datos en el apartado Configuración</p>",
                "button": {
                    "settings": "Configuración",
                    "go": "Comenzar"
                },
                "popupSettings": {
                    "title": "Error",
                    "description": "Por favor, para continuar completa tu información personal en <strong>configuración</strong>",
                    "accept": "Aceptar"
                }
            },
            "merchants": {
                "back": {
                    "title": "Back to home"
                },
                "search": {
                    "title": "Buscar un comercio"
                },
                "details": {
                    "title": "Ver detalle"
                },
                "button": {
                    "apply": "Registrarme"
                },
                "noResults": {
                    "title": "No results found"
                },
                "error": {
                    "title": "Error",
                    "description": "Para solicitar este servicio es necesario tener una tarjeta bancaria. Póngase en contacto con su banco para contratarlo."
                },
            },
            "merchantDetail": {
                "button": {
                    "back": "Volver",
                    "apply": "Registrarme"
                },
                "error": {
                    "title": "Error",
                    "description": "Para solicitar este servicio es necesario tener una tarjeta bancaria. Póngase en contacto con su banco para contratarlo."
                },
                "campaign": {
                    "title": "Available campaign"
                },
                "valid": {
                    "title": "Valid until"
                },
                "terms": {
                    "title": "Legal Terms and Conditions of the offer"
                }
            },
            "modal": {
                "button": {
                    "accept": "Aceptar",
                    "cancel": "Cancelar",
                    "try": "Intentar de nuevo"
                }
            },
            "enrollmentForm": {
                "title": "Registro",
                "step": "Paso 1 de 2",
                "description": "Valida la siguiente información personal:",
                "button": {
                    "back": "Volver",
                    "continue": "Continuar"
                },
                "privacy": {
                    "title": "Política de Privacidad",
                    "text": "Estoy de acuerdo con la"
                },
                "terms": {
                    "title": "Términos y Condiciones",
                    "text": "Estoy de acuerdo con los"
                },
                "additional": {
                    "title": "Condiciones Adicionales",
                    "text": "Estoy de acuerdo con las"
                }
            },
            "enrollmentPayment": {
                "title": "Método de pago",
                "step": "Paso 2 de 2",
                "description": "Selecciona un método de pago",
                "button": {
                    "back": "Volver",
                    "apply": "Registrarme"
                },
                "cvv": {
                    "title": "CVV",
                    "error": "CVV is not valid"
                },
                "additional": {
                    "title": "Condiciones Adicionales",
                    "text": "I agree to the"
                }
            },
            "verification": {
                "email": {
                    "title": "Verificación"
                },
                "button": {
                    "cancel": "Cancelar",
                    "verify": "Verificar"
                },
                "code": {
                    "title": "Código de verificación"
                },
                "check": {
                    "title": "Ya he validado mi cuenta"
                },
                "backModal": {
                    "description": "You will back to home. You will lost the registration of this merchant. Are your sure?",
                    "cancel": "Cancel",
                    "back": "Back"
                }
            },
            "congratulations": {
                "title": "Enhorabuena",
                "description": "El proceso de registro se ha completado correctamente.",
                "forget": {
                    "title": "y no olvides"
                },
                "button": {
                    "login": "Iniciar sesión"
                },
                "enjoy": {
                    "title": "¡Ir al sitio y disfrutar!"
                },
                "or": {
                    "title": "o"
                },
                "error": {
                    "noCard": {
                        "title": "To apply for this service it is necessary to have a bank card. Please, contact your bank to hire it."
                    }
                }
            },
            "error": {
                "title": "Error",
                "default": {
                    "description": "Something wents wrog. <br>Let´s give this another try."
                }
            },
            "merchantList": {
                "title": "E-comm Dynamics",
                "selectMerchants": "Select the merchants at which you would like to update your payment information. The process can take up to 24 hrs.",
                "updateAllMerchants": "Update all merchants",
                "addCardDescription": "Enter the card details of your previous card, select the merchants at which the card was registered and we will update your payment information. The process can take up to 24 hrs.",
                "addNewCard": "Add old Card",
                "searchMerchants": "Buscar un comercio",
                "scanNewCard": "Scan old card"
            }
        };
	}
	/* Default language translation */
}