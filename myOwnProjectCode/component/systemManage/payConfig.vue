<template>
  <div>
    <SmallHead></SmallHead>
    <div class="editBox">
      <el-row :gutter="0">
        <el-col :span="2">
          <span>支付方式： </span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="pay_name" placeholder="请输入名字"></el-input>
        </el-col>
        <el-col :span="2" v-if="isWrite">
          <span style="color: red;">名字不能为空！</span>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="2">
          <span>Logo： </span>
        </el-col>
        <el-col :span="4">
          <!--<template >-->
            <!--<img :src="img_url" class="pay_pic"/>-->
          <!--</template>-->
          <el-upload
            title="单击图片进行上传"
            class="avatar-uploader"
            action=""
            ref="upload"
            :http-request="myUpLoad"
            :show-file-list="true"
            :auto-upload="true"
            :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-col>

      </el-row>

      <el-row :gutter="0">
        <el-col :span="2">
          <span>状态： </span>
        </el-col>
        <el-col :span="5">
          <el-radio size="small" v-model="radio_value" label="启用" border>启用</el-radio>
          <el-radio size="small" v-model="radio_value" label="禁用" border>禁用</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="0">
        <el-col :span="2">
          <span>描述： </span>
        </el-col>
        <el-col :span="4">
          <textarea v-model="textStr" name="" id="" cols="50" rows="10" value="">
        </textarea>
        </el-col>
      </el-row>

      <el-row :gutter="0">
        <el-col :span="4">
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="upLoadData">确认保存</el-button>
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
    name: 'payConfig',
    data: function() {
      return {
        isWrite:false,
        pay_name:'',
        textStr:'',
        radio_value: '启用',
        pay_way: '微信',
        isInLocal:false,
        // img_url: './static/zp/timg3.jpg',
        imageUrl: ''
      }
    },
    components: {
      SmallHead
    },
    methods:{
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        /*console.log(this.imgUrl)*/
      },
      upLoadData: function(){
        let isOk=true
        // this.$refs.upload.submit()

        if(this.pay_name.length===0){
          this.isWrite=true
          isOk=false;
        }else{
          this.isWrite=false;
        }
        if(this.imageUrl.length===0){
          isOk=false;
          this.$message({
            message: '请选择一张图片作为logo',
            type: 'warning'
          })
        }
        if(isOk===true){
          this.$http.post('ipa/cart/uploadPic2',{
            pay_name:this.pay_name,
            pay_status:this.radio_value,
            pay_desc:this.textStr,
            pic_path:this.imageUrl
          })
            .then(res=>{
              if(res.data==='ok'){
                if(this.isInLocal===true){
                  this.$message({
                    message:'编辑成功！',
                    type:'success'
                  })
                  this.isInLocal=false;
                }else{
                  this.$message({
                    message:'添加成功！',
                    type:'success'
                  })
                }
                this.pay_name='';
                this.textStr='';
                this.imageUrl='';
              }else{
                this.$message.error('错了哦');
              }
            })
        }
      },
      myUpLoad:function (params) {
          /*图片文件上传，使用formData格式化数据*/
        let fileObj=params.file
        // console.log(fileObj)
        let fd = new FormData();
        fd.append('files',fileObj);//传文件
        let config = {
          header: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.$http.post('ipa/cart/uploadPic',fd,config)
          .then(res=>{
            // console.log(res.data)
            this.imageUrl=res.data.imageUrl
          })
      }
    },

    created:function () {
      let payData=this.$route.params.payConfig
      // console.log(payData)
        /*如果数据存在，就确定为编辑事件*/
      if(payData){
        this.isInLocal=true;
        this.pay_name=payData.pay_name;
        this.textStr=payData.pay_desc;
        this.radio_value=payData.pay_status;
        this.imageUrl=payData.pay_logoPath;
        localStorage.removeItem('payConfig')
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
  .pay_pic{
    width: 160px;
    height: 50px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 240px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
  .avatar {
    width: 240px;
    height: 140px;
    display: block;
  }
</style>
