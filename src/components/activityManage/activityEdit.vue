<template>
  <div>
    <el-container>
      <el-header style="padding: 0;">
        <SamllHead></SamllHead>
      </el-header>
      <div class="box" :data="EditData">
        <el-row :gitter="20" class="margin30">
          <el-col :span="3">
            <span>活动标题： </span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="inputTitle" placeholder="请输入活动标题">{{EditData.news_id}}}</el-input>
          </el-col>
        </el-row>
        <el-row :gitter="20">
          <el-col :span="3">
            <span>活动时间： </span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="inputTime" placeholder="请输入活动时间">{{EditData.news_time}}</el-input>
          </el-col>
        </el-row>
        <el-row :gitter="20" class="margin30">
          <el-col :span="3">
            <span>活动介绍： </span>
          </el-col>
          <el-col :span="4">
            <el-input v-model="inputContent" placeholder="请输入内容">{{EditData.news_desc}}</el-input>
          </el-col>
        </el-row>
        <el-row :gitter="20" class="margin30">
          <el-col :span="3">
            <span>活动封面图： </span>
          </el-col>
          <el-col :span="6">
            <el-upload
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
              ref="upLoadcover" :http-request="newCoverImg">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gitter="20" class="margin30">
          <el-button type="primary" @click="addActivity()">确认编辑</el-button>
        </el-row>
      </div>
    </el-container>
  </div>
</template>

<script>
import SamllHead from '../common/SamllHead'
export default {
  name: "activityEdit",
  components: {SamllHead},
  data() {
    return {
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      inputTime:'',
      inputTitle:'',
      inputContent:'',
      tableData:[],
      EditData:[]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    newCoverImg(file){
      console.log(file)
      let formData=new FormData()
      let imgFile=file.file
      let headerConfig={header: {'Content-Type':'multipart/form-data'}}
      formData.append('file',imgFile)
      formData.append('news_title',this.inputTitle)
      formData.append('news_time',this.inputTime)
      formData.append('news_desc',this.inputContent)
      let that=this
      this.$http.post('/stage3/event/addActivity',formData,headerConfig)
        .then(res=>{
          console.log(res
          )
          that.$message({
            message:'上传成功！',
            type:'success'
          })
        })
        .catch(error=>{
          console.log(error)
        })
    }
  },
  created(){
    let getNewsId = this.$route.params.news_id
    console.log(getNewsId)
    this.$http.post('/api/activityManage/getActivityList')
      .then(res => {
        var myData=res.data
        // console.log(myData)
        this.tableData=myData
        this.tableData = res.data
        this.EditData.news_id = this.tableData.news_id
        console.log(this.tableData)
      })

  }
}
</script>

<style scoped>
  .box span{
    display: block;
    height: 100%;
    line-height: 40px;
  }

  .margin30{
    margin: 4% 0;
  }
</style>
