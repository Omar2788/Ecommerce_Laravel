<template>
    <div class="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
    <form @submit.prevent="addCategorie">
  <div class="mb-3">
    <label for="nomcateg" class="form-label">Nom catégorie</label>
    <input type="text" class="form-control" id="nomcategorie" v-model="categorie.nomcategorie">
  </div>
  <div class="mb-3">
    <label for="imagecateg" class="form-label">Image</label>
    <input type="texte" class="form-control" id="imagecategorie" v-model="categorie.imagecategorie">
  </div>
  
           <button type="submit" className="btn btn-outline-primary">
              Enregister
            </button>
            <router-link to="/listcat" class="btn btn-outline-danger mx-2">
              Cancel
            </router-link>
            

           
          

</form>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from 'vue-router';
const router = useRouter() 
import axios from 'axios';
const categorie=ref({
    nomcategorie:"",
    imagecategorie:""
})
const addCategorie=async()=>{
await axios.post("http://localhost:8000/api/categories/",categorie.value)
.then(() => (
                        router.push({ name: 'Viewcategorie' })
                    ))
                    .catch(err => console.log(err))
                

}
</script>
<style scoped>

</style>

















