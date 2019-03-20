import memberManage from '@/components/memberManage/MemberManage'
import Memberlevelmanagement from '@/components/memberManage/Memberlevelmanagement'
import addvip from '@/components/memberManage/addvip'
export default [
  {
    path: '/memberManage',
    name: 'memberManage',
    component: memberManage
  },
  {
    path: '/Memberlevelmanagement',
    name: 'Memberlevelmanagement',
    component: Memberlevelmanagement
  },
  {
    path: '/addvip',
    name: 'addvip',
    component: addvip
  }
]
