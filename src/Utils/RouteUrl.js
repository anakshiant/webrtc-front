export const HOME_ROUTE = "/";
export const HOME_ARABIC_ROUTE = "/ar";

export const ABOUT_BOILERPLATE = "/about";

//spp url
export const SPP_ROUTE = /(.)+-p[0-9]+/;

// mpp url structures
export const MPP_CATEGORY_BASE_ROUTE = /^\/women$|^\/women\/?|^\/men\/?|^\/kid\/?/i;
export const MPP_ARABIC_CATEGORY_BASE_ROUTE = `/ar/${MPP_CATEGORY_BASE_ROUTE}`;
export const MPP_BRAND_PREFIX = /brand-[A-Za-z]+/;
export const SEARCH_PAGE = "/filter";
export const INDEX_SEARCH_PAGE = "/filter/index";
export const FACEBOOK_URL = "https://www.facebook.com/theluxurycloset";
export const INSTAGRAM_URL = "https://www.instagram.com/theluxurycloset/";
export const PINTREST_URL = "https://www.pinterest.com/theluxurycloset/";
export const TWITTER_URL = "https://twitter.com/theluxurycloset";

export const WHATS_NEW_PATH = "/whats-new";
export const WHATS_NEW_GA_PATH = "WHATS-NEW";
export const SALE_PATH = "/sale";
export const SALE_GA_PATH = "SALE";
export const EDITOR_GA_PATH = "Editor's Pick";

export const CART_PATH = "/checkout/cart";
export const LOGIN_PATH = "/login";
export const CHECKOUT_PATH = "/checkout/confirm";
export const ORDER_CONFIRMATION_SUFFIX = "/order-confirmation";
export const ORDER_CONFIRMATION_PATH = `${ORDER_CONFIRMATION_SUFFIX}/:orderId`;
export const CONGO_MESS_PATH = "congratulation_mess=1";
export const FORGOT_PASSWORD = "/forgotPassword";
export const SIGNUP_PATH = "/signUp";
export const PASSWORD_RESET_TEXT = "/site/reset-password";
export const PASSWORD_RESET_PATH = `${PASSWORD_RESET_TEXT}(.*)`;
export const MY_ITEMS = "/my-items";

export const GET_BASE_URL_REG_EX = /(\/pwa\/(ksa|uae)-(en|ar)\/?)|(\/pwa\/(ar|en)\/?)|(\/pwa\/?)|(\/(ksa|uae)-(en|ar)\/?)|(\/(ar|en)\/?)|(\/?)/i;

export const SELL_PATH = "/sell";
export const INITIATE_SELL_PATH = `${SELL_PATH}/initiate-sell`;
export const INITIATE_SELL_PATH_MULTIPLE_ITEMS = `${SELL_PATH}/initiate-sell-multiple-items`;

export const MY_ACCOUNTS_PATH = "/my-account";
export const MY_ACCOUNT_PROFILE_PATH = `${MY_ACCOUNTS_PATH}/profile`;
export const MY_ACCOUNT_PURCHASE_PATH = `${MY_ACCOUNTS_PATH}/my-purchases`;
export const MY_ACCOUNT_ALERTS_PATH = `${MY_ACCOUNTS_PATH}/alerts`;
export const MY_ACCOUNT_WISHLIST_PATH = `${MY_ACCOUNTS_PATH}/wishlist`;
export const MY_ACCOUNT_ABOUT_TLC_PATH = `${MY_ACCOUNTS_PATH}/about-tlc`;

export const MY_ACCOUNT_PROFILE_PERSONAL_PATH = `${MY_ACCOUNT_PROFILE_PATH}/personal-info`;
export const MY_ACCOUNT_PROFILE_ADDRESS_PATH = `${MY_ACCOUNT_PROFILE_PATH}/address`;
export const MY_ACCOUNT_PROFILE_PAYMENT_PATH = `${MY_ACCOUNTS_PATH}/my-payment-method`;
export const MY_ACCOUNT_PROFILE_LANGUAGE_PATH = `${MY_ACCOUNT_PROFILE_PATH}/language`;
export const MY_ACCOUNT_PROFILE_VAT_PATH = `${MY_ACCOUNT_PROFILE_PATH}/vat`;
export const MY_ACCOUNT_ADD_PAYMENT_PATH = `${MY_ACCOUNT_PROFILE_PAYMENT_PATH}/addPayment`;
export const MY_ACCOUNT_ADD_CHEQUE_PAYMENT_TEXT = `${MY_ACCOUNT_ADD_PAYMENT_PATH}/cheque`;
export const MY_ACCOUNT_ADD_PAYPAL_PAYMENT_TEXT = `${MY_ACCOUNT_ADD_PAYMENT_PATH}/paypal`;
export const MY_ACCOUNT_ADD_BANK_TRANSFER_PAYMENT_TEXT = `${MY_ACCOUNT_ADD_PAYMENT_PATH}/bankTransfer`;
export const MY_ACCOUNT_ORDER_DETAILS = `${MY_ACCOUNT_PURCHASE_PATH}/orderDetails`;
export const MY_ACCOUNT_ORDER_DETAILS_URL = `${MY_ACCOUNT_ORDER_DETAILS}(.*)`;
export const MY_ACCOUNT_CHANGE_PASSWORD = `${MY_ACCOUNT_PROFILE_PATH}/changePassword`;
export const MY_ACCOUNT_ORDER_RETURN = `${MY_ACCOUNT_PURCHASE_PATH}/order/return`;
export const MY_ACCOUNT_ORDER_RETURN_URL = `${MY_ACCOUNT_ORDER_RETURN}(.*)`;
export const MY_ACCOUNT_ORDER_CANCEL = `${MY_ACCOUNT_PURCHASE_PATH}/order/cancel`;
export const MY_ACCOUNT_GENERATE_TRACK_ID = `${MY_ACCOUNT_PURCHASE_PATH}/order/generateTrackId`;
export const MY_ACCOUNT_ORDER_REFUND = `${MY_ACCOUNT_PURCHASE_PATH}/order/refund`;
export const MY_ACCOUNT_GENERATE_TRACK_ID_URL = `${MY_ACCOUNT_GENERATE_TRACK_ID}(.*)`;
export const MY_ACCOUNT_ORDER_REFUND_URL = `${MY_ACCOUNT_ORDER_REFUND}(.*)`;
export const MY_ACCOUNT_HAVE_PAY_AND_RESERVE_PATH = `${MY_ACCOUNT_PURCHASE_PATH}/order/have-pay-and-reserve`;
export const FACEBOOK_SHARE_URL = "http://www.facebook.com/share.php?u=";
export const TWITTER_SHARE_URL = `http://twitter.com/share?text=Check out`;
export const TWITTER_URL_END_POINT = "at @TheLuxuryCloset&url=";
export const PINTREST_SHARE_URL =
  "https://www.pinterest.com/pin/create/button/?url=";

export const STATIC_PAGE_BASE_PATH = "/pages/";
export const TERMS_AND_CONDITION_PATH = `${STATIC_PAGE_BASE_PATH}terms-and-conditions`;
export const OLD_TERMS_AND_CONDITION_PATH = `${STATIC_PAGE_BASE_PATH}old-terms-and-conditions`;
export const STATIC_PAGE_REGEX = /\/terms-and-conditions$|\/cashbuy$|\/consignment$|\/Contact-us$|\/authenticity$|\/recruitment-work-for-us$|\/payfort-installment-plan$|\/old-terms-and-conditions$|\/super-sale-day$|\/lafayette$|\/returns$|\/about-us$|\/pay-and-reserve$|\/frequently-asked-questions$|\/how-does-it-work$|\/privacy-policy$|\/delivery-and-returns$|\/cod\/|\/dubaicares\/?|\/visit-our-office\/?|\/sell-landing/i;
export const SELL_LANDING_STATIC_PAGE_PATH = "/sell-landing";
export const RETURN_PATH = `${STATIC_PAGE_BASE_PATH}returns`;
export const ABOUT_US_PATH = `${STATIC_PAGE_BASE_PATH}about-us`;
export const FREQUENTLY_ASKED_QUESTIONS_PATH = `${STATIC_PAGE_BASE_PATH}frequently-asked-questions`;
export const PAY_AND_RESERVE_PATH = `${STATIC_PAGE_BASE_PATH}pay-and-reserve`;
export const DELIVERY_AND_RETURN_PATH = `${STATIC_PAGE_BASE_PATH}delivery-and-returns`;
export const HOW_DOES_IT_WORK_PATH = `${STATIC_PAGE_BASE_PATH}how-does-it-work`;
export const PRIVACY_POLICY_PATH = `${STATIC_PAGE_BASE_PATH}privacy-policy`;
export const SUPER_SALE_DAY_PATH = `${STATIC_PAGE_BASE_PATH}super-sale-day`;
export const LAFAYETTE_PATH = `${STATIC_PAGE_BASE_PATH}lafayette`;
export const AUTHENCITY = `${STATIC_PAGE_BASE_PATH}authenticity`;
export const PAYFORT_INSTALLMENT_PLAN = `${STATIC_PAGE_BASE_PATH}payfort-installment-plan`;
export const RECRUITMENT_WORK_FOR_US_PATH = `${STATIC_PAGE_BASE_PATH}recruitment-work-for-us`;
export const DUBAI_CARE_TNC = `${STATIC_PAGE_BASE_PATH}dubaicares`;
export const VISIT_OUR_STORE = `${STATIC_PAGE_BASE_PATH}visit-our-office`;
export const CASH_BUY_PATH = `${STATIC_PAGE_BASE_PATH}cashbuy`;
export const CONSIGNMENT_PATH = `${STATIC_PAGE_BASE_PATH}consignment`;
export const FREQUENTLY_ASKED_QUESTIONS_PATH_WITH_SELL_FAQ = `${FREQUENTLY_ASKED_QUESTIONS_PATH}#sell-faqs`;
export const DUBAI_CARE_WTIH_TERMS_AND_CONDITIONS = `${DUBAI_CARE_TNC}#terms-conditions`;
export const ABOUT_US_PATH_WITH_CONTACT_FORM = `${ABOUT_US_PATH}#contact-form`;
export const TERMS_AND_CONDITION_PATH_WITH_IMPORTDUTIES = `${TERMS_AND_CONDITION_PATH}#importduties`;
export const TERMS_AND_CONDITION_PATH_WITH_MANAGE_MY_PRICES = `${TERMS_AND_CONDITION_PATH}#manage-my-price`;
export const WHATS_NEW_REG_EX = /^\/whats-new/;
export const SPP_PRODUCT_ID_ROUTE = "/product/view";
export const SELL_MY_ITEMS_ROUTE = `${SELL_PATH}${MY_ITEMS}`;
export const MY_ACCOUNT_MY_ITEMS_ROUTE = `${MY_ACCOUNTS_PATH}${MY_ITEMS}`;

export const MPP_COLLECTION_PATH = "/collection";
export const DESIGNER_PATH = "/designers";
export const TERMS_AND_CONDITION_PATH_WITH_RETURNS_OF_ITEMS = `${TERMS_AND_CONDITION_PATH}#returnOfItems`;
export const LANDING_BANNER_REGEX = /pages\/[A-Za-z0-9]+/;

export const REDIRECT_CATEGORY_URLS = /^\/ar\/category\/$|\/category\//;
export const REDIRECT_BRAND_URLS = /^\/ar\/brands\/$|\/brands\//;
export const SELL = "sell";

export const APP_TNC = "/tnc";
export const CONTACT_US = "/contact-us";
