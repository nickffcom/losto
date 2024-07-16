import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import GENERAL_CONFIG_EN from 'src/locales/en/common.json'
import ERROR_CONFIG_EN from 'src/locales/en/error.json'
import HOME_CONFIG_EN from 'src/locales/en/header.json'
import PRODUCT_CONFIG_EN from 'src/locales/en/product.json'
import GENERAL_CONFIG_VI from 'src/locales/vi/common.json'
import ERROR_CONFIG_VI from 'src/locales/vi/error.json'
import HOME_CONFIG_VI from 'src/locales/vi/header.json'
import PRODUCT_CONFIG_VI from 'src/locales/vi/product.json'
export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
}

const resources = {
  en: {
    home: HOME_CONFIG_EN,
    product: PRODUCT_CONFIG_EN,
    error: ERROR_CONFIG_EN,
    general: GENERAL_CONFIG_EN
  },
  vi: {
    home: HOME_CONFIG_VI,
    product: PRODUCT_CONFIG_VI,
    error: ERROR_CONFIG_VI,
    general: GENERAL_CONFIG_VI
  }
}

const options = {
  order: ['localStorage', 'navigator', 'htmlTag', 'path'],
  lookupLocalStorage: 'i18nextLng',
  caches: ['localStorage'],
  htmlTag: window.document ? window.document.head : undefined
}

/* const defaultNS = 'home' */

// eslint-disable-next-line import/no-named-as-default-member
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    detection: options,
    ns: ['home', 'general', 'product', 'error'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    debug: false
  })
export default i18n
