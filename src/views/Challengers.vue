<template>
  <div class="home">
    <pickem v-if="times" :teams="times" :major="major" :stage="stage" v-on:save-pick="savePick"/>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import {db} from '@/firebaseconfig';
import pickem from '@/components/pickem.vue'

// @ is an alias to /src
export default {
  name: 'Challengers',
  props:["major","stage","pick"],
  data() {
    return {
      times:[],
      isLoading: true,
      pickLoaded:[],
      selected:[]
    }
  },
  components: {
    pickem
  },
  methods: {
    fetchData(major,stage,pick) {
      this.isLoading = true
      if(pick==undefined&&major!=undefined&&stage!=undefined){
        const firedb = db.collection(major)        
        this.$bind('times', firedb.doc(stage)).then(times=>{
          this.isLoading=false
        })  
      } else {
        console.log(pick)
      }   
    },
    savePick(data){
      this.$buefy.toast.open('salvo')
      console.log(data)
    }
  },
  created() {
    this.fetchData(this.major,this.stage,this.pick)
  },
  watch: {
    '$route' (to,from){
      this.fetchData(to.params.major,to.params.stage, to.params.pick)
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
