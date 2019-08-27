<template>
  <div class="teamlist-wrapper">  
        <div v-for="(team,key) in teams" :key="key" @click="pickTeam(team)" class="mobile-team-list">
            <img :src="logosrc+team.logo" class="semi-logo"/>
        </div>
  </div>
</template>

<script>
export default {
  name: 'teamslist',
  props: ['teams', 'pickeds','logosrc', 'position'],
  data() {
    return {
      selected:["undefined","undefined","undefined","undefined","undefined","undefined","undefined","undefined","undefined"],
    }
  },
  methods: {
    pickTeam(team){
      let data = {'pos':this.position,'team':team}
      this.$emit('selectTeam',data)
      this.$emit('close')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.teamlist-wrapper{
    display:flex;
    flex-wrap: wrap;
    margin:0 auto;
    max-width:650px;
    text-align:center;
}
.teamlist-wrapper div {
    padding:20px;
}
.mobile-team-list {
  border: 3px dotted;
  border-radius:10px;
}
</style>
