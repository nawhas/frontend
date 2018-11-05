<template>
    <div>
        <section>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <h3>Edit Reciter {{ this.reciter.name }}</h3>
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
                        <input
                          type="file"
                          @change="onFileChange"
                        >
                        <img v-if="!this.reciter.updatedAvatar" :src="this.reciter.avatar" height="100"width="100">
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
  import {getReciter} from '../../../services/reciters';

  export default {
    name: 'Reciter-Create',
    methods: {
      uploadForm() {
        const form = new FormData();
        form.append('name', this.reciter.name);
        form.append('avatar', this.reciter.avatar);
        if (this.reciter.updatedAvatar) {
          form.append('updatedAvatar', this.reciter.updatedAvatar);
        }
        form.append('description', this.reciter.description);
        client.post(`/api/reciters/${this.reciter.slug}`, form).then(() => {
          this.$router.push('/reciters');
        });
      },
      onFileChange(e) {
        this.reciter.updatedAvatar = e.target.files[0];
      },
      setData(reciter) {
        this.reciter.name = reciter.name || null;
        this.reciter.slug = reciter.slug || null;
        this.reciter.description = reciter.description || null;
        this.reciter.avatar = reciter.avatar || null;
      }
    },
    data() {
      return {
        reciter: {'name': null, 'slug': null, 'avatar': null, 'description': null, 'updatedAvatar': null},
      };
    },
    created() {
      getReciter(this.$route.params.reciter).then((response) => {
        this.setData(response.data);
      });
    }
  };
</script>
