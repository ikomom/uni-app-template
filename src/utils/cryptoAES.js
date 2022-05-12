import CryptoJs from 'crypto-js';

const aesKey = 'tcjknWK7IPgOp0Sb';

export default {
  /**
   * 加密
   */
  encrypt(word) {
    const key = CryptoJs.enc.Utf8.parse(aesKey);
    const srcs = CryptoJs.enc.Utf8.parse(word);
    const encrypted = CryptoJs.AES.encrypt(srcs, key, {
      mode: CryptoJs.mode.ECB,
      padding: CryptoJs.pad.Pkcs7,
    });
    return encrypted.toString();
  },

  /**
   * 解密
   */
  decrypt(word) {
    const key = CryptoJs.enc.Utf8.parse(aesKey);
    const decrypt = CryptoJs.AES.decrypt(word, key, {
      mode: CryptoJs.mode.ECB,
      padding: CryptoJs.pad.Pkcs7,
    });
    return CryptoJs.enc.Utf8.stringify(decrypt).toString();
  },
};
