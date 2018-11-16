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
import { mapGetters } from 'vuex';
import ReciterCard from '@/components/ReciterCard';
import store from '@/store';

async function fetchData() {
	await Promise.all([
		store.dispatch('reciters/fetchReciters'),
		store.dispatch('popular/fetchPopularReciters', {limit: 6})
	]);
}

export default {
	name: 'Reciters',
	components: {
		ReciterCard,
	},
	methods: {
		createNewReciter() {
			this.$router.push('/reciters/create');
		},
	},
	computed: {
		...mapGetters({
			reciters: 'reciters/reciters',
			popularReciters: 'popular/popularReciters',
		})
	},
	async beforeRouteEnter(to, from, next) {
		await fetchData();
		next();
	},
	async beforeRouteUpdate(to, from, next) {
		await fetchData();
		next();
	},
};
</script>
