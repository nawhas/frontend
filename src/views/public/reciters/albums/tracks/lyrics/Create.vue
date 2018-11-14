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
            <v-text-field
              label="Lyric Text"
              v-model="lyric.text"
              multiLine
              required
            ></v-text-field>
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
  export default {
    name: 'LyricsCreate',
    data() {
      return {
        track: null,
        lyric: {
          text: null,
        },
        nativeLanguage: false
      };
    },
    methods: {
      uploadForm() {
        const form = new FormData();
        form.append('text', this.lyric.text);
        form.append('track_id', this.track.id);
        form.append('native_language', this.nativeLanguage);


        const reciter = this.track.reciter.slug;
        const year = this.track.album.year;
        const track = this.track.slug;
      },
    },
    beforeRouteEnter(to, from, next) {
    },
    beforeRouteUpdate(to, from, next) {
    },
  };
</script>
