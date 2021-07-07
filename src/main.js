import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
// import BootstrapVueIcons from 'bootstrap-vue'
import { extend } from "vee-validate";
import { localize } from 'vee-validate';
import * as rules from "vee-validate/dist/rules";
import en from 'vee-validate/dist/locale/en.json';
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
// import 'bootstrap-vue/src/icons.scss'

Vue.use(BootstrapVue)
// Vue.use(BootstrapVueIcons)
// Install rules
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});
localize({
  en,
});

new Vue({
  el: '#app',
  render: h => h(App)
})
