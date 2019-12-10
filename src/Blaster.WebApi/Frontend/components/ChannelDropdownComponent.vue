<template>
    <div class="channelDropdown" @focus="$emit('dropdown-focus')" @blur="$emit('dropdown-blur')">
        <channel-minimal v-for="channel in channels" :key="channel.id" :channel="channel" :enablehover=true @click.native="onChannelClick(channel)"></channel-minimal>
    </div>   
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ChannelMinimalComponent from "./ChannelMinimalComponent.vue";


const AppProps = Vue.extend({
  props: {
    channels: Array,
  },

  components: {
      'channel-minimal': ChannelMinimalComponent
  },

  data: () => {
    return {
        inputText: ""
    }
  }
});

@Component
export default class ChannelDropdownComponent extends AppProps {
    onChannelClick(channel) {
        this.$emit('capability-join-channel', channel);
    } 
}
</script>