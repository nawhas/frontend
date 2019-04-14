<template>
  <v-app id="keep">
    <v-navigation-drawer
        v-model="drawer"
        fixed
        clipped
        floating
        width="250"
        app>
      <div v-for="(item, index) in navigation" :key="item.group">
        <v-list class="nav">
          <v-list-tile class="nav__tile" v-for="link in item.children"
                       :key="link.to"
                       :to="link.to"
                       active-class="nav__tile--active"
                       :exact="link.exact">
            <v-list-tile-action class="nav__tile__action">
              <v-icon class="nav__tile__action__icon">{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content class="nav__tile__content">
              <v-list-tile-title class="nav__tile__content__title">{{ link.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <v-divider v-if="index < navigation.length - 1"></v-divider>
      </div>
    </v-navigation-drawer>
    <v-toolbar color="white" app fixed clipped-left flat>
      <v-toolbar-side-icon @click.native="drawer = !drawer" v-show="$vuetify.breakpoint.mdAndDown" />
      <span class="title mr-5">
        <img class="masthead__logo masthead__logo--desktop" src="../assets/logo.svg"
             :height="$vuetify.breakpoint.smAndDown ? 32 : 38"
             onerror="this.src='../assets/logo.png'" alt="Nawhas.com">
      </span>
      <v-spacer></v-spacer>
      <template v-if="isAuthenticated">
        <v-btn flat @click="$store.dispatch('auth/logout')">logout</v-btn>
        <v-btn icon to="/auth/redirect">
          <v-icon>account_circle</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn flat @click="$store.dispatch('auth/redirectToLogin')">Login</v-btn>
      </template>
    </v-toolbar>
    <v-content>
      <v-container fluid class="grey lighten-5 main-container">
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import navItems from '@/data/navigation';

@Component
export default class PublicVuetify extends Vue {
  private items = navItems;

  private drawer: boolean | null = null;

  mounted() {
    if (this.$store.getters['auth/authenticated']) {
      if (!this.$store.getters['auth/userRole']) {
        this.$store.dispatch('auth/fetchUser');
      }
    }
  }

  get isAuthenticated() {
    return this.$store.getters['auth/authenticated'];
  }

  get navigation() {
    const items: object[] = [];
    const role = this.$store.getters['auth/userRole'];

    for (const group of this.items) {
      const children = [];
      group.children.forEach((child) => {
        if (child.role && child.role !== role) {
          return;
        }
        children.push(child);
      });
      group.children = children;

      if (group.children.length > 0) {
        items.push(group);
      }
    }

    return items;
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  padding: 0;
}

.nav__tile__action {
  justify-content: center;
}

.nav__tile--active {
  .nav__tile__action {
    color: var(--v-primary-base);
  }
  .nav__tile__content {
    font-weight: bold;
    color: var(--v-primary-base);
  }
}
</style>
