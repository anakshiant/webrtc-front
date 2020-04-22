import {
  UAE_COUNTRY_CODE,
  SA_COUNTRY_CODE,
  UAE_COUNTRY_CODE_FOR_URL,
  SA_COUNTRY_CODE_FOR_URL,
  MULTI_COUNTRY_CODE_FOR_URL,
  ARABIC_REG_EX,
  BASE_URL_WITHOUT_COUNTRY_CODE,
  MULTI_COUNTRY_CODE_AND_LANGUAGE_FOR_URL,
  ARABIC_LANGUAGE_WITH_COUNTRY
} from "./Constants";
import {
  COUNTRY_AND_CURRENCY_PROFILE_LOCAL_STORAGE,
  COUNTRY_AND_CURRENCY_LOCAL_STORAGE
} from "./LocalStorage.constants";
import { getBaseUrl } from "./urlUtils";

export function changeCountryWhenProfileCountryIsDiff() {
  let countryString =
    localStorage &&
    localStorage.getItem &&
    localStorage.getItem(COUNTRY_AND_CURRENCY_PROFILE_LOCAL_STORAGE);
  localStorage.removeItem(COUNTRY_AND_CURRENCY_PROFILE_LOCAL_STORAGE);
  let country = countryString && JSON.parse(countryString);
  let baseURL = getBaseUrl();
  localStorage &&
    localStorage.setItem &&
    localStorage.setItem(
      COUNTRY_AND_CURRENCY_LOCAL_STORAGE,
      JSON.stringify(country)
    );
  if ([UAE_COUNTRY_CODE, SA_COUNTRY_CODE].includes(country.country_code)) {
    let countryCode = UAE_COUNTRY_CODE_FOR_URL;
    if (country.country_code === SA_COUNTRY_CODE) {
      countryCode = SA_COUNTRY_CODE_FOR_URL;
    }
    if (baseURL.match(MULTI_COUNTRY_CODE_FOR_URL)) {
      baseURL = baseURL.replace(MULTI_COUNTRY_CODE_FOR_URL, countryCode);
    } else if (baseURL.match(ARABIC_REG_EX)) {
      baseURL = baseURL.replace(
        BASE_URL_WITHOUT_COUNTRY_CODE,
        `/${countryCode}-ar`
      );
    } else if (baseURL.match(BASE_URL_WITHOUT_COUNTRY_CODE)) {
      baseURL = baseURL.replace(
        BASE_URL_WITHOUT_COUNTRY_CODE,
        `/${countryCode}-en`
      );
    } else {
      baseURL = `${baseURL}/${countryCode}-en`;
    }
    const finalURL = `${baseURL}${window.location.pathname
      .replace("/pwa", "")
      .replace("/ar", "")}${window.location.search}`.replace("//", "/");
    console.log(finalURL);
    window.location.href = `${window.location.origin}${finalURL}`;
  } else {
    console.log(baseURL.match(MULTI_COUNTRY_CODE_AND_LANGUAGE_FOR_URL));
    if (baseURL.match(MULTI_COUNTRY_CODE_AND_LANGUAGE_FOR_URL)) {
      if (baseURL.match(ARABIC_LANGUAGE_WITH_COUNTRY)) {
        baseURL = baseURL.replace(
          MULTI_COUNTRY_CODE_AND_LANGUAGE_FOR_URL,
          "/ar"
        );
      } else {
        console.log(baseURL);
        baseURL = baseURL.replace(MULTI_COUNTRY_CODE_AND_LANGUAGE_FOR_URL, "/");
        console.log(baseURL);
      }
    }

    const finalURL = `${baseURL}${window.location.pathname.replace(
      getBaseUrl(),
      ""
    )}${window.location.search}`.replace("//", "/");

    window.location.href = `${window.location.origin}${finalURL}`;
  }
}
