export const MOCKED_CREATED_ORDER_RESPONSE = {
  data: {
    payment_uri:
      "bitcoin:tb1qncjspnmzcasn93tyxt7t9vwkkwkyk73m7kk2n3?amount=0.0000309&rbf=false",
    identifier: "616cb084-46fa-4d88-a310-117b0554b112",
    web_url: "https://paytest.bitnovo.com/46fa2943/",
    address: "tb1qncjspnmzcasn93tyxt7t9vwkkwkyk73m7kk2n3",
    tag_memo: "",
    input_currency: "BTC_TEST",
    expected_input_amount: 0.0000309,
    rate: 16181.23,
    notes: "Testing",
    reference: null,
    fiat: "EUR",
    language: "es"
  },
  status: 200,
  headers: {
    "access-control-allow-headers": "*",
    "access-control-allow-methods": "*",
    "access-control-allow-origin": "*",
    "access-control-expose-headers": "*",
    "access-control-max-age": "60",
    allow: "GET, POST, HEAD, OPTIONS",
    connection: "Keep-Alive",
    "content-length": "407",
    "content-type": "application/json",
    date: "Sat, 10 Feb 2024 21:16:16 GMT",
    "keep-alive": "timeout=5, max=100",
    "referrer-policy": "same-origin",
    server: "Apache/2.4.41 (Ubuntu)",
    vary: "Accept",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY"
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    },
    adapter: ["xhr", "http"],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "X-Device-Id": "db14c796-ba11-4dc1-a1ec-109b0fe5383c"
    },
    method: "post",
    url: "https://payments.pre-bnvo.com/api/v1/orders/",
    data: '{"expected_output_amount":0.5,"input_currency":"BTC_TEST","notes":"Testing"}'
  },
  request: {
    UNSENT: 0,
    OPENED: 1,
    HEADERS_RECEIVED: 2,
    LOADING: 3,
    DONE: 4,
    readyState: 4,
    status: 200,
    timeout: 0,
    withCredentials: true,
    upload: {},
    _aborted: false,
    _hasError: false,
    _method: "POST",
    _perfKey:
      "network_XMLHttpRequest_https://payments.pre-bnvo.com/api/v1/orders/",
    _response:
      '{"payment_uri":"bitcoin:tb1qncjspnmzcasn93tyxt7t9vwkkwkyk73m7kk2n3?amount=0.0000309&rbf=false","identifier":"616cb084-46fa-4d88-a310-117b0554b112","web_url":"https://paytest.bitnovo.com/46fa2943/","address":"tb1qncjspnmzcasn93tyxt7t9vwkkwkyk73m7kk2n3","tag_memo":"","input_currency":"BTC_TEST","expected_input_amount":3.09e-05,"rate":16181.23,"notes":"Testing","reference":null,"fiat":"EUR","language":"es"}',
    _url: "https://payments.pre-bnvo.com/api/v1/orders/",
    _timedOut: false,
    _trackingName: "unknown",
    _incrementalEvents: false,
    _performanceLogger: {
      _timespans: {
        "network_XMLHttpRequest_https://payments.pre-bnvo.com/api/v1/currencies":
          {
            startTime: 188446911.305875,
            endTime: 188447675.791541,
            totalTime: 764.4856660068035
          },
        "network_XMLHttpRequest_https://payments.pre-bnvo.com/api/v1/orders/": {
          startTime: 188862963.071291,
          endTime: 188870564.668541,
          totalTime: 7601.5972500145435
        }
      },
      _extras: {},
      _points: {
        initializeCore_start: 188298693.924666,
        initializeCore_end: 188298760.078041
      },
      _pointExtras: {},
      _closed: false,
      _isGlobalLogger: true
    },
    responseHeaders: {
      "Content-Type": "application/json",
      Server: "Apache/2.4.41 (Ubuntu)",
      "Referrer-Policy": "same-origin",
      "Keep-Alive": "timeout=5, max=100",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Expose-Headers": "*",
      "X-Content-Type-Options": "nosniff",
      Vary: "Accept",
      Allow: "GET, POST, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "60",
      "Access-Control-Allow-Origin": "*",
      Date: "Sat, 10 Feb 2024 21:16:16 GMT",
      "Content-Length": "407",
      Connection: "Keep-Alive",
      "X-Frame-Options": "DENY"
    },
    _requestId: null,
    _headers: {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json",
      "x-device-id": "db14c796-ba11-4dc1-a1ec-109b0fe5383c"
    },
    _responseType: "",
    _sent: true,
    _lowerCaseResponseHeaders: {
      "content-type": "application/json",
      server: "Apache/2.4.41 (Ubuntu)",
      "referrer-policy": "same-origin",
      "keep-alive": "timeout=5, max=100",
      "access-control-allow-methods": "*",
      "access-control-expose-headers": "*",
      "x-content-type-options": "nosniff",
      vary: "Accept",
      allow: "GET, POST, HEAD, OPTIONS",
      "access-control-allow-headers": "*",
      "access-control-max-age": "60",
      "access-control-allow-origin": "*",
      date: "Sat, 10 Feb 2024 21:16:16 GMT",
      "content-length": "407",
      connection: "Keep-Alive",
      "x-frame-options": "DENY"
    },
    _subscriptions: [],
    responseURL: "https://payments.pre-bnvo.com/api/v1/orders/"
  }
}
