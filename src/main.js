import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueDatePicker from '@mathieustan/vue-datepicker';
import moment from 'moment'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY')
  }
})

Vue.filter('formatTime', function(value) {
  if (value) {
    return moment(value).format('hh[hrs] mm[mins] ss[secs]')
  }
})

Vue.filter('formatToDays', function(value) {
  if(value < 3600) {
    return `${Math.floor(value / 60)} Minute(s)`;
  }
  else if(value < 86400) {
    return `${Math.floor(value / 3600)} Hour(s) ${Math.floor((value % 3600) / 60)} Min(s)`;
  } else {
    return `${Math.floor(value / 86400)} Day(s)`;
  }
})

Vue.filter('formatToHours', function(value) {
  if(value) {
    return Math.floor(value / 3600);
  }
})

Vue.use(VueDatePicker);

Object.defineProperty(Vue.prototype, '$moment', { value: moment });

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
