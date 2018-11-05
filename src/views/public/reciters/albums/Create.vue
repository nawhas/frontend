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
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <v-text-field
              label="Album year"
              v-model="album.year"
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
        form.append('name', this.album.name);
        form.append('artwork', this.album.artwork);
        form.append('year', this.album.year);
        client.post(`/api/reciters/${this.reciter.slug}/albums`, form).then(() => {
          this.$router.push(`/reciters/${this.reciter.slug}`);
        });
      },
      onFileChange(e) {
        this.album.artwork = e.target.files[0];
      },
      setData(reciter) {
        this.reciter = reciter || null;
      }
    },
    data() {
      return {
        reciter: {},
        album: {'name': null, 'artwork': null, 'year': null},
      };
    },
    created() {
      client.get(`/api/reciters/${this.$route.params.reciter}`).then((response) => {
        this.setData(response.data);
      });
    }
  };
</script>
