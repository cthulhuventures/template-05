import IP from 'ip'

interface IClick {
	userAgent?: string
	requestUrl?: string
	httpReferer?: string
	sessionId?: string
	pageType: string
}

interface ILead {
	sessionId: string
	firstName?: string
	lastName?: string
	companyName?: string
	address1?: string
	address2?: string
	zipCode?: string
	city?: string
	state?: string
	country?: string
	emailAddress?: string
	phoneNumber?: string
	affId?: string
	sourceValue1?: string
	sourceValue2?: string
	sourceValue3?: string
	orderNotes?: string
}

interface IUpsell {
	sessionId: string
	orderId: string
	productId: string
	cavv?: string
	xid?: string
	eci?: string
	acsTransId?: string
	threeDsStatus?: string
}

interface ICheckout {
	sessionId: string
	orderId: string
	address1: string
	postalCode: string
	city: string
	state: string
  country: string
	billShipSame: boolean
	cardMonth: string
	cardSecurityCode: string
	cardNumber: string
	cardYear: string
	product1_id: string
	product1_price?: string
	product1_qty?: string
	product2_id: string
	product2_price?: string
	product2_qty?: string
	product3_id: string
	product3_price?: string
	product3_qty?: string
	product4_id: string
	product4_price?: string
	product4_qty?: string
	shipAddress1?: string
	shipPostalCode?: string
	shipCity?: string
	shipState?: string
  shipCountry?: string
	shipFirstName?: string
	shipLastName?: string
	salesUrl?: string
	salesTax?: string
	firstName?: string
	lastName?: string
	emailAddress?: string
	phoneNumber?: string
	cavv?: string
	xid?: string
	eci?: string
	acsTransId?: string
	threeDsStatus?: string
	affId?: string
	sourceValue1?: string
	sourceValue2?: string
	sourceValue3?: string
	orderNotes?: string
	coupon?: string
}

interface IApiResponse {
	result: string
	message: any
}

interface ICartItem {
  productId: number,
  providerId: number,
  totalPrice: number,
  shippingPrice: number,
  productType: string,
  productName: string,
  productImage: string,
  productDescription: string;
  qty: number,
  retailPrice: number,
  unitPrice: string,
  savings: string,
  total: number
}

export class Api {
	baseUrl: string
	private campaignId?: string
	private redirectHost?: string

	constructor() {

		const service = process.env.SERVICE || import.meta.env.SERVICE || 'konnektive'
		const login = process.env.LOGIN || import.meta.env.LOGIN || 'P1api'
		const password = process.env.PASSWORD || import.meta.env.PASSWORD || 'etpxJ8Y8c9Q4'
		const campaignId = process.env.CAMPAIGN_ID || import.meta.env.CAMPAIGN_ID || '564'
		const redirectHost =
			process.env.REDIRECT_HOST || import.meta.env.REDIRECT_HOST || 'https://www.rossol.ca/'

		this.campaignId = campaignId
		this.redirectHost = redirectHost
		this.baseUrl = `https://api.${service}.com/{{methodUrl}}/?{{args}}&loginId=${login}&password=${password}`
	}

	public async importClick(request: IClick): Promise<IApiResponse> {
		const methodUrl = 'landers/clicks/import'
		const args = `pageType=${request.pageType}&campaignId=${this.campaignId}`
		let url = this.baseUrl.replace('{{methodUrl}}', methodUrl).replace('{{args}}', args)

		if (request.userAgent) {
			const userAgent = `&user_agent=${encodeURIComponent(request.userAgent)}`
			url = url.concat(userAgent)
		}

		if (request.requestUrl) {
			const requestUrl = `&requestUri=${encodeURIComponent(request.requestUrl)}`
			url = url.concat(requestUrl)
		}

		if (request.sessionId) {
			const sessionId = `&sessionId=${request.sessionId}`
			url = url.concat(sessionId)
		}

		if (request.httpReferer && request.httpReferer.indexOf('utm_') > -1) {
			const referer = `&httpReferer=${encodeURIComponent(request.httpReferer)}`
			url = url.concat(referer)
		}

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = await response.json()
		return data
	}

	public async orderConfirm(orderId: string): Promise<IApiResponse> {
		const methodUrl = 'order/confirm'
		const args = `orderId=${orderId}&campaignId=${this.campaignId}`
		let url = this.baseUrl.replace('{{methodUrl}}', methodUrl).replace('{{args}}', args)

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = await response.json()
		return data
	}

	public async getOrder(orderId: string, checkout: ICheckout, items: ICartItem[]): Promise<IApiResponse> {
    console.log('checkout', checkout)
		const methodUrl = 'order/query'
		const args = `orderId=${orderId}&campaignId=${this.campaignId}`
		let url = this.baseUrl.replace('{{methodUrl}}', methodUrl).replace('{{args}}', args)

    const getOrder = {
      "result": "SUCCESS",
      "message": {
          "totalResults": 1,
          "resultsPerPage": 25,
          "page": 1,
          "data": [
              {
                  "orderId": "23EC6A001E",
                  "clientOrderId": "23EC6A001E",
                  "shipCarrier": null,
                  "shipMethod": null,
                  "dateCreated": "2016-08-24 14:22:33",
                  "dateUpdated": "2016-08-24 14:22:33",
                  "orderType": "NEW_SALE",
                  "orderStatus": "COMPLETE",
                  "reviewStatus": null,
                  "totalAmount": "1.00",
                  "campaignName": "Widgets",
                  "customerId": 1266,
                  "name": checkout.firstName,
                  "emailAddress": checkout.emailAddress,
                  "phoneNumber": checkout.phoneNumber,
                  "firstName": checkout.shipFirstName,
                  "lastName": checkout.shipLastName,
                  "companyName": null,
                  "address1": checkout.address1,
                  "address2": null,
                  "city": checkout.city,
                  "state": checkout.state,
                  "country": checkout.country,
                  "postalCode": checkout.postalCode,
                  "shipFirstName": checkout.shipFirstName,
                  "shipLastName": checkout.shipLastName,
                  "shipCompanyName": null,
                  "shipAddress1": checkout.shipAddress1,
                  "shipAddress2": null,
                  "shipCity": checkout.shipCity,
                  "shipState": checkout.shipState,
                  "shipCountry": checkout.shipCountry,
                  "shipPostalCode": checkout.shipPostalCode,
                  "paySource": "CREDITCARD",
                  "cardType": "TESTCARD",
                  "cardLast4": "0000",
                  "cardExpiryDate": "2023-02-28 00:00:00",
                  "achRoutingNumber": null,
                  "achAccountNumber": null,
                  "couponCode": null,
                  "agentUserId": 3,
                  "price": "1.00",
                  "baseShipping": "0.00",
                  "voiceLogNumber": null,
                  "discountPrice": "0.00",
                  "salesTax": "0.00",
                  "shipUpcharge": null,
                  "shipProfileId": null,
                  "isDeclineSave": 1,
                  "ipAddress": null,
                  "sourceId": null,
                  "affId": null,
                  "sourceValue1": null,
                  "sourceValue2": null,
                  "sourceValue3": null,
                  "sourceValue4": null,
                  "sourceValue5": null,
                  "currencySymbol": "$",
                  "campaignId": 1,
                  "totalDiscount": "0.00",
                  "items": [],
              }
          ],
          "params": null,
          "errors": null,
          "sortBy": "dateCreated",
          "sortDir": 1,
          "queryArgs": {
              "page": 1,
              "sortDir": 1,
              "resultsPerPage": 25,
              "sortBy": "dateCreated",
              "orderId": "23EC6A001E",
              "dateRangeType": "dateCreated"
          },
          "clicks": 5
      }
  }

  if (items && items.length > 0) {
    const existingItems = getOrder.message.data[0].items as ICartItem[];
  
    // Adiciona os novos itens ao array existente
    items.forEach((item: ICartItem) => {
      existingItems.push(item); // Adiciona cada item ao final do array
    });
  }
  const mockApi = process.env.MOCK || import.meta.env.MOCK || true

  if (mockApi) {
    console.log('MOCK', getOrder.message.data[0])
    const response = new Response(JSON.stringify(getOrder), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()

    return data
  } else {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    return data
  }
	}

	public async importOrder(request: ICheckout): Promise<IApiResponse> {
		const method = 'order/import'
		const args =
			`&sessionId=${request.sessionId}&orderId=${request.orderId}&billShipSame=${
				request.billShipSame ? '0' : '1'
			}` +
			`&cardMonth=${request.cardMonth}&CVV=${request.cardSecurityCode}&cardSecurityCode=${request.cardSecurityCode}&cardNumber=${request.cardNumber}&cardYear=${request.cardYear}` +
			`&country=CA&paySource=CREDITCARD&campaignId=${this.campaignId}&redirectsTo=${this.redirectHost}ca/special/v1p/upsell1&errorRedirectsTo=${this.redirectHost}ca/special/v1p/checkout`

		let url = this.baseUrl.replace('{{methodUrl}}', method).replace('{{args}}', args)

		if (request.coupon && request.coupon.length > 0) {
			const coupon = `&couponCode=${request.coupon}`
			url = url.concat(coupon)
		}

		if (request.orderNotes && request.orderNotes.length > 0) {
			const orderNotes = `&custom_order_notes=${request.orderNotes}`
			url = url.concat(orderNotes)
		}

		if (request.product1_id) {
			const product1_id = `&product1_id=${request.product1_id}`
			url = url.concat(product1_id)
		}

		if (request.product1_price) {
			const product1_price = `&product1_price=${request.product1_price}`
			url = url.concat(product1_price)
		}

		if (request.product1_qty) {
			const product1_qty = `&product1_qty=${request.product1_qty}`
			url = url.concat(product1_qty)
		}

		if (request.product2_id) {
			const product2_id = `&product2_id=${request.product2_id}`
			url = url.concat(product2_id)
		}

		if (request.product2_price) {
			const product2_price = `&product2_price=${request.product2_price}`
			url = url.concat(product2_price)
		}

		if (request.product2_qty) {
			const product2_qty = `&product2_qty=${request.product2_qty}`
			url = url.concat(product2_qty)
		}

		if (request.product3_id) {
			const product3_id = `&product3_id=${request.product3_id}`
			url = url.concat(product3_id)
		}

		if (request.product3_price) {
			const product3_price = `&product3_price=${request.product3_price}`
			url = url.concat(product3_price)
		}

		if (request.product3_qty) {
			const product3_qty = `&product3_qty=${request.product3_qty}`
			url = url.concat(product3_qty)
		}

		if (request.product4_id) {
			const product4_id = `&product4_id=${request.product4_id}`
			url = url.concat(product4_id)
		}

		if (request.product4_price) {
			const product4_price = `&product4_price=${request.product4_price}`
			url = url.concat(product4_price)
		}

		if (request.product4_qty) {
			const product4_qty = `&product4_qty=${request.product4_qty}`
			url = url.concat(product4_qty)
		}

		if (request.address1 && request.address1.length > 0) {
			const address1 = `&address1=${request.address1}`
			url = url.concat(address1)
		}

		if (request.postalCode && request.postalCode.length > 0) {
			const postalCode = `&postalCode=${request.postalCode}`
			url = url.concat(postalCode)
		}

		if (request.city && request.city.length > 0) {
			const city = `&city=${request.city}`
			url = url.concat(city)
		}

		if (request.state && request.state.length > 0) {
			const state = `&state=${request.state}`
			url = url.concat(state)
		}

		if (request.billShipSame) {
			const billShipSame = `&billShipSame=${request.billShipSame ? '1' : '0'}`
			url = url.concat(billShipSame)
		}

		if (request.cardMonth) {
			const cardMonth = `&cardMonth=${request.cardMonth}`
			url = url.concat(cardMonth)
		}

		if (request.emailAddress && request.emailAddress.length > 0) {
			const emailAddress = `&emailAddress=${request.emailAddress}`
			url = url.concat(emailAddress)
		}

		if (request.phoneNumber && request.phoneNumber.length > 0) {
			const phoneNumber = `&phoneNumber=${request.phoneNumber}`
			url = url.concat(phoneNumber)
		}

		if (request.firstName) {
			const firstName = `&firstName=${request.firstName}`
			url = url.concat(firstName)
		}

		if (request.lastName) {
			const lastName = `&lastName=${request.lastName}`
			url = url.concat(lastName)
		}

		if (request.shipAddress1) {
			const shipAddress1 = `&shipAddress1=${request.shipAddress1}`
			url = url.concat(shipAddress1)
		}

		if (request.shipPostalCode) {
			const shipPostalCode = `&shipPostalCode=${request.shipPostalCode}`
			url = url.concat(shipPostalCode)
		}

		if (request.shipCity) {
			const shipCity = `&shipCity=${request.shipCity}`
			url = url.concat(shipCity)
		}

		if (request.shipState) {
			const shipState = `&shipState=${request.shipState}&shipCountry=CA`
			url = url.concat(shipState)
		}

		if (request.shipFirstName) {
			const shipFirstName = `&shipFirstName=${request.shipFirstName}`
			url = url.concat(shipFirstName)
		}

		if (request.shipLastName) {
			const shipLastName = `&shipLastName=${request.shipLastName}`
			url = url.concat(shipLastName)
		}

		if (request.salesTax) {
			const salesTax = `&salesTax=${request.salesTax}`
			url = url.concat(salesTax)
		}

		if (request.product1_price) {
			const product1_price = `&product1_price=${request.product1_price}`
			url = url.concat(product1_price)
		}

		if (request.salesUrl) {
			const salesUrl = `&salesUrl=${encodeURIComponent(
				request.salesUrl
			)}&requestUri=${encodeURIComponent(request.salesUrl)}`
			url = url.concat(salesUrl)
		}

		if (request.cavv) {
			const cavv = `&cavv=${encodeURIComponent(request.cavv)}`
			url = url.concat(cavv)
		}

		if (request.xid) {
			const xid = `&xid=${request.xid}`
			url = url.concat(xid)
		}

		if (request.eci) {
			const eci = `&eci=${request.eci}`
			url = url.concat(eci)
		}

		if (request.acsTransId) {
			const acsTransId = `&acsTransId=${request.acsTransId}`
			url = url.concat(acsTransId)
		}

		if (request.threeDsStatus) {
			const threeDsStatus = `&threeDsStatus=${request.threeDsStatus}`
			url = url.concat(threeDsStatus)
		}

		if (request.affId?.length) {
			const affId = `&affId=${request.affId}`
			url = url.concat(affId)
		}

		if (request.sourceValue1?.length) {
			const sourceValue1 = `&sourceValue1=${request.sourceValue1}`
			url = url.concat(sourceValue1)
		}

		if (request.sourceValue2?.length) {
			const sourceValue2 = `&sourceValue2=${request.sourceValue2}`
			url = url.concat(sourceValue2)
		}

		if (request.sourceValue3?.length) {
			const sourceValue3 = `&sourceValue3=${request.sourceValue3}`
			url = url.concat(sourceValue3)
		}

		const ip = IP.address()
		if (ip) {
			const ipAddress = `&ipAddress=${ip}`
			url = url.concat(ipAddress)
		}

		const cardType = this.getCardType(request.cardNumber)
		if (cardType && cardType.length > 0) {
			const cardTypeParam = `&cardType=${cardType}`
			url = url.concat(cardTypeParam)
		}

		const mockResponse = {
      result: 'SUCCESS',
      message: {
        orderId: '23EC6A001E',
        sourceId: null,
        sourceValue1: null,
        sourceValue2: null,
        sourceValue3: null,
        shipCarrier: 'Default',
        shipMethod: 'Default',
        dateCreated: '2014-09-09 15:28:24',
        orderType: 'NEW_SALE',
        orderStatus: 'COMPLETE',
        reviewStatus: null,
        totalAmount: '4.99',
        campaignName: 'Miraclear-Phone',
        customerId: 3629,
        name: request.firstName,
        emailAddress: request.emailAddress,
        phoneNumber: request.phoneNumber,
        firstName: request.firstName,
        lastName: request.lastName,
        companyName: null,
        address1: request.address1,
        address2: request.shipAddress1,
        city: request.city,
        state: request.state,
        country: request.shipState,
        postalCode: request.postalCode,
        shipFirstName: request.shipFirstName,
        shipLastName: request.shipLastName,
        shipCompanyName: null,
        shipAddress1: request.shipAddress1,
        shipAddress2: request.shipAddress1,
        shipCity: request.shipCity,
        shipState: request.shipState,
        shipCountry: request.shipState,
        shipPostalCode: request.shipPostalCode,
        paySource: 'CREDITCARD',
        cardType: 'VISA',
        cardLast4: '1234',
        cardExpiryDate: request.cardMonth,
        achRoutingNumber: null,
        achAccountNumber: null,
        couponCode: null,
        agentUserId: null,
        basePrice: '0.00',
        baseShipping: '4.99',
        voiceLogNumber: null,
        discountPrice: '0.00',
        salesTax: '0.00',
        shipUpcharge: '0.00',
        shipProfileId: null,
        currencySymbol: '$',
        campaignId: 13,
        amountPaid: '4.99',
        totalDiscount: '0.00',
        items: [],
      }
    };
    const mockApi = process.env.MOCK || import.meta.env.MOCK || true
    //para push
    if (mockApi) {
      const response = new Response(JSON.stringify(mockResponse), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      return data
    } else {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      const data = await response.json()
      return data
    }
	}

	public async importUpsell(request: IUpsell): Promise<IApiResponse> {
		const method = 'upsale/import'
		const args = `&pageType=upsellPage1&orderId=${request.orderId}&productId=${request.productId}&redirectsTo=${this.redirectHost}ca/special/v1p/thankyou&errorRedirectsTo=${this.redirectHost}ca/special/v1p/upsell1`

		let url = this.baseUrl.replace('{{methodUrl}}', method).replace('{{args}}', args)

		if (request.cavv) {
			const cavv = `&cavv=${encodeURIComponent(request.cavv)}`
			url = url.concat(cavv)
		}

		if (request.xid) {
			const xid = `&xid=${request.xid}`
			url = url.concat(xid)
		}

		if (request.eci) {
			const eci = `&eci=${request.eci}`
			url = url.concat(eci)
		}

		if (request.acsTransId) {
			const acsTransId = `&acsTransId=${request.acsTransId}`
			url = url.concat(acsTransId)
		}

		if (request.threeDsStatus) {
			const threeDsStatus = `&threeDsStatus=${request.threeDsStatus}`
			url = url.concat(threeDsStatus)
		}
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		const data = await response.json()
		return data
	}

	public async importLead(request: ILead): Promise<IApiResponse> {
		const methodUrl = 'leads/import'
		const args =
			`pageType=leadPage&sessionId=${request.sessionId}` +
			`&firstName=${request.firstName}` +
			`&lastName=${request.lastName}` +
			`&companyName${request.companyName}` +
			`&emailAddress=${request.emailAddress || ''}` +
			`&postalCode=${request.zipCode || ''}` +
			`&city=${request.city || ''}` +
			`&state=${request.state || ''}` +
			`&country=${request.country || 'CA'}` +
			`&phoneNumber=${request.phoneNumber || ''}` +
			`&address1=${request.address2 || ''}` +
			`&address1=${request.address2 || ''}` +
			`&campaignId=${this.campaignId}` +
			`&custom1=${request.orderNotes}`

		let url = this.baseUrl.replace('{{methodUrl}}', methodUrl).replace('{{args}}', args)

		if (request.affId?.length) {
			const affId = `&affId=${request.affId}`
			url = url.concat(affId)
		}

		if (request.sourceValue1?.length) {
			const sourceValue1 = `&sourceValue1=${request.sourceValue1}`
			url = url.concat(sourceValue1)
		}

		if (request.sourceValue2?.length) {
			const sourceValue2 = `&sourceValue2=${request.sourceValue2}`
			url = url.concat(sourceValue2)
		}

		if (request.sourceValue3?.length) {
			const sourceValue3 = `&sourceValue3=${request.sourceValue3}`
			url = url.concat(sourceValue3)
		}

		const importLead = {
      "result": "SUCCESS",
      "message": {
        "billShipSame": false,
        "customTaxSet": false,
        "shipmentInsured": false,
        "firstName": request.firstName,
        "lastName": request.lastName,
        "companyName": null,
        "address1": request.address1,
        "address2": request.address2,
        "city": request.city,
        "state": request.state,
        "country": request.country,
        "postalCode": request.zipCode,
        "shipFirstName": request.firstName,
        "shipLastName": request.lastName,
        "shipCompanyName": null,
        "shipAddress1": request.address1,
        "shipAddress2": request.address2,
        "shipCity": request.city,
        "shipState": request.state,
        "shipCountry": request.country,
        "shipPostalCode": request.zipCode,
        "emailAddress": request.emailAddress,
        "phoneNumber": request.phoneNumber,
        "campaignId": 13,
        "orderStatus": "PARTIAL",
        "orderType": "NEW_SALE",
        "agentUserId": 3137,
        "dateCreated": {
          "date": "2015-01-16 12:20:49.000000",
          "timezone_type": 3,
          "timezone": "America/New_York"
        },
        "customerId": 46611,
        "dateUpdated": "2015-01-16 12:20:49",
        "orderId": '23EC6A001E',
      }
    }

    const mockApi = process.env.MOCK || import.meta.env.MOCK || true


		if (mockApi) {
      const response = new Response(JSON.stringify(importLead), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      return data
    } else {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      const data = await response.json()
      return data
    }
	}

	public async getPrice(campaignId?: string): Promise<IApiResponse> {
		const methodUrl = 'campaign/query'
		const args = `&campaignId=${campaignId || this.campaignId || ''}`
		let url = this.baseUrl.replace('{{methodUrl}}', methodUrl).replace('{{args}}', args)

		const productsMock = {
      "result": "SUCCESS",
      "message": {
        "1": {
          productId: 1,
          providerId: 2933,
          totalPrice: 69.95,
          shippingPrice: 9.00,
          productType: 'type',
          productName: 'BOOST WAIST 1 BOTTLE',
          productImage: '/imgs/1bottle.png',
          productDescription:
            "The key to unlocking your body's full fat-burning potential and achieving your weight loss goals with ease!",
          qty: 1,
          retailPrice: 89.95,
          unitPrice: '69.95',
          savings: '0.00',
          total: 69.95
        },
        "2": {
          productId: 2,
          providerId: 2934,
          totalPrice: 95.95,
          shippingPrice: 0,
          productType: 'type',
          productName: 'BOOST WAIST 2 BOTTLES',
          productImage: '/imgs/2bottle.png',
          productDescription:
            "The key to unlocking your body's full fat-burning potential and achieving your weight loss goals with ease!",
          qty: 1,
          retailPrice: 119.95,
          unitPrice: '95.95',
          savings: '0.00',
			    total: 95.95
        },
        "3": {
          productId: 3,
          providerId: 2935,
          totalPrice: 135.95,
          shippingPrice: 0,
          productType: 'type',
          productName: 'BOOST WAIST 3 BOTTLES',
          productImage: '/imgs/3bottle.png',
          productDescription:
            "The key to unlocking your body's full fat-burning potential and achieving your weight loss goals with ease!",
          qty: 1,
          retailPrice: 155.95,
          unitPrice: '135.95',
          savings: '179.90',
          total: 135.95
        },
        "4": {
          productId: 4,
          providerId: 2936,
          totalPrice: 39.95,
          shippingPrice: 0,
          productType: 'type',
          productName: 'GREEN COFFEE 1 BOTTLE',
          productImage: '/imgs/greenCoffee.png',
          productDescription:
            'Revitalize your routine with our Green Coffee Supplement – natural energy, weight support, and antioxidant boost in one!',
          qty: 1,
          retailPrice: 49.95,
          unitPrice: '39.95',
          savings: '39.95',
          total: 39.95
        }
      }
    }

    const mockApi = process.env.MOCK || import.meta.env.MOCK || true


		if (mockApi) {
      const response = new Response(JSON.stringify(productsMock), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      return data
    } else {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      const data = await response.json()
      return data
    }
	}

	public getCardType(number: string): string {
    if (import.meta.env.MOCK) {
      return 'Mock'
    };
		// visa
		let re = new RegExp('^4')
		if (number.match(re) != null) return 'VISA'

		// Mastercard
		// Updated for Mastercard 2017 BINs expansion
		if (
			/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
				number
			)
		)
			return 'MASTERCARD'

		// AMEX
		re = new RegExp('^3[47]')
		if (number.match(re) != null) return 'AMEX'

		// Discover
		re = new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)')
		if (number.match(re) != null) return 'DISCOVER'

		// Diners
		re = new RegExp('^36')
		if (number.match(re) != null) return 'DINERS'

		// Diners - Carte Blanche
		re = new RegExp('^30[0-5]')
		if (number.match(re) != null) return 'DINERS'

		// JCB
		re = new RegExp('^35(2[89]|[3-8][0-9])')
		if (number.match(re) != null) return 'JCB'

		// Visa Electron
		re = new RegExp('^(4026|417500|4508|4844|491(3|7))')
		if (number.match(re) != null) return 'VISA'

		return ''
	}
}
