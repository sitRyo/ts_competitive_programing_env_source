<template>
  <div id="app">
    <div id="nav">
      <span class="router-text-codetest">webコードテスト</span>
      <span class="router-button">
        <router-link to="/">Home</router-link>
      </span>
      <span class="router-button">
        <router-link to="/about">お問合せ</router-link>
      </span>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding-top: 30px;
  padding-bottom: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.router-button {
  padding-right: 2vw;
}

.router-text-codetest {
  padding-right: 50vw;
  font-size: 150%;
  font-weight: 600;
}

</style>
