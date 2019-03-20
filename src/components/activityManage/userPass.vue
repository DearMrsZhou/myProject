<template>
  <div>
    <SamllHead v-bind:urlObj="nameObj"></SamllHead>
    <el-row :gitter="20" class="box">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原始密码" prop="lastPass">
        <el-input type="password" v-model="ruleForm2.lastPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editPass">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
    </el-row>
  </div>
</template>

<script>
import SamllHead from '../common/SamllHead'
export default {
  name: "userPass",
  components: {SamllHead},
  data() {
    // var validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'));
    //   } else {
    //     if (this.ruleForm2.checkPass !== '') {
    //       this.$refs.ruleForm2.validateField('checkPass');
    //     }
    //     callback();
    //   }
    // };
    var validatePass = (rules,value,callback) => {
      if(value ===''){
        callback(new Error('请输入密码'))
      }else{
        if(this.ruleForm2.validateField('checkPass'));
      }
      callback();
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    };
    return {
      ruleForm2: {
        pass: '',
        checkPass: '',
        lastPass: ''
      },
      nameObj: {
        name1:'管理员操作',
        name2:'密码管理'
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    editPass(){
      var id=this.$store.state.personInfo.admin_id
      var pass=this.ruleForm2.pass
      var lastpass=this.ruleForm2.lastPass
      this.$http.post('/api/reportManage/pass',{
        pass:pass,
        page:id,
        lastpass:lastpass
      })
        .then((res)=>{

        })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
  .box{
    padding: 4%;
    width: 40%;
  }
</style>
