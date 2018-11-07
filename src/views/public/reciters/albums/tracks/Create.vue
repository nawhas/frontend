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
                required />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <v-text-field
                label="Track Number"
                v-model="track.trackNumber"
                required />
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
                multiple
                persistent-hint
                return-object
                single-line
                required />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            Audio File
            <input
                type="file"
                @change="onFileChange"
                name="audio" />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <v-text-field
                label="YouTube Link To Video"
                v-model="track.video" />
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
import client from '@/services/client';

export default {
  name: 'Reciter-Create',
  methods: {
    uploadForm() {
      const form = new FormData();
      form.append('audio', this.track.audio);
      form.append('video', this.track.video);
      form.append('name', this.track.name);
      form.append('trackNumber', this.track.trackNumber);
      for (const language of this.track.language) {
        form.append('language[]', language.slug);
      }
      client.post(`/api/reciters/${this.reciter.slug}/albums/${this.album.year}/tracks`, form)
        .then(() => {
          this.$router.push(`/reciters/${this.reciter.slug}`);
        });
    },
    onFileChange(e) {
      if (e.target.name === 'audio') {
        this.track.audio = e.target.files[0];
      } else if (e.target.name === 'video') {
        this.track.video = e.target.files[0];
      }
    },

    setData(data) {
      this.album.id = data.id;
      this.album.name = data.name;
      this.album.artwork = data.artwork;
      this.album.year = data.year;
      this.reciter = data.reciter;
    },
  },
  data() {
    return {
      reciter: {},
      album: { id: null, name: null, artwork: null, year: null, updatedArtwork: null },
      track: { name: null, video: null, audio: null, trackNumber: null, language: null },
      languages: [],
    };
  },
  created() {
    client.get(`/api/reciters/${this.$route.params.reciter}/albums/${this.$route.params.album}`)
      .then((response) => {
        this.setData(response.data);
      });
    client.get('/api/languages')
      .then((response) => {
        this.languages = response.data.data;
      });
  }
};
</script>
