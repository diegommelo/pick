<template>
  <div class="home">
    <pickem v-if="times" :teams="times" :major="major" :stage="stage" :selected="selected" :ispickem="true">
      <template v-slot:majorLogo>
        <img v-if="major == 'berlin'" src="https://static.hltv.org/images/eventLogos/4450.png" class="major-logo"/>
        <img v-if="major == 'antwerp'" src="https://escorenews.com/media/tournament/e6575.png" class="major-logo"/>        
      </template>      
      <template v-slot:stage>
        <h3 class="stage-pick">{{stage}} Stage</h3>
        <h2 v-if="name!=null" class="by-user">by {{name}}</h2>
      </template>
      <template v-slot:savePickBtn>
        <router-link to="/" class="button is-primary">New Pick'Em</router-link>
      </template>
    </pickem>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import {db} from '@/firebaseconfig';
import pickem from '@/components/pickem.vue'

// @ is an alias to /src
export default {
  name: 'Pickem',
  props:["pick"],
  data() {
    return {
      times:[],
      isLoading: true,
      selected:[],
      major:null,
      stage:null,
      name:null
    }
  },
  components: {
    pickem
  },
  methods: {
    fetchData(pick) {
      this.isLoading = true
      if(pick!=undefined){
        let el = this
        db.collection('picks').doc(pick).get().then(snapshot => {
          const data = snapshot.data()
          el.selected = data.pickeds
          el.major = data.major
          el.stage = data.stage
          el.name = data.user
          db.collection(data.major).doc(data.stage).get().then(snapshot =>{
            const dataMajor = snapshot.data()
            el.times = dataMajor.teams
            el.isLoading = false
          })
        })
      }   
    }
  },
  created() {
    this.fetchData(this.pick)
  },
  watch: {
    '$route' (to,from){
      this.fetchData(to.params.pick)
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
.stage-pick {
  font-size:2rem;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
