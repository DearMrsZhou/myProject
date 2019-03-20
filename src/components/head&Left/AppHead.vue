<template>
<div>
  <el-row>
    <el-col :span="6">
      <div class="logo">
        espoir美妆后台管理信息系统
      </div>
    </el-col>
    <el-col :span="4" :offset="14" class="right">
      <el-dropdown type="flex" class="rightBox">
        <span class="el-dropdown-link" style="display: flex">
          <img src="/api/images/1.jpg" alt="">
          <div>
            <span style="margin: 0 15px">{{admin}}</span>
            <i class="el-icon-arrow-down"></i>
          </div>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><router-link to="/userInfo">个人信息</router-link></el-dropdown-item>
          <el-dropdown-item><router-link to="/userPass">修改密码</router-link></el-dropdown-item>
          <el-dropdown-item divided><span @click="loginOut" style="display: inline-block;width: 100%;height: 100%">退出登录</span></el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
  name: 'AppHead',
  props: ['admin'],
  data: function () {
    return {
      dropDownBoxState: false
    }
  },
  methods: {
    openDropDownBox: function () {
      if (this.dropDownBoxState) {
        this.dropDownBoxState=false
      } else{
        this.dropDownBoxState=true
      }
    },
    loginOut: function () {
      sessionStorage.setItem('isLogin',false)
      this.$router.push({path: '/login'})
    }
  }
}
</script>

<style scoped>
  .logo{
    line-height: 60px;
    font-size: 16px;
    color: white;
  }
  .head-photo>img{
    height: 60px;
    width: 60px;
  }
  .el-dropdown-link{
    display: inline-block;
    line-height: 60px;
    width: 120px;
    color: #e8e8e8;
    cursor: pointer;
    font-size: 14px;
  }
  .el-dropdown-link>img{
    height: 28px;
    width: 28px;
    border-radius: 50%;
    overflow: hidden;
    margin: 15px 0;
    vertical-align: middle;
  }
  .el-dropdown-link>div{
    display: inline-block;
    height: 60px;
    line-height: 60px;
  }
  .head-user>i{
    margin: 0 10px;
  }
  .right{
    position: relative;
  }
  .rightBox{
    position: absolute;
    width: auto;
    left: 0;
    top: 0;
    outline: none;
  }
  .downBox>div{
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    padding: 0 0 0 30px;
  }
  .downBox>div:nth-child(3){
    border-bottom: 1px solid #3f3f3f;
  }
  .downBox>div:hover{
    background-color: #8c939d;
  }
  a{
    text-decoration:none;
    color:#333;
  }
</style>
