<template>
  <div>
    <section>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h2>Create new Reciter</h2>
        </v-flex>
      </v-layout>
      <v-form enctype="multipart/form-data">
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3 lg8 offset-lg2>
            <v-text-field
              label="Reciter Name"
              v-model="reciter.name"
              required />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3 lg8 offset-lg2>
            <v-textarea
              label="Reciter description"
              v-model="reciter.description"
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3 lg8 offset-lg2>
            <input type="file" @change="onFileChange" accept="image/*">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3 lg8 offset-lg2>
            <img :src="reciter.avatarURL">
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3 lg8 offset-lg2>
            <v-btn color="primary" @click="uploadForm">Submit</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Reciter-Create',
  methods: {
    async uploadForm() {
      const form = new FormData();
      form.append('name', this.reciter.name);
      form.append('avatar', this.reciter.avatar);
      form.append('description', this.reciter.description);
      await this.$store.dispatch('reciters/storeReciter', { form });
      this.$router.push({ name: 'Reciters' });
    },
    onFileChange(e) {
      [this.reciter.avatar] = e.target.files;
      this.reciter.avatarURL = URL.createObjectURL(this.reciter.avatar);
    },
  },
  data() {
    return {
      reciter: { name: null, avatar: null, avatarURL: null, description: null },
    };
  },
};
</script>

<style scoped="">
img {
  max-width: 100%;
  max-height: 100px;
}
</style>
