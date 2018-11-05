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
              required
            ></v-text-field>
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
  import {getTrack} from '@/services/tracks';
  import {getLyric, updateLyric} from '@/services/lyrics';

  export default {
    name: 'LyricsUpdate',
    data() {
      return {
        track: null,
        lyrics: null
      };
    },
    methods: {
      setTrack(track) {
        this.track = track;
      },
      setLyrics(lyric) {
        this.lyrics = lyric.data;
      },
      uploadForm() {
        updateLyric(this.track.reciter.slug, this.track.album.year, this.track.slug, this.lyrics.id, {
          text: this.lyrics.text,
          native_language: this.nativeLanguage
        })
          .then(() => {
            this.$router.push({ name: 'Track-Page', params: { reciter: this.track.reciter.slug, album: this.track.album.year, track: this.track.slug } });
          });
      },
    },
    beforeCreate() {
      getTrack(this.$route.params.reciter, this.$route.params.album, this.$route.params.track)
        .then((response) => {
          this.setTrack(response.data);
        });
      getLyric(
        this.$route.params.reciter,
        this.$route.params.album,
        this.$route.params.track,
        this.$route.params.lyric
      )
        .then((response) => {
          this.setLyrics(response);
        });
    },
  };
</script>
