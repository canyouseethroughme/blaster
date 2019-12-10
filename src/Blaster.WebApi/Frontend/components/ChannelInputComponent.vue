<template>
    <div class="channelInput">
        <input :disabled="!is_enabled" type="text" v-model="inputText" @input="onInput" @focus="$emit('input-focus')" @blur="$emit('input-blur')">
    </div>    
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const AppProps = Vue.extend({
  props: {
    is_enabled: String,
  },

  data: () => {
    return {
        inputText: ""
    }
  }
});

@Component
export default class ChannelInputComponent extends AppProps {
    onInput() {
        this.$emit('input-updated-query', this.inputText);
    }    
}
</script>