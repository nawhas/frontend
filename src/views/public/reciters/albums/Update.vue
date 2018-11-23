<template>
  <div>
    <section>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h3>Edit Album {{ album.name }} | Year {{ album.year }}</h3>
        </v-flex>
      </v-layout>
      <v-form enctype="multipart/form-data">
        <v-layout row>
          <v-flex>
            <v-text-field
              label="Album Name"
              v-model="album.name"
              required>
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <input
              type="file"
              @change="onFileChange">
            <img v-if="!this.updatedArtwork" :src="this.album.artwork" :alt="this.album.name" width="100"
                 height="100">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm1 offset-sm11>
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

async function fetchData(reciter, album) {
  await Promise.all([
    store.dispatch('reciters/fetchReciter', { reciter }),
    store.dispatch('albums/fetchAlbum', { reciter, album }),
  ]);
}


export default {
  name: 'Album-Update',
  methods: {
    async uploadForm() {
      const form = new FormData();
      form.append('name', this.album.name);
      form.append('artwork', this.album.artwork);
      if (this.updatedArtwork) {
        form.append('updatedArtwork', this.updatedArtwork);
      }
      await store.dispatch('albums/updateAlbum', { reciter: this.reciter.slug, album: this.album.year, form });
      this.$router.push(`/reciters/${this.reciter.slug}`);
    },
    onFileChange(e) {
      [this.updatedArtwork] = e.target.files;
    },
  },
  computed: {
    ...mapGetters({
      reciter: 'reciters/reciter',
      album: 'albums/album',
    }),
  },
  data() {
    return {
      updatedArtwork: null,
    };
  },
  async beforeRouteEnter(to, from, next) {
    await fetchData(to.params.reciter, to.params.album);
    next();
  },
  async beforeRouteUpdate(to, from, next) {
    await fetchData(to.params.reciter, to.params.album);
    next();
  },
};
</script>
