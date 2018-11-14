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
            <v-text-field
              label="Lyric Text"
              v-model="lyrics.text"
              multiLine
              required />
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
  export default {
    name: 'LyricsUpdate',
    data() {
      return {
        track: null,
        lyrics: null
      };
    },
  };
</script>
