import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

import good from '../components/content/goods/good.vue'
import comment from '../components/content/comment/comment.vue'
import seller from '../components/content/seller/seller.vue'

export default new Router({
  linkActiveClass:'active',
  routes: [
    {
      path:'/',
      redirect:'/goods'
    },
    {
      path:'/goods',
      component:good
    },
    {
      path:'/comment',
      component:comment
    },
    {
      path:'/seller',
      component:seller
    }
  ]
})
