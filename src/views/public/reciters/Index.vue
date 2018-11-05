<template>
  <div>
    <section class="page-section" id="top-reciters-section">
      <h5>Top Reciters</h5>
      <v-container grid-list-lg class="pa-0" fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 v-for="reciter in popularReciters" :key="reciter.id">
            <reciter-card featured v-bind="reciter" />
          </v-flex>
        </v-layout>
      </v-container>
    </section>
    <section class="page-section" id="all-reciters-section">
      <h5>All Reciters</h5>
      <v-btn primary flat v-if="this.$store.getters['auth/isAdmin']" @click="createNewReciter">Create New Reciter</v-btn>
      <v-card>
        <v-container class="pa-0" fluid>
          <v-layout row wrap>
            <v-flex v-for="reciter in reciters" :key="reciter.id" xs12 sm6 md4 lg3>
              <reciter-card v-bind="reciter" />
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </section>
  </div>
</template>

<script>
import {getTopReciters} from '../../../services/popular';
import {getReciters} from '../../../services/reciters';
import ReciterCard from '../../../components/ReciterCard';

export default {
  name: 'Reciters',
  components: {
    ReciterCard,
  },
  methods: {
    setData({reciters, popularReciters}) {
      this.reciters = reciters;
      this.popularReciters = popularReciters;
    },
    createNewReciter() {
      this.$router.push('/reciters/create');
    },
  },
  beforeRouteEnter(to, from, next) {
    Promise.all([
      getReciters(),
      getTopReciters({limit: 6}),
    ]).then((responses) => {
      const [reciters, popularReciters] = responses;

      next((vm) => vm.setData({
        reciters: reciters.data.data,
        popularReciters: popularReciters.data.data,
      }));
    });
  },
  data() {
    return {
      reciters: [],
      popularReciters: [],
    };
  },
};
</script>
