<template>
  <div class="banner" style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
      <p>{{ description }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const AppProps = Vue.extend({
  props: {
    title: String,
    description: String,
  },

  data: () => {
    return {

    }
  }
});

@Component
export default class BannerComponent extends AppProps {

}

</script>