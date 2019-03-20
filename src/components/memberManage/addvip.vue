<template>
  <div>
    <!--<DeliveryHead></DeliveryHead>-->
    <div class="editBox" >
      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>用户名： </span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="username" placeholder="请输入内容"></el-input>
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
              <el-radio @change="radiolist" size="mini" v-for="item in radioArr" :key="item.value" :label="item.label" border>{{item.label}}</el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>真是姓名： </span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="name"  placeholder="请输入内容"></el-input>
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
  export default {
    name: 'addvip',
    data: function() {
      return {
        username: '',
        password_num: '',
        radioStatus: '启用',
        position_Value:[],
        radioArr:[
          {
            value: '选项1',
            label: '普通'
          }, {
            value: '选项2',
            label: '黄金'
          }, {
            value: '选项3',
            label: '钻石'
          }
        ],
        name:'',
        phone_num:'',
        email_num:'',
        isInLocal:false,
        position:[],
        //正则判断的值
        rightUsername:false,
        rightPassword:false,
        rightRealName:false,
        rightPhoneNumber: false,
        rightEmail:false,
        time:''
      }
    },
    methods:{

      radiolist:function(val){
        console.log(val)
        this.position = val
      },
      ensureToSave: function () {
        var isOk=true;
        //正则判断
        //1:用户名
        let judgeUsername=/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
        if(judgeUsername.test(this.username)){
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
        if(judgeRealName.test(this.name)){
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
        var nowDate= new Date().toLocaleDateString()
        var that=this
        console.log(nowDate)
        if(isOk===true){
          this.$http.post('/api/memberManage/addlist',{
            username:this.username,
            password:this.password_num,
            status:this.radioStatus,
            name:this.name,
            phone:this.phone_num,
            email:this.email_num,
            position: this.position,
            time:nowDate
          })
            .then(res=>{
              if(res.data==='ok'){
                if(this.isInLocal===true){
                  this.$message({
                    message: '编辑成功！',
                    type: 'success'
                  });
                  that.$router.push('/memberManage')
                  this.isInLocal=false
                }else{
                  this.$message({
                    message: '添加成功！',
                    type: 'success'
                  });
                  that.$router.push('/memberManage')
                  this.isInLocal=false
                }
                this.username='';
                this.password_num='';
                this.radioStatus='启用';
                this.position_Value=1;
                this.name='';
                this.phone_num='';
                this.email_num='';
                this.position=''
              }
            })
        }
      },

    },


    created:function () {
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
