import Viewarticles from "./components/articles/Viewarticles.vue"
import Viewcategorie from "./components/categories/Viewcategorie.vue"
import Addcategorie from "./components/categories/Addcategorie.vue"
import Addaticle from "./components/articles/addarticle.vue"
import Viwearticletable from "./components/articles/Viwearticletable.vue"
import Editarticle from "./components/articles/Editarticle.vue"
import Cardarticle from "./components/client/Cardarticle.vue"
import HomeCart from './components/cart/HomeCart.vue';
import Cart from './components/cart/Cart.vue';
import Payment from './components/cart/Payment.vue';
import Success from './components/cart/Success.vue';
import Errorpage from './components/cart/Errorpage.vue'
import Login from './components/authentification/Login.vue'
import Register from './components/authentification/Register.vue'
import Dashboard from './components/admin/dashboard.vue'
import Menu from './components/menu.vue'
export const routes=[
  
    {
        name:"Viewcategorie",
        path:"/listcat",
        component:Viewcategorie
    },
    {
        name:"Addcategorie",
        path:"/addcategorie",
        component:Addcategorie
    },
    {
        name:"Viewarticles",
        path:"/listart",
        component:Viewarticles
    },
    {
        name:"Addarticle",
        path:"/addarticle",
        component:Addaticle
    },
    {
        name:"Viewarticletable",
        path:"/articletable",
        component:Viwearticletable,
        meta:{isAuth:true}
    },
    {
        name:"editarticle",
        path:"/editarticle/:id",
        component:Editarticle
    },
    {
        name:"cardarticle",
        path:"/cardarticle",
        component:Cardarticle
    },
    {
        path:'/shopping',
        name:'HomeCart',
        component:HomeCart
    },
    {
        path:'/cart',
        name:'Cart',
        component:Cart
    },
    {
        path:'/payment',
        name:'Payment',
        component:Payment
    },
    {
        path:'/success',
        name:'success',
        component:Success
    },
    {
        path:'/error',
        name:'Error',
        component:Errorpage
    },
    {
        name: "login",
        path: "/",
        component: Login,
       
        },
        {
        name: "register",
        path: "/register",
        component: Register,
       
        },
        {
        name: "dashboard",
        path: '/dashboard',
        component: Dashboard,
        },
        {
            name: "menu",
            path: '/menu',
            component: Menu,
            }

]
