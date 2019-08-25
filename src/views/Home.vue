<template>
  <div class="home">
    <challengers />
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
import Buefy from 'buefy'
import VueFirestore from 'vue-firestore';
import 'buefy/dist/buefy.css'
import { db } from './firebase';
import challengers from '@/components/challengers.vue'

Vue.use(Buefy, VueFirestore)

export default {
  name: 'home',
  data() {
    return {
      teams:[],
      major:null,
      stage:null
    }
  },
  components: {
    challengers
  },
  firestore() {
    return {
      teams: db.collection('berlin')
    }
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
