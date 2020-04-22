import { COUNTRY_AND_CURRENCY_LOCAL_STORAGE } from "./LocalStorage.constants";
import { DEFAULT_CURRENCY } from "../Utils/Constants";
import isMobile from "./UserAgent";

const FB_TRACK = "track";
const LEAD = "Lead";
const VIEW_CONTENT = "ViewContent";
const ADD_TO_CART = "AddToCart";
const PURCHASE = "Purchase";
const TRACKCUSTOM = "trackCustom";
const SELL_CONTACTME = "sell_contactMe";
const SELL_SUBMISSION = "sell_submission";

function fbqLoadingDelay(track, eventName, value) {
  if (typeof fbq == "undefined") {
    setTimeout(() => {
      fbq(track, eventName, value);
    }, 5000);
  } else {
    fbq(track, eventName, value);
  }
}
function convertPrice(price, currencyList) {
  const countryObj =
    localStorage.getItem &&
    localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE) &&
    JSON.parse(localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE));
  let currencyObj;
  if (countryObj) {
    currencyObj =
      currencyList &&
      currencyList.currencies.find(items => {
        return items.currency == countryObj.currency;
      });
  }
  const finalPrice = Math.round(
    currencyObj && currencyObj.rate ? currencyObj.rate * price : price
  );
  return finalPrice;
}

export function fbSuccessfulRegistration() {
  if (typeof fbq == "undefined") {
    setTimeout(() => {
      fbq(FB_TRACK, LEAD);
    }, 5000);
  } else {
    fbq(FB_TRACK, LEAD);
  }
}

export function fbSppPageLoad(sppItem, currencyList) {
  const countryAndCurrency = localStorage.getItem(
    COUNTRY_AND_CURRENCY_LOCAL_STORAGE
  )
    ? JSON.parse(localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE))
    : {};
  const currency =
    countryAndCurrency && countryAndCurrency.currency
      ? countryAndCurrency.currency
      : DEFAULT_CURRENCY;
  fbqLoadingDelay(FB_TRACK, VIEW_CONTENT, {
    content_ids: sppItem.id,
    content_type: "product",
    value: convertPrice(sppItem.price_tlc, currencyList),
    currency: currency
  });
}

export function fbClickOnAddToCart(sppItem, currencyList) {
  const countryAndCurrency = localStorage.getItem(
    COUNTRY_AND_CURRENCY_LOCAL_STORAGE
  )
    ? JSON.parse(localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE))
    : {};
  const currency =
    countryAndCurrency && countryAndCurrency.currency
      ? countryAndCurrency.currency
      : DEFAULT_CURRENCY;
  fbqLoadingDelay(FB_TRACK, ADD_TO_CART, {
    content_name: "Shopping Cart",
    content_ids: sppItem.id,
    content_type: "product",
    value: convertPrice(sppItem.price_tlc, currencyList),
    currency: currency
  });
}

export function fbOnThanksPage(orderDetail, currencyList) {
  const countryAndCurrency = localStorage.getItem(
    COUNTRY_AND_CURRENCY_LOCAL_STORAGE
  )
    ? JSON.parse(localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE))
    : {};
  const currency =
    countryAndCurrency && countryAndCurrency.currency
      ? countryAndCurrency.currency
      : DEFAULT_CURRENCY;
  const productIds =
    orderDetail && orderDetail.order_product && orderDetail.order_product.map
      ? orderDetail.order_product.map((items, id) => {
          return {
            id: items.product.id
          };
        })
      : [];
  fbqLoadingDelay(FB_TRACK, PURCHASE, {
    content_ids: productIds,
    content_type: "product",
    value: convertPrice(orderDetail.sub_total, currencyList),
    currency: currency
  });
}

export function fbOnVipSubmission() {
  fbqLoadingDelay(TRACKCUSTOM, SELL_CONTACTME, {
    seller_type: "VIP",
    plateform: isMobile() ? "mobile" : "desktop"
  });
}

export function fbOnISItemSubmission(items, voucher_code) {
  const countryAndCurrency = localStorage.getItem(
    COUNTRY_AND_CURRENCY_LOCAL_STORAGE
  )
    ? JSON.parse(localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE))
    : {};
  const currency =
    countryAndCurrency && countryAndCurrency.currency
      ? countryAndCurrency.currency
      : DEFAULT_CURRENCY;
  fbqLoadingDelay(TRACKCUSTOM, SELL_SUBMISSION, {
    items: items,
    seller_type: "IS",
    voucher: voucher_code,
    currency: currency,
    plateform: isMobile() ? "mobile" : "desktop"
  });
}
