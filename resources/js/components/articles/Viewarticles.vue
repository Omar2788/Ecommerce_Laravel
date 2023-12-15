<template>
    <div class="drag">
        <div v-if="isLoading">
            <h2> Loading .... </h2>
        </div>
        

      <div v-else class="py-6">
        <nav class="navbar navbar-expand-lg navbar-dark bg-success">
        <div class="container-fluid">
         
            <router-link :to="{name: 'Addarticle'}" class="btn btn-outline-light">
                <i class="fa-solid fa-square-plus"></i> New Article
            </router-link>

         
        </div>
      </nav>
          <table class="table table-striped shadow">
            <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Référence</th>
            <th scope="col">Désignation</th>
            <th scope="col">Quantité Stock</th>
            <th scope="col">Prix</th>
            <th scope="col">View</th>
            <th scope="col">Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>

              <tbody>
                  <tr v-for="art in articles" :key="art.id">
                      <td><img :src="art.imageart" width="70" height="80"/> </td>
                      <td>{{ art.reference }}</td>
                      <td>{{ art.designation }}</td>
                      <td>{{ art.marque }}</td>
                      <td>{{ art.qtestock }}</td>
                      <td>{{ art.prix }}</td>
                      
                      <td>

                        <router-link :to="{name: 'editarticle', params: { id: art.id }}" class="btn btn-outline-warning mx-2">
                            <i class="fa-solid fa-pen-to-square"></i>
                            Modifier</router-link>

                      </td>
                      <td><button class="btn btn-outline-danger mx-2" @click="deletearticle(art.id)">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button></td>
                  
                  </tr>
              </tbody>
          </table>
  </div>
      </div>
  
</template>

<script setup>
import { ref,onMounted } from 'vue';

import axios from 'axios';
const articles=ref([])
const isLoading=ref(true)
let token=""
token=localStorage.getItem('token')
const config = {
  headers: { Authorization: `Bearer ${token}` }
};


const getarticles=async()=>{
await axios.get("http://localhost:8000/api/articles",config)
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

const deletearticle=async(id)=>{
    if (window.confirm("Etes-vous sûr de vouloir supprimer ?")) {
    try {
await axios.delete(`http://localhost:8000/api/articles/${id}`)
        getarticles()
    } catch (error) {
    console.log(error)
        
    }
}
}

</script>

<style scoped>
.drag{
  margin-top: 60px;
}
</style>