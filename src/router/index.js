import Vue from 'vue'
import VueRouter from 'vue-router'


const Home = () => import('../views/home/index.vue')
const Hot = () => import('../views/hot/index.vue')
const Search = () => import('../views/search/index.vue')
const PlayList = () => import('../views/playlist/index.vue')
const Song = () => import('../views/song/index.vue')

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sings',
    name: 'Home',
    component: Home
  },
  {
    path: '/sings/hot',
    name: 'Hot',
    component: Hot
  },
  {
    path: '/sings/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/sings/playlist',
    name: 'PlayList',
    component: PlayList
  },
  {
    path: '/sings/song',
    name: 'Song',
    component: Song
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
