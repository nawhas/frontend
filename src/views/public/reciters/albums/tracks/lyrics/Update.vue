<template>
  <div>
    <section>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h4>Update Lyrics for {{ track.name }}</h4>
        </v-flex>
      </v-layout>
      <v-form>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-textarea
              label="Lyric Text"
              v-model="lyric.plain_text"
              required
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <v-btn primary @click="uploadForm()">Submit</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import store from '@/store';

  async function fetchData(reciter, album, track, lyric) {
    await Promise.all([
      store.dispatch('reciters/fetchReciter', { reciter }),
      store.dispatch('albums/fetchAlbum', { reciter, album }),
      store.dispatch('tracks/fetchTrack', { reciter, album, track }),
      store.dispatch('lyrics/fetchLyric', { reciter, album, track, lyric }),
    ]);
  }

  export default {
    name: 'LyricsUpdate',
    methods: {
      async uploadForm() {
        const form = new FormData();
        form.append('text', this.lyric.plain_text);
        form.append('native_language', this.nativeLanguage);
        await store.dispatch('lyrics/updateLyric', { reciter: this.reciter.slug, album: this.album.year, track: this.track.slug, lyric: this.lyric.id, form });
        this.$router.push({
          name: 'Track-Page',
          params: { reciter: this.reciter.slug, album: this.album.year, track: this.track.slug }
        });
      },
    },
    computed: {
      ...mapGetters({
        reciter: 'reciters/reciter',
        album: 'albums/album',
        track: 'tracks/track',
        lyric: 'lyrics/lyric',
      })
    },
    async beforeRouteEnter(to, from, next) {
      await fetchData(to.params.reciter, to.params.album, to.params.track, to.params.lyric);
      next();
    },
    async beforeRouteUpdate(to, from, next) {
      await fetchData(to.params.reciter, to.params.album, to.params.track, to.params.lyric);
      next();
    },
  };
</script>