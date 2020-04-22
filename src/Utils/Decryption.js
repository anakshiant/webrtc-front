import CryptoJS from "./aes";
import { CONFIGURATION_API_KEY } from "./Constants";

var CryptoJSAesJson = {
  stringify: function(cipherParams) {
    var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    return JSON.stringify(j).replace(/\s/g, "");
  },
  parse: function(jsonStr) {
    var j = JSON.parse(jsonStr);
    var cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct)
    });
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    return cipherParams;
  }
};

export function aesDecryption(cipher) {
  let res = atob(cipher);
  res = res.replace(/&quot;/g, '"');
  res = JSON.parse(res);
  let decryptObj = {};

  Object.keys(res).map(item => {
    var key = JSON.parse(
      CryptoJS.AES.decrypt(item, CONFIGURATION_API_KEY, {
        format: CryptoJSAesJson
      }).toString(CryptoJS.enc.Utf8)
    );

    var value = JSON.parse(
      CryptoJS.AES.decrypt(res[item], CONFIGURATION_API_KEY, {
        format: CryptoJSAesJson
      }).toString(CryptoJS.enc.Utf8)
    );
    decryptObj[key] = value;
  });

  return decryptObj;
}
