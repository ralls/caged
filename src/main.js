// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/'
import App from './App'
import router from './router'

var VueMaterial = require('vue-material')

Vue.use(VueMaterial)

Vue.material.registerTheme({
    default: {
        primary: 'blue-grey',
        accent: 'blue'
    }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    VueMaterial,
    template: '<App/>',
    components: { App }
})
