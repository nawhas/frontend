<template>
  <v-card class="loading-card">
    <h4>Hang on a second...</h4>
    <v-progress-circular indeterminate :size="70" class="primary--text"></v-progress-circular>
  </v-card>
</template>

<script>
import QueryString from 'query-string';

export default {
  name: 'auth-redirect',
  created() {
    const opts = QueryString.parse(location.search);
    if (opts.type === 'signup') {
      this.$store.dispatch('auth/redirectToSignup');
    } else {
      this.$store.dispatch('auth/redirectToLogin');
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../styles/theme';

.loading-card {
  padding: 40px;
  text-align: center;
  position: relative;

  &:before {
    width: 100%;
    content: '';
    display: block;
    height: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(135deg, $theme.primary 0%, $theme.accent 100%);
  }
}
</style>
