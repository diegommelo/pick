<template>
  <div>
    <slot name="majorLogo"></slot>
    <slot name="stage"></slot>
      <div v-if="stage!='champions'">
        <h3 @click="showList = !showList" aria-controls="teamList" class="is-hidden-desktop show-team-list"><span v-if="!showList">Show</span> <span v-else>Hide</span> team list <i v-if="!showList" class="fas fa-arrow-down"></i><i v-else class="fas fa-arrow-up"></i></h3>
        <b-collapse :open.sync="showList" aria-id="teamList" >
        <div class="team-list">
          <div v-for="(team,i) in teams" :key="team.logo" draggable="true" @dragstart="dragStart($event)" :id="team.logo" class="">
            <b-tooltip :label="team.name" position="is-top">
              <img v-if="team.logov2_src" :src="team.logov2_src" draggable="false" class="logo-team-list">
              <img v-else :src="logosrc+team.logo" draggable="false" class="logo-team-list" />
            </b-tooltip>         
            <i v-if="isPicked(team.logo)" class="fas fa-check check"></i> 
          </div>
        </div>
        </b-collapse>
      <div class="teams-wrapper">
        <div class="loser-winner">
          <div class="columns is-mobile">
            <div class="column is-one-quarter-desktop" @dragover.prevent draggable="false" @drop="dragFinish(0,$event)" @click="removeTeam(0,$event)">
                <h1 class="is-size-4"><strong>3-0</strong></h1>            
                <img :src="checkLogoV2(selected[0])" draggable="false" class="bordas picked"/>
                <button v-if="!ispickem" class="button is-primary is-small is-hidden-desktop" @click="pickTeams(0, $event)">Pick</button>         
            </div>        
            <div class="column is-one-fifth-mobile"></div>
            <div class="column is-one-quarter-desktop" @dragover.prevent draggable="false" @drop="dragFinish(1,$event)" @click="removeTeam(1,$event)">
                <h1 class="is-size-4"><strong>0-3</strong></h1>            
                <img :src="checkLogoV2(selected[1])" draggable="false" class="bordas picked">
                <button v-if="!ispickem" class="button is-primary is-small is-hidden-desktop" @click="pickTeams(1, $event)">Pick</button>         
            </div>
          </div>
        </div>        
        <h2 class="remaining-msg">The remaining <strong>7 teams</strong> that will <strong>advance</strong></h2>
        <br/>
        <div class="columns is-mobile is-multiline">
          <div v-for="n in 7" :key="n" class="column is-one-third-mobile" @click="removeTeam(n+1,$event)" @dragover.prevent draggable="false" @drop="dragFinish(n+1,$event)">
            <img :src="checkLogoV2(selected[n+1])" class="mini-logo bordas picked" draggable="false"/><br/>
            <button v-if="!ispickem" class="is-hidden-desktop button pick-button is-primary is-small" @click="pickTeams(n+1, $event)">Pick</button>
          </div>
        </div>
        <slot name="savePickBtn"></slot>
      </div>
      </div>
    <div v-if="stage == 'champions'" class="teams-wrapper">
      <pickemChampions v-if="teams" :teams="teams" :major="major" stage='champions' :selected="selected" :ispickem="true"></pickemChampions>
      <slot name="savePickBtn"></slot>    
    </div>
  </div>
</template>

<script>
import teamlist from '@/components/teamlist.vue'
import pickemChampions from '@/components/pickemChampions.vue'
import { ModalProgrammatic as Modal } from 'buefy'

export default {
  name: 'pickem',
  props: ["teams", "major", "stage", "selected","ispickem"],
  data: function(){
    return {
      logosrc:"https://static.hltv.org/images/team/logo/",
      showList:true,
    }
  },
  components: {
    pickemChampions
  },
  methods:{
    pickTeams: function(n, evt){
      evt.preventDefault()
      let el = this
      Modal.open({
        parent:this,
        component:teamlist,
        props:{
          "teams":this.teams,
          "logosrc":this.logosrc,
          "position":n
        },
        events: {
          selectTeam(event){
            el.pickTeam(event.pos,event.team.logo)
            el.$forceUpdate()
          }
        },
        scroll: "clip"
      })
    },
    removeTeam:function(n,evt){
      if(!this.ispickem){
        this.selected[n]='undefined'
        this.$forceUpdate()
      }
    },
    dragStart: function(ev){
      ev.dataTransfer.setData("text",ev.target.id)
      ev.dataTransfer.dropEffect="move";
    },
    dragFinish: function(to, ev){
      ev.preventDefault()
      let data = ev.dataTransfer.getData("text")
      this.pickTeam(to, data)
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
    },
    pickTeam:function(to,data){
      if(this.selected.indexOf(parseInt(data))==-1){
        this.selected[to] = parseInt(data)
        this.$forceUpdate()  
        //ev.target.classList.add('flash')      
      } else {
        let oldIdx = this.selected.indexOf(parseInt(data))
        this.selected[oldIdx]='undefined'
        this.selected[to] = parseInt(data)
        this.$forceUpdate()  
      }      
    },
    checkLogoV2(teamId){
      if (teamId !== 'undefined'){
        let team = this.teams.find(team => team.logo == teamId)
        return team.logov2_src ? team.logov2_src : this.logosrc+team.logo
      }
        return `${this.logosrc}'undefined'`
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
    max-width: 500px;
    margin: 0 auto;
  }
  .team-list img:hover{
    transform: scale(1.5)
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
  .teams-wrapper {
    padding:1rem;
  }
  .loser-winner {
    padding:0 5px;
    margin: 0 auto;
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
    margin-top:20px;
  }
  .team-list > div {
    padding:10px;
    margin: 0 auto;
  }
  .team-list img, .medium-logo {
    width: 40px;
    height: 100%;
  }
  .check{
    vertical-align: top;
    margin-left:5px;
    position: absolute;
  }
  .bordas {
    border: 3px dotted #e0e0e0;
    border-radius:10px;
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
  .picked {
    background: rgb(238,238,238);
    background: radial-gradient(circle, rgba(238,238,238,1) 31%, rgba(245,245,245,1) 72%);   
  }
  .btnSave {
    margin-top:20px;
  }
  .show-team-list{
    margin-top:25px;
  }
  .b-tooltip {
    text-transform: capitalize;
  }
  .b-tooltip.is-primary::after {
    background-color: #42b983 !important;
  }
.b-tooltip.is-top.is-primary::before {
  border-top-color: #42b983 !important;
}  
</style>
