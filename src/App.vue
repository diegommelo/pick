<template>
  <div id="app">
    <div class="header">
      <h1 class="is-size-3">Pick'Em Simulator</h1>
      <img src="https://static.hltv.org/images/eventLogos/4450.png" class="major-logo"/>  
    </div>
    <div id="nav" v-if="isPick">
      <router-link to="/major/berlin/stage/challengers">Challengers</router-link> |
      <router-link to="/major/berlin/stage/legends">Legends</router-link> |  
      <router-link to="/major/berlin/stage/champions">Champions</router-link>      
    </div>
    <router-view/>
    <br/>
    <footer class="rodape">
      <p>made with ❤️ by <a href="https://twitter.com/dieguitoo">@dieguitoo</a> in 🇧🇷</p>
      <p>teams logo by <a href="https://hltv.org">hltv.org</a></p>
    </footer>
  </div>
</template>
<script>
export default {
  name:'app',
  data() {
    return {
      isPick:true
    }
  },
  methods: {
    track () {
      this.$ga.page('/')
    }
  },  
  watch: {
    '$route': {
      handler: function(params){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0        
        if(params.name=="pick"){
          this.isPick=false
        } else {
          this.isPick=true
        }
      },
      immediate: true
    }
  },
  head: {
    title: {
      inner: "Pick'Em Simulator",
      separator:"",
      complement:""
    },
    meta: [
      {name:"application-name", content:"Pick'Em Simulator"},
      {name:"description", content:"Simulator of the Pick'Em Challenge form CS GO"},
      {name:"twitter:title", content:"Pick'Em Simulator"},
      {name:"twitter:description", content:"Make your picks without spent money on stickers!"},
      {property:'og:title',content:"Pick'Em Simulator"},
      {property:'og:image', content:'https://static.hltv.org/images/eventLogos/4450.png'}
    ]
  }
}
</script>
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
