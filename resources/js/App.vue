<script setup>
import "./components/authentification/Login.vue"
</script>

<template>
    <login/>
<router-view></router-view>
</template>
<style scoped>
.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f1f1f1;
  padding: 10px;
  z-index: 1000;
  
  /* Ajoutez d'autres styles selon vos besoins */
}
</style>