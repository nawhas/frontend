<template>
  <div>
    <section>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h3>Add Album To {{ this.reciter.name }}'s Collection</h3>
        </v-flex>
      </v-layout>
      <v-form enctype="multipart/form-data">
        <v-layout row>
          <v-flex>
            <v-text-field
              label="Album Name"
              v-model="album.name"
              required />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <v-text-field
              label="Album year"
              v-model="album.year"
              required />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <input
              type="file"
              @change="onFileChange" />
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

  async function fetchData(reciter) {
    await Promise.all([
      store.dispatch('reciters/fetchReciter', { reciter })
    ]);
  }


  export default {
    name: 'Album-Create',
    methods: {
      async uploadForm() {
        const form = new FormData();
        form.append('name', this.album.name);
        form.append('artwork', this.album.artwork);
        form.append('year', this.album.year);
        await store.dispatch('albums/storeAlbum', { reciter: this.reciter.slug, form });
        this.$router.push(`/reciters/${this.reciter.slug}`);
      },
      onFileChange(e) {
        this.album.artwork = e.target.files[0];
      }
    },
    computed: {
      ...mapGetters({
        reciter: 'reciters/reciter',
      })
    },
    data() {
      return {
        album: { name: null, artwork: null, year: null },
      };
    },
    async beforeRouteEnter(to, from, next) {
      await fetchData(to.params.reciter);
      next();
    },
    async beforeRouteUpdate(to, from, next) {
      await fetchData(to.params.reciter);
      next();
    },
  };
</script>
