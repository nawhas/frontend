<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-layout row>
      <v-flex>
        <h3>Update {{ track.name }} | {{ album.name }} | {{ reciter.name }}</h3>
      </v-flex>
    </v-layout>
    <v-form method="patch" enctype="multipart/form-data">
      <v-layout row>
        <v-flex>
          <v-text-field
            label="Track Name"
            v-model="track.name"
            required />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-text-field
            label="Track Number"
            v-model="track.number"
            required />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-select
            v-model="track.language.data"
            :items="languages"
            item-text="name"
            item-value="slug"
            label="Select"
            persistent-hint
            return-object
            multiple />
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          Current Track
          <a-player v-if="track.audio" :mutex="true" :music="{
                    title: track.name,
                    author: reciter.name,
                    url: track.audio,
                    pic: album.artwork,
                  }">
          </a-player>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          Change Audio
          <input
            type="file"
            @change="onFileChange($event)"
            name="audio"/>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-text-field
            label="YouTube Link To VIdeo"
            v-model="track.video"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-btn primary @click="uploadForm()">Submit</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-flex>
</template>

<script>
import VueAplayer from 'vue-aplayer';
import { mapGetters } from 'vuex';
import store from '@/store';

async function fetchData(reciter, album, track) {
  await Promise.all([
    store.dispatch('reciters/fetchReciter', { reciter }),
    store.dispatch('albums/fetchAlbum', { reciter, album }),
    store.dispatch('tracks/fetchTrack', { reciter, album, track }),
    store.dispatch('languages/fetchLanguages'),
  ]);
}


export default {
  name: 'Track-Update',
  components: {
    'a-player': VueAplayer,
  },
  methods: {
    async uploadForm() {
      const form = new FormData();
      form.append('updatedAudio', this.updatedAudio);
      form.append('video', this.track.video);
      form.append('name', this.track.name);
      form.append('number', this.track.number);
      const languages = [];
      for (const language of this.track.language.data) {
        languages.push(language.slug);
      }
      form.append('language', languages);
      await store.dispatch('tracks/updateTrack', {
        reciter: this.reciter.slug, album: this.album.year, track: this.track.id, form,
      });
      this.$router.push({
        name: 'Track-Page',
        params: { reciter: this.reciter.slug, album: this.album.year, track: this.track.slug },
      });
    },
    onFileChange(e) {
      [this.updatedAudio] = e.target.files;
    },
  },
  computed: {
    ...mapGetters({
      reciter: 'reciters/reciter',
      album: 'albums/album',
      track: 'tracks/track',
      languages: 'languages/languages',
    }),
  },
  data() {
    return {
      updatedAudio: null,
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
