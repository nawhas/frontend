import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/src/stylus/app.styl';
import colors from 'vuetify/es5/util/colors';

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.base,
    secondary: colors.grey.darken2,
    accent: colors.orange.accent3,
    error: colors.red.accent4,
    info: colors.blue.lighten1,
    success: colors.green.lighten2,
    warning: colors.amber.darken2,
  },
  options: {
    customProperties: true,
    iconfont: 'md',
  }
});
