import shopList from '@/components/shopManage/ShopList'
import AddShop from '@/components/shopManage/AddShop'
import Review from '@/components/shopManage/Review'

export default [
  {
    path: '/shopList',
    name: 'shopList',
    component: shopList,
    meta:{
      isAuth:'商品列表'
    }
  },
  {
    path: '/addShop',
    name: 'addShop',
    component: AddShop,
    meta:{
      isAuth:'添加商品'
    }
  },
  {
    path: '/review',
    name: 'review',
    component: Review,
    meta:{
      isAuth:'评论管理'
    }
  }
]
