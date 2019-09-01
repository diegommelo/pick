<template>
  <div class="home">
    <pickemChampions v-if="times" :teams="times" :major="major" stage='champions' :selected="selected" :ispickem="false" v-on:save-pick="savePick">
      <template v-slot:stage></template>
      <template v-slot:savePickBtn>
        <b-input v-model="name" placeholder="Your name" max-length="20" class="user-name"></b-input>
        <button class="button is-primary btnSave" @click="savePick()">Save Pick'Em</button>
      </template>
    </pickemChampions>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import {db} from '@/firebaseconfig';
import pickemChampions from '@/components/pickemChampions.vue';

// @ is an alias to /src
export default {
  name: 'Champions',
  props:["major","stage","pick"],
  data() {
    return {
      times:[],
      isLoading: true,
      name:null,
      selected:["undefined","undefined","undefined","undefined","undefined","undefined","undefined","undefined"],
      db:null
    }
  },
  components: {
    pickemChampions
  },
  methods: {
    fetchData(major) {
      this.isLoading = true
      if(major!=undefined){
        this.selected=["undefined","undefined","undefined","undefined","undefined","undefined","undefined"]
        this.$bind('times', this.db.doc('champions')).then(times=>{
          this.times = times['teams']
          this.isLoading=false
        })  
      } else {
        console.log('fuen')
      }   
    },
    savePick(data){
      if(this.selected.length<=7&&this.selected.indexOf('undefined')!==-1){
        this.$buefy.toast.open({
          "message":"Pick'Em Incomplete",
          "type":"is-danger",
          "position":"is-bottom"
        })        
      } else {
        let data = {

        }
        try {
          db.collection('picks').add({
            pickeds: this.selected,
            major:this.major,
            stage:'champions',
            user:this.name,
            createdAt:Date(Date.now())
          }).then(ref=>{
            this.isLoading = true
            this.$buefy.toast.open({
              message:"Pick'Em Saved",
              type:"is-success"
            })
            this.$router.push({name:'pick', params:{pick:ref.id}})
          })
        }
        catch(e){
          console.log(e)
        }        
      }      
    }
  },
  created() {
    this.db = db.collection(this.major)
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

</style>
