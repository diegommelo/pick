<template>
  <div class="home">
    <pickem v-if="times" :teams="times" />
  </div>
</template>

<script>
import pickem from '@/components/pickem.vue'
import {db} from '@/firebaseconfig';

// @ is an alias to /src
export default {
  name: 'Challengers',
  props:["major","stage"],
  data() {
    return {
      times:[],
    }
  },
  components: {
    pickem
  },
  methods: {
    fetchData(major,stage) {
      const firedb = db.collection(major)        
      this.$bind('times', firedb.doc(stage)).then(times=>{
        console.log(times)
      })      
    }
  },
  created() {
    this.fetchData(this.major,this.stage)
  },
  watch: {
    '$route' (to,from){
      this.fetchData(to.params.major,to.params.stage)
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
