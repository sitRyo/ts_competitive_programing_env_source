<template>
  <b-container class="about-header">
    <div class="version">
      <div class="weight">Version</div>
      <div>typescript: 3.3<a href="https://github.com/Microsoft/TypeScript/issues/30032">(33333...)</a></div>
      <div>javascript: ブラウザで動くやつ</div>
    </div>
    <div class="how-to">
      <div class="weight">使い方</div>
      <div>1. 下のフォームから使用する言語を選びます。</div>
      <div>2. エディタのテンプレートを崩さずに(特に, require('fs').readFileSync('/dev/stdin', 'utf8')の部分)実行したいコードを入力してください。</div>
      <div>3. inputを入れて右下のrunのボタンを押してください。標準出力はoutputに, 標準エラー出力はerrorに赤字で出力されます。</div>
    </div>
    <div class="about">
      <div class="weight">このアプリケーションについて</div>
      <div>このアプリケーションはAtCoderやCodeforcesなどで使用できるJS/TSのコードテストをローカルで実行できることを目標に製作したものです。</div>
      <div>コンテスト中にサイト上でコードテストを行うのは少し面倒臭いし時間がかかるのでローカルでJS/TSが実行できる環境があればいいなと思って製作しました。</div>
      <div>完成を優先したため言語のバージョンなど全くもって対応していないです。</div>
      <div>結局Dockerとかでローカルにサーバを建てて環境を作るのが一番かなあ...と思っています。</div>
      <div>また、突貫工事なのでレスポンシブなどには殆ど対応していないです。</div>
      <div>何かご意見ありましたら、twitter(<a href="https://twitter.com/seriru13">@seriru13</a>)の方にお願いします。</div>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default class Home extends Vue {}
</script>

<style scoped>

.version {
  padding-bottom: 5vh;
}

.how-to {
  padding-bottom: 5vh;
}

.weight {
  font-weight: 600;
  font-size: 150%;
  padding-bottom: 1vh;
}

.about-header {
  padding-top: 3vh;
}
</style>


