import Vue from 'vue'; 
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import AdminReg from '../views/AdminReg.vue';
import Appointments from '../views/Appointments.vue';
import Clinicstaff from '../views/Clinicstaff.vue';
import Doctors from '../views/Doctors.vue';
import Main from '../views/Main.vue';
import Patients from '../views/Patients.vue';



global.baseURL = 'http://localhost:3000';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
 
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },

  {
    path:'/adminreg',
    name: 'AdminReg',
    component: AdminReg

  },

  {
    path:'/appointments',
    name: 'Appointments',
    component: Appointments

  },
  {
    path: '/clinicstaff',
    name: 'Clinicstaff',

    component: Clinicstaff
  },

  {
    path: '/doctors',
    name: 'Doctors',

    component: Doctors
  },
  {
    path: '/main',
    name: 'Main',

    component: Main
  },

  {
    path: '/patients',
    name: 'Patients',

    component: Patients
  },

]

const router = new VueRouter({
  routes
})

export default router
