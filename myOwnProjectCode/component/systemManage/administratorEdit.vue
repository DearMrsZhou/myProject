<template>
  <div>
    <SmallHead></SmallHead>
    <div class="editBox" >
      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>用户名： </span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="user_name" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="3" v-if="rightUsername">
          <span style="color: red">用户名为空！</span>
        </el-col>
      </el-row>
      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>密码： </span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="password_num" type="password" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="7" v-if="rightPassword">
          <span style="color: red">密码格式不正确(字母、下划线和数字)！</span>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>状态： </span>
        </el-col>
        <el-col :span="4" class="singleChoose">
          <el-radio v-model="radioStatus" label="启用">启用</el-radio>
          <el-radio v-model="radioStatus" label="禁用">禁用</el-radio>
          <!--<el-radio size="mini" v-model="radio7" label="1" border>启用</el-radio>-->
          <!--<el-radio size="mini" v-model="radio7" label="2" border>禁用</el-radio>-->
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>职位： </span>
        </el-col>
        <el-col :span="20">
          <div class="radioList">
            <el-radio-group v-model="position_Value">
            <el-radio size="mini" v-for="item in radioArr" :key="item.role_id" :label="item.role_id" border>{{item.role_name}}</el-radio>
          </el-radio-group>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>真是姓名： </span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="real_name"  placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="3" v-if="rightRealName">
          <span style="color: red">真名必须是中文！</span>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>手机/电话： </span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="phone_num" :maxlength="11"  placeholder="请输入电话号码"></el-input>
        </el-col>
        <el-col :span="4" v-if="rightPhoneNumber">
          <span style="color: red">号码格式必须是数字！</span>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>电子邮件： </span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="email_num" :maxlength="20"  placeholder="请输入邮件"></el-input>
        </el-col>
        <el-col :span="3" v-if="rightEmail">
          <span style="color: red">邮件格式不正确！</span>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>备注信息： </span>
        </el-col>
        <el-col :span="4">
          <textarea v-model="admin_desc" name="" id="" cols="50" rows="10" value="">
        </textarea>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="4">
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="ensureToSave">确认保存</el-button>
        </el-col>
      </el-row>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
  import SmallHead from '../common/SamllHead'
export default {
  name: 'administratorEdit',
  data: function() {
    return {
      user_name: '',
      password_num: '',
      radioStatus: '启用',
      position_Value:1,
      radioArr:[],
      real_name:'',
      phone_num:'',
      email_num:'',
      admin_desc:'',
      isInLocal:false,
      //正则判断的值
      rightUsername:false,
      rightPassword:false,
      rightRealName:false,
      rightPhoneNumber: false,
      rightEmail:false
    }
  },
  components: {
    SmallHead
  },
  methods:{
    ensureToSave: function () {
      var isOk=true;
      //正则判断
      //1:用户名
      let judgeUsername=/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
      if(judgeUsername.test(this.user_name)){
        this.rightUsername=false
      }else{
        isOk=false;
        this.rightUsername=true
      }
      //2:密码
      let judgePassword=/(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/;
      if(judgePassword.test(this.password_num)){
        this.rightPassword=false
      }else{
        isOk=false;
        this.rightPassword=true
      }
      //真实姓名
      let judgeRealName=/^[\u4e00-\u9fa5]+$/;
      if(judgeRealName.test(this.real_name)){
        this.rightRealName=false
      }else{
        isOk=false;
        this.rightRealName=true
      }
      //手机号码
      let judgePhone=/0?(13|14|15|18)[0-9]{9}/
      if(judgePhone.test(this.phone_num)){
        this.rightPhoneNumber=false
      }else{
        isOk=false;
        this.rightPhoneNumber=true
      }
      //电子邮件
      let judgeEmail=/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/
      if(judgeEmail.test(this.email_num)){
        this.rightEmail=false
      }else{
        isOk=false;
        this.rightEmail=true
      }
      let time=localStorage.getItem('editTime');
      if(time){
        time='';
        localStorage.removeItem('editTime')
      }else{
        time = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        console.log(time)
      }
      if(isOk===true){
        this.$http.post('/api/systemManage/editOrAddAdmin',{
          username:this.user_name,
          password:this.password_num,
          admin_status:this.radioStatus,
          role_id:this.position_Value,
          realName:this.real_name,
          phone:this.phone_num,
          email:this.email_num,
          desc:this.admin_desc,
          time:time
        })
          .then(res=>{
            if(res.data==='ok'){
              if(this.isInLocal===true){
                this.$message({
                  message: '编辑成功！',
                  type: 'success'
                });
                this.isInLocal=false
              }else{
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.isInLocal=false
              }
              this.user_name='';
              this.password_num='';
              this.radioStatus='启用';
              this.position_Value=1;
              this.real_name='';
              this.phone_num='';
              this.email_num='';
              this.admin_desc='';
            }
          })
      }
    }
  },
  created:function () {
    // 把职位列表渲染出来
    let positionList=JSON.parse(localStorage.getItem('positionList'));
   /* console.log(positionList)*/
    this.radioArr=positionList;
    // console.log(positionList)
    // 如果是编辑事件，直接拿本地存储的数据
    var editAdmin=JSON.parse(localStorage.getItem('editAdmin'))
    if(editAdmin){
      for(var i = 0 ; i < editAdmin.length ;i ++){
        this.user_name=editAdmin[i].admin_name
        this.password_num=editAdmin[i].admin_password
        this.radioStatus=editAdmin[i].admin_status
        this.position_Value=editAdmin[i].role_id
        this.real_name=editAdmin[i].Real_name
        this.phone_num=editAdmin[i].phone_number
        this.email_num=editAdmin[i].email
        this.admin_desc=editAdmin[i].admin_description
      }
      // 设置变量的值，判断修改还是新增的提示信息
      this.isInLocal=true
      localStorage.removeItem('editAdmin');
    }
  }
}
</script>

<style scoped>
  .editBox{
    width: 95%;
    height: auto;
    margin: 20px auto;
  }

  .editBox>div{
    height: auto;
    line-height: 50px;
    margin-top: 15px;
  }

  .editBox>div>div:nth-child(1){
    text-align: right;
  }
  .editBox>div>div:nth-child(2){
    margin-left: 3%;
  }

  .el-col-5{
    width: 0;
  }
  .radioList{
    min-width: 200px;
    float: left;
  }
  /*.singleChoose{*/
    /*width: 0;*/
  /*}*/
</style>
