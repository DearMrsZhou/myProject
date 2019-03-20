<template>
<div>
  <div class="changeNavState" @click="changeNavState">
    <i class="el-icon-arrow-left" :class="isCollapse?'':'hoverI'"></i>
    <i class="el-icon-arrow-right" :class="isCollapse?'hoverI':''"></i>
  </div>
  <el-menu class="el-menu-vertical-demo nav-box" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router
  :default-active="$router.path"  >
    <el-menu-item index="/systemMain" v-if="mySymbol.menu1">
      <i class="iconfont iconshouye"></i>
      <span slot="title">
        
          管理首页
        
      </span>
    </el-menu-item>
    <el-submenu v-if="mySymbol.menu2" index="2">
      <template slot="title">
        <i class="iconfont iconshangpin"></i>
        <span slot="title">商品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/shopList">商品列表</el-menu-item>
        <el-menu-item index="/addShop">添加商品</el-menu-item>
        <el-menu-item index="/review">评论管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu  v-if="mySymbol.menu3" index="3">
      <template slot="title">
        <i class="iconfont icondingdan"></i>
        <span slot="title">订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/order">订单信息</el-menu-item>
        <el-menu-item index="/OrderManage">发货管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu v-if="mySymbol.menu4" index="4">
      <template slot="title">
        <i class="iconfont iconhuiyuan"></i>
        <span slot="title">会员管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/memberManage">会员信息管理</el-menu-item>
        <el-menu-item index="/Memberlevelmanagement">会员等级管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu v-if="mySymbol.menu5" index="5">
      <template slot="title">
        <i class="iconfont iconactivity-line"></i>
        <span slot="title">专题活动</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/activityList">活动列表</el-menu-item>
        <el-menu-item index="/activityAdd">新建活动</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item v-if="mySymbol.menu6" index="/module">
        <i class="iconfont icondanmokuai"></i>
        <span slot="title">
            模块管理
        </span>
    </el-menu-item>
    <el-submenu v-if="mySymbol.menu7" index="7">
      <template slot="title">
        <i class="iconfont iconbaobiaoguanli"></i>
        <span slot="title">统计报表</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/dingdan">订单统计</el-menu-item>
        <el-menu-item index="/yonghu">用户统计</el-menu-item>
        <el-menu-item index="/yingli">盈利统计</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu v-if="mySymbol.menu8" index="8">
      <template slot="title">
        <i class="iconfont iconxitong"></i>
        <span slot="title">系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/delivery">配送方式</el-menu-item>
        <el-menu-item index="/administrator">操作员管理</el-menu-item>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/pay">支付方式管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>
  import NavItem from './NavItem'
export default {
  name: 'LeftNav',
  components: {
    NavItem
  },
  data:function () {
    return {
      isCollapse:false,
      mySymbol: {
        menu1: false,
        menu2: false,
        menu3: false,
        menu4: false,
        menu5: false,
        menu6: false,
        menu7: false,
        menu8: false,
      }
    }
  },
  methods: {
    handleOpen(key,keyPath) {
      // console.log(key,keyPath)
    },
    handleClose(key,keyPath){
      // console.log(key,keyPath)
    },
    changeNavState(){
      if (this.isCollapse){
        this.isCollapse=false
      }
      else{
        this.isCollapse=true
      }
    }
  },
  created () {
    var that = this
    var firstMenuArr = this.$store.state.level
    // console.log(firstMenuArr)
    for (let i=0;i<firstMenuArr.length;i++){
      if (firstMenuArr[i]==='首页管理'){
        that.mySymbol.menu1 = true
      }
      else if (firstMenuArr[i]==='商品管理'){
        that.mySymbol.menu2 = true
      }
      else if (firstMenuArr[i]==='订单管理'){
        that.mySymbol.menu3 = true
      }
      else if (firstMenuArr[i]==='会员管理'){
        that.mySymbol.menu4 = true
      }
      else if (firstMenuArr[i]==='专题活动'){
        that.mySymbol.menu5 = true
      }
      else if (firstMenuArr[i]==='模块管理'){
        that.mySymbol.menu6 = true
      }
      else if (firstMenuArr[i]==='统计报表'){
        that.mySymbol.menu7 = true
      }
      else if (firstMenuArr[i]==='系统管理'){
        that.mySymbol.menu8 = true
      }
    }
  }
}
</script>

<style scoped>
  .el-menu-item{
    height: 45px;
    line-height: 45px;
  }
  .el-submenu .el-menu-item{
     padding: 0 25px;
   }
  .el-menu-item{
    text-align: left;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width: 200px;
  }
  .nav-box{
    overflow: hidden;
    background-color: transparent;
  }
  .changeNavState{
    height: 30px;
    width: 45px;
    line-height: 30px;
    margin: 10px auto;
    color: #a5a5a5;
    border-radius: 10px;
    cursor: pointer;
  }
  .changeNavState:hover .hoverI{
    color: #383838;
  }
  a{
    text-decoration:none;
    color:#333;
  }
  .is-active{
    /*background-color: #51ff40 !important;*/
  }
</style>
