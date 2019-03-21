
import Delivery from '@/components/systemManage/delivery'
import DeliveryEdit from '@/components/systemManage/deliveryEdit'
import Administrator from '@/components/systemManage/administrator'
import AdministratorEdit from '@/components/systemManage/administratorEdit'
import Pay from '@/components/systemManage/pay'
import PayConfig from '@/components/systemManage/payConfig'
import Role from '@/components/systemManage/role'
import RoleEdit from '@/components/systemManage/roleEdit'
export default [
  {
    path: '/delivery',
    name: 'delivery' ,
    component: Delivery,
    meta: {
      isAuth: '配送方式'
    }
  },
  {
    path: '/editDelivery',
    name: 'deliveryEdit' ,
    component: DeliveryEdit,
    meta: {
      isAuth: '配送方式'
    }
  },
  {
    path: '/administrator',
    name: 'administrator' ,
    component: Administrator,
    meta: {
      isAuth: '操作员管理'
    }
  },
  {
    path: '/administratorEdit',
    name: 'administratorEdit' ,
    component: AdministratorEdit,
    meta: {
      isAuth: '操作员管理'
    }
  },
  {
    path: '/pay',
    name: 'pay' ,
    component: Pay,
    meta: {
      isAuth: '支付方式管理'
    }
  },
  {
    path: '/payConfig',
    name: 'payConfig' ,
    component: PayConfig,
    meta: {
      isAuth: '支付方式管理'
    }
  },
  {
    path: '/role',
    name: 'role' ,
    component: Role,
    meta: {
      isAuth: '角色管理'
    }
  },
  {
    path: '/roleEdit',
    name: 'roleEdit' ,
    component: RoleEdit,
    meta: {
      isAuth: '角色管理'
    }
  }
]

