const en = require('../locales/en')
const zh = require('../locales/zh')

const messages = {
  en,
  zh
}

function onGetLocale(query) {
  return 'en' // query.lang === 'zh' ? 'zh' : 'en'
}

function onT(locale, key) {
  const keys = key.split('.')
  let value = messages[locale]

  for (const k of keys) {
    if (!value || typeof value !== 'object') return key
    value = value[k]
    // console.log(value)
  }

  return typeof value === 'string' ? value : key
}

function onGetTitle(locale, pageTitle) {
  const siteName = onT(locale, 'site.name')
  const siteFullName = onT(locale, 'site.fullName')
  return `${pageTitle} | ${locale === 'en' ? siteName : siteFullName}`
}

module.exports = {
  onGetLocale,
  onT,
  onGetTitle
}
