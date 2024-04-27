import CryptoJS from 'crypto-js'

const { encrypt, decrypt } = (() => {
  const ENCRYPT_KEY =
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCeCDcnFrS7DIRbvZLHreVUzaMbAFy2DYmioxBK606urY4rVR8IgLgUhnyw2/GQ99pyr8lGtqPeOoapantw1XwEVyi74MDxs4UDL8j4OZR1Es7HVGOB0GwKWobdU9cm/1iDwGyouSmijxKyAePg6KsLNgbjDPYZRS11bYEuZ8/RLQIDAQAB' // 定义实际的加密密钥

  /**
   * Encrypts the given data using AES encryption.
   * This function takes an object, converts it to a JSON string, then encrypts it using AES encryption method provided by CryptoJS.
   * The encrypted data is returned as a Base64 encoded string.
   *
   * @param {object} data - The data to be encrypted. This should be an object that needs to be secured.
   * @returns {string} The encrypted data in Base64 format. This can be stored or transmitted securely.
   */
  function encrypt(data) {
    const jsonStr = JSON.stringify(data)
    return CryptoJS.AES.encrypt(jsonStr, ENCRYPT_KEY).toString()
  }

  /**
   * Decrypts the given encrypted data using AES decryption.
   * This function takes an encrypted data string, decrypts it using AES encryption,
   * and returns the decrypted data as a JavaScript object.
   *
   * @param {string} encryptedData - The encrypted data in Base64 format.
   *                                  This is the data that will be decrypted.
   *
   * @returns {object} The decrypted data as a JavaScript object.
   *                   This is the parsed JSON object obtained after decrypting
   *                   the input encrypted data.
   */
  function decrypt(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPT_KEY)
    const decryptedJson = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedJson)
  }

  return { encrypt, decrypt }
})()

const storageHelper = {
  /**
   * Retrieves the decrypted value associated with the given key from localStorage.
   * @param {string} key - The key to retrieve from localStorage.
   * @returns {object|undefined} The decrypted value or undefined if an error occurs during decryption.
   */
  get(key) {
    const encryptedValue = localStorage.getItem(key)
    if (!encryptedValue) return undefined
    try {
      return decrypt(encryptedValue)
    } catch (error) {
      console.error('Error decrypting value:', error)
      return undefined
    }
  },

  /**
   * Stores the encrypted value associated with the given key in localStorage.
   * @param {string} key - The key to store in localStorage.
   * @param {object} value - The value to be encrypted and stored.
   */
  set(key, value) {
    const encryptedValue = encrypt(value)
    localStorage.setItem(key, encryptedValue)
  },

  /**
   * Removes the item with the given key from localStorage.
   * @param {string} key - The key to remove from localStorage.
   */
  clear(key) {
    localStorage.removeItem(key)
  },
}

export default storageHelper
