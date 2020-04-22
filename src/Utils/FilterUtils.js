import { parse, stringify } from "query-string";
import cloneDeep from "lodash.clonedeep";
import {
  MPP_BRAND_PREFIX,
  SEARCH_PAGE,
  MPP_CATEGORY_BASE_ROUTE,
  WHATS_NEW_PATH,
  SALE_PATH,
  WHATS_NEW_REG_EX,
  MPP_COLLECTION_PATH,
  INDEX_SEARCH_PAGE
} from "./RouteUrl";

function getBrandName(brandString) {
  return brandString ? brandString.replace("brand-", "") : "";
}
export function getCategoryAndBrandFromUrl(location) {
  const url = location.pathname.split("/");
  let filterObj = {};
  // handling url for category sections like
  // /women/women-bags/side-bag
  // /women/momen-bags/brand-rolex
  // /men/*
  // /kid/*

  if (location.pathname.match(MPP_CATEGORY_BASE_ROUTE)) {
    if (location.pathname.includes("/ar/")) {
      if (url[2]) {
        filterObj.category_level_one_ids = url[2];
      }
      if (url[3]) {
        if (url[3].match(MPP_BRAND_PREFIX)) {
          filterObj.brands = getBrandName(url[3]);
        } else {
          filterObj.category_level_two_ids = url[3];
        }
      }
      if (url[4]) {
        if (url[4].match(MPP_BRAND_PREFIX)) {
          filterObj.brands = getBrandName(url[4]);
        } else {
          filterObj.category_level_three_ids = url[4];
        }
      }
      if (url[5] && url[5].match(MPP_BRAND_PREFIX)) {
        filterObj.brands = getBrandName(url[5]);
      }
    } else {
      if (url[1]) {
        filterObj.category_level_one_ids = url[1];
      }
      if (url[2]) {
        if (url[2].match(MPP_BRAND_PREFIX)) {
          filterObj.brands = getBrandName(url[2]);
        } else {
          filterObj.category_level_two_ids = url[2];
        }
      }
      if (url[3]) {
        if (url[3].match(MPP_BRAND_PREFIX)) {
          filterObj.brands = getBrandName(url[3]);
        } else {
          filterObj.category_level_three_ids = url[3];
        }
      }
      if (url[4] && url[4].match(MPP_BRAND_PREFIX)) {
        filterObj.brands = getBrandName(url[4]);
      }
    }
  } else if (
    location.pathname === SEARCH_PAGE ||
    location.pathname === INDEX_SEARCH_PAGE
  ) {
    filterObj.search = location.search.split("=")[1];
  } else if (location.pathname.match(WHATS_NEW_REG_EX)) {
    if (location.pathname === WHATS_NEW_PATH) {
      filterObj["whats-new"] = 1;
    } else {
      filterObj["whats-new"] = 1;
      filterObj.category_level_one_ids = url[2];
      if (url[3]) {
        filterObj.category_level_two_ids = url[3];
      }
      if (url[4]) {
        filterObj.category_level_three_ids = url[4];
      }
    }
  } else if (location.pathname === SALE_PATH) {
    filterObj["sale"] = 1;
  } else if (location.pathname.includes(SALE_PATH)) {
    filterObj["sale"] = 1;

    if (`/${url[2]}`.match(MPP_CATEGORY_BASE_ROUTE)) {
      filterObj.category_level_one_ids = url[2];
      if (url[3]) {
        filterObj.category_level_two_ids = url[3];
      }
      if (url[4]) {
        filterObj.category_level_three_ids = url[4];
      }
    } else {
      filterObj["sale_slug"] = url[2];
    }
  } else if (location.pathname.includes(MPP_COLLECTION_PATH)) {
    filterObj["collection_slug"] = url[2];
  } else {
    //handling case for brand
    filterObj.brands = url[1];
  }
  return filterObj;
}
// /---------------*****************************-------------------/
// /---------------------------------------------------------------/
// /  Notes:                                                       /
// /  1. Here const parsedFilter means filter getting from query   /
// /     params and parsed by queryString package                  /
// /  2. Here const urlFilters means filters getting from url      /
// /     like /women/women-handbags                                /
// /---------------------------------------------------------------/
// /---------------*****************************-------------------/

function getArrayEntity(item) {
  return typeof item == "string" ? [item] : item;
}
export function getAllFilters(location) {
  let state = {};
  const parsedFilter = parse(location.search);
  const urlFilters = getCategoryAndBrandFromUrl(location);
  let initialFilters = stringify(urlFilters);
  initialFilters = initialFilters ? initialFilters.replace(/&/g, "#") : "";
  if (parsedFilter["filter[brand][]"] || parsedFilter["result_view_sort"]) {
    state = {
      colours: parsedFilter["filter[colour][]"]
        ? getArrayEntity(parsedFilter["filter[colour][]"])
        : [],
      conditions: parsedFilter["filter[condition][]"]
        ? getArrayEntity(parsedFilter["filter[condition][]"])
        : [],

      price: parsedFilter["filter[price]"]
        ? parsedFilter["filter[price]"].split("-")
        : [],

      sizes: parsedFilter["filter[sizes][]"]
        ? getArrayEntity(parsedFilter["filter[sizes][]"])
        : [],
      sort_by: parsedFilter.result_view_sort,
      // "per-page": parsedFilter["per-page"],
      // sale_slug: parsedFilter.sale_slug,
      // collection_slug: parsedFilter.collection_slug,
      //whats-new
      //sale
      category_level_two_ids: parsedFilter["filter[category_two][]"]
        ? getArrayEntity(parsedFilter["filter[category_two][]"])
        : [],
      category_level_one_ids: parsedFilter["filter[category_one][]"]
        ? getArrayEntity(parsedFilter["filter[category_one][]"])
        : [],
      category_level_three_ids: parsedFilter["filter[category_three][]"]
        ? getArrayEntity(parsedFilter["filter[category_three][]"])
        : [],
      brands: parsedFilter["filter[brand][]"]
        ? getArrayEntity(parsedFilter["filter[brand][]"])
        : []
    };
    if (parsedFilter.page) {
      state.page = parsedFilter.page;
    }
    if (parsedFilter.hide_sold_item) {
      state.only_available = 1;
    }
  } else {
    state = {
      colours: parsedFilter.colours ? parsedFilter.colours.split(",") : [],
      conditions: parsedFilter.conditions
        ? parsedFilter.conditions.split(",")
        : [],

      price: parsedFilter.price ? parsedFilter.price.split("-") : [],
      sizes: parsedFilter.sizes ? parsedFilter.sizes.split(",") : [],
      search: parsedFilter.search,
      sort_by: parsedFilter.sort_by,
      "per-page": parsedFilter["per-page"],
      page: parsedFilter.page,
      sale_slug: parsedFilter.sale_slug,
      collection_slug: parsedFilter.collection_slug,
      initial_params: initialFilters
    };
  }
  if (
    parsedFilter.category_level_one_ids ||
    urlFilters.category_level_one_ids
  ) {
    let currentL1 = [];

    if (parsedFilter.category_level_one_ids) {
      currentL1 = parsedFilter.category_level_one_ids.split(",");
      if (
        urlFilters.category_level_one_ids &&
        !currentL1.includes(urlFilters.category_level_one_ids)
      ) {
        currentL1.push(urlFilters.category_level_one_ids);
      }
    } else {
      currentL1.push(urlFilters.category_level_one_ids);
    }
    state.category_level_one_ids = currentL1.length ? currentL1 : [];
  }
  if (
    parsedFilter.category_level_two_ids ||
    urlFilters.category_level_two_ids
  ) {
    let currentL2 = [];
    if (parsedFilter.category_level_two_ids) {
      currentL2 = parsedFilter.category_level_two_ids.split(",");
      if (
        urlFilters.category_level_two_ids &&
        !currentL2.includes(urlFilters.category_level_two_ids)
      ) {
        currentL2.push(urlFilters.category_level_two_ids);
      }
    } else {
      currentL2.push(urlFilters.category_level_two_ids);
    }
    state.category_level_two_ids = currentL2.length ? currentL2 : [];
  }
  if (
    parsedFilter.category_level_three_ids ||
    urlFilters.category_level_three_ids
  ) {
    let currentL3 = [];
    if (parsedFilter.category_level_three_ids) {
      currentL3 = parsedFilter.category_level_three_ids.split(",");
      if (
        !currentL3.includes(urlFilters.category_level_three_ids) &&
        urlFilters.category_level_three_ids
      ) {
        currentL3.push(urlFilters.category_level_three_ids);
      }
    } else {
      currentL3.push(urlFilters.category_level_three_ids);
    }
    state.category_level_three_ids = currentL3.length ? currentL3 : [];
  }
  if (parsedFilter.brands || urlFilters.brands) {
    let brands = [];
    if (parsedFilter.brands) {
      brands = parsedFilter.brands.split(",");
      if (urlFilters.brands && !brands.includes(urlFilters.brands)) {
        brands.push(urlFilters.brands);
      }
    } else {
      brands.push(urlFilters.brands);
    }
    state.brands = brands.length ? brands : [];
  }
  if (urlFilters["whats-new"]) {
    state["whats-new"] = 1;
  } else {
    delete state["whats-new"];
  }
  if (urlFilters["sale"]) {
    state["sale"] = 1;
  } else {
    delete state["sale"];
  }
  if (urlFilters["sale_slug"]) {
    state["sale_slug"] = urlFilters["sale_slug"];
  } else {
    delete state["sale_slug"];
  }
  if (urlFilters["collection_slug"]) {
    state["collection_slug"] = urlFilters["collection_slug"];
  } else {
    delete state["collection_slug"];
  }
  if (parsedFilter.only_available) {
    state.only_available = 1;
  }

  return state;
}

export function getFilterUrlString(location) {
  const parsedFilter = getAllFilters(location);

  if (
    parsedFilter.category_level_one_ids &&
    parsedFilter.category_level_one_ids.length
  ) {
    parsedFilter.category_level_one_ids = `${
      parsedFilter.category_level_one_ids
    }`;
  } else if (parsedFilter.category_level_one_ids) {
    delete parsedFilter.category_level_one_ids;
  }
  if (
    parsedFilter.category_level_two_ids &&
    parsedFilter.category_level_two_ids.length
  ) {
    parsedFilter.category_level_two_ids = `${
      parsedFilter.category_level_two_ids
    }`;
  } else if (parsedFilter.category_level_two_ids) {
    delete parsedFilter.category_level_two_ids;
  }
  if (
    parsedFilter.category_level_three_ids &&
    parsedFilter.category_level_three_ids.length
  ) {
    parsedFilter.category_level_three_ids = `${
      parsedFilter.category_level_three_ids
    }`;
  } else if (parsedFilter.category_level_three_ids) {
    delete parsedFilter.category_level_three_ids;
  }
  if (parsedFilter.colours && parsedFilter.colours.length) {
    parsedFilter.colours = `${parsedFilter.colours}`;
  } else if (parsedFilter.colours) {
    delete parsedFilter.colours;
  }
  if (parsedFilter.conditions && parsedFilter.conditions.length) {
    parsedFilter.conditions = `${parsedFilter.conditions}`;
  } else if (parsedFilter.conditions) {
    delete parsedFilter.conditions;
  }
  if (parsedFilter.brands && parsedFilter.brands.length) {
    parsedFilter.brands = `${parsedFilter.brands}`;
  } else if (parsedFilter.brands) {
    delete parsedFilter.brands;
  }
  if (parsedFilter.sizes && parsedFilter.sizes.length) {
    parsedFilter.sizes = `${parsedFilter.sizes}`;
  } else if (parsedFilter.sizes) {
    delete parsedFilter.sizes;
  }
  if (parsedFilter.price && parsedFilter.price.length) {
    parsedFilter.price = `${parsedFilter.price.join("-")}`;
  }
  if (parsedFilter["whats-new"]) {
    parsedFilter["whats-new"] = 1;
  }
  if (parsedFilter["sale"]) {
    parsedFilter["sale"] = 1;
  }

  return parsedFilter;
}

// ----------------**************----------------
// ----------------**************----------------
// This function is for when we need to decode
// initial_params in URIComponent then we have
// to use this function
// ----------------**************----------------
// ----------------**************----------------
// ----------------**************----------------

export function returnUrlWithInitialParams(parsedFilter) {
  const initialParams = cloneDeep(parsedFilter).initial_params;

  delete parsedFilter.initial_params;

  let stringified = stringify(parsedFilter);
  stringified = `${stringified}&initial_params=${initialParams}`;
  return stringified;
}
