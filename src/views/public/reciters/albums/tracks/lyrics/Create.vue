<template>
  <div>
    <section>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h4>Add Lyrics for Track {{ track.name }}</h4>
        </v-flex>
      </v-layout>
      <v-form>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-checkbox
              label="Tick this box if the lyric is not written in English"
              v-model="nativeLanguage"
              required
            ></v-checkbox>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-textarea
              label="Lyric Text"
              v-model="lyric.text"
              required
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-btn primary @click="uploadForm">Submit</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store';

async function fetchData(reciter, album, track) {
	await Promise.all([
		store.dispatch('reciters/fetchReciter', { reciter }),
		store.dispatch('albums/fetchAlbum', { reciter, album }),
		store.dispatch('tracks/fetchTrack', { reciter, album, track }),
	]);
}


export default {
	name: 'LyricsCreate',
	methods: {
		async uploadForm() {
			const form = new FormData();
			form.append('text', this.lyric.text);
			form.append('track_id', this.track.id);
			form.append('native_language', this.nativeLanguage);
			const reciter = this.track.reciter.slug;
			const album = this.track.album.year;
			const track = this.track.slug;
			await store.dispatch('lyrics/storeLyric', { reciter, album, track, form });
			this.$router.push(`/reciters/${reciter}/albums/${album}/tracks/${track}`);
		},
	},
	computed: {
		...mapGetters({
			reciter: 'reciters/reciter',
			album: 'albums/album',
			track: 'tracks/track',
		})
	},
	data() {
		return {
			lyric: {
				text: null,
			},
			nativeLanguage: false
		};
	},
	async beforeRouteEnter(to, from, next) {
		await fetchData(to.params.reciter, to.params.album, to.params.track);
		next();
	},
	async beforeRouteUpdate(to, from, next) {
		await fetchData(to.params.reciter, to.params.album, to.params.track);
		next();
	},
};
</script>