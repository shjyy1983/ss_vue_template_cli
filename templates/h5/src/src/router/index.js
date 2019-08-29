import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = r => require.ensure([], () => r(require('@views/home')), 'home')
const Login = r => require.ensure([], () => r(require('@views/login')), 'login')

export default new Router({
  mode: 'hash', // hash or history
  routes: [
    {
      path: '/',
      name: '/',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
