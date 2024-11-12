<template>
  <div id="app">
    <Sidebar />
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/SideBar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
};
</script>

<style>
#app {
  display: flex;
  min-height: 100vh;
  width: 100%; 
  margin: 0; 
  overflow: hidden; 
}

.main-content {
  margin-left: 200px; 
  flex: 1;
  padding: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}



@media (max-width: 768px) {
  .main-content {
    width: 100%; 
  }
}
</style>
