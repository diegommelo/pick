<template>
  <div id="app">
    <div class="header">
      <h1 class="is-size-3">Pick'Em Simulator</h1>
      <img src="https://static.hltv.org/images/eventLogos/4450.png" class="major-logo"/>  
    </div>
    <div id="nav">
      <router-link to="/challengers">Challengers</router-link> |
      <router-link to="/">Champions <small><i>(soon)</i></small></router-link> |  
      <router-link to="/">Playoffs <small><i>(maybe)</i></small></router-link>      
    </div>
    <router-view/>
    <br/>
    <footer class="rodape">
      <p>made with ❤️ by <a href="https://twitter.com/dieguitoo">@dieguitoo</a> in 🇧🇷</p>
      <p>teams logo by <a href="https://hltv.org">hltv.org</a></p>
    </footer>
  </div>
</template>

<style>
html {
  background-color:#f5f5f5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.header {
  margin-top: 30px;
}
.rodape {
  padding:10px;
  font-size:0.9rem;
}
.section {
  padding: 1rem !important;
}
.major-logo {
  max-width:120px;
}
.button.is-primary {
  background-color: #42b983 !important;
}
</style>
