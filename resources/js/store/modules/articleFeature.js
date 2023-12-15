const state=  ({
    cart:[],
    cartTotal:0,
  });

 const   mutations =  ({
              
      clearCart(state){
     
       state.cart =[];
       state.cartTotal =0;
    
      return true;
      },
      
      addCart(state,payload){
       console.log(payload)
       const productInCartIndex = state.cart.findIndex(
         (item) => item.product.id === payload.product.id
       );
      
       if (productInCartIndex < 0) {
       
       state.cart.push(payload)
      
       //calculating the total
       state.cartTotal = state.cart.reduce((cartTotal, cartItem) => {
      
         return parseFloat(cartTotal) + parseFloat(cartItem.product.prix*cartItem.qty);
       }, 0);
      
       
      }
      },

      minusCart(state,payload){
      
      //update quantity 
       
      const productInCartIndex = state.cart.findIndex(
        (item) => item.product.id === payload.product.id
      );
      
      if (productInCartIndex >= 0) {
        state.cart[productInCartIndex].qty--;
      }
      
       //Recalculating the total
        state.cartTotal = state.cart.reduce((cartTotal, cartItem) => {
          return parseFloat(cartTotal) + parseFloat(cartItem.product.prix*cartItem.qty);
        }, 0);
      
      },
      removeFromCart(state,payload){
      
      
       state.cart = state.cart.filter(function( cartItem ) {
         return cartItem.product.id !== payload.product.id;
       });
      
       //calculating the total
       state.cartTotal = state.cart.reduce((cartTotal, cartItem) => {
      
         return parseFloat(cartTotal) + parseFloat(cartItem.product.prix*cartItem.qty);
       }, 0);
      
      },
      
      plusCart(state,payload){
      
       //update quantity 
       
       
       const productInCartIndex = state.cart.findIndex(
         (item) => item.product.id === payload.product.id
       );
      
       if (productInCartIndex >= 0) {
         state.cart[productInCartIndex].qty++;
       }
      
        //Recalculating the total
         state.cartTotal = state.cart.reduce((cartTotal, cartItem) => {
           return parseFloat(cartTotal) + parseFloat(cartItem.product.prix*cartItem.qty);
         }, 0);
      
        }
  
})

export default {
    namespaced: true,
    state,
    mutations
  }
