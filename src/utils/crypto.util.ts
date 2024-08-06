import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("tathanhabcdefe9bc");
const iv = CryptoJS.enc.Utf8.parse("0123456789tathanh");

export function aesEncrypt(data: any) {
  if (!data) return data;
  const enc = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return enc.toString();
}

export function aesDecrypt(data: any) {
  if (!data) return data;
  const dec = CryptoJS.AES.decrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return dec.toString(CryptoJS.enc.Utf8);
}

export function md5(str: string) {
  return CryptoJS.MD5(str).toString();
}
