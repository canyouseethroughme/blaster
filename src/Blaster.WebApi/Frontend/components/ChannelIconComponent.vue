<template>
    <img v-if="enable" :src="src" style="width: 25px; height: 25px; min-width: 25px; min-height: 25px; margin-right: 5px;" />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const AppProps = Vue.extend({
  props: {
    type: String,
  },

  data: () => {
    return {
        enable: false,
        src: ""
    }
  },

  beforeMount: () => {
    // TODO: Redo the entirety of this
    if (this.type) {
        if (this.type.valueOf() === new String("slack").valueOf()) {
            this.enable = true;
            this.src = "/img/slack.svg";
        }

        if (this.type.valueOf() === new String("msteams").valueOf()) {
            this.enable = true;
            this.src = "/img/msteams.svg";
        }
    } else {
        this.enable = false;
    }      
  }
});

@Component
export default class ChannelIconComponent extends AppProps {
       
}
</script>