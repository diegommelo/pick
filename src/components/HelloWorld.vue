<template>
  <div>
      <div class="team-list">
        <div v-for="(team,i) in teams" :key="team.logo" draggable="true" @dragstart="dragStart($event)" :id="team.logo" class="">
          <img :src="logosrc+team.logo" draggable="false" class="" /><br/>
          <i v-if="isPicked(team.logo)" class="fas fa-check"></i>          
        </div>
      </div>
    <div class="teams-wrapper section">
      <div class="columns is-mobile">
        <div class="column is-one-quarter-desktop is-two-fifths-mobile">
          <h1 class="is-size-3"><strong>3-0</strong></h1>
        </div>
        <div class="column"></div>        
        <div class="column is-one-quarter-desktop is-two-fifths-mobile">
          <h1 class="is-size-3"><strong>0-3</strong></h1>
        </div>
      </div>
      <div class="columns is-mobile">
        <div class="column bordas is-one-quarter-desktop is-two-fifths-mobile" @dragover.prevent draggable="false" @drop="dragFinish(0,$event)" @click="removeTeam(0,$event)" @touchstart="pickTeams($event)">
            <img :src="logosrc+selected[0]" draggable="false" class="" /><br/>
        </div>
        <div class="column"></div>
        <div class="column bordas is-one-quarter-desktop is-two-fifths-mobile" @dragover.prevent draggable="false" @drop="dragFinish(1,$event)" @click="removeTeam(1)">
            <img :src="logosrc+selected[1]" draggable="false"><br/>
        </div>
      </div>    
      <h2>The remaining <strong>7 teams</strong> that will <strong>advance</strong></h2>
      <br/>
      <div class="columns is-multiline">
        <div v-for="n in 7" :key="n" class="column bordas remaning-picks" @click="removeTeam(n+2)" @dragover.prevent draggable="false" @drop="dragFinish(n+2,$event)">
          <img :src="logosrc+selected[n+2]" class="mini-logo" draggable="false"/><br/>
        </div>
      </div>
      <small>(Click to remove)</small>
    </div>
  </div>
</template>

<script>
import teamlist from '@/components/teamlist.vue'
import { ModalProgrammatic as Modal } from 'buefy'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function(){
    return {
      teams: [
        {logo:9565, name:"vitality"},
        {logo:6673, name:"nrg"},
        {logo:5995, name:"g2"},  
        {logo:8297, name:"furia"},
        {logo:4494, name:"mousesports"},
        {logo:7533, name:"north"},
        {logo:10150, name:"crazy"},  
        {logo:8135, name:"forze"},                                                 
        {logo:8008, name:"grayhound"},   
        {logo:5005, name:"complexity"},
        {logo:8120, name:"avangar"},
        {logo:4863, name:"tyloo"},  
        {logo:6619, name:"intz"},   
        {logo:8305, name:"dream eaters"},
        {logo:5310, name:"hellraisers"},
        {logo:8772, name:"syman gaming"},  
      ],
      logosrc:"https://static.hltv.org/images/team/logo/",
      selected:[],
    }
  },
  methods:{
    pickTeams: function(evt){
      evt.preventDefault()
      console.log(evt.type)
      Modal.open({
        parent:this,
        component:teamlist,
        props:{
          "teams":this.teams,
          "logosrc":this.logosrc
        }
      })
    },
    removeTeam:function(n,evt){
      console.log(evt.type)
      this.selected[n]=undefined
      this.$forceUpdate()
    },
    drop: function(ev){
      console.log(ev)
    },
    dragStart: function(ev){
      ev.dataTransfer.setData("text",ev.target.id)
      ev.dataTransfer.dropEffect="move";
    },
    dragFinish: function(to, ev){
      let data = ev.dataTransfer.getData("text")
      if(this.selected.indexOf(data)==-1){
        this.selected[to] = parseInt(data)
        this.$forceUpdate()
      }
    },
    isPicked: function(team){
      if(this.selected.indexOf(team)!=-1){
        return true
      } else {
        return false
      }    
    },
    dragOver:function(ev){
      console.log(ev)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (min-width:769px){
  .teams-wrapper{
    max-width: 700px;
    margin: 0 auto;  
  }  
  .team-list {
    padding:0 90px;
  }
}
@media (max-width:768px) {
  .team-list {
    padding: 0 20px;
  }
}
  .nopick {
    display: inline-block;
    height: 100% !important;
  }
  .remaning-picks {
    min-height: 115px;
  }
  .hidden{
    visibility: hidden;
  }
  .remove-pick{
    position:relative;
    float: right;
  }
  .team-list {
    display: flex;
    flex-wrap: wrap;
    min-height: 91px;
  }
  .team-list > div {
    padding:10px;
    margin: 0 auto;
  }
  .team-list img, .medium-logo {
    width: 40px;
  }
  .mini-logo {
    width:60px;
    height:60px;
    display: inline-block;
    height: 100%;
  }
  .bordas {
    border: 3px dotted #e0e0e0;
    border-radius:10px;
    margin:5px;
  }
  .border-winner {
    border: 3px dotted #e0e0e0;
    border-radius:10px;
    margin:5px;

  }
  .border-loser {
    border: 3px dotted #e0e0e0; 
    border-radius: 10px;
    margin:5px;
  }
  .fas{
    color:#a5d6a7;
  }
</style>
