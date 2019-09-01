<template>
    <div class="columns is-mobile">
        <div v-for="team in teams" class="column" :key="team.logo" @click="pickTeam(team.logo)">
            <img :src="logosrc+team.logo" :class="[{selected:isPicked(team.logo)},'bordas picked']" /><br/>
            <p class="team-name">{{team.name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name:'picklogo',
        props:['teams', 'logosrc','pos', 'selected', 'ispickem'],
        data() {
            return {
                picked:this.selected
            }
        },
        methods: {
            pickTeam(team) {
                if(!this.ispickem){
                    this.picked = team
                    this.$emit('teamPicked',[team,this.pos])
                }
            },
            isPicked: function(team){
                if(this.picked==team){
                    return true
                } else {
                    return false
                }    
            }
        }        
    }
</script>
<style scoped>
    .selected {
        border: 3px dotted #9e9e9e;
        border-radius:10px;
    }
    .team-name {
        text-transform: capitalize;
        font-size:0.9rem;
    }
</style>