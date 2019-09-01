<template>
    <div class="home">
        {{pickedTeams}}
    </div>
</template>

<script>
import {db} from '@/firebaseconfig';

// @ is an alias to /src
export default {
  name: 'Stats',
  props:["major"],
  data() {
    return {
      times:[],
      pickedTeams:[],
      isLoading: true,
      db:null
    }
  },
  components: {
    
  },
  methods: {
      test(){
        for(obj in this.picks){
            console.log(obj)
        }
      }
  },
  firestore: {
      picks: db.collection('picks')
  },
  mounted() {
    console.log(this.picks)
    //this.fetchData(this.major)
  },
  watch: {
    '$route' (to,from){
      //this.fetchData(to.params.major)
    }
  }
}
</script>
<style>
@import url('https://use.fontawesome.com/releases/v5.2.0/css/all.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css');

</style>
