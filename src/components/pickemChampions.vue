<template>
<div>
  <div class="pick-champions is-hidden-mobile">
    <slot name="stage"></slot>
    <div class="columns">
      <div class="column">
        <h3>Quarter-final #1</h3>
        <picklogo :teams="[teams[0],teams[1]]" :logosrc="logosrc" :selected="selected[0]" :ispickem="ispickem" :pos="0" @teamPicked="pickTeams"></picklogo>
      </div>
      <div class="column">
        <h3>Quarter-final #2</h3>
        <picklogo :teams="[teams[2],teams[3]]" :logosrc="logosrc" :selected="selected[1]" :pos="1" :ispickem="ispickem" @teamPicked="pickTeams"></picklogo>    
      </div>
      <div class="column">
        <h3>Quarter-final #3</h3>
          <picklogo :teams="[teams[4],teams[5]]" :logosrc="logosrc" :pos="2" :selected="selected[2]" :ispickem="ispickem" @teamPicked="pickTeams"></picklogo>      
      </div>
      <div class="column">
        <h3>Quarter-final #4</h3>
        <picklogo :teams="[teams[6],teams[7]]" :logosrc="logosrc" :pos="3" :selected="selected[3]" :ispickem="ispickem" @teamPicked="pickTeams"></picklogo>
      </div>            
    </div>
    <div class="semi-finals">
      <div class="columns">
        <div class="column">
          <h3>Semi-final #1</h3>
          <div class="columns">
            <div class="column is-half">
              <img :src="logosrc+selected[0]" :class="[{selected:isPicked(selected[0],4)},'bordas mini-logo picked']" @click="pickTeams([selected[0],4])"/>
            </div>
            <div class="column is-half">
              <img :src="logosrc+selected[1]" :class="[{selected:isPicked(selected[1],4)},'bordas mini-logo picked']" @click="pickTeams([selected[1],4])" />
            </div>
          </div>
        </div>
        <div class="column">
          <h3>Semi-final #2</h3>
          <div class="columns">
            <div class="column is-half">
              <img :src="logosrc+selected[2]" :class="[{selected:isPicked(selected[2],5)},'bordas mini-logo picked']" @click="pickTeams([selected[2],5])"/>
            </div>
            <div class="column is-half">
              <img :src="logosrc+selected[3]" :class="[{selected:isPicked(selected[3],5)},'bordas mini-logo picked']" @click="pickTeams([selected[3],5])"/>
            </div>
          </div>        
        </div>        
      </div>
    </div>
    <div class="grand-final">
      <h3>Grand Final</h3>
      <div class="columns">
        <div class="column is-half">
          <img :src="logosrc+selected[4]" :class="[{selected:isPicked(selected[4],6)},'bordas mini-logo picked']" @click="pickTeams([selected[4],6])" />
        </div>
        <div class="column is-half">
          <img :src="logosrc+selected[5]" :class="[{selected:isPicked(selected[5],6)},'bordas mini-logo picked']" @click="pickTeams([selected[5],6])" />
        </div>
      </div>
    </div>
    <div class="major-champion">
      <h3>Major Champion</h3>
      <img :src="logosrc+selected[6]" :class="[{selected:isPicked(selected[6],6)},'bordas picked']" /> 
    </div>
    <slot name="savePickBtn"></slot>
  </div>
  <div class="pick-champions is-hidden-desktop section">
    <slot name="stage"></slot>
    <div class="columns is-mobile">
      <div class="column is-half">
        <h3>Quarter-final #1</h3>
        <picklogo :teams="[teams[0],teams[1]]" :logosrc="logosrc" :selected="selected[0]" :ispickem="ispickem" :pos="0" @teamPicked="pickTeams"></picklogo>
      </div>
      <div class="column is-half">
        <h3>Quarter-final #2</h3>
        <picklogo :teams="[teams[2],teams[3]]" :logosrc="logosrc" :selected="selected[1]" :pos="1" :ispickem="ispickem" @teamPicked="pickTeams"></picklogo>    
      </div>
      </div>
      <div class="columns is-mobile">
      <div class="column is-half">
        <h3>Quarter-final #3</h3>
          <picklogo :teams="[teams[4],teams[5]]" :logosrc="logosrc" :pos="2" :selected="selected[2]" :ispickem="ispickem" @teamPicked="pickTeams"></picklogo>      
      </div>
      <div class="column is-half">
        <h3>Quarter-final #4</h3>
        <picklogo :teams="[teams[6],teams[7]]" :logosrc="logosrc" :pos="3" :selected="selected[3]" :ispickem="ispickem" @teamPicked="pickTeams"></picklogo>
      </div>            
      </div>
    <div class="semi-finals">
      <div class="columns is-mobile">
        <div class="column">
          <h3>Semi-final #1</h3>
          <div class="columns is-mobile">
            <div class="column is-half">
              <img :src="logosrc+selected[0]" :class="[{selected:isPicked(selected[0],4)},'bordas picked']" @click="pickTeams([selected[0],4])"/>
            </div>
            <div class="column is-half">
              <img :src="logosrc+selected[1]" :class="[{selected:isPicked(selected[1],4)},'bordas picked']" @click="pickTeams([selected[1],4])" />
            </div>
          </div>
        </div>
        <div class="column">
          <h3>Semi-final #2</h3>
          <div class="columns is-mobile">
            <div class="column is-half">
              <img :src="logosrc+selected[2]" :class="[{selected:isPicked(selected[2],5)},'bordas picked']" @click="pickTeams([selected[2],5])"/>
            </div>
            <div class="column is-half">
              <img :src="logosrc+selected[3]" :class="[{selected:isPicked(selected[3],5)},'bordas picked']" @click="pickTeams([selected[3],5])"/>
            </div>
          </div>        
        </div>        
      </div>
    </div>
    <div class="grand-final">
      <h3>Grand Final</h3>
      <div class="columns is-mobile">
        <div class="column is-half">
          <img :src="logosrc+selected[4]" :class="[{selected:isPicked(selected[4],6)},'bordas picked']" @click="pickTeams([selected[4],6])" />
        </div>
        <div class="column is-half">
          <img :src="logosrc+selected[5]" :class="[{selected:isPicked(selected[5],6)},'bordas picked']" @click="pickTeams([selected[5],6])" />
        </div>
      </div>
    </div>
    <div class="major-champion">
      <h3>Major Champion</h3>
      <img :src="logosrc+selected[6]" :class="[{selected:isPicked(selected[6],6)},'bordas picked']" /> 
    </div>
    <slot name="savePickBtn"></slot>
  </div>
</div>
</template>

<script>
import picklogo from '@/components/picklogo.vue'
import { ModalProgrammatic as Modal } from 'buefy'

export default {
  name: 'pickemChampions',
  props: ["teams", "major", "stage", "selected","ispickem"],
  data: function(){
    return {
      logosrc:"https://static.hltv.org/images/team/logo/",
      showList:true,
    }
  },
  components: {
    picklogo
  },
  methods:{
    pickTeams: function(evt){
      if(!this.ispickem){
        this.selected[evt[1]]=evt[0]
        this.$forceUpdate()
      }
    },
    removeTeam:function(n,evt){
      if(!this.ispickem){
        this.selected[n]='undefined'
        this.$forceUpdate()
      }
    },
    isPicked: function(team,pos){
      if(this.selected[pos]==parseInt(team)){
        return true
      } else {
        return false
      }    
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@media (min-width:769px){
  .mini-logo {
    width:100px;
  }
  .major-champion img {
    max-width:120px;
  }
}
@media (max-width:768px) {
  .mini-logo {
    width: 60px;
    height: 60px;
  }
  .grand-final img {
    max-width:80px;
  }    
  .major-champion img {
    max-width: 100px;
  }  
}
.pick-champions {
  max-width:850px;
  margin: 30px auto 0 auto;
}
.pick-champions h3 {
  padding:10px 0;
  font-weight: bold;
}
.finals-logo {
  max-width:80px;
}
.semi-finals {
  margin:0 auto;
}
.is-picked{
  border-color:#9e9e9e;
}
.grand-final {
  max-width:400px;
  margin: 20px auto 20px auto;
}
.major-champion {
  margin-bottom:20px;
}
  .bordas {
    border: 3px dotted #e0e0e0;
    border-radius:10px;
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
  .selected {
      border: 3px dotted #9e9e9e;
      border-radius:10px;
  }  
</style>
