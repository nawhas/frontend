<template>
  <div>
    <div class="reciter-hero">
      <div class="reciter-hero__ribbon"></div>
      <div class="reciter-hero__content">
        <v-card class="reciter-hero__card">
          <div class="reciter-hero__avatar">
            <v-avatar size="152px" class="white">
              <img :src="reciter.avatar" :alt="reciter.name" />
            </v-avatar>
          </div>
          <h4 class="reciter-hero__title">
            {{ reciter.name }}
          </h4>
          <!--<ul class="reciter-hero__social">-->
          <!--<li><a href=""><i class="fa fa-globe"></i></a></li>-->
          <!--<li><a href=""><i class="fa fa-facebook"></i></a></li>-->
          <!--<li><a href=""><i class="fa fa-youtube-play"></i></a></li>-->
          <!--<li><a href=""><i class="fa fa-twitter"></i></a></li>-->
          <!--<li><a href=""><i class="fa fa-instagram"></i></a></li>-->
          <!--</ul>-->
          <p class="reciter-hero__bio">{{ reciter.description }}</p>
          <v-btn
              v-if="this.$store.getters['auth/isAdmin']"
              @click="goToEditReciter"
          >Update Reciter
          </v-btn>
        </v-card>
      </div>
    </div>
    <section class="page-section" id="top-reciters-section">
      <h5>Top Nawhas</h5>
      <v-container grid-list-lg class="pa-0" fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 v-for="track in popularTracks" v-bind:key="track.id">
            <track-card v-bind="track" :show-reciter="false"></track-card>
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section class="page-section" id="all-reciters-section">
      <h5>Albums</h5>
      <v-btn primary flat v-if="this.$store.getters['auth/isAdmin']" @click="createAlbum">Create New Album</v-btn>
      <template v-for="album in albums">
        <album v-bind="album" :reciterSlug="reciter.slug" v-bind:key="album.id"></album>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex';
import HeroBanner from '@/components/HeroBanner.vue';
import ReciterCard from '@/components/ReciterCard.vue';
import TrackCard from '@/components/TrackCard.vue';
import Album from '@//components/Album.vue';
import store from '@/store';

async function fetchData(reciter) {
  await Promise.all([
    store.dispatch('albums/fetchAlbums', { reciter }),
    store.dispatch('reciters/fetchReciter', { reciter }),
  ]);
  await store.dispatch('popular/fetchPopularTracks', { limit: 6, reciterId: store.getters['reciters/reciter'].id });
}

export default {
  name: 'Reciter-Profile',
  components: {
    TrackCard,
    Album,
  },
  async beforeRouteEnter(to, from, next) {
    await fetchData(to.params.reciter);
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    await fetchData(to.params.reciter);
    next();
  },
  computed: {
    ...mapGetters({
      reciter: 'reciters/reciter',
      albums: 'albums/albums',
      popularTracks: 'popular/popularTracks',
    }),
  },
  methods: {
    goToEditReciter() {
      this.$router.push(`/reciters/${this.reciter.slug}/update`);
    },
    createAlbum() {
      this.$router.push(`/reciters/${this.reciter.slug}/albums/create`);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../../../styles/theme.styl';
@import '../../../styles/_variables.styl';

.reciter-hero {
  .reciter-hero__ribbon {
    width: 100%;
    height: 220px;
    margin-bottom: -220px;
    background: linear-gradient(to bottom right, #E90500, #FA6000);
  }
  .reciter-hero__content {
    padding: 80px 120px 24px 120px;
  }
  .reciter-hero__avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: -80px;
    margin-bottom: -56px;

    .avatar {
      box-sizing: content-box;
      border: 5px solid white;
    }
  }
  .reciter-hero__card {
    margin-top: 36px;
    width: 100%;
    min-height: 20px;
    position: relative;
    padding: 0 36px 24px 36px;
  }
  .reciter-hero__title {
    font-family: 'Roboto Slab', sans-serif;
    font-weight: 600;
    color: #2e2e2e;
    text-align: center;
    margin: 0;
    padding: 0;
  }
  .reciter-hero__social {
    font-size: 140%;
    list-style: none;
    margin: 16px 0;
    padding: 0;
    text-align: center;

    li {
      display: inline;

      a {
        color: inherit;
        padding: 8px;
        will-change: color;
        transition: color $transition;
        &:hover {
          color: $theme.accent;
        }
      }
    }
  }
  .reciter-hero__bio {
    margin: 16px 0 0 0;
    padding: 0;
    max-height: 108px;
    overflow: hidden;
    position: relative;
  }
}
</style>
