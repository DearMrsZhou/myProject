import orderManage from '@/components/orderManage/orderManage'
import OrderList from '@/components/OrderManage/OrderList'
import OrderConfig from '@/components/orderManage/orderConfig'
export default [
  {
    path: '/OrderManage',
    name: 'orderManage',
    component: orderManage,
    meta: {
      isAuth: '发货管理'
    }
  },
  {
    path: '/order',
    name: 'OrderList',
    component: OrderList,
    meta: {
      isAuth: '订单信息'
    }
  },
  {
    path: '/orderConfig',
    name: 'orderConfig',
    component: OrderConfig,
    meta: {
      isAuth: '发货管理'
    }
  }
]
