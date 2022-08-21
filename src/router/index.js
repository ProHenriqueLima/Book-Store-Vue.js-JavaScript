import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Editora from '../views/Editora.vue'
import Cliente from '../views/Cliente.vue'
import Livro from '../views/Livro.vue'
import Manutencao from '../views/Manutenção.vue'
import Alugueis from '../views/Aluguel.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Editora',
    name: 'Editora',
    component:Editora 
  },
  {
    path: '/Cliente',
    name: 'Cliente',
    component:Cliente 
  },
  {
    path: '/Livro',
    name: 'Livro',
    component:Livro 
  },
  {
    path: '/Manutencao',
    name: 'Manutencao',
    component:Manutencao 
  },
 
  {
    path: '/Alugueis',
    name: 'Alugueis',
    component:Alugueis 
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
