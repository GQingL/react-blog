import CryptoJS from 'crypto-js'
const ENCRYPT_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCeCDcnFrS7DIRbvZLHreVUzaMbAFy2DYmioxBK606urY4rVR8IgLgUhnyw2/GQ99pyr8lGtqPeOoapantw1XwEVyi74MDxs4UDL8j4OZR1Es7HVGOB0GwKWobdU9cm/1iDwGyouSmijxKyAePg6KsLNgbjDPYZRS11bYEuZ8/RLQIDAQAB'

const encrypt = dataToStorage => {
  return CryptoJS.AES.encrypt(JSON.stringify(dataToStorage), ENCRYPT_KEY)
}

const decrypt = dataFromStorage => {
  const bytes = CryptoJS.AES.decrypt(dataFromStorage, ENCRYPT_KEY)
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  return decryptedData
}

const storageHelper = {
  get: key => {
    try {
      const formatted = decrypt(localStorage.getItem(key))
      return formatted
    } catch (e) {
      return undefined
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, encrypt(value))
  },
  clear: key => {
    localStorage.removeItem(key)
  },
}

export default storageHelper
