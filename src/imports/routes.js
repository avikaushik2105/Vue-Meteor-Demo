import Vue from 'vue'

import auth from './auth'
import NotFound from './ui/NotFound.vue'
import Home from './ui/Home.vue'
import Items from './ui/Items.vue'
import Notes from './ui/Notes.vue'
import GoogleMap from './ui/GoogleMap.vue'
import Apollo from './ui/Apollo.vue'
import Async from './ui/Async.vue'
import About from './ui/About.vue'
import Login from './ui/Login.vue'

export default [
  { path: '/', name: 'home', component: Home },
  { path: '/shop', name: 'shop', component: Items, beforeEnter: requireAuth },
  { path: '/notes', name: 'notes', component: Notes, meta: { showCart: true }, beforeEnter: requireAuth },
  { path: '/map', name: 'map', component: GoogleMap, beforeEnter: requireAuth },
  { path: '/apollo', name: 'apollo', component: Apollo, beforeEnter: requireAuth },
  { path: '/async', name: 'async', component: Async, beforeEnter: requireAuth },
  { path: '/about', name: 'about', component: About },
  { path: '/login', name: 'login', component: Login },
  { path: '*', name: 'not-found', component: NotFound },
  { path: '/logout',
        beforeEnter (to, from, next) {
            auth.logout()
            next('/')
        }
  }
]

function requireAuth (to, from, next) {
    if (!auth.loggedIn()) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
}
