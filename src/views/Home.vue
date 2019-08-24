<template>
  <div class="home">
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import HelloWorld from '@/components/HelloWorld.vue'

Vue.use(Buefy)

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style>
@import url('https://use.fontawesome.com/releases/v5.2.0/css/all.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css');

.home {
  text-align:center;
}
.semi-logo {
  width:60px;
  height:60px;
}
</style>
