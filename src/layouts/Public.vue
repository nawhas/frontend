<template>
  <v-app>
    <header :class="{masthead: true, 'masthead--compact': $vuetify.breakpoint.smAndDown}">
      <div class="masthead__title">
        <v-btn icon class="masthead__nav-button" v-show="$vuetify.breakpoint.smAndDown" @click="sidebar = !sidebar">
          <v-icon>menu</v-icon>
        </v-btn>
        <img class="masthead__logo masthead__logo--desktop" src="../assets/logo.svg" height="38"
             onerror="this.src='../assets/logo.png'" alt="Nawhas.com">
        <img class="masthead__logo masthead__logo--mobile" src="../assets/nawhas-logo-256.png" height="38"
             alt="Nawhas.com">
      </div>
      <div class="masthead__search">
        <v-btn icon class="search__search-icon"><v-icon>search</v-icon></v-btn>
        <v-btn icon class="search__clear-icon"><v-icon>clear</v-icon></v-btn>
        <div class="search__box">
          <input type="text" :placeholder="searchPlaceholder"/>
        </div>
      </div>
      <div class="masthead__right" v-show="!$vuetify.breakpoint.smAndDown">
        <router-link tag="span" to="/auth/redirect" v-if="!authenticated">
          <v-btn flat>Log In</v-btn>
        </router-link>
        <router-link tag="span" to="/auth/redirect?type=signup" v-if="!authenticated">
          <v-btn flat primary>Sign Up</v-btn>
        </router-link>
        <v-btn flat @click="logout" v-if="authenticated">Log Out</v-btn>
      </div>
    </header>
    <sidebar :toggled="sidebar"></sidebar>
    <main :class="{'main-content--compact': $vuetify.breakpoint.smAndDown}">
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script lang="ts">
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Home',
  components: {
    Sidebar,
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    }
  },
  data() {
    return {
      sidebar: false,
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters['auth/authenticated'];
    },
    searchPlaceholder() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return 'Search';
      }

      return 'Search for reciters, nawhas, and more...';
    },
    sidebarClasses() {
      return {
        'nav-sidebar': true,
        'nav-sidebar--slider': this.$vuetify.breakpoint.smAndDown,
        'elevation-8': this.$vuetify.breakpoint.smAndDown,
      };
    }
  },
};
</script>

<style lang="scss" scoped>
.masthead {
  background: white;
  padding: 10px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: min-content;
  width: 100%;
  height: 72px;
  position: fixed;
  white-space: nowrap;
  top: 0;
  left: 0;

  .masthead__title {
    display: flex;
    min-width: 260px;
    padding-right: 30px;
    padding-left: 8px;
    align-items: center;

    .masthead__logo--desktop {
      display: block;
    }
    .masthead__logo--mobile {
      display: none;
    }
  }

  .masthead__search {
    background: rgba(0, 0, 0, 0.04);
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 4px;
    margin-left: auto;
    margin-right: auto;
    max-width: 720px;
    position: relative;
    transition: background 100ms ease-in, width 100ms ease-out;
    white-space: nowrap;
    flex: 1 1 auto;

    .search__search-icon {
      float: left;
    }
    .search__clear-icon {
      position: absolute;
      right: 0;
      cursor: default;
      visibility: hidden;
      top: 0;
      transition: opacity 250ms ease-out;
    }

    .search__box {
      height: 50px;
      padding: 0 11px;
      margin-right: 48px;

      input {
        border: none;
        font: normal 16px Roboto, sans-serif;
        font-variant-ligatures: none;
        height: 50px;
        outline: none;
        padding: 11px 16px 13px 0;
        width: 100%;
        background: transparent;
      }
    }
  }
  .masthead__right {
    text-align: right;
  }
}


.masthead--compact {
  padding-left: 0;
  .masthead__title {
    min-width: 50%;
    padding-left: 0;
  }
}

.nav-sidebar {
  width: 260px;
  height: 100%;
  position: fixed;
  top: 64px;
  left: 0;
  padding: 8px 0 0 0;
  background: white;
  overflow-y: auto;
  overflow-x: hidden;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  will-change: left;

  &.nav-sidebar--slider {
    left: 0;
    top: 0;

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
}


main {
  padding-left: 260px;
  padding-top: 72px;

  &.main-content--compact {
    padding-left: 0;
  }
}
</style>
