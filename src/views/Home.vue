<template>
  <b-container class="app-wrapper">
    <div class="home">
      <b-row>
        <b-col class="w-100" cols="8">
          <Editor></Editor>
        </b-col cols="4">
        <b-col>
          <IO></IO>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Editor from '@/components/Editor.vue';
import IO from '@/components/IO.vue';

@Component({
  components: {
    Editor,
    IO,
  },
})
export default class Home extends Vue {}
</script>

<style scoped>
.app-wrapper {
  padding-top: 3vh;
  height: 100vh;
  box-shadow: 0px 0px 10px 5px #888;
}
</style>
