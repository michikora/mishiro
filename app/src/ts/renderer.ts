import '../css/mishiro.css'
import './common/asar'
import './renderer/developer-api'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Mishiro from '../vue/Mishiro.vue'
import zh from './i18n/zh-CN'
import ja from './i18n/ja-JP'
import en from './i18n/en-US'
import vueGlobal from './renderer/vue-global'
import { remote } from 'electron'

if (process.env.NODE_ENV !== 'production') Object.defineProperty(window, 'ELECTRON_DISABLE_SECURITY_WARNINGS', { value: true })

// if (process.env.NODE_ENV !== 'production') require('./renderer/socket.ts').connect()

Vue.use(VueI18n)
Vue.use(vueGlobal)

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app',
  i18n: new VueI18n({
    locale: remote.getGlobal('configurer').getConfig().language,
    messages: {
      zh,
      ja,
      en
    }
  }),
  render: (h) => h(Mishiro)
})

window.addEventListener('beforeunload', () => {
  remote.app.quit()
})
