// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import App from './App.vue'

Vue.use(Vuex)
Vue.use(VueI18n)
const translation = require('../translation')

function getLang() {
  if (navigator.languages !== undefined) {
    return navigator.languages[0]
  } else if (navigator.language) {
    return navigator.language
  } else {
    return 'en'
  }
}

window['loadLoginPage'] = function loadPage(serverUri, authenticators, mountId, loginSucceeds, brand, style, loginErr) {
  if (!serverUri) throw (Error('no serverUri provided'))
  if (!authenticators) throw (Error('no authenticators provided'))
  if (!mountId || !document.getElementById(mountId)) throw (Error('no mountId provided'))
  if (!loginSucceeds) throw (Error('no loginSucceeds provided'))

  for (let i = 0; i < authenticators.length; i++) {
    if (!authenticators[i].provider) {
      document.getElementById(mountId).replaceWith('ERROR no provider provided for' + authenticators[i])

      throw Error('no provider provided for ' + authenticators[i])
    }

    authenticators[i].button_id = 'logibutton_' + authenticators[i].provider
  }

  const defaultStyle = {
    text: '',
    backgroundColor: 'rgba(244, 241, 255, 0.5)',
    footerColor: 'white',
    buttonColor: '#4CAF50',
    footerBorderColor: '#d8d8d8',
    contentBorderColor: '#e4e4e4'

  }

  if (!style) style = {}

  if (!style.backgroundColor) style.backgroundColor = defaultStyle.backgroundColor
  if (!style.footerColor) style.footerColor = defaultStyle.footerColor
  if (!style.buttonColor) style.buttonColor = defaultStyle.buttonColor
  if (!style.footerBorderColor) style.footerBorderColor = defaultStyle.footerBorderColor
  if (!style.contentBorderColor) style.contentBorderColor = defaultStyle.contentBorderColor

  const defaultBrand = {
    title: 'brand title',
    credits: 'brand credits',
    termsLink: 'terms.html',
    brandLink: '',
    creditsLink: ''
  }

  if (!brand) brand = {}

  if (!brand.title) brand.title = defaultBrand.title
  if (!brand.credits) brand.credits = defaultBrand.credits
  if (!brand.termsLink) brand.termsLink = defaultBrand.termsLink
  if (!brand.brandLink) brand.brandLink = defaultBrand.brandLink
  if (!brand.creditsLink) brand.creditsLink = defaultBrand.creditsLink

  // draw the page
  // $('#' + mountId).html('<page-auth />')
  const store = new Vuex.Store({ // eslint-disable-line no-new
    state: {
      authenticators: authenticators,
      serverUri: serverUri,
      registerMode: false,
      loginSucceeds: loginSucceeds,
      loginErr: loginErr,
      brand: brand,
      style: style
    },
    mutations: {
      switchMode(state) {
        state.registerMode = !state.registerMode
      }
    }
  })

  const i18n = new VueI18n({
    locale: getLang(), // set locale
    messages: translation // set locale messages
  })

  new Vue({ // eslint-disable-line no-new
    el: '#' + mountId,
    render: (h) => h(App),
    store: store,
    i18n
  })
  // mount the page
}