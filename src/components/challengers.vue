<template>
  <div>
      <h3 @click="showList = !showList" aria-controls="teamList" class="is-hidden-desktop"><span v-if="!showList">Show</span> <span v-else>Hide</span> team list <i v-if="!showList" class="fas fa-arrow-down"></i><i v-else class="fas fa-arrow-up"></i></h3>
      <b-collapse :open.sync="showList" aria-id="teamList" >
      <div class="team-list">
        <div v-for="(team,i) in teams" :key="team.logo" draggable="true" @dragstart="dragStart($event)" :id="team.logo" class="">
          <img :src="logosrc+team.logo" draggable="false" class="" /><br/>
          <i v-if="isPicked(team.logo)" class="fas fa-check"></i>          
        </div>
      </div>
      </b-collapse>
    <div class="teams-wrapper section">
      <div class="columns is-mobile loser-winner">
        <div class="column is-one-quarter-desktop is-two-fifths-mobile">
          <h1 class="is-size-3"><strong>3-0</strong></h1>
        </div>
        <div class="column"></div>        
        <div class="column is-one-quarter-desktop is-two-fifths-mobile">
          <h1 class="is-size-3"><strong>0-3</strong></h1>
        </div>
      </div>
      <div class="columns is-mobile loser-winner">
        <div class="column bordas is-one-quarter-desktop is-two-fifths-mobile" @dragover.prevent draggable="false" @drop="dragFinish(0,$event)" @click="removeTeam(0,$event)">
            <img :src="'/img/stickers/'+selected[0]+'.png'" draggable="false" class="animated" />
        </div>        
        <div class="column"></div>
        <div class="column bordas is-one-quarter-desktop is-two-fifths-mobile" @dragover.prevent draggable="false" @drop="dragFinish(1,$event)" @click="removeTeam(1,$event)">
            <img :src="'/img/stickers/'+selected[1]+'.png'" draggable="false" class="animated"><br/>
        </div>
      </div>
      <div class="columns is-mobile is-hidden-desktop">
        <div class="column is-one-quarter-desktop is-two-fifths-mobile">
          <button class="button is-primary is-small" @click="pickTeams(0, $event)">Pick</button>         
        </div>        
        <div class="column"></div>
        <div class="column is-one-quarter-desktop is-two-fifths-mobile">
          <button class="button is-primary is-small" @click="pickTeams(1, $event)">Pick</button>         
        </div>
      </div>         
      <h2 class="remaining-msg">The remaining <strong>7 teams</strong> that will <strong>advance</strong></h2>
      <br/>
      <div class="columns is-mobile is-multiline">
        <div v-for="n in 7" :key="n" class="column is-one-third-mobile" @click="removeTeam(n+2)" @dragover.prevent draggable="false" @drop="dragFinish(n+2,$event)">
          <img :src="logosrc+selected[n+2]" class="mini-logo bordas" draggable="false"/><br/>
          <button class="is-hidden-desktop button pick-button is-primary is-small" @click="pickTeams(n+2, $event)">Pick</button>
        </div>
      </div>
      <small class="is-hidden-mobile">(Click to remove)</small>
    </div>
  </div>
</template>

<script>
import teamlist from '@/components/teamlist.vue'
import { ModalProgrammatic as Modal } from 'buefy'

export default {
  name: 'challengers',
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
      showList:true,
      major:"",
      stage:""
    }
  },
  methods:{
    pickTeams: function(n, evt){
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
    dragStart: function(ev){
      console.log(ev)
      ev.dataTransfer.setData("text",ev.target.id)
      ev.dataTransfer.dropEffect="move";
    },
    dragFinish: function(to, ev){
      console.log(ev)
      let data = ev.dataTransfer.getData("text")
      if(this.selected.indexOf(parseInt(data))==-1){
        this.selected[to] = parseInt(data)
        this.$forceUpdate()  
        ev.target.classList.add('flash')      
      } else {
        console.log('naio')
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
    max-width: 800px;
    margin: 0 auto;  
  }  
  .team-list {
    padding:0 90px;
  }
  .mini-logo {
    width:100px;
  }
  .loser-winner {
    max-width: 600px;
    margin: 0 auto;
  }
}
@media (max-width:768px) {
  .team-list {
    padding: 0 20px;
  }
  .mini-logo {
    width: 60px;
    height: 60px;
  }
}
  .remaining-msg {
    margin-top:30px;
  }
  .pick-button {
    margin-left:2px;
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
