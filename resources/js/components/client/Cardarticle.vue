<template>
    <div class="container" style="margin:10px">
        <div class="row" >
            <div class="col-md-12" style="display:flex;flex-wrap:wrap;justify-content:center ">
    <div v-for="art in articles" :key="art.id" style="padding:10px margin:10px">
    <div class="card" style="width: 18rem; margin:6px">
  <img :src="art.imageart" class="card-img-top" alt="..." width="250" height="250">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">add to card</a>
  </div>
</div>
</div>
</div>
</div>
</div>
</template>

<script setup>
import api from '../config/api.js';

import { ref,onMounted } from 'vue';
const articles=ref([])
const isLoading=ref(true)
const getarticles=async()=>{
await api.get("/api/articles")
.then(res=>{
    articles.value=res.data
    isLoading.value=false
    
})
.catch(error=>{
    console.log(error)
})
}

onMounted(() => {
    getarticles();
});

</script>

<style lang="scss" scoped>

</style>