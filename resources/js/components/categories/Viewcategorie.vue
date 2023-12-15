<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-success">
        <div class="container-fluid">
         
            <router-link :to="{name: 'Addcategorie'}" class="btn btn-outline-light">
                New Category
            </router-link>

         
        </div>
      </nav>
   

      <div class="py-6">
        <table class="table table-striped shadow">
            <thead>
                <tr>
                    <td>Image</td>
                    <td>Nom catégorie</td>
                    <td>Modifier</td>
                    <td>Supprimer</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cat in categories" :key="cat.id">
                    <td><img :src="cat.imagecategorie" width="70" height="80"/> </td>
                    <td>{{ cat.nomcategorie }}</td>
                    <td><button class="btn btn-warning mx-2">Modifier</button></td>
                    <td><button class="btn btn-danger mx-2" @click="deletecategorie(cat.id)">Supprimer</button></td>
                
                </tr>
            </tbody>
        </table>
</div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios';
const categories=ref([])

const getcategories=async()=>{
await axios.get("http://localhost:8000/api/categories")
.then(res=>{
    categories.value=res.data
    console.log(categories.value)
})
.catch(error=>{
    console.log(error)
})
}
onMounted(() => {
    getcategories();
});

const deletecategorie=async(id)=>{
    try {
await axios.delete(`http://localhost:8000/api/categories/${id}`)
        getcategories()
    } catch (error) {
    console.log(error)
        
    }
}
</script>

<style lang="scss" scoped>

</style>