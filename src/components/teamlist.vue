<template>
  <div class="teamlist-wrapper">  
        <div v-for="(team,key) in teams" :key="key" @click="pickTeam(team)">
            <img :src="logosrc+team.logo" class="semi-logo"/>
            <br/><p>{{team.name}}</p>
        </div>
  </div>
</template>

<script>
export default {
  name: 'teamslist',
  props: ['teams', 'pickeds','logosrc']
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
</style>
