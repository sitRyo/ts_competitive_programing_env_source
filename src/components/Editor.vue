<template>
  <b-container>
    <div class="editor-wrapper mb-1">
      <div id="container" style="height: 100%;"></div>
    </div>
    <b-row class="button-wrapper">
      <b-col>
        <b-form-select v-model="selected" :options="options" size="sm" id="form-select" class="mt-1"/>
      </b-col>
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
import { languages } from '@/assets/ts/language-enums';
import { bformInterface } from '@/assets/ts/form-interfaces';

@Component
export default class Editor extends Vue {
  public editor: IStandaloneCodeEditor | null = null;
  // nullで初期化(あとでnullチェック) (see @/assets/ts/language-enums.ts)
  public language: string | null = null;
  // options for b-form (see @/assets/ts/form-interfaces.ts)
  public options: bformInterface[] = [];

  public created() {
    // set b-form elements
    for (let lang in languages) {
      const key: string = lang;
      const option = {
        value: lang,
        text: languages[key],
        disable: false,
      }
      this.options.push(option);
    }
  }

  public mounted() {
    const root = document.getElementById('container');
    if (root !== null) {
      this.editor = monaco.editor.create(root, {
        value: '// 使用したい言語を下のフォームからえらんでください.',
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

#form-select {
  font-weight: 600;
}
</style>

