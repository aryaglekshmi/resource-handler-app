<template>
  <AppHeader />
  <HomeCards/>
  <!-- <ResourceList v-if="showCreateResource == false"/>
  <CreateResource v-if="showCreateResource"/> -->
  <AppFooter />
</template>

<script>
import AppHeader from './components/appHeader.vue'
import AppFooter from './components/appFooter.vue'
import HomeCards from './components/homeCards.vue'

export default {
  /* eslint-disable */
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    HomeCards
  }
}
</script>


<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  box-sizing: border-box;
  background: linear-gradient(#ffffff, #d3c9c9);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 98%;
}
</style>
