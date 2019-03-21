<template>
  <div>
    <SmallHead></SmallHead>
    <div class="editBox">
      <el-row :gutter="0">
        <el-col :span="2">
          <span>配送方式： </span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="3">
          <span v-if="choose2" style="color: red">不能为空!</span>
        </el-col>
      </el-row>

      <el-row :gutter="0">
        <el-col :span="2">
          <span>状态： </span>
        </el-col>
        <el-col :span="5">
          <el-radio size="small" v-model="radioValue" label="启用" border>启用</el-radio>
          <el-radio size="small" v-model="radioValue" label="禁用" border>禁用</el-radio>
        </el-col>
        <el-col :span="3">
          <span v-if="choose1" style="color: red">必须选择一项!</span>
        </el-col>
      </el-row>

      <el-row :gutter="0">
        <el-col :span="2">
          <span>描述： </span>
        </el-col>
        <el-col :span="4">
          <textarea v-model="textAreaStr" name="" id="" cols="50" rows="10" value="">
        </textarea>
        </el-col>
      </el-row>

      <el-row :gutter="0">
        <el-col :span="4">
        </el-col>
        <el-col :span="6">
          <el-button @click="editOrAddTransportation" type="primary">确认保存</el-button>
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
  name: 'deliveryEdit',
  data: function() {
    return {
      input: '',
      radioValue:'',
      textAreaStr:'',
      choose1: false,
      choose2: false,
      isInLocal:false
    }
  },
  components: {
    SmallHead
  },
  methods: {
    editOrAddTransportation:function () {
      var isOk=true
      // 从本地存储拿到要添加到最后字段的索引，拿到之后就删除
      // var currentId=localStorage.getItem('addDeliveryId')
      // localStorage.removeItem('addDeliveryId')
      if(this.input.length === 0){
        isOk=false
        this.choose2=true
      }else{
        this.choose2=false
      }
      if(this.radioValue.length===0){
        isOk=false
        this.choose1=true
      }else{
        this.choose1=false
      }
      if(isOk===true){
        this.$http.post('/api/systemManage/addDelivery',{
          trans_name:this.input,
          trans_status:this.radioValue,
          trans_desc:this.textAreaStr,
        }).then(()=>{
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
          this.input=''
          this.radioValue=''
          this.textAreaStr=''
        })
      }
    }
  },
  created (){
    var editDelivery=JSON.parse(localStorage.getItem('editDelivery'))
    if(editDelivery.length!==0){
      for(var i = 0 ; i < editDelivery.length ;i ++){
        this.input=editDelivery[i].trans_name
        this.radioValue=editDelivery[i].trans_status
        this.textAreaStr=editDelivery[i].trans_desc
      }
      // 设置变量的值，判断修改还是新增的提示信息
      this.isInLocal=true
      localStorage.removeItem('editDelivery');
    }

  }
}
</script>

<style scoped>
.editBox{
  width: 90%;
  height: auto;
  margin: 20px auto;
}

  .editBox>div{
    height: auto;
    line-height: 60px;
    margin-top: 15px;
  }

.editBox>div>div:nth-child(1){
  text-align: right;
}
.editBox>div>div:nth-child(2){
  margin-left: 3%;
}
</style>
