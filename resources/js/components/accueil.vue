<template>
  <div>
      <h2 class="text-center"> Liste des articles </h2>

      <table class="table" id="example">
          <thead>
          <tr>
        <th>Référence</th>  
        <th>Désignation</th>  
        <th>Marque</th>  
        <th>Prix</th>
        <th>Quantité</th> 
        <th>Sous Catégorie</th>
        <th>Image</th> 
        <th>Actions</th>
      </tr>
          </thead>
          <tbody>
          <tr v-for="p in Articles" :key="p.id">
              <td>{{p.reference}}</td>  
              <td>{{p.designation}}</td>  
              <td>{{p.marque}}</td> 
              <td>{{p.prix}}</td>
              <td>{{p.qtestock}}</td>
              <td>{{p.scategories.nomscategorie}}</td>
              <td><img :src="p.imageart" :alt=p.designation width="100" /></td>
              <td>
                  <button @click.prevent="deleteArticle(p.id)" class="btn btn-danger">Supprimer</button></td>
          </tr>
          </tbody>
      </table>
  </div>
</template>

<script setup>
import axios from "axios";

//Bootstrap and jQuery libraries
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

import { ref, onMounted } from 'vue';

const Articles = ref([]);

onMounted(() => {
          getArticles();
          }
);

const getArticles=()=>{
                axios
              .get('http://localhost:8000/api/articles/')
              .then(response => { 
                               Articles.value = response.data;
                               initDataTable();
              });   
          }
          const initDataTable = () => {
  $(document).ready(function () {
    $('#example').DataTable();
  });
}
const deleteArticle=(id)=> { 
               if (window.confirm("Etes-vous sûr de vouloir supprimer ?")) {
                 axios
                  .delete(`http://localhost:8000/api/articles/${id}`)
                  .then(() => {
                      let i = Articles.value.map(data => data.id).indexOf(id);
                      Articles.value.splice(i, 1)
                  })
                  .catch(error => {
                              console.log(error)
                          });
               }         
          }
          
</script>

