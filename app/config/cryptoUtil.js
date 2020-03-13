
const crypto = require('crypto');

const CIPHER_ALGORITHM = 'aes-256-ecb';

var aes256 = {
  encrypt: function (key, plaintext) {
    if (typeof key !== 'string' || !key) {
      throw new TypeError('Provided "key" must be a non-empty string');
    }
    if (typeof plaintext !== 'string' || !plaintext) {
      throw new TypeError('Provided "plaintext" must be a non-empty string');
    }

    var sha256 = crypto.createHash('sha256');
    sha256.update(key);
    var cipher = crypto.createCipheriv(CIPHER_ALGORITHM, key, new Buffer(0));

    var ciphertext = cipher.update(plaintext, 'utf-8', 'base64');
    var encrypted = ciphertext + cipher.final('base64');

    return encrypted;
  },
  decrypt: function (key, encryptedTxt) {
    if (typeof key !== 'string' || !key) {
      throw new TypeError('Provided "key" must be a non-empty string');
    }
    if (typeof encryptedTxt !== 'string' || !encryptedTxt) {
      throw new TypeError('Provided "encryptedTxt" must be a non-empty string');
    }

    // const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, key, new Buffer(0));
    const decipher = crypto.createDecipheriv(CIPHER_ALGORITHM, key, new Buffer(0));
    dec = decipher.update(encryptedTxt, 'base64', 'utf-8');
    dec += decipher.final();
    return JSON.parse(dec);
  }
};

function AesCipher(key) {
  if (typeof key !== 'string' || !key) {
    throw new TypeError('Provided "key" must be a non-empty string');
  }

  Object.defineProperty(this, 'key', {
    value: key
  });
}

AesCipher.prototype.encrypt = function (plaintext) {
  return aes256.encrypt(this.key, plaintext);
};

AesCipher.prototype.decrypt = function (encrypted) {
  return aes256.decrypt(this.key, encrypted);
};

aes256.createCipher = function (key) {
  return new AesCipher(key);
};

module.exports = aes256;