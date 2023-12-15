<template>
<div class="drag">
  <div v-if="isLoading">
            <h2> Loading .... </h2>
        </div>
    <div v-else class="row">
        <div class="col-md-12" style="display:flex;flex-wrap:wrap;justify-content:center">

          <div class="card" style="width: 18rem;margin:6px" v-for="prod in Articles" :key="prod.id">
  <img :src="prod.imageart" :alt=prod.designation  width="200" height="200">
  <div class="card-body">
    <h5 class="card-title">{{ prod.designation.substr(0,20) }}</h5>
   
    
  
  <div style="text-align:center">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Prix : {{ prod.prix }} TND</li>
                </ul>
                <button class="btn btn-outline-primary" @click="addToCart(prod)" v-if="prod.qtestock>1">Add to Cart</button>
                <button class="btn btn-default" v-if="prod.qtestock<=1">OUT OF SOLD</button>
            </div>
          </div>  
        </div>
    </div>
  </div>
</div>
  </template>

<script setup>

  import axios from "../config/api";
  import store from '../../store'
  
import { ref, onMounted } from 'vue';

const Articles = ref([]);
const isLoading=ref(true)
onMounted(() => {
          getArticles();
                   
          }
);

const getArticles=(page=1)=>{
              
         axios.get('/api/articles/')
        
             .then(response => { 
              Articles.value = response.data;
              isLoading.value=false
                               
              });   
          }
        
const    addToCart=(prod)=> {

store.commit("Articlestore/addCart", {product:prod,qty:1});

             }     

  
      
</script>
<style scoped>
.drag{
  margin-top: 70px;
}
</style>