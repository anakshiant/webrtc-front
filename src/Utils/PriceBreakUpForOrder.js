import React from "react";
import { FormattedMessage } from "react-intl";
import MyAccountMessage from "../MyAccount/Message/MyAccountMessage";

export function getPriceBreakupForOrder(orderDetails) {
  const refundDetails = [];
  if (Math.abs(orderDetails.item_amount) > 0) {
    let price = orderDetails.item_amount;
    refundDetails.push({
      title: <FormattedMessage {...MyAccountMessage.amount} />,
      amount: price,
      isHighlighted: false,
      showNegativeSign: false
    });
  }
  if (Math.abs(orderDetails.refund_vat) > 0) {
    let price = orderDetails.refund_vat;
    refundDetails.push({
      title: <FormattedMessage {...MyAccountMessage.vat} />,
      amount: price,
      isHighlighted: false,
      showNegativeSign: false
    });
  }
  if (Math.abs(orderDetails.refund_shipping_fee) > 0) {
    let price = orderDetails.refund_shipping_fee;
    refundDetails.push({
      title: <FormattedMessage {...MyAccountMessage.shipping} />,
      amount: price,
      isHighlighted: false,
      showNegativeSign: false
    });
  }
  if (Math.abs(orderDetails.total_installment_paid) > 0) {
    let price = orderDetails.total_installment_paid;
    refundDetails.push({
      title: <FormattedMessage {...MyAccountMessage.paidAmount} />,
      amount: price,
      isHighlighted: false,
      showNegativeSign: false
    });
  }

  if (Math.abs(orderDetails.refund_redemption_amount) > 0) {
    let price = orderDetails.refund_redemption_amount;
    refundDetails.push({
      title: <FormattedMessage {...MyAccountMessage.redemption} />,
      amount: price,
      isHighlighted: false,
      showNegativeSign: true
    });
  }

  if (Math.abs(orderDetails.refund_voucher_amount) > 0) {
    let price = orderDetails.refund_voucher_amount;
    refundDetails.push({
      title: <FormattedMessage {...MyAccountMessage.voucher} />,
      amount: price,
      isHighlighted: false,
      showNegativeSign: true
    });
  }

  if (Math.abs(orderDetails.late_fee) > 0) {
    let price = orderDetails.late_fee;
    refundDetails.push({
      title: <FormattedMessage {...MyAccountMessage.lateFee} />,
      amount: price,
      isHighlighted: false,
      showNegativeSign: true
    });
  }

  if (Math.abs(orderDetails.cancellation_fee) > 0) {
    let price = orderDetails.cancellation_fee;
    refundDetails.push({
      title: <FormattedMessage {...MyAccountMessage.cancellationFee} />,
      amount: price,
      isHighlighted: false,
      showNegativeSign: true
    });
  }

  if (Math.abs(orderDetails.refund_store_credit) > 0) {
    let price = orderDetails.refund_store_credit;
    refundDetails.push({
      title: <FormattedMessage {...MyAccountMessage.storeCredit} />,
      amount: price,
      isHighlighted: false,
      showNegativeSign: true
    });
  }

  if (Math.abs(orderDetails.restock_fee) > 0) {
    let price = orderDetails.restock_fee;
    refundDetails.push({
      title: <FormattedMessage {...MyAccountMessage.restockingFees} />,
      amount: price,
      isHighlighted: false,
      showNegativeSign: true
    });
  }
  return refundDetails;
}
