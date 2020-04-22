import { isArabicLanguageUrl } from "./UserAgent";

export function renderDateFormat(date, showAccordingToMonthNumber) {
  if (!date) {
    return "";
  }
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const arMonthNames = [
    "كانون الثاني",
    "شهر فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "شهر اكتوبر",
    "شهر نوفمبر",
    "ديسمبر"
  ];
  var dateObj = new Date(parseInt(date) * 1000);
  var month = showAccordingToMonthNumber
    ? dateObj.getMonth() + 1
    : isArabicLanguageUrl()
    ? arMonthNames[dateObj.getMonth()]
    : monthNames[dateObj.getMonth()];
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var newDate = "";
  if (showAccordingToMonthNumber) {
    newDate = " " + day + "." + month + "." + year;
  } else {
    newDate = " " + day + " " + month + " " + year + " ";
  }

  return newDate;
}
