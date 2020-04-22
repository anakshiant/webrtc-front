import {
  COUNTRY_AND_CURRENCY_LOCAL_STORAGE,
  COOKIE_ACCEPT,
  ACCEPT_INSTALLATION_BANNER,
  COUNTRY_UPDATED
} from "./LocalStorage.constants";
import {
  USER_ADDRESS_COOKIE,
  USER_PHONE_COOKIE,
  USER_DETAIL_COOKIE
} from "./Constants";

export function createCookie(name, value, days) {
  let expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // ) removed
    expires = "; expires=" + date.toGMTString(); // + added
  }
  // document.cookie = name + "=" + value + expires + ";path=/";
  document.cookie =
    name + "=" + encodeURIComponent(value) + expires + ";path=/"; // + and " added
}

export function createCookieInMinutes(name, value, minutes) {
  let expires = "";
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000); // ) removed
    expires = "; expires=" + date.toGMTString(); // + added
  }
  document.cookie = name + "=" + value + expires + ";path=/"; // + and " added
}

export function getCookie(cookieName) {
  let match =
    document.cookie.match &&
    document.cookie.match(new RegExp(cookieName + `=([^;]+)`));
  if (match) return decodeURIComponent(match[1]);
}

export function deleteCookie(cookieName) {
  document.cookie =
    cookieName + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
export function getCookieValue(name) {
  var b =
    document.cookie.match &&
    document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");

  return b ? b.pop() : "";
}
export function deleteAllCookies() {
  const countryAndCurrencyObj =
    localStorage.getItem &&
    localStorage.getItem(COUNTRY_AND_CURRENCY_LOCAL_STORAGE);
  const userAcceptCookieLocalStorage =
    localStorage && localStorage.getItem && localStorage.getItem(COOKIE_ACCEPT);
  const userAcceptAppInstallationBannerLocalStorage =
    localStorage &&
    localStorage.getItem &&
    localStorage.getItem(ACCEPT_INSTALLATION_BANNER);
  const updatedCountry =
    localStorage.getItem && localStorage.getItem(COUNTRY_UPDATED);
  const SWLocalstorage =
    localStorage.getItem && localStorage.getItem("swUpdate");
  localStorage.clear();
  localStorage.setItem &&
    localStorage.setItem(
      COUNTRY_AND_CURRENCY_LOCAL_STORAGE,
      countryAndCurrencyObj
    );
  if (userAcceptCookieLocalStorage) {
    localStorage &&
      localStorage.setItem &&
      localStorage.setItem(COOKIE_ACCEPT, true);
  }
  if (userAcceptAppInstallationBannerLocalStorage) {
    localStorage &&
      localStorage.setItem &&
      localStorage.setItem(ACCEPT_INSTALLATION_BANNER, true);
  }
  if (updatedCountry) {
    localStorage &&
      localStorage.setItem &&
      localStorage.setItem(COUNTRY_UPDATED, 1);
  }
  if (SWLocalstorage) {
    localStorage &&
      localStorage.setItem &&
      localStorage.setItem("swUpdate", "updated");
  }
  // var cookies = document.cookie.split(";");
  // for (var i = 0; i < cookies.length; i++) {
  //   var cookie = cookies[i];
  //   var eqPos = cookie.indexOf("=");
  //   var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  deleteCookie(USER_ADDRESS_COOKIE);
  deleteCookie(USER_PHONE_COOKIE);
  deleteCookie(USER_DETAIL_COOKIE);
  //}
}
