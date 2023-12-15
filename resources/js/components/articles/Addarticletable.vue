<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-success">
        <div class="container-fluid">
          <button type="button" class="btn btn-warning   rounded-circle"  @click="visible = true">
            <span style="color: rgb(43, 27, 27)">
            <i class="fa-solid fa-square-plus"> </i> 
          </span>
          New
            </button>
           

         
        </div>
</nav>
   

<form >
  <Dialog
          v-model:visible="visible"
          modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
         
      >
    <div class="card flex justify-content-center">
      
      

    <div class="row">
    <div class="col-md-6">.
        <label for="reference" class="form-label">Référence</label>
    <input type="text" class="form-control" id="reference" v-model="article.reference">
  
    </div>
    <div class="col-md-6 ms-auto">
        <label for="designation" class="form-label">Désignation</label>
    <input type="texte" class="form-control" id="designation" v-model="article.designation">
 
    </div>
  </div>
                
  <div class="row">
    <div class="col-md-6">.
        <label for="marque" class="form-label">Marque</label>
    <input type="text" class="form-control" id="marque" v-model="article.marque">
  
    </div>
    <div class="col-md-6 ms-auto">
        <label for="Quantité" class="form-label">Qtock</label>
    <input type="texte" class="form-control" id="qtestock" v-model="article.qtestock">
 
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">.
        <label for="prix" class="form-label">Prix</label>
    <input type="text" class="form-control" id="prix" v-model="article.prix">
  
    </div>
    <div class="col-md-6 ms-auto">
        <label for="scategorie" class="form-label">Sous Catégorie</label>
        <select class="form-control" v-model="article.scategorieID">
          <option v-for="sc in Scategories" :key="sc.id" :value=sc.id>{{sc.nomscategorie}}</option>
       </select>  

 
    </div>
  </div>
  <div class="row">
    <file-pond
name="test"
ref="pond"
class-name="my-pond"
label-idle="Drop files here..."
allow-multiple="false"
accepted-file-types="image/jpeg, image/png"
v-bind:files="myFiles"


:server="serverOptions()"
/>
    
  </div>
  <br/>
         
           
  <button type="submit" className="btn btn-outline-primary" @click="addArticle">
    <i class="fa-solid fa-floppy-disk"></i>Enregister
            </button>
            <button type="button" className="btn btn-outline-primary" @click="cancel">
    <i class="fa-solid fa-floppy-disk"></i>cancel
            </button>
            
            
       
    </div>

  </Dialog>
          </form>
          
           
</template>

<script setup>
import { ref,onMounted } from "vue"
import api from '../config/api.js';
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import Dialog from 'primevue/dialog';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Create FilePond component
const FilePond = vueFilePond(FilePondPluginImagePreview);
const myFiles = ref([]);


import axios from "axios";
const visible = ref(false);
const article=ref({
    reference:"",
    designation:"",
    marque:"",
    qtestock:0,
    prix:0,
    imageart:"/img/img1",
    scategorieID:""
})
const Scategories = ref([]);
const getscategories=()=>{
          
          api.get('/api/scategories').then(res => {
              Scategories.value = res.data;
                  }).catch(error => {
                      console.log(error)
                  });
      
               }
      
const addArticle=async()=>{
  try {
    await api.post("/api/articles/",article.value)
   {
     visible.value=false
    window.location.reload()
   }
  } catch (error) {
    
  }
}
onMounted(() => {
    getscategories();
            }
);
const handleFilePondInit = () => {
console.log('FilePond has initialized');
}

const cancel=()=>{
    visible.value=false
            
}
const serverOptions = () => { console.log('server pond');
return {
  

process: (fieldName, file, metadata, load, error, progress, abort) => {
const data = new FormData();
data.append('file', file);
data.append('upload_preset', 'GLID5IIT');
data.append('cloud_name', 'esps');
data.append('public_id', file.name);
axios.post('https://api.cloudinary.com/v1_1/esps/upload',data)
.then((response) => response.data)
.then((data) => {
console.log(data);

article.value.imageart = data.url;
load(data);
})
.catch((error) => {
console.error('Error uploading file:', error);
error('Upload failed');
abort();
});
},
};
};


</script>
<style scoped>

</style>