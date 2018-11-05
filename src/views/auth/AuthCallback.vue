<template>
  <v-card class="loading-card">
    <h4>Login Successful</h4>
    <p>One second. You'll be redirected soon.</p>
    <br>
    <v-progress-circular indeterminate :size="70" class="primary--text"></v-progress-circular>
  </v-card>
</template>

<script>
export default {
  name: 'auth-callback',
  created() {
    this.$store.dispatch('auth/login');
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
