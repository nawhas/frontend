<template>
  <div>
    <section>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h3>Add Track {{ album.name }} | {{ album.year }} | {{ reciter.name }}</h3>
        </v-flex>
      </v-layout>
      <v-form enctype="multipart/form-data">
        <v-layout row>
          <v-flex>
            <v-text-field
              label="Track Name"
              v-model="track.name"
              name="track_name"
              required ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <v-text-field
              label="Track Number"
              v-model="track.number"
              name="track_number"
              required ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <v-select
              v-model="track.language"
              :items="languages"
              item-text="name"
              item-value="slug"
              label="Select Nawha Language"
              name="track_language"
              multiple
              persistent-hint
              return-object
              single-line
              required ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            Audio File
            <input
              type="file"
              name="track_file"
              @change="onFileChange"
              name="audio" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <v-text-field
              label="YouTube Link To Video"
              name="track_youtube_link"
              v-model="track.video" ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm1 offset-sm11>
            <v-btn primary name="submit_track" @click="uploadForm">Submit</v-btn>
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
    store.dispatch('languages/fetchLanguages'),
  ]);
}

export default {
  name: 'Reciter-Create',
  methods: {
    async uploadForm() {
      const form = new FormData();
      form.append('audio', this.track.audio);
      form.append('video', this.track.video);
      form.append('name', this.track.name);
      form.append('number', this.track.number);
      const languages = [];
      for (const language of this.track.language) {
        languages.push(language.slug);
      }
      form.append('language', languages);
      await store.dispatch('tracks/storeTrack', { reciter: this.reciter.slug, album: this.album.year, form });
      this.$router.push(`/reciters/${this.reciter.slug}`);
    },
    onFileChange(e) {
      if (e.target.name === 'audio') {
        [this.track.audio] = e.target.files;
      } else if (e.target.name === 'video') {
        [this.track.video] = e.target.files;
      }
    },
  },
  computed: {
    ...mapGetters({
      reciter: 'reciters/reciter',
      album: 'albums/album',
      computedTrack: 'tracks/track',
      languages: 'languages/languages',
    }),
  },
  data() {
    return {
      track: {
        name: null, video: null, audio: null, number: null, language: null,
      },
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
