<template>
  <v-app>
    <main class="splash">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  name: 'splash',
};
</script>

<style scoped lang="stylus">
.splash {
  background: #fcfcfc;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
