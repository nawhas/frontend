<template>
  <v-navigation-drawer fixed v-model="toggled">
    <div v-for="(item, index) in navigation" :key="item.group">
      <v-list class="nav">
        <v-list-tile class="nav__tile" v-for="link in item.children"
                     :key="link.to"
                     :to="link.to"
                     active-class="nav__tile--active"
                     :exact="link.exact">
          <v-list-tile-action class="nav__tile__action">
            <v-icon class="nav__tile__action__icon">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content class="nav__tile__content">
            <v-list-tile-title class="nav__tile__content__title">{{ link.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider v-if="index < navigation.length - 1"></v-divider>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import items from '@/data/navigation';

@Component
export default class Sidebar extends Vue {
  private items!: Object[] = items;
  @Prop(Boolean) toggled: boolean;


}
</script>

<style scoped>

</style>
