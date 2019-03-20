<template>
  <el-container>
    <el-header style="padding: 0">
      <SamllHead v-bind:urlObj="nameObj"></SamllHead>
    </el-header>
    <el-main style="width: 80%">
      <el-row>
        <el-col :span="2" :offset="1">
          <div class="right">用户名</div>
        </el-col>
        <el-col :span="2">
          <div class="right">
            {{user_name}}
          </div>
        </el-col>
      </el-row>
      <el-row class="margin30">
        <el-col :span="2" :offset="1">
          <div class="right">角色</div>
        </el-col>
        <el-col :span="2">
          <div class="right">
            {{role_name}}
          </div>
        </el-col>
      </el-row>
      <el-row class="margin30">
        <el-col :span="2" :offset="1">
          <div class="right">手机</div>
        </el-col>
        <el-col :span="2">
          <div class="right">
            {{phone}}
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2" :offset="1">
          <div class="right">Email</div>
        </el-col>
        <el-col :span="2">
          <div class="right">
            {{email}}
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import SamllHead from '../common/SamllHead'
export default {
  name: "userInfo",
  components: {SamllHead},
  // data:function(){
  //   return {
  //     userData:[],
  //     user_name:'',
  //     role_name:'',
  //     phone:'',
  //     email:''
  //   }
  // },
     data:function(){
      return{
        userData:[],
        user_name:'',
        role_name:'',
        phone:'',
        email:'',
        nameObj: {
          name1:'个人信心',
          name2:'已登录管理员信息'
        }
      }
     },
  mounted () {
    // this.userData=this.$store.state.personInfo
    console.log(this.userData)
    let myData=this.$store.state.personInfo
    this.user_name=myData.Real_name;
    this.phone= myData.phone_number;
    this.email = myData.email;
    this.role_name =myData.admin_description;
    // console.log()
  }
}
</script>

<style scoped>
  .margin30{
    margin: 3% 0;
  }

  .right{
    text-align: left;
  }
</style>
