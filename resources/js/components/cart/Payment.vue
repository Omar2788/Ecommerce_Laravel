<template>
    <form @submit.prevent="handleSubmit">
    <div class="card" style="width: 50rem;">
     <div class="card-body">
      <h5 class="card-title">Montant à payer : {{amount}} TND</h5>
      <br/>
      <div class="card-text">
        <div class="form-group">
         <input type="email" class="form-control" placeholder="email" v-model="email" />
       </div>
       <br/>
      </div>
      <div id="card-element"></div>
      <br/>
      <button type="submit" class="btn btn-success">Procéder au payement</button>
    </div>
   </div>
   </form>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { loadStripe } from '@stripe/stripe-js';
  import store from '../../store'
  
  import api from "../config/api.js";
  
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const stripePromise = loadStripe('pk_test_51LPiuwJrAgLp47RROP5cCV0FGec4QaTZMrsjcyECBJbuNdjZGhbhGgcUPu3u5lKoXBTUFH2JrOeFqMtrx2bUkx0800QZNcawhc');
  const stripe = ref(null);
  let cardElement; // Déclarer cardElement comme variable globale
  let amount=ref(0);
  
  let email=ref("");
  
  onMounted(async () => {
  
    amount.value=store.state.Articlestore.cartTotal;
  
    stripe.value = await stripePromise;
    const elements = stripe.value.elements();
  
    cardElement = elements.create('card'); // Affecter cardElement
    cardElement.mount('#card-element');
  });
  
  const handleSubmit = async () => {
    const { token, error } = await stripe.value.createToken(cardElement);
  
    if (error) {
      console.error(error);
    } else {
     
      // Envoie le token au serveur pour traiter le paiement
      const response = await api.post('/api/createpayment', {
        token: token.id,
        amount: amount.value * 100// Convertir le montant en cents 
        
      });
  
      if (response.data.message) {
        console.log(response.data.message);
        // Le paiement est réussi
        alert(response.data.message);
        //Vider le cart
        store.commit('Articlestore/clearCart')
        //Redirection
        router.push('/shopping')
      } else {
        console.error(response.data.error);
      }
    }
  
  };
  </script>
  
  