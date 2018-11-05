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
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <input
              type="file"
              @change="onFileChange"
            >
            <img v-if="this.album.updatedArtwork" :src="this.album.artwork" :alt="this.album.name" width="100" height="100">
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
    name: 'Album-Update',
    methods: {
      uploadForm() {
        const form = new FormData();
        form.append('name', this.album.name);
        form.append('artwork', this.album.artwork);
        if (this.album.updatedArtwork) {
          form.append('updatedArtwork', this.album.updatedArtwork);
        }
        client.post(`/api/reciters/${this.reciter.slug}/albums/${this.album.year}`, form).then(() => {
          this.$router.push(`/reciters/${this.reciter.slug}`);
        });
      },
      onFileChange(e) {
        this.album.updatedArtwork = e.target.files[0];
      },
      setData(data) {
        this.album.name = data.name;
        this.album.artwork = data.artwork;
        this.album.year = data.year;
        this.reciter = data.reciter;
      },
    },
    data() {
      return {
        reciter: {},
        album: {'name': null, 'year': null, 'artwork': null, 'updatedArtwork': null},
      };
    },
    created() {
      client.get(`/api/reciters/${this.$route.params.reciter}/albums/${this.$route.params.album}`).then((response) => {
        this.setData(response.data);
      });
    }
  };
</script>
