export const mockMerchantList = [{
    "merchantType": "mobile",
    "merchants": [{
        "cdMerchantId": 1,
        "merchantDetails": {
          "emailVerification": false,
          "enrollmentShort": "Lorem ipsum",
          "enrollmentTitle": "Lorem ipsum",
          "merchantBrand": "Zity",
          "merchantDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget iaculis purus. Vivamus dignissim malesuada elit nec tincidunt. Nam luctus velit ac tortor gravida, non molestie nisi fringilla. Donec a tincidunt nisi. Maecenas lacinia ultricies odio, dapibus hendrerit risus laoreet a.",
          "merchantLogo": "https://via.placeholder.com/100",
          "paymentMethod": 3,
          "phoneVerification": false,
          "privacyPolicy": "https://www.google.es",
          "termsConditions": "https://www.google.es",
          "androidStoreUrl": "https://play.google.com/store/apps/details?id=com.mo2o.balearia&gl=ES",
          "iOSStoreUrl": "https://apps.apple.com/es/app/bale%C3%A0ria-reserva-tu-viaje/id476264273",
          "webUrl": "https://www.balearia.com/es/reservar"
        },
        "form": [{
            // none -> 400, existingUsernameWithPayment -> 409, existingUsername -> 409, validValue -> 200
            "dataType": "text",
            "inputName": "testCase",
            "issuerFieldsName": "testCase",
            "label": "Test",
            "toolTip": "Test case"
          },
          {
            "dataType": "text",
            "inputName": "email",
            "issuerFieldsName": "email",
            "label": "Email",
            "regexValidation": "^[a-zA-Z0-9.!#$%&\"*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
            "toolTip": "Email should be correct"
          },
          {
            "dataType": "password",
            "inputName": "password",
            "issuerFieldsName": "password",
            "label": "Password",
            "toolTip": "Password should contain at least two numbers, a special char and be between 4-60 chars"
          },
          {
            "dataType": "dropdown",
            "dropDown": "Spain,Portugal",
            "inputName": "country",
            "issuerFieldsName": "country",
            "label": "Country"
          },
          {
            "dataType": "number",
            "inputName": "age",
            "issuerFieldsName": "age",
            "label": "Age",
            "regexValidation": "^[0-9][0-9]*$",
            "toolTip": "Age should be between 18-99"
          }
        ],
        "promotions": [{
            "promoId": 1,
            "offerDetails": "Register now through our app and get 2 months free subscription to enjoy all the premium services.",
            "offerTerms": "https://www.google.es"
          },
          {
            "promoId": 5,
            "offerDetails": "Register now through our app and get 3 months free subscription to enjoy all the premium services.",
            "offerTerms": "https://www.google.es"
          }
        ]
      },
      {
        "cdMerchantId": 3,
        "merchantDetails": {
          "emailVerification": false,
          "enrollmentShort": "Lorem ipsum",
          "enrollmentTitle": "Lorem ipsum",
          "merchantBrand": "Netflix",
          "merchantDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget iaculis purus. Vivamus dignissim malesuada elit nec tincidunt. Nam luctus velit ac tortor gravida, non molestie nisi fringilla. Donec a tincidunt nisi. Maecenas lacinia ultricies odio, dapibus hendrerit risus laoreet a.",
          "merchantLogo": "https://via.placeholder.com/100",
          "paymentMethod": 3,
          "phoneVerification": false,
          "privacyPolicy": "https://www.google.es",
          "termsConditions": "https://www.google.es",
          "androidStoreUrl": "https://play.google.com/store/apps/details?id=com.mo2o.balearia&gl=ES",
          "iOSStoreUrl": "https://apps.apple.com/es/app/bale%C3%A0ria-reserva-tu-viaje/id476264273",
          "webUrl": "https://www.balearia.com/es/reservar"
        },
        "form": [{
            "dataType": "text",
            "inputName": "username",
            "issuerFieldsName": "username",
            "label": "Name",
            "toolTip": "Name should be correct"
          },
          {
            "dataType": "text",
            "inputName": "password",
            "issuerFieldsName": "password",
            "label": "Password",
            "toolTip": "Password should be correct"
          }
        ],
        "promotions": [
          {
            "promoId": 2,
            "offerDetails": "Register now through our app and get 1 months free subscription to enjoy all the premium services.",
            "offerTerms": "https://www.google.es"
          }
        ]
      },
      {
        "cdMerchantId": 5,
        "merchantDetails": {
          "emailVerification": false,
          "enrollmentShort": "Lorem ipsum",
          "enrollmentTitle": "Lorem ipsum",
          "merchantBrand": "Uber",
          "merchantDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget iaculis purus. Vivamus dignissim malesuada elit nec tincidunt. Nam luctus velit ac tortor gravida, non molestie nisi fringilla. Donec a tincidunt nisi. Maecenas lacinia ultricies odio, dapibus hendrerit risus laoreet a.",
          "merchantLogo": "https://via.placeholder.com/100",
          "paymentMethod": 3,
          "phoneVerification": false,
          "privacyPolicy": "https://www.google.es",
          "termsConditions": "https://www.google.es",
          "androidStoreUrl": "https://play.google.com/store/apps/details?id=com.mo2o.balearia&gl=ES",
          "iOSStoreUrl": "https://apps.apple.com/es/app/bale%C3%A0ria-reserva-tu-viaje/id476264273",
          "webUrl": "https://www.balearia.com/es/reservar"
        },
        "form": [{
          "dataType": "text",
          "inputName": "email",
          "issuerFieldsName": "email",
          "label": "Email"
        }],
        "promotions": []
      }
    ]
  },
  {
    "merchantType": "entertainment",
    "merchants": [{
        "cdMerchantId": 1,
        "merchantDetails": {
          "emailVerification": false,
          "enrollmentShort": "Lorem ipsum",
          "enrollmentTitle": "Lorem ipsum",
          "merchantBrand": "Zity",
          "merchantDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget iaculis purus. Vivamus dignissim malesuada elit nec tincidunt. Nam luctus velit ac tortor gravida, non molestie nisi fringilla. Donec a tincidunt nisi. Maecenas lacinia ultricies odio, dapibus hendrerit risus laoreet a.",
          "merchantLogo": "https://via.placeholder.com/100",
          "paymentMethod": 1,
          "phoneVerification": false,
          "privacyPolicy": "https://www.google.es",
          "termsConditions": "https://www.google.es",
          "androidStoreUrl": "https://play.google.com/store/apps/details?id=com.mo2o.balearia&gl=ES",
          "iOSStoreUrl": "https://apps.apple.com/es/app/bale%C3%A0ria-reserva-tu-viaje/id476264273",
          "webUrl": "https://www.balearia.com/es/reservar"
        },
        "form": [{
            "dataType": "text",
            "inputName": "email",
            "issuerFieldsName": "email",
            "label": "Email",
            "regexValidation": "^[a-zA-Z0-9.!#$%&\"*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
            "toolTip": "Email should be correct"
          },
          {
            "dataType": "password",
            "inputName": "password",
            "issuerFieldsName": "password",
            "label": "Password",
            "toolTip": "Password should contain at least two numbers, a special char and be between 4-60 chars"
          },
          {
            "dataType": "dropdown",
            "dropDown": "Spain,Portugal",
            "inputName": "country",
            "issuerFieldsName": "country",
            "label": "Country"
          },
          {
            "dataType": "number",
            "inputName": "age",
            "issuerFieldsName": "age",
            "label": "Age",
            "regexValidation": "^[0-9][0-9]*$",
            "toolTip": "Age should be between 18-99"
          }
        ],
        "promotions": [{
            "promoId": 3,
            "offerDetails": "Register now through our app and get 2 months free subscription to enjoy all the premium services.",
            "offerTerms": "https://www.google.es"
          }
        ]
      },
      {
        "cdMerchantId": 3,
        "merchantDetails": {
          "emailVerification": false,
          "enrollmentShort": "Lorem ipsum",
          "enrollmentTitle": "Lorem ipsum",
          "merchantBrand": "Netflix",
          "merchantDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget iaculis purus. Vivamus dignissim malesuada elit nec tincidunt. Nam luctus velit ac tortor gravida, non molestie nisi fringilla. Donec a tincidunt nisi. Maecenas lacinia ultricies odio, dapibus hendrerit risus laoreet a.",
          "merchantLogo": "https://via.placeholder.com/100",
          "paymentMethod": 3,
          "phoneVerification": false,
          "privacyPolicy": "https://www.google.es",
          "termsConditions": "https://www.google.es"
        },
        "form": [{
          "dataType": "text",
          "inputName": "email",
          "issuerFieldsName": "email",
          "label": "Email"
        }],
        "promotions": []
      },
      {
        "cdMerchantId": 5,
        "merchantDetails": {
          "emailVerification": false,
          "enrollmentShort": "Lorem ipsum",
          "enrollmentTitle": "Lorem ipsum",
          "merchantBrand": "Uber",
          "merchantDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget iaculis purus. Vivamus dignissim malesuada elit nec tincidunt. Nam luctus velit ac tortor gravida, non molestie nisi fringilla. Donec a tincidunt nisi. Maecenas lacinia ultricies odio, dapibus hendrerit risus laoreet a.",
          "merchantLogo": "https://via.placeholder.com/100",
          "paymentMethod": 3,
          "phoneVerification": false,
          "privacyPolicy": "https://www.google.es",
          "termsConditions": "https://www.google.es"
        },
        "form": [{
          "dataType": "text",
          "inputName": "email",
          "issuerFieldsName": "email",
          "label": "Email"
        }],
        "promotions": [
          {
            "promoId": 4,
            "offerDetails": "Register now through our app and get 1 months free subscription to enjoy all the premium services.",
            "offerTerms": "https://www.google.es"
          }
        ]
      }
    ]
  }
];
