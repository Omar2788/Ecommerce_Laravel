<template>
     <button type="button" class="btn btn-warning rounded-circle "  @click="visible = true">
       <span style="color: rgba(102, 133, 110, 0.623)">
        <i class="fa-solid fa-eye"></i>
      
       </span>

   </button>   
   
    <div class="card flex align-items-center justify-content-center">
        <Dialog
         v-model:visible="visible"   
     >
        <Card style="width: 25em">
            <template #header>
                <img alt="user header" :src="article.imageart"  width="250" height="250"/>
            </template>
            <template #title> {{ article.designation }} </template>
            <template #subtitle> Prix : {{article.prix}} DT</template>
            <template #content>
                <p class="m-0">
                   Marque :  {{article.marque}}
                </p>
            </template>
            
        </Card>
    </Dialog>
    </div>

</template>

<script setup>
import Card from 'primevue/card';
import { ref,onMounted } from "vue"
import Dialog from 'primevue/dialog';
const props=defineProps(['art'])
const visible = ref(false);
const article=ref({})
   
onMounted(() => {
  article.value=props.art
           }
);
</script>

<style lang="scss" scoped>

</style>