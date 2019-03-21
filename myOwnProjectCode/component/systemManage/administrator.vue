<template>
    <div>
      <SmallHead v-bind:urlObj="nameObj"></SmallHead>
      <div>
        <el-row :gutter="10" class="adminHeader">
          <el-col :span="4" :offset="1">
            <el-row>
              <el-col :span="8">
                <span>用户名:</span>
              </el-col>
              <el-col :span="16">
                <el-input v-model="searchUser_name" placeholder="用户名"></el-input>
              </el-col>
            </el-row>
          </el-col>

            <el-col :span="4" >
              <el-row>
                <el-col :span="8">
                  <span>姓名:</span>
                </el-col>
                <el-col :span="16">
                  <el-input v-model="searchReal_name" placeholder="姓名"></el-input>
                </el-col>
              </el-row>
           </el-col>


          <el-col :span="4" :offset="1">
            <el-row>
              <el-col :span="12"><el-button type="primary" @click="toSearchData">搜索</el-button></el-col>
              <el-col :span="12"><el-button type="primary" @click="searchAll">全部</el-button></el-col>
            </el-row>
          </el-col>

          <el-col :span="4" :offset="6">
            <el-row>
              <el-col :span="16"><el-button type="primary" @click="addAdmin">添加管理员</el-button></el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="table_box">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-table class="myTable"
                      :data="tableData"
                      border
                      style="width: 100%">
              <el-table-column
                label="ID" width="60">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column
                prop="admin_name"
                label="用户名">
              </el-table-column>
              <el-table-column
                prop="admin_status"
                label="状态"  align="center" width="100">
              </el-table-column>
              <el-table-column class="table_status"
                               prop="role_name"
                               label="职位"  align="center">
              </el-table-column>
              <el-table-column class="table_status"
                               prop="Real_name"
                               label="姓名"  align="center">
              </el-table-column>
              <el-table-column class="table_status"
                               prop="login_time"
                               label="登录次数"  align="center" width="50">
              </el-table-column>
              <el-table-column class="table_status"
                               prop="last_loginTime"
                               label="最后登录时间"  align="center" width="150">
              </el-table-column>
              <el-table-column class="table_status"
                               prop="new_loginTime"
                               label="创建时间"  align="center" width="160">
              </el-table-column>
              <el-table-column class="table_button"
                               label="操作"  type="index" align="center" width="160">
                <template slot-scope="scope">
                  <el-button size="small" @click="edit(scope.row.admin_id)" type="primary" >编辑</el-button>
                  <el-button size="small" @click="deleteAdmin(scope.row.admin_id)" type="danger" >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
  import SmallHead from '../common/SamllHead'
export default {
  name: 'administrator',
  data: function () {
    return {
      searchUser_name:'',
      searchReal_name:'',
      selectValue: '',
      options: [{
        value: '选项1',
        label: '全部'
      }, {
        value: '选项2',
        label: '正常'
      }, {
        value: '选项3',
        label: '冻结'
      }],
      tableData: [],
      nameObj: {
        name1:'系统管理',
        name2:'操作员管理'
      },
    }
  },
  components: {
    SmallHead
  },
  methods:{
    addAdmin: function () {
        // 添加管理员，进行路由跳转
      this.$router.push('/administratorEdit')
    },
    toSearchData:function(){
        //模糊查询，进行搜索
      let user_name=this.searchUser_name;
      let real_name=this.searchReal_name;
      this.$http.post('/api/systemManage/searchAdmin',{
        searchUser_name:user_name,
        searchReal_name:real_name
      })
        .then(res=>{
            //如果没数据，提示
          var myData=res.data;
          if(myData.length===0){
            this.$message('查询无果')
          }else{
            this.tableData=this.DataTransfer(res.data)
          }
        })
    },
    searchAll:function(){
      this.getData()
    },
    edit: function (index) {
      let newArr=[]
      for(var i = 0 ; i < this.tableData.length ; i++){
        let adminEditObj={}
        if(index=== this.tableData[i].admin_id){
          for(var key in this.tableData[i]){
            adminEditObj[key]=this.tableData[i][key]
          }
          newArr.push(adminEditObj)
          break;
        }
      }
      /*进行路由传参*/
      this.$router.push('/administratorEdit',{
          myAdminData:newArr,
          adminStatus:'ok'
      })
    },
      //删除数据
    deleteAdmin: function (index) {
      this.$confirm('是否要删除该条数据?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          //根据索引找到数据数组对应的一项，进行删除
        for(var i = 0 ; i < this.tableData.length ; i++){
          if(index===this.tableData[i].admin_id){
            this.$http.post('/api/systemManage/deleteAdmin',{
              currentIndex:index
            })
              .then((res)=>{
                if(res.data==='ok'){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  // 删除成功，重新渲染页面
                  // this.pageList=1;
                  this.getData()
                }
              }).catch(()=>{
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            })
          }
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
      /*渲染数据*/
    getData:function () {
      this.$http.post('/api/systemManage/getAdministrator')
        .then(res=>{
          let myData=res.data[0];
          let myData2=res.data[1];
          this.tableData=myData;
          // 把职位列表存储到本地存储中去
          let newArr=[];
          for(var i = 0 ; i< myData2.length ;i++){
            let myObj={};
            myObj['role_name']=myData2[i].role_name
            myObj['role_id']=myData2[i].role_id
            newArr.push(myObj)
          }
          localStorage.setItem('positionList',JSON.stringify(newArr))
        })
    },

    // 转换数据格式的通用的函数
    DataTransfer:function(resData){
      // 进行数据渲染的函数，直接调用
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
  },
  created:function () {
    this.getData()
  }
}
</script>

<style scoped>
  .adminHeader div{
    height: 40px;
    line-height: 40px;
  }
  .adminHeader{
    margin-top: 20px;
  }
  .table_box{
    padding-left: 4%;
    width: 96%;
    margin-top: 50px;
  }
</style>
