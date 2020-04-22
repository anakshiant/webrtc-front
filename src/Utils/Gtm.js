import { COUNTRY_AND_CURRENCY_LOCAL_STORAGE } from "./LocalStorage.constants";
import {
  DEFAULT_CURRENCY,
  DEFAULT_COUNTRY_CODE,
  USER_DETAIL_COOKIE,
  GA_PAGE_NAME,
  MOBILE_PLATFORM
} from "./Constants";
import { isArabicLanguageUrl } from "./UserAgent";
import { getCookie } from "./Cookies";

export const MAIN_BANNER_GTM = "main_banner";
export const GENERAL_COLLECTIONS_GTM = "general_collections";
export const CATEGORY_COLLECTIONS_GTM = "category_collections";
export const PROMOTIONAL_BLOG = "promotional_blog";
// ------------***************---------------------
// ------------***************---------------------
//       Here we need to define unique
//       constant which is given in requirement
//       event tracking
// ------------***************---------------------
// ------------***************---------------------
const GTM_MEN_CLICK_EVENT_ID = "Men";
const GTM_WOMEN_CLICK_EVENT_ID = "Women";
const GTM_SALE_CLICK_EVENT_ID = "Sale";
const GTM_BANNER_CLICK_EVENT_ID = "Banner click event";
const GTM_SHOP_NOW_CLICK_EVENT_ID = "Shop now";
const GTM_WISHLIST_CLICK_EVENT_ID = "addToWishlist";
const GTM_REMOVE_WISHLIST_CLICK_EVENT_ID = "removeFromWishlist";
const GTM_ADD_TO_CART = "addToCart";
const GTM_REMOVE_FROM_CART = "removeFromCart";
const GTM_ON_CART = "onCart";
const GTM_CHECKOUT = "checkout";
const GTM_CHECKOUT_OPTION = "checkoutOption";
const GTM_EDITORS_CLICK_EVENT_ID = "EditiorsChoice";
const GTM_PRODUCT_CLICK_EVENT_ID = "productClick";
const PROMO_CLICK = "promoClick";
const GTM_SEND_PRODUCT_IMPRESSION_DATA = "sendProductImpressionData";
const GTM_PROMO_IMPRESSIONS_ON_PAGE_LOAD = "sendPromotionImpression";
const MY_ITEM_BUYER_OFFER = "myitems_buyerOffer";
const MY_ITEM_QUOTATION = "myitems_quotation";
const MY_ITEM_PRICE_REDUCTION = "myitems_priceReduction";
const MY_ITEM_REQUEST_PAYMENT = "myitems_requestPayment";
const MY_ITEM_SELLSUBMISSION = "sell_submission";
const GTM_LOGIN_TRACKING = "gtm_login_tracking";
const GTM_SOCIAL_REGISTRATION = "gtm_fb_registration_tracking";
const GTM_NORMAL_REGISTER = "gtm_registration_tracking";
const SEND_SPP_DATA = "sendSPPData";
const LOAD_THIRD_PARTY_TAG = "loadThirdPartyTag";
const SITE_TYPE = "new";
const PAGEVIEW = "pageview";
const PRODUCT_VIEW = "productView";
const GTM_TOP_NAVIGATION_BAR = "topNavigationBar";

// Global Event call on page load
export function globalPageLoad(pageType) {
  const countryAndCurrency =
    localStorage.getItem &&
    localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE)
      ? JSON.parse(localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE))
      : {};
  const currency =
    countryAndCurrency && countryAndCurrency.currency
      ? countryAndCurrency.currency
      : DEFAULT_CURRENCY;
  const countryCode =
    countryAndCurrency && countryAndCurrency.country_code
      ? countryAndCurrency.country_code
      : DEFAULT_COUNTRY_CODE;
  const userDetailsCookie = getCookie(USER_DETAIL_COOKIE);
  if (typeof dataLayer === "undefined") {
    return true;
  }
  dataLayer.push({
    site_design_2019: SITE_TYPE,
    countryCode: countryCode,
    uEmail: "",
    uID:
      userDetailsCookie && JSON.parse(userDetailsCookie)
        ? JSON.parse(userDetailsCookie).information.user_id
        : "",
    language: isArabicLanguageUrl(window.location.pathname)
      ? "Arabic"
      : "English",
    currency: currency,
    pageType: pageType
  });
}

// Top Nav bar
export function gtmOnTopNavigationBar(selectedTab) {
  const countryAndCurrency =
    localStorage.getItem &&
    localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE)
      ? JSON.parse(localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE))
      : {};
  const countryCode =
    countryAndCurrency && countryAndCurrency.country_code
      ? countryAndCurrency.country_code
      : DEFAULT_COUNTRY_CODE;
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_TOP_NAVIGATION_BAR,
      countryCode: countryCode,
      tab: selectedTab
    });
  }
}

export function gtmPageView(path, title) {
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE
    });
  }
}

// Home Page Events
export function gtmClickOnMen() {
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_MEN_CLICK_EVENT_ID
    });
  }
}

export function gtmClickOnWomen() {
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_WOMEN_CLICK_EVENT_ID
    });
  }
}

export function gtmClickOnSale() {
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_SALE_CLICK_EVENT_ID
    });
  }
}

export function gtmClickOnShopNow() {
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_SHOP_NOW_CLICK_EVENT_ID
    });
  }
}
export function gtmClickOnBanner(bannerID, position, name, creative) {
  if (typeof dataLayer != "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: PROMO_CLICK,
      ecommerce: {
        promoClick: {
          promotions: [
            {
              id: bannerID,
              name: name,
              creative: creative,
              position: position + 1
            }
          ]
        }
      }
    });
  }
}

export function gtmProductImpressionsOnMpp(products) {
  if (typeof dataLayer === "undefined") {
    return true;
  }
  const productsArray =
    products && products.map
      ? products.map((product, id) => {
          return {
            name: product.name,
            id: `${product.id}`,
            price: product.price_tlc,
            brand: product.brand_name,
            category: product.category_level_two_name,
            variant: product.colour_name,
            position: id + 1,
            quantity: 1,
            list: product.category_level_two_name
          };
        })
      : [];
  dataLayer.push({
    site_design_2019: SITE_TYPE,
    event: GTM_SEND_PRODUCT_IMPRESSION_DATA,
    ecommerce: {
      currencyCode: "USD",
      impressions: productsArray
    }
  });
}

export function gtmProductImpressionsPageLoad(products, list) {
  if (typeof dataLayer === "undefined") {
    return true;
  }
  const productsArray =
    products && products.map
      ? products.map((product, id) => {
          return {
            name: product.name,
            id: `${product.id}`,
            price: product.price_tlc,
            brand: product.brand_name,
            category: product.category_level_two_name,
            variant: product.colour_name,
            position: id + 1,
            quantity: 1,
            list: list
          };
        })
      : [];
  dataLayer.push({
    site_design_2019: SITE_TYPE,
    event: GTM_SEND_PRODUCT_IMPRESSION_DATA,
    ecommerce: {
      currencyCode: "USD",
      impressions: productsArray
    }
  });
}

export function gtmPromoImpressionsPageLoad(promo) {
  if (typeof dataLayer === "undefined") {
    return true;
  }
  const promosArray =
    promo && promo.map
      ? promo.map((promoItem, id) => {
          return {
            id: promoItem.id,
            name: promoItem.name,
            creative: "creative",
            position: id + 1
          };
        })
      : [];
  dataLayer.push({
    site_design_2019: SITE_TYPE,
    event: GTM_PROMO_IMPRESSIONS_ON_PAGE_LOAD,
    ecommerce: {
      promoView: {
        promotions: promosArray
      }
    }
  });
}

// Product Click event
export function gtmClickOnProduct(product) {
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_PRODUCT_CLICK_EVENT_ID,
      ecommerce: {
        currencyCode: "USD",
        click: {
          actionField: { list: product.pageName },
          products: [
            {
              name: product.name,
              id: `${product.id}`,
              price: product.price,
              brand: product.brandName,
              category: product.category,
              variant: product.variant,
              quantity: 1
            }
          ]
        }
      }
    });
  }
}

//Spp Event
export function gtmOnSppPageLoad(productDetails) {
  if (typeof dataLayer != "undefined") {
    const pageName = getCookie(GA_PAGE_NAME);
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: PRODUCT_VIEW,
      ecommerce: {
        currencyCode: "USD",
        detail: {
          actionField: { list: pageName ? pageName : "Direct SPP" },
          products: [
            {
              name: productDetails.name,
              id: productDetails.id,
              price: productDetails.price_tlc,
              brand: productDetails.brand_name,
              category: productDetails.category_level_one_name,
              variant: productDetails.colour_name,
              quantity: 1
            }
          ]
        }
      }
    });
  }
}

export function gtmSendSppData(productDetails) {
  if (typeof dataLayer != "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: SEND_SPP_DATA,
      product_id: productDetails.id
    });
  }
}

export function gtmOnCart(cartItems) {
  const impressions =
    cartItems && cartItems.map
      ? cartItems.map((product, id) => {
          return {
            name: product.name,
            id: `${product.id}`,
            price: product.price_tlc,
            brand: product.brand_name,
            category: product.category_level_one_name,
            variant: product.colour_name
          };
        })
      : [];
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_ON_CART,
      products_in_cart: impressions
    });
  }
}

// WishList events

export function gtmAddOnWishlist(ProductDetails, pageType) {
  const pageNameThruCookies = getCookie(GA_PAGE_NAME);
  const pageName = pageType
    ? pageType
    : pageNameThruCookies
    ? pageNameThruCookies
    : "Direct SPP";
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_WISHLIST_CLICK_EVENT_ID,
      ecommerce: {
        currencyCode: "USD",
        add: {
          actionField: { list: pageName },
          products: [
            {
              name: ProductDetails.name,
              id: ProductDetails.id,
              price: ProductDetails.price_tlc,
              brand: ProductDetails.brand_name,
              category: ProductDetails.category_level_one_name,
              variant: ProductDetails.colour_name,
              quantity: 1
            }
          ]
        }
      }
    });
  }
}

export function gtmRemoveFromWishlist(ProductDetails, pageType) {
  const pageNameThruCookies = getCookie(GA_PAGE_NAME);
  const pageName = pageType
    ? pageType
    : pageNameThruCookies
    ? pageNameThruCookies
    : "Direct SPP";
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_REMOVE_WISHLIST_CLICK_EVENT_ID,
      ecommerce: {
        currencyCode: "USD",
        remove: {
          actionField: { list: pageName },
          products: [
            {
              name: ProductDetails.name,
              id: ProductDetails.id,
              price: ProductDetails.price_tlc,
              brand: ProductDetails.brand_name,
              category: ProductDetails.category_level_one_name,
              variant: ProductDetails.colour_name,
              quantity: 1
            }
          ]
        }
      }
    });
  }
}

// Cart Events

export function gtmClickOnAddToCart(ProductDetails) {
  const pageName = getCookie(GA_PAGE_NAME);
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_ADD_TO_CART,
      ecommerce: {
        currencyCode: "USD",
        add: {
          actionField: { list: pageName ? pageName : "Direct SPP" },
          products: [
            {
              name: ProductDetails.name,
              id: ProductDetails.id,
              price: ProductDetails.price_tlc,
              brand: ProductDetails.brand_name,
              category: ProductDetails.category_level_one_name,
              variant: ProductDetails.colour_name,
              quantity: 1
            }
          ]
        }
      }
    });
  }
}

export function gtmClickOnRemoveFromCart(ProductDetails) {
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_REMOVE_FROM_CART,
      ecommerce: {
        currencyCode: "USD",
        remove: {
          products: [
            {
              name: ProductDetails.name,
              id: ProductDetails.id,
              price: ProductDetails.price_tlc,
              brand: ProductDetails.brand_name,
              category: ProductDetails.category_level_one_name,
              variant: ProductDetails.colour_name,
              quantity: 1
            }
          ]
        }
      }
    });
  }
}

export function gtmOnCheckoutStep1(cartItems) {
  const impressions =
    cartItems && cartItems.map
      ? cartItems.map((product, id) => {
          return {
            name: product.name,
            id: `${product.id}`,
            price: product.price_tlc,
            brand: product.brand_name,
            category: product.category_level_one_name,
            variant: product.colour_name
          };
        })
      : [];
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_CHECKOUT,
      ecommerce: {
        checkout: {
          actionField: { step: 1, option: "" },
          products: impressions
        }
      }
    });
  }
}

export function gtmOnCheckoutStep2(cartItems, deliveryMethod) {
  const impressions =
    cartItems && cartItems.map
      ? cartItems.map((product, id) => {
          return {
            name: product.name,
            id: `${product.id}`,
            price: product.price_tlc,
            brand: product.brand_name,
            category: product.category_level_one_name,
            variant: product.colour_name
          };
        })
      : [];
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_CHECKOUT,
      ecommerce: {
        checkout: {
          actionField: { step: 2, option: deliveryMethod },
          products: impressions
        }
      }
    });
  }
}

export function gtmOnCheckoutOption(cartItems, deliveryMethod) {
  const impressions =
    cartItems && cartItems.map
      ? cartItems.map((product, id) => {
          return {
            name: product.name,
            id: `${product.id}`,
            price: product.price_tlc,
            brand: product.brand_name,
            category: product.category_level_one_name,
            variant: product.colour_name
          };
        })
      : [];
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_CHECKOUT_OPTION,
      ecommerce: {
        checkout: {
          actionField: { step: 2, option: deliveryMethod },
          products: impressions
        }
      }
    });
  }
}

export function gtmOnSelectPaymentOption(cartItems, paymentMethod) {
  const impressions =
    cartItems && cartItems.map
      ? cartItems.map((product, id) => {
          return {
            name: product.name,
            id: `${product.id}`,
            price: product.price_tlc,
            brand: product.brand_name,
            category: product.category_level_one_name,
            variant: product.colour_name
          };
        })
      : [];
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_CHECKOUT_OPTION,
      ecommerce: {
        checkout: {
          actionField: { step: 3, option: paymentMethod },
          products: impressions
        }
      }
    });
  }
}

export function gtmOrderDetailPage(productDetails) {
  const countryAndCurrency =
    localStorage.getItem &&
    localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE)
      ? JSON.parse(localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE))
      : {};
  const currency =
    countryAndCurrency && countryAndCurrency.currency
      ? countryAndCurrency.currency
      : DEFAULT_CURRENCY;
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      amount: productDetails.paid_amount,
      cart_amount: productDetails.sub_total,
      subtotal: productDetails.sub_total,
      voucher_value: productDetails.voucher_amount,
      currency: currency,
      order_id: `${productDetails.id}`
    });
  }
}

export function gtmOnLoadThankYouPage(productDetails) {
  const impressions =
    productDetails &&
    productDetails.order_product &&
    productDetails.order_product.map
      ? productDetails.order_product.map((items, id) => {
          return {
            name: items.product.name,
            id: `${items.product.id}`,
            price: items.pricing,
            brand: items.product.brand_name,
            category: "", //not from api response
            variant: "", // not from response
            quantity: items.product.quantity ? items.product.quantity : 1
          };
        })
      : [];
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      ecommerce: {
        currencyCode: "USD",
        purchase: {
          actionField: {
            action: "purchase",
            id: `${productDetails.id}`,
            revenue: productDetails.sub_total,
            shipping: productDetails.shipping_fee,
            tax: productDetails.tax ? productDetails.tax : 0,
            coupon: "", // not from response
            coupon_value: productDetails.voucher_amount
          },
          products: impressions,
          products_count: impressions ? impressions.length : 0
        }
      }
    });
  }
}

export function gtmAdrollValues(productDetails) {
  const countryAndCurrency = localStorage.getItem(
    COUNTRY_AND_CURRENCY_LOCAL_STORAGE
  )
    ? JSON.parse(localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE))
    : {};
  const currency =
    countryAndCurrency && countryAndCurrency.currency
      ? countryAndCurrency.currency
      : DEFAULT_CURRENCY;
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      adroll_conversion_value: productDetails.sub_total,
      adroll_currency: currency,
      adroll_custom_order_id: `${productDetails.id}`
    });
  }
}

export function gtmClickOnCheckout(cartItems) {
  const impressions =
    cartItems && cartItems.map
      ? cartItems.map((product, id) => {
          return {
            name: product.name,
            id: `${product.id}`,
            price: product.price_tlc,
            brand: product.brand_name,
            category: product.category_level_one_name,
            variant: product.colour_name
          };
        })
      : [];
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_CHECKOUT,
      ecommerce: {
        checkout: {
          actionField: { step: 3, option: "" },
          products: impressions
        }
      }
    });
  }
}

export function gtmOnVipSubmission(phoneNumber) {
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: "sell_contactMe",
      sell_event_action: "contact_me",
      sell_event_label: "VIP",
      sell_event_value: phoneNumber
    });
  }
}

export function gtmOnBuyerOffer(label) {
  if (typeof dataLayer != "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: MY_ITEM_BUYER_OFFER,
      myitems_event_action: "BuyerOffer",
      myitems_event_label: label,
      myitems_event_value: "1"
    });
  }
}

export function gtmOnPriceReduction(label) {
  if (typeof dataLayer != "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: MY_ITEM_PRICE_REDUCTION,
      myitems_event_action: "PriceReduction",
      myitems_event_label: label,
      myitems_event_value: "1"
    });
  }
}

export function gtmOnQuotationApprove() {
  if (typeof dataLayer != "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: MY_ITEM_QUOTATION,
      myitems_event_action: "Quotation",
      myitems_event_label: "approve",
      myitems_event_value: "1"
    });
  }
}

export function gtmOnRequestPayment() {
  if (typeof dataLayer != "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: MY_ITEM_REQUEST_PAYMENT,
      myitems_event_action: "RequestPayment",
      myitems_event_label: "requested",
      myitems_event_value: "1"
    });
  }
}

export function gtmONSellSubmission(stepNo, stepType, value) {
  if (typeof dataLayer != "undefined") {
    let eventValue;
    if (stepType === "camera") {
      eventValue = 1;
    } else {
      eventValue = 0;
    }
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: MY_ITEM_SELLSUBMISSION,
      sell_event_action: `step ${stepNo} - ${stepType}`,
      sell_event_label: value,
      sell_event_value: eventValue
    });
  }
}
export function gtmOnSubmitProposalItems(category, plateform) {
  if (typeof dataLayer != "undefined") {
    let eventAction = "";
    if (plateform === MOBILE_PLATFORM) {
      eventAction = "submitted_mobile";
    } else {
      eventAction = "submitted_desktop";
    }
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: MY_ITEM_SELLSUBMISSION,
      sell_event_action: eventAction,
      sell_event_label: category,
      sell_event_value: 1
    });
  }
}

// Login Regsiter Events
export function gtmOnLogin(status, previousPath) {
  if (typeof dataLayer != "undefined") {
    let statusValue = 0;
    if (status === "success") {
      statusValue = 1;
    }
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_LOGIN_TRACKING,
      registration_event_category: "login",
      registration_event_action: "login_btn",
      registration_event_label: previousPath,
      registration_event_value: statusValue
    });
  }
}

export function gtmOnSocialRegistration(status, platform, previousUrl) {
  if (typeof dataLayer != "undefined") {
    let statusValue = 0;
    if (status === "success") {
      statusValue = 1;
    }
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_SOCIAL_REGISTRATION,
      registration_event_category: "registration",
      registration_event_action: platform,
      registration_event_label: previousUrl,
      registration_event_value: statusValue
    });
  }
}

export function gtmOnNormalRegistration(status, previousUrl) {
  if (typeof dataLayer != "undefined") {
    let statusValue = 0;
    if (status === "success") {
      statusValue = 1;
    }
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: GTM_NORMAL_REGISTER,
      registration_event_category: "registration",
      registration_event_action: "register_link",
      registration_event_label: previousUrl,
      registration_event_value: statusValue
    });
  }
}
// Loading third party tags
export function loadThirdPartyTag() {
  if (typeof dataLayer !== "undefined") {
    dataLayer.push({
      site_design_2019: SITE_TYPE,
      event: LOAD_THIRD_PARTY_TAG
    });
  }
}
