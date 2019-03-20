import activityList from '@/components/activityManage/activityList'
import activityAdd from '@/components/activityManage/activityAdd'
import activityEdit from '@/components/activityManage/activityEdit'
import userInfo from '@/components/activityManage/userInfo'
import userPass from '@/components/activityManage/userPass'
export default [
  {
    path: '/activityList',
    name: 'activityList',
    component: activityList,
    meta: {
      isAuth: '活动列表'
    }
  },
  {
    path: '/activityAdd',
    name: 'activityAdd',
    component: activityAdd,
    meta: {
      isAuth: '新建活动'
    }
  },
  {
    path: '/activityEdit',
    name: 'activityEdit',
    component: activityEdit,
    meta: {
      isAuth: '活动列表'
    }
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: userInfo
  },
  {
    path: '/userPass',
    name: 'userPass',
    component: userPass
  }
]
