<template>
    <div class="channelList" style="display: flex; flex-direction: column;">
        <div style="display: flex; flex-direction: row; align-items: center;" v-for="channel in channels" :key="channel.id">
            <a class="delete" style="margin-right: 5px;" v-if="can_edit" @click="leaveChannel(channel)"></a>            
            <channel-minimal :channel="channel" :enablehover=false></channel-minimal> 
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ChannelMinimalComponent from "./ChannelMinimalComponent.vue";

const AppProps = Vue.extend({
  props: {
    channels: Array,
    can_edit: Boolean,
  },

  components: {
    'channel-minimal': ChannelMinimalComponent,
  },

  data: () => {
    return {

    }
  }
});

@Component
export default class ChannelListComponent extends AppProps {
    leaveChannel(channel) {
        this.$emit('capability-leave-channel', channel);
    } 
}
</script>