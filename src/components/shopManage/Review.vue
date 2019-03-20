<template>
<div>
  <SmallHead v-bind:urlObj="nameObj"></SmallHead>
  <div class="reviewHead">
    <el-row>
      <el-col :span="2" :offset="1">
        排序
      </el-col>
      <el-col :span="4">
        <el-select v-model="sortByTime" placeholder="按时间">
          <el-option v-for="item in sortByTimeArr" :key="item.id" :value="item.id" :label="item.name"></el-option>
        </el-select>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-select v-model="sortByType" placeholder="按分类">
          <el-option v-for="item in sortByTypeArr" :key="item.category_id" :value="item.category_id" :label="item.category_name"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-button size="medium" type="primary" @click="sortTable">确认</el-button>
      </el-col>
    </el-row>
    <el-table :data="reviewData" style="width:90%;margin: 0 auto;text-align: center;">
      <el-table-column prop="review_id" label="id" width="80" ></el-table-column>
      <el-table-column prop="product_name" label="商品" width="300"></el-table-column>
      <el-table-column prop="username" label="评论人" width="100"></el-table-column>
      <el-table-column prop="title" label="标题" width="150"></el-table-column>
      <el-table-column prop="review_content" label="内容" width="200"></el-table-column>
      <el-table-column label="图片" width="100">
        <template slot-scope="scope">
          <img :src="imgApi+scope.row.review_path" alt="" class="reviewImg">
        </template>
      </el-table-column>
      <el-table-column prop="review_star" label="星星" width="50"></el-table-column>
      <el-table-column prop="review_time" label="评论时间" width="150"></el-table-column>
      <el-table-column prop="replay" label="回复" width="200"></el-table-column>
      <el-table-column label="回复" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="replayReview(scope.row.review_id)">回复</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog title="回复评论" :visible.sync="replayDialogVisible" width="35%" center="">
    <span><el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="reviewContent"></el-input></span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="replayDialogVisible=false">取消</el-button>
      <el-button @click="replaySubmit" type="primary">确定</el-button>
    </span>
  </el-dialog>
  <div>
    <el-pagination layout="prev,pager,next" :total="1000" @prev-click="pagePrev" @next-click="pageNext" @current-change="pageChange"></el-pagination>
  </div>
</div>
</template>
<script>
import  SmallHead from '../common/SamllHead'
export default {
  name: 'Review',
  components:{
    SmallHead
  },
  data:function () {
    return {
      replayDialogVisible:false,
      sortByTime:'',
      reviewContent:'',
      selectReviewId:'',
      page:0,
      pageData:[],
      sortByTimeArr:[
        {
          name:'按时间升序',
          id:0
        },
        {
          name:'按时间降序',
          id:1
        }
      ],
      sortByType:'',
      sortByTypeArr:[],
      reviewData:[],
      nameObj: {
        name1:'商品管理',
        name2:'评论管理'
      },
      imgApi:'http://localhost:3100/'
    }
  },
  methods:{
    sortTable(){
      console.log(this.pageData)
      let that=this
      var compare = function (prop) {
        return function (obj1, obj2) {
          var val1 = obj1[prop];
          var val2 = obj2[prop];
          if (!isNaN(that.convertDateFromString(val1))&&!isNaN(that.convertDateFromString(val2))){
            val1=that.convertDateFromString(val1)
            val2=that.convertDateFromString(val2)
          }
          if (that.sortByTime==1){
            if (val1 < val2) {
              return -1
            } else if (val1 > val2) {
              return 1
            } else {
              return 0
            }
          }
          else if (that.sortByTime==0){
            if (val1 < val2) {
              return 1
            } else if (val1 > val2) {
              return -1
            } else {
              return 0
            }
          }
          else{
            return 0
          }
        }
      }
      this.pageData.sort(compare("review_time"))
      this.changePage(this.page)
      console.log(this.pageData)
    },
    convertDateFromString(str){
      if (str){
        let arr1=str.split(' ')
        let sdate=arr1[0].split('-')
        let data=new Date(sdate[0],sdate[1]-1,sdate[2])
        return data
      }
    },
    replayReview(id){
      this.replayDialogVisible=true
      this.selectReviewId=id
    },
    replaySubmit(){
      let that=this
      this.$http.post('/api/review/replay',{reviewId:that.selectReviewId,reviewContent:that.reviewContent})
        .then(function (data) {
          if (data.data.code==200){
            that.$message({
              message:'回复成功',
              type:'success'
            })
            that.loadTable();
            that.replayDialogVisible=false
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    loadTable(){
      let that=this
      this.$http.post('/api/review/getReviewData')
        .then(function (data) {
          that.sortByTypeArr=data.data[0]
          that.pageData=data.data[1]
          that.reviewData=[]
          for (let i=15*that.page;i<(that.page+1)*15;i++){
            if (data.data[1][i]){
              that.reviewData.push(data.data[1][i])
            }
          }
        })
    },
    pagePrev(){
      if (this.page<=0){
        this.page=0
      }
      else {
        this.page--
      }
      this.changePage()
    },
    pageNext(){
      if (this.page>=100){
        this.page=100
      }
      else{
        this.page++
      }
      this.changePage()
    },
    changePage(){
      this.reviewData=[]
      for (let i=15*this.page;i<15*(this.page+1);i++){
        if (this.pageData[i]){
         if (this.sortByType){
           if (this.pageData[i].category_id==this.sortByType) {
             this.reviewData.push(this.pageData[i])
           }
         }
         else{
           this.reviewData.push(this.pageData[i])
         }
        }
      }
    },
    pageChange(n){
      this.page=n-1
      this.changePage()
    }
  },
  created(){
   this.loadTable()
  }
}
</script>

<style scoped>
  .el-col{
    line-height: 35px;
  }
  .reviewHead{
    padding: 6px 0px;
  }
  .reviewImg{
    height: 80px;
  }
</style>
