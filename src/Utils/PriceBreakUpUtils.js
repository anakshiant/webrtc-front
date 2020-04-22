export function convertPriceFormat(price) {
  return Math.round(price * 100) / 100;
}

export function displayTlcPrice(collection) {
  let display_price,
    display_orp,
    discount,
    price = {};
  if (collection && collection.display_price && collection.display_price > 0) {
    display_price = collection.display_price;
  } else if (
    collection &&
    collection.price_tlc_multi_country &&
    collection.price_tlc_multi_country > 0
  ) {
    display_price = collection.price_tlc_multi_country;
  } else if (collection && collection.price_tlc && collection.price_tlc > 0) {
    display_price = collection.price_tlc;
  } else if (
    collection &&
    collection.price_tlc_vat &&
    collection.price_tlc_vat > 0
  ) {
    display_price = collection.price_tlc_vat;
  }

  if (collection && collection.display_orp && collection.display_orp > 0) {
    display_orp = collection.display_orp;
  } else if (
    collection &&
    collection.price_original_multi_country &&
    collection.price_original_multi_country > 0
  ) {
    display_orp = collection.price_original_multi_country;
  } else if (
    collection &&
    collection.price_original &&
    collection.price_original > 0
  ) {
    display_orp = collection.price_original;
  } else if (
    collection &&
    collection.price_original_vat &&
    collection.price_original_vat > 0
  ) {
    display_orp = collection.price_original_vat;
  }

  if (display_orp == display_price) {
    display_orp = "null";
  }
  discount = Math.round(
    display_orp > display_price &&
      ((display_orp - display_price) * 100) / display_orp
  );
  if (display_price) {
    price.display_price = display_price;
    price.display_orp = display_orp;
    price.discount = discount;
  } else {
    price.display_price = display_orp;
    price.display_orp = 0;
    price.discount = 0;
  }
  return price;
}

export function getOfferDiscount(product) {
  let voucher_amount = 0;
  let voucher_discount = 0;
  if (product && product.promoted_voucher_amount_multi_country) {
    voucher_amount = product.promoted_voucher_amount_multi_country;
  } else if (product && product.promoted_voucher_amount_vat_full) {
    voucher_amount = product.promoted_voucher_amount_vat_full;
  } else if (product && product.promoted_voucher_amount_vat) {
    voucher_amount = product.promoted_voucher_amount_vat;
  } else if (product && product.promoted_voucher_amount) {
    voucher_amount = product.promoted_voucher_amount;
  }

  if (voucher_amount > 0) {
    // voucher_amount = Float(voucher_amount.getSelectedCurrencyRateValue(rate: self.currencyRate)) ?? 0.0

    var productPrice = 0;

    if (product && product.display_price) {
      productPrice = product.display_price;
    } else if (product && product.display_orp) {
      productPrice = product.display_orp;
    }

    let differencePrice = productPrice - voucher_amount;
    if (differencePrice > 0) {
      let percentage = (differencePrice * 100) / productPrice;
      if (percentage > 0) {
        voucher_discount = Math.round(percentage);
      }
    }
  }
  return voucher_discount;
}
