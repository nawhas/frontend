<template>
    <div>
        <section>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <h3>Create new Reciter</h3>
                </v-flex>
            </v-layout>
            <v-form enctype="multipart/form-data">
                <v-layout row>
                    <v-flex>
                        <v-text-field
                                label="Reciter Name"
                                v-model="reciter.name"
                                required
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex>
                        <v-text-field
                                label="Reciter description"
                                v-model="reciter.description"
                                multi-line
                        ></v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex>
                        <input type="file" @change="onFileChange">
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
        form.append('name', this.reciter.name);
        form.append('avatar', this.reciter.avatar);
        form.append('description', this.reciter.description);
        client.post('/api/reciters', form).then(() => {
          this.$router.push('/reciters');
        });
      },
      onFileChange(e) {
        this.reciter.avatar = e.target.files[0];
      },
    },
    data() {
      return {
        reciter: {'name': null, 'avatar': null, 'description': null},
      };
    },
  };
</script>
