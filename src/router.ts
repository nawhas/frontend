import Vue from 'vue';
import Router from 'vue-router';
import PublicLayout from '@/layouts/PublicVuetify.vue';
import Home from '@/views/public/Home.vue';

Vue.use(Router);

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
        },
        {
          path: 'reciters',
          name: 'Reciters',
          component: () => {
            return import(/* webpackChunkName: "reciters" */'./views/public/reciters/Index.vue');
          }
        },
        {
          path: 'reciters/create',
          name: 'Reciter Create',
          component: () => {
            return import(/* webpackChunkName: "reciters" */'./views/public/reciters/Create.vue');
          },
        },
        {
          path: 'reciters/:reciter',
          name: 'Reciter Profile',
          component: () => {
            return import(/* webpackChunkName: "reciters" */'./views/public/reciters/Reciter.vue');
          },
        },
        {
          path: 'reciters/:reciter/update',
          name: 'Reciter Update',
          component: () => {
            return import(/* webpackChunkName: "reciters" */'./views/public/reciters/Update.vue');
          },
        },
        {
          path: 'reciters/:reciter/albums/create',
          name: 'Album Create',
          component: () => {
            return import(/* webpackChunkName: "reciters" */'./views/public/reciters/albums/Create.vue');
          },
        },
        {
          path: 'reciters/:reciter/albums/:album/update',
          name: 'Album Update',
          component: () => {
            return import(/* webpackChunkName: "reciters" */'./views/public/reciters/albums/Update.vue');
          },
        },
        {
          path: 'reciters/:reciter/albums/:album/tracks/create',
          name: 'Track Create',
          component: () => {
            return import(/* webpackChunkName: "reciters" */'./views/public/reciters/albums/tracks/Create.vue');
          },
        },
        {
          path: 'reciters/:reciter/albums/:album/tracks/:track',
          name: 'Track-Page',
          component: () => {
            return import(/* webpackChunkName: "reciters" */'./views/public/reciters/Track.vue');
          },
        },
        {
          path: 'reciters/:reciter/albums/:album/tracks/:track/update',
          name: 'Track-Update',
          component: () => {
            return import(/* webpackChunkName: "reciters" */'./views/public/reciters/albums/tracks/Update.vue');
          },
        },
        {
          path: 'reciters/:reciter/albums/:album/tracks/:track/lyrics/create',
          name: 'Lyric Create',
          component: () => {
            return import(/* webpackChunkName: "reciters" */'./views/public/reciters/albums/tracks/lyrics/Create.vue');
          },
        },
        {
          path: 'reciters/:reciter/albums/:album/tracks/:track/lyrics/:lyric/update',
          name: 'Lyric-Update',
          component: () => {
            return import(/* webpackChunkName: "reciters" */'./views/public/reciters/albums/tracks/lyrics/Update.vue');
          },
        },
        {
          path: 'topics',
          name: 'Topics',
          component: () => {
            return import(/* webpackChunkName: "explore" */'./views/public/Topics.vue');
          },
        },
        {
          path: 'library',
          name: 'Library',
          component: () => {
            return import(/* webpackChunkName: "explore" */'./views/public/Library.vue');
          },
        },
        {
          path: 'charts',
          name: 'Top Charts',
          component: () => {
            return import(/* webpackChunkName: "explore" */'./views/public/TopCharts.vue');
          },
        },
        {
          path: 'trending',
          name: 'Trending',
          component: () => {
            return import(/* webpackChunkName: "explore" */'./views/public/Trending.vue');
          },
        },
        {
          path: 'new-releases',
          name: 'New Releases',
          component: () => {
            return import(/* webpackChunkName: "explore" */'./views/public/NewReleases.vue');
          },
        },
        {
          path: 'upload',
          name: 'Upload',
          component: () => {
            return import(/* webpackChunkName: "upload" */'./views/public/Upload.vue');
          },
        },
        {
          path: 'settings',
          name: 'Settings',
          component: () => {
            return import(/* webpackChunkName: "settings" */'./views/public/Settings.vue');
          },
        },
      ]
    },
    {
      path: '/auth',
      component: () => {
        return import(/* webpackChunkName: "auth" */'./layouts/Splash.vue');
      },
      children: [
        {
          path: 'redirect',
          name: 'Auth Redirect',
          component: () => {
            return import(/* webpackChunkName: "auth" */'./views/auth/AuthRedirect.vue');
          },
        },
        {
          path: 'callback',
          name: 'Auth Callback',
          component: () => {
            return import(/* webpackChunkName: "auth" */'./views/auth/AuthCallback.vue');
          },
        }
      ]
    }
  ],
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
