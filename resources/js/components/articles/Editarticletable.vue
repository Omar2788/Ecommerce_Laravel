<template>
     
    <button type="button" class="btn btn-warning rounded-circle "  @click="visible = true">
       <span style="color: rgb(233, 240, 241)">
        <i class="fa-solid fa-pen-to-square"></i>
      
       </span>

   </button>    
<form >
   <div class="card flex justify-content-center">
      <Dialog
         v-model:visible="visible"   
     >
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
v-on:init="handleFilePondInit"
:server="serverOptions()"
/>
</div>
 <br/>
<button type="submit" className="btn btn-outline-primary" @click="modifierproduit">
   <i class="fa-solid fa-floppy-disk"></i>Enregister
           </button>
           <button type="button" className="btn btn-outline-primary" @click="cancel">
   <i class="fa-solid fa-floppy-disk"></i>cancel
           </button>
  </Dialog>
   </div>
  </form>        
</template>

<script setup>
import api from '../config/api.js';
import { ref,onMounted } from "vue"
import vueFilePond from 'vue-filepond';
import 'filepond/dist/filepond.min.css';
import Dialog from 'primevue/dialog';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// Create FilePond component
const FilePond = vueFilePond(FilePondPluginImagePreview);
const myFiles = ref([]);
import axios from 'axios';
const props=defineProps(['art'])
const visible = ref(false);
const article=ref({})
  
const Scategories = ref([]);
const getscategories=async()=>{     
         await api.get('/api/scategories').then(res => {
             Scategories.value = res.data;
                 }).catch(error => {
                     console.log(error)
                 });
     
              }
const handleFilePondInit = async() => {
     if (article.value.imageart) {
     
       myFiles.value = [
     {
       source: article.value.imageart,
       options: { type: 'local' }
     }
     ]
    }
     }
   
const loadarticle=()=>{
   
    article.value=props.art
}
onMounted(() => {
   getscategories();
   loadarticle()
   
           }
);

const  modifierproduit=()=>{
     api.put(`/api/articles/${article.value.id}`,article.value)
          .then(() => {
            visible.value=false
          })  
          .catch(error => {
             console.error("There was an error!", error);})
}

const cancel=()=>{
   visible.value=false
           
}
const serverOptions = () => { console.log('server pond');
return {
    load: (source, load, error, progress, abort, headers) => {
                    var myRequest = new Request(source);
                    fetch(myRequest).then(function(response) {
                      response.blob().then(function(myBlob) {
                        load(myBlob);
                      });
                    });
                  },
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