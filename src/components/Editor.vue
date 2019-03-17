<template>
  <b-container>
    <div class="editor-wrapper mb-1">
      <div id="container" style="height: 100%;"></div>
    </div>
    <b-row class="button-wrapper">
      <b-col></b-col>
      <b-col>
        <b-button id="button-run" class="pl-3 pr-3" @click="submit()">run</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as monaco from 'monaco-editor';
import IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

@Component
export default class Editor extends Vue {
  public editor: IStandaloneCodeEditor | null = null;

  public mounted() {
    const root = document.getElementById('container');
    if (root !== null) {
      this.editor = monaco.editor.create(root, {
        value: 'input your code',
        language: 'javascript',
        theme: 'vs-dark',
        roundedSelection: false,
        minimap: {
          enabled: false,
        },
      });
    }
  }

  public submit(): void {
    if (this.editor !== null) {
      this.$store.dispatch('executedata/submitCode', { 'code': this.editor.getValue() });
    }
  }
}

</script>

<style scoped>

.editor-wrapper {
  text-align: left;
  height: 70vh;
}

.button-wrapper {
  text-align: right;
}

#button-run {
  font-weight: 600;
}
</style>

