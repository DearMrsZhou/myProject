<template>
  <div>
  <!--<el-container style="height: 500px; border: 1px solid #eee">-->
    <el-container>
      <el-header style="padding: 0;">
        <SamllHead v-bind:urlObj="nameObj" > </SamllHead>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="3" :offset="1">
            <el-input v-model="input6" placeholder="搜索活动名称"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="toSearch">搜索</el-button>
          </el-col>
          <el-col :span="4" :offset="12">
            <el-button type="primary" @click="addActivity()">添加活动</el-button>
          </el-col>
        </el-row>
        <!--确认删除模态框-->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
           >
          <span>确认删除记录吗</span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteActivity()">确 定</el-button>
          </span>
        </el-dialog>

        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 95%;margin: 0 auto;"
          @selection-change="handleSelectionChange">
          <el-table-column prop="news_id" label="编号">
            <template slot-scope="scope">
              <span>{{ scope.row.news_id }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="news_title" label="活动名称">
            <template slot-scope="scope">
              <span>{{ scope.row.news_title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="news_desc" label="活动介绍">
          </el-table-column>
          <el-table-column prop="news_pic_path" label="封面图">
            <template slot-scope="scope">
              <img :src="imgApi+scope.row.news_pic_path" alt="" style="height: 30px">
            </template>
          </el-table-column>
          <el-table-column prop="news_time" label="时间" width="180px">
            <template slot-scope="scope">
              <span>{{ scope.row.news_time }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="operate" label="操作" width="180px">
            <!--<el-button type="primary" size="small" plain>编辑</el-button>-->
            <!--<el-button type="danger" size="small" plain @click="showDelete(scope.$index,scope.row)">删除</el-button>-->

            <template slot-scope="scope">
              <!--<el-button-->
                <!--size="mini"-->
                <!--type="primary"-->
                <!--@click="handleEdit(scope.row.news_id)" plain>编辑</el-button>-->
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row,scope.row.news_id)" plain>删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  <!--</el-container>-->
  </div>
</template>

<script>
import SamllHead from '../common/SamllHead'
export default {
  name: "activityList",
  components: {SamllHead},
  data() {
    // const item = {
    //   id: '01',
    //   name: '2018最佳Lip奖',
    //   information: '在线独家发布',
    //   coverPic:'',
    //   time:'2018.12.19-2018.12.25',
    //   detailPic:' ',
    //   operate:''
    // };
    return {
      // tableData: Array(20).fill(item),
      index: 0,
      dialogVisible: false,
      tableData: [],
      imgApi:'http://localhost:3100/',
      multipleSelection: [],
      input6:'',
      selectId:'',
      nameObj: {
        name1:'专题活动',
        name2:'活动列表'
      }
    }
  },

  methods: {
    getlist (){
      this.$http.post('/api/activityManage/getActivityList')
        .then(res => {
          var myData=res.data
          // console.log(myData)
          this.tableData=myData
          console.log(this.tableData)
        })
    },

    //搜索活动
    toSearch: function () {
      let news_title=this.news_title;
      this.$http.post('/api/activityManage/searchActivity',{
        news_title:news_title,
      })
        .then(res=>{
          // console.log(res.data)
          var myData=res.data;
          if(myData.length===0){
            this.$message('查询无果')
          }else{
            this.tableData=this.DataTransfer(res.data)
          }
        })
    },

    //删除活动
    handleDelete(index,row,id) {
      this.dialogVisible = true
      index = this.index
      this.selectId=id
    },

    deleteActivity: function () {
      this.tableData.splice(this.index,1)
      let that=this
      this.$http.post('/api/activityManage/deleteActivity',{
        news_id: that.selectId
      })
        .then((res)=>{
          if(res.data==='ok'){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // 删除成功，重新渲染页面
            this.getlist()
            this.dialogVisible = false
          }
        })
    },

    //跳转到编辑活动页面
    handleEdit(news_id){
      this.$router.push({
        name:'activityEdit',
        params:{
          news_id: news_id
        }
      })
    },


    //新增活动
    addActivity:function () {
      this.$router.push('/activityAdd')
    },

    DataTransfer:function(resData){
      let newArr=[]
      for(var i = 0 ; i< resData.length ; i++){
        let newObj={}
        for(var key in resData[i]){
          newObj[key]=resData[i][key]
        }
        newArr.push(newObj)
      }
      return newArr;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  created(){
    // var that=this
    this.getlist()

  },
}
</script>

<style scoped>
</style>
