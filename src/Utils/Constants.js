import isMobile, { isArabicLanguageUrl } from "./UserAgent";

export const SUCCESS = "success";
export const FAILURE = "failure";
export const REQUESTING = "requesting";
export const CHANGE_LOCALE = "change_locale";
export const DEFAULT_LOCALE = "en";
export const DEFAULT_COUNTRY = "india";
export const DEFAULT_CURRENCY = "USD";

export const EMAIL_REG_EX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
export const PUBLIC_IMAGES_PATH = process.env.ASSETS_CDN_PATH
  ? process.env.ASSETS_CDN_PATH
  : `${process.env.BASE_PATH}assets/images`;

export const MOBILE_PLATFORM = "M";
export const DESKTOP_PLATFORM = "D";
export const PLATFORM = isMobile() ? MOBILE_PLATFORM : DESKTOP_PLATFORM;

export const ENGLISH_LANGUAGE = "en";
export const ARABIC_LANGUAGE = "ar";
export const ENGLISH_TEXT = "English";
export const ARABIC_TEXT = "Arabic";
export const ARABIC_LANGUAGE_URL_REG_EX = /\/ar\/|\/ar$|(\/[a-z]{3}-ar)/i;

export const LIST_VIEW = "list";
export const GRID_VIEW = "grid";
export const SOLD = "sold";
export const SOLD_OUT = "sold out";
export const CONVERTEDTOTLC = "converted to tlc";
export const SYSTEMERROR = "system error";
export const RESERVED = "reserved";
export const UNAVAILABLE = "unavailable";
export const DEFAULT_COUNTRY_CODE = "IN";
export const DEFAULT_COUNTRY_ID = "1";
export const USER_DETAIL_COOKIE = "userDetails";
export const USER_ADDRESS_COOKIE = "userAddressDetails";
export const USER_PHONE_COOKIE = "userPhoneDetails";
// gtm page types
export const HOME_PAGE = "Home";
export const MPP_PAGE = "Category";
export const SPP_PAGE = "Product Detail";
export const CART_PAGE = "Cart";
export const CHECKOUT_PAGE = "Checkout";
export const GA_PAGE_NAME = "gaPageName";
export const PAYMENT_LOCALSTORAGE = "payment-method";

//pagination type
export const NEXT_PAGE_PAGINATION = "next";
export const PREVIOUS_PAGE_PAGINATION = "previous";

export const CDN_PATH = "https://cdn.theluxurycloset.com/uploads/home";
export const ADD_TO_BAG_PRODUCT_DETAIL = "addToBagProductDetails";
export const PRODUCT_ON_SALE = "On sale";

export const EXPRESS_DELIVERY = "delivery";
export const PICK_UP_DELIVERY = "pick_up";

export const CART_PRODUCT_DETAILS = "casderrascsas";

export const APPLE_PAY = "apple_pay";
export const CREDIT_CARD = "credit_cart";
export const PAY_PAL = "paypal";
export const BANK_TRANSFER = "bank_transfer";
export const CASH_ON_LOCATION = "cash_on_location";
export const CASH_ON_DELIVERY = "cash_on_delivery";
export const PAY_FORT_INSTALLMENTS = "payfort_installments";

export const APPLE_PAY_API_RES = "applepay";
export const CREDIT_CARD_API_RES = "Credit Card";
export const PAY_PAL_API_RES = "Paypal";
export const BANK_TRANSFER_API_RES = "Bank Transfer";
export const CASH_ON_LOCATION_API_RES = "Cash On Location";
export const CASH_ON_DELIVERY_API_RES = "Cash On Delivery";
export const PAY_FORT_INSTALLMENTS_API_RES = "Buy In Installments";

export const ADD_TO_WISHLIST_PRODUCT_DETAIL = "addToWishlistProductDetails";
export const BUY_NOW_PRODUCT_DETAIL = "buyNowProductDetails";

export const VIEW_PRODUCT = "viewProduct";
export const PINCODE_TEXT = "Please enter postalCode";
export const FIRST_NAME_TEXT = isArabicLanguageUrl()
  ? "الرجاء إدخال الاسم الأول"
  : "Please enter first name";
export const LAST_NAME_TEXT = isArabicLanguageUrl()
  ? "الرجاء إدخال الاسم الأخير"
  : "Please enter last name";
export const ADDRESS_TEXT = isArabicLanguageUrl()
  ? "الرجاء إدخال العنوان"
  : "Please enter address";
export const PHONE_TEXT = isArabicLanguageUrl()
  ? "الرجاء إدخال رقم الجوال"
  : "Please enter mobile number";
export const CITY_TEXT = isArabicLanguageUrl()
  ? "الرجاء إدخال المدينة"
  : "please enter city";
export const STATE_TEXT = isArabicLanguageUrl()
  ? "الرجاء إدخال الدولة"
  : "Please enter state";
export const VALID_PHONE_NUMBER = isArabicLanguageUrl()
  ? "الرجاء إدخال رقم جوال صحيح"
  : "Please enter valid mobile number";

export const ORDER_DESCRIPTION = "Order for luxury assets";
export const PURCHASE_PAY_FORT_COMMAND = "PURCHASE";
export const TOKENIZATION_PAY_FORT_COMMAND = "TOKENIZATION";
export const DEFAULT_CURRENCY_SYMBOL = "$";
export const EMAIL_REGULAR_EXPRESSION = /[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}/;
export const MOBILE_PATTERN = /^[7,8,9]{1}[0-9]{9}$/;
export const PASSWORD_MAX_LENGTH = 8;
export const WISHLIST_ADD_ITEM = isArabicLanguageUrl()
  ? "تمت الإضافة إلى قائمة الأمنيات"
  : "Added To Wishlist";
export const WISHLIST_REMOVE_ITEM = isArabicLanguageUrl()
  ? "تمت الإزالة من قائمة الأمنيات"
  : "Removed From Wishlist";
export const ADD_TO_BAG = isArabicLanguageUrl()
  ? "أضيف إلى السلة"
  : "Added To Cart";
export const ADD_TO_BAG_FAILURE_Error = isArabicLanguageUrl()
  ? "بالفعل في العربة"
  : "Already In Cart";

export const BAG_TEXT = isArabicLanguageUrl() ? "كيس" : "Bag";
export const ADDRESS = isArabicLanguageUrl() ? "عنوان" : "Address";
export const PAYMENT_TEXT = isArabicLanguageUrl() ? "دفع" : "Payment";
export const ORDERCONFIRMATION_DETAILS = isArabicLanguageUrl()
  ? "ترتيب تأكيد التفاصيل"
  : "orderConfirmationDetails";

export const UAE_COUNTRY_CODE = "AE";
export const SA_COUNTRY_CODE = "SA";
export const UAE_COUNTRY_CODE_FOR_URL = "uae";
export const SA_COUNTRY_CODE_FOR_URL = "ksa";
export const BH_COUNTRY_CODE = "BH";
export const KW_COUNTRY_CODE = "KW";
export const OM_COUNTRY_CODE = "OM";
export const US_COUNTRY_CODE = "US";

export const MULTI_COUNTRY_CODE_FOR_URL = /ksa|uae/i;
export const BASE_URL_WITHOUT_COUNTRY_CODE = /(\/ar\/?)$|(\/en\/?)|(\/$)/i;

export const ARABIC_REG_EX = /ar/i;
export const ARABIC_LANGUAGE_WITH_COUNTRY = /-ar/i;
export const ENGLISH_REG_EX = /en/i;
export const ENGLISH_LANGUAGE_WITH_COUNTRY = /-en/i;

export const MULTI_COUNTRY_CODE_AND_LANGUAGE_FOR_URL = /\/(ksa|uae)-(ar|en)\/?/i;

export const UAE_URL_REG_EX = /\/uae-(en|ar)/i;

export const KSA_URL_REG_EX = /\/ksa-(en|ar)/i;
export const CART_EXPIRY_MODAL_SHOW_DURATION = 120; // in seconds
export const NOTIFY_ME_LOCAL_STORAGE = "notifyMeDetails";

export const SHOW_OFFER = "shownOffer";
export const FORGOT_PASSWORD_TEXT = "Password Reset";
export const CHANGE_PWD_TEXT = "Change Password";

export const ONGOING_MY_PURCHASE = "ongoing";
export const COMPLETED_MY_PURCHASE = "completed";
export const CANCELLED_MY_PURCHASE = "cancelled";
export const RETURNED_MY_PURCHASE = "returned";
export const FEMALE_LOWER_CASE = "female";
export const MALE_LOWERE_CASE = "male";
export const PAYMENT_ID = "paymentId";

export const MOBILE_HEADER_PLATFORM = "mobile_web";
export const DESKTOP_HEADER_PLATFORM = "desktop";
export const PAGE = "page";
export const PRODUCT_DETAILS = "productDetails";

export const CONTACT_TIME_INDIA = "+91 9999236535";
export const CONTACT_TIME_UAE = "800 LUX (800 589)";
export const CONTACT_TIME_HONG_KONG = "+852 63900900";
export const CONTACT_TIME_GCC = "+971 4 395 5639";

export const DATE_AND_TIME_INDIA = isArabicLanguageUrl()
  ? "من الاثنين إلى الجمعة 9 صباحًا إلى 6 مساءً"
  : "Monday to Friday 9 am to 6 pm";
export const DATE_AND_TIME_UAE = isArabicLanguageUrl()
  ? "من الأحد إلى الخميس من التاسعة صباحًا حتى السادسة مساءً (DXB)"
  : "Sunday to Thursday 9 am to 6 pm (DXB)";
export const DATE_AND_TIME_UAE_SATURDAY = isArabicLanguageUrl()
  ? "السبت 10:00 حتي 7:00 (DXB)"
  : "Saturday 10 am to 7 pm (DXB)";
export const DATE_AND_TIME_GCC = isArabicLanguageUrl()
  ? "من الأحد إلى الخميس من التاسعة صباحًا حتى السادسة مساءً"
  : "Sunday to Thursday 9 am to 6 pm";
export const DATE_AND_TIME_GCC_SATURDAY = isArabicLanguageUrl()
  ? "السبت 10:00 حتي 7:00 (DXB)"
  : "Saturday 10 am to 7 pm (DXB)";

export const INDIA_COUNTRY_ID = 99;
export const HONG_KONG_COUNTRY_ID = 96;
export const UNITED_ARAB_EMIRATES_COUNTRY_ID = 225;
export const SPECIAL_CHARACTER_EXPRESSION = /^[a-z0-9-_@.,&#]+$/i;
export const ADDRESS_VALIDATION_EXPRESSION = /^[ a-zA-Z0-9-#&()''-_.,\/+]*$/;

export const ALPHANUMERIC_VALIDATION_EXPRESSION = /^[a-zA-Z0-9]+$/;

export const ADDRESS_VALIDATION_TEXT =
  "Please enter valid address,only -#&()''.,/+ special characters are allowed";
export const POSTAL_CODE_VALIDATION_TEXT = isArabicLanguageUrl()
  ? "الرجاء إدخال الرمز البريدي صالح"
  : "Please enter valid postalCode";

export const CITY_VALIDATION_TEXT =
  "Please enter valid city,only -#&()''.,/+ special characters are allowed";

export const VIA_FACEBOOK_LOGIN = "fb";
export const VIA_GOOGLE_LOGIN = "google";

export const USER_LOGGED_IN_DURATION = 30;

export const PAY_FORT_GATEWAY = "payfort";
export const CHECKOUT_GATEWAY = "checkout";

export const GOOGLE_REGISTER = "google_registration";
export const FB_REGISTER = "fb_registration";
export const PREVIOUSPATHNAME = "previousPathName";
export const CONFIGURATION_API_KEY = "TLC_$D3v_$lyk4n_w3b$$_2016_d3v$$";

export const TOP_BAR_TEXT_COMPONENT = "TOP_BAR_TEXT_COMPONENT";
export const HERO_BANNERS_COMPONENT = "HERO_BANNERS_COMPONENT";
export const RECTANGLE_BANNERS_COMPONENT = "RECTANGLE_BANNERS_COMPONENT";
export const PROMO_BAR_TEXT_COMPONENT = "PROMO_BAR_TEXT_COMPONENT";
export const SQUARE_GRID_BANNERS_COMPONENT = "SQUARE_GRID_BANNERS_COMPONENT";
export const SQUARE_BANNERS_COMPONENT = "SQUARE_BANNERS_COMPONENT";
export const VALUE_PROPOSITION_COMPONENT = "VALUE_PROPOSITION_COMPONENT";
export const EDITOR_PICKS_COMPONENT = "EDITOR_PICKS_COMPONENT";
export const REDIRECTION_BANNER_COMPONENT = "REDIRECTION_BANNER_COMPONENT";

export const STATIC_PAGE_TYPE = "page";

export const BANNER_WITH_URL_BROWSER = "BANNER_WITH_URL_BROWSER";
export const LANDING = "LANDING";
export const anchorTabStyle = {
  textDecoration: "none",
  color: "#000",
  outline: 0
};
export const CONTACT_TIME_KSA = "+966118343432";
export const CONTACT_TIME_USA = "+16465689815";
export const CONTACT_TIME_All_COUNTRIES = "+97142472985";
export const KSA_COUNTRY_ID = 187;
export const USA_COUNTRY_ID = 1;
