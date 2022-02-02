import Vue from 'vue'
import VueRouter from 'vue-router'
import Overview from '../views/Overview.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/scorecard',
    name: 'Scorecard',
    component: () => import(/* webpackChunkName: "scorecard" */ '../views/ScoreCard.vue')
  },
  {
    path: '/application',
    name: 'Application',
    component: () => import(/* webpackChunkName: "application" */ '../views/Application.vue')
  },
  {
    path: '/beneficiaries',
    name: 'Beneficiaries',
    component: () => import(/* webpackChunkName: "beneficiaries" */ '../views/Beneficiaries.vue')
  },
  {
    path: '/sector',
    name: 'Sector',
    component: () => import(/* webpackChunkName: "sector" */ '../views/Sector.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
