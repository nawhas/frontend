<template>
  <v-app>
    <nprogress-container></nprogress-container>
    <header class="masthead">
      <div class="masthead__title">
        <img src="../assets/nawhas-logo-wordmark-vector.svg" height="38"
             onerror="this.src='../assets/nawhas-logo-wordmark-48.png'" alt="Nawhas.com">
      </div>
      <div class="masthead__search">
        <v-btn icon class="search__search-icon">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon class="search__clear-icon">
          <v-icon>clear</v-icon>
        </v-btn>
        <div class="search__box">
          <input type="text" placeholder="Search for reciters, nawhas, and more..."/>
        </div>
      </div>
      <div class="masthead__right">
        <router-link tag="span" to="/auth/redirect" v-if="!authenticated">
          <v-btn flat>Log In</v-btn>
        </router-link>
        <router-link tag="span" to="/auth/redirect?type=signup" v-if="!authenticated">
          <v-btn flat primary>Sign Up</v-btn>
        </router-link>
        <v-btn flat @click="logout" v-if="authenticated">Log Out</v-btn>
      </div>
    </header>
    <aside class="nav-sidebar">
      <div class="nav-sidebar__list">
        <div v-for="(item, index) in navigation" :key="item.group">
          <v-list>
            <v-list-tile v-for="link in item.children" :key="link.to" :to="link.to" :exact="link.exact">
              <v-list-tile-action>
                <v-icon>{{ link.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>{{ link.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-divider v-if="index < navigation.length - 1"></v-divider>
        </div>
      </div>
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer';

export default {
  name: 'Home',
  components: {
    NprogressContainer
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    }
  },
  computed: {
    authenticated() {
      return this.$store.getters['auth/authenticated'];
    },
    navigation() {
      // return filtered nav list based on role
      const items = [];
      const role = this.$store.getters['auth/userRole'];

      this.items.forEach((group) => {
        if (role) {
          if (group.role && group.role !== role.role) {
            return;
          }
        }

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
      });

      return items;
    },
  },
  data() {
    return {
      items: [
        {
          group: 'main',
          children: [
            {
              icon: 'home',
              title: 'Home',
              exact: true,
              to: '/',
            },
            {
              icon: 'people',
              title: 'Reciters',
              exact: false,
              to: '/reciters',
            },
            {
              icon: 'label',
              title: 'Topics',
              exact: false,
              to: '/topics',
              role: 'admin'
            },
            {
              icon: 'library_books',
              title: 'My Library',
              exact: false,
              to: '/library',
              role: 'admin'
            }
          ]
        },
        {
          group: 'trending',
          children: [
            {
              icon: 'trending_up',
              title: 'Top Charts',
              exact: true,
              to: '/charts',
              role: 'admin'
            },
            {
              icon: 'whatshot',
              title: 'Trending',
              exact: false,
              to: '/trending',
              role: 'admin'
            },
            {
              icon: 'date_range',
              title: 'New Releases',
              exact: false,
              to: '/new-releases',
              role: 'admin'
            }
          ]
        },
        {
          group: 'manage',
          children: [
            {
              icon: 'file_upload',
              title: 'Upload',
              exact: true,
              to: '/upload',
              role: 'admin',
            },
            {
              icon: 'settings',
              title: 'Settings',
              exact: false,
              to: '/settings',
              role: 'admin',
            }
          ]
        }
      ]
    };
  },
};
</script>

<style lang="stylus" scoped>
@import '../styles/theme';
.masthead {
  background: white;
  padding: 10px 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: min-content;
  position: fixed;
  white-space: nowrap;
  top: 0;
  left: 0;

  .masthead__title {
    display: flex;
    min-width: 260px;
    padding-right: 30px;
    padding-left: 8px;
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

  .list__tile__action {
    justify-content center;
  }
  .list__tile--active {
    .list__tile__action i.material-icons {
      color: $theme.primary;
    }
    .list__tile__title {
      font-weight: bold;
      color: #333333;
    }
  }
}

main {
  padding-left: 260px;
  padding-top: 72px;
}
</style>
