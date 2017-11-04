import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import az from './az.js'

// what is this called again?
const svc = 'https://eimsfunchello9c2a.blob.core.windows.net'
const _svc = 'eimsfunchello9c2a'
const container = 'mcoe-ipas'
const sas = 'https://appload-sas-token.azurewebsites.net/api/GetSasToken-Node?code=ehp76eDOr/1tEGKGtUOU0NdLXXtXtbCoL4vITYairZCaLdZCVqGaig=='

Vue.use({ install (Vue, opts) {
  Vue.prototype.$az = az
  az.init(_svc, container, sas)
}})

Vue.use(VueRouter)

const app = new Vue({
  el: '#app',
  render: h => h(App),
  created () {
  }
})
