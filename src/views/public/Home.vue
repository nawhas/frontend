<template>
  <div>
    <hero-banner :background="require('../../assets/imam-hussain-header.jpg')" class="mb-4">
      <hero-quote author="Imam Jafar Sadiq (a.s.)">
        The murder of Hussain has lit a fire in the hearts of the believers which will never extinguish.
      </hero-quote>
    </hero-banner>
    <section class="page-section" id="top-reciters-section">
      <h5>Top Reciters</h5>
      <v-container grid-list-lg class="pa-0" fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 v-for="reciter in reciters" :key="reciter.id">
            <reciter-card featured v-bind="reciter" />
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section class="page-section" id="trending-nawhas">
      <h5>Trending Nawhas</h5>
      <v-container grid-list-lg class="pa-0" fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 v-for="track in tracks" v-bind:key="track.id">
            <track-card v-bind="track" :show-reciter="true" />
          </v-flex>
        </v-layout>
      </v-container>
    </section>
  </div>
</template>

<script>
import {getTopReciters, getTopTracks} from '../../services/popular';
import HeroBanner from '../../components/HeroBanner';
import HeroQuote from '../../components/HeroQuote';
import ReciterCard from '../../components/ReciterCard';
import TrackCard from '../../components/TrackCard';

export default {
  name: 'Home',
  components: {
    HeroBanner,
    HeroQuote,
    ReciterCard,
    TrackCard,
  },
  methods: {
    setData({reciters, tracks}) {
      this.reciters = reciters;
      this.tracks = tracks;
    },
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      getTopReciters({limit: 6}),
      getTopTracks({limit: 6}),
    ]).then((responses) => {
      const [reciters, tracks] = responses;

      next((vm) => vm.setData({
        reciters: reciters.data.data,
        tracks: tracks.data.data,
      }));
    });
  },
  data() {
    return {
      reciters: [],
      tracks: [],
    };
  },
};
</script>

<style lang="stylus">
</style>
