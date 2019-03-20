<template>
  <div id="app">
    <div id="nav">
      <span class="router-text-codetest">web code test</span>
      <span class="router-button">
        <router-link to="/">Home</router-link>
      </span>
      <span class="router-button">
        <router-link to="/about">使い方・お問合せ</router-link>
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
  padding-top: 2vh;
  padding-bottom: 2vh;
  background-color: #101010;
}

#nav a {
  font-weight: bold;
  color: #9D9D9D;
}

#nav a.router-link-exact-active {
  color: #FFF;
}

.router-button {
  padding-right: 2vw;
}

.router-text-codetest {
  color: #FFF;
  padding-right: 50vw;
  font-size: 120%;
  font-weight: 600;
}

</style>
