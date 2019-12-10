<template>
    <div class="channel" v-bind:class="{ channelhightlight: useHighlight }">
        <channel-icon :type="channel.type"></channel-icon> #{{ channel.name }}
    </div> 
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ChannelIconComponent from "./ChannelIconComponent.vue";

const AppProps = Vue.extend({
  props: {
    channel: Object as () => Channel,
    enablehover: Boolean
  },

  components: {
    'channel-icon': ChannelIconComponent
  },  

  data: () => {
    return {
    }
  }
});

@Component
export default class ChannelInputComponent extends AppProps {
    get useHighlight() {
        if (this.enablehover) {
            return this.enablehover;
        } else {
            return false;
        }
    }
}

class Channel {
    name : string;
    type : string;
}
</script>