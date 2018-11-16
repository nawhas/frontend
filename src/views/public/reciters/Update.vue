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
            <v-textarea
              label="Reciter description"
              v-model="reciter.description"
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex>
            <input
              type="file"
              @change="onFileChange"
            >
            <img v-if="!this.updatedAvatar" :src="this.reciter.avatar" height="100" width="100">
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
import { mapGetters } from 'vuex';
import store from '@/store';

async function fetchData(reciter) {
	await Promise.all([
		store.dispatch('reciters/fetchReciter', { reciter })
	]);
}

export default {
	name: 'Reciter-Create',
	methods: {
		async uploadForm() {
			const form = new FormData();
			form.append('name', this.reciter.name);
			form.append('avatar', this.reciter.avatar);
			if (this.updatedAvatar) {
				form.append('updatedAvatar', this.updatedAvatar);
			}
			form.append('description', this.reciter.description);
			await this.$store.dispatch('reciters/updateReciter', {
				form,
				reciter: this.reciter.slug
			});
			this.$router.push({ name: 'Reciters'});
		},
		onFileChange(e) {
			this.updatedAvatar = e.target.files[0];
		}
	},
	computed: {
		...mapGetters({
			reciter: 'reciters/reciter',
		})
	},
	data() {
		return {
			updatedAvatar: null
		};
	},
	async beforeRouteEnter(to, from, next) {
		await fetchData(to.params.reciter);
		next();
	},
	async beforeRouteUpdate(to, from, next) {
		await fetchData(to.params.reciter);
		next();
	},
};
</script>
