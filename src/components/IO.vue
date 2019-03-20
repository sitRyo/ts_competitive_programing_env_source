<template>
  <b-container class="io-wrapper">
    <div class="input-area">
      <div class="text-area-message pl-5 pb-1">input</div>
      <b-form-textarea
        id="textarea"
        v-model="input"
        rows="8"
        max-rows="8"
      />
    </div>
    <div class="error-area">
      <div class="text-area-message pl-5 pb-1 pt-2">error</div>
      <b-form-textarea
        class="error-code"
        id="textarea"
        v-model="error"
        rows="2"
        max-rows="6"
      />
    </div>
    <div class="output-area">
      <div class="text-area-message pl-5 pb-1 pt-2">output</div>
      <b-form-textarea
        id="textarea"
        v-model="output"
        rows="8"
        max-rows="8"
        readonly
      />
    </div>
    <div class="time-area">
      <div class="text-area-message pl-5 pb-1 pt-2">time: <span class="output-time">{{getTime}} ms</span></div>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

@Component
export default class IO extends Vue {
  private input: string = '';

  get error(): string {
    return this.$store.getters['executedata/getError'];
  }

  get output(): string {
    return this.$store.getters['executedata/getOutput'];
  }

  get getTime(): number {
    return this.$store.getters['executedata/getTime'];
  }

  @Watch('input')
  onInputChanged (val: string) {
    this.$store.dispatch('executedata/submitInput', { 'input': this.input });
  }
}

</script>

<style scoped>
.text-area-message {
  text-align: left;
  font-weight: 600;
}

.time-area {
  text-align: left;
}

.error-code {
  color: #cc0000
}
</style>

