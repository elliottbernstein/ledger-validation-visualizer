<template>
  <div id='main'>
    <div id='app'>
      <ledgersChart/>
    </div>
  </div>
</template>

<script>
import ledgersChart from './components/ledgersChart'

export default {
  name: 'App',
  components: {
    ledgersChart
  }
}
</script>

<style>
html {
  background-color: black;
}
#main {
  height: 100%;
  width: 100%;
  background-color: black;
}
#app {
  font-family: monaco;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: lime;
  margin-top: 60px;
}
</style>
