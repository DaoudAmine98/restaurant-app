import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenulistView from '../views/MenulistView.vue'
import ReservationView from '../views/ReservationView.vue'
import ReservationlistView from '../views/ReservationlistView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import MenuView from '../views/MenuView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/menu/update/:id',
     
    name: 'updateMenu',
    component: MenulistView,
    props: true 
  },
  {
    path: '/menu/Add',
    
    name: 'addMenu',
    component: MenulistView,
    props: true  
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: ReservationView
  },
  {
    path: '/reservation/add',
    name: 'addReservation',
    component: ReservationlistView
  },
  {
    path: '/reservation/update/:id',
    name: 'upadteReservation',
    component: ReservationlistView
  },
  {
    path: '/registre',
    name: 'RegistreView',
    component: RegisterView
  },
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
