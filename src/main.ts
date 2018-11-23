import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import VueYouTubeEmbed from 'vue-youtube-embed';
import './plugins/progress';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;
Vue.use(VueYouTubeEmbed);

sync(store, router);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
