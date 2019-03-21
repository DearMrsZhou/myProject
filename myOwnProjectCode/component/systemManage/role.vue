<template>
  <div>
    <SmallHead v-bind:urlObj="nameObj"></SmallHead>
    <div>
      <el-row :gutter="10" class="adminHeader">
        <el-col :span="4" :offset="1">
          <el-row>
            <el-col :span="8">
              <span>职位名:</span>
            </el-col>
            <el-col :span="16">
              <el-input v-model="username" placeholder="职位名"></el-input>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="4" :offset="1">
          <el-row>
            <el-col :span="12"><el-button size="middle" type="primary" @click="toSearchData">搜索</el-button></el-col>
            <el-col :span="12"><el-button size="middle" type="primary" @click="searchAll">全部</el-button></el-col>
          </el-row>
        </el-col>

        <el-col :span="4" :offset="10">
          <el-row>
            <el-col :span="16"><el-button size="middle" type="primary" @click="addRole">添加角色</el-button></el-col>
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
              label="ID"
            align="center">
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column
              prop="role_name"
              label="职位名" >
            </el-table-column>
            <el-table-column
              prop="role_status"
              label="状态" >
            </el-table-column>
            <el-table-column class="table_status"
                             prop="role_name"
                             label="拥有者"  align="center">
            </el-table-column>
            <el-table-column class="table_status"
                             prop="power_list"
                             label="权限菜单" align="center" width="250">
            </el-table-column>
            <el-table-column class="table_button"
                             label="操作" type="index" align="center" width="200">
              <template slot-scope="scope">
                <el-button size="small" @click="editRole(scope.row.role_id)" type="primary" >编辑</el-button>
                <el-button size="small" @click="deleteRole(scope.row.role_id)" type="danger" >删除</el-button>
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
    name: 'role',
    data: function () {
      return {
        username: '',
        selectValue: '',
        isInLocalStorage:false,
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
          name2:'角色管理'
        },
      }
    },
    components: {
      SmallHead
    },
    methods:{
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
      toSearchData:function(){
        let user_name=this.username;
        this.$http.post('/api/systemManage/searchRole',{
          searchUser_name:user_name,
        })
          .then(res=>{
            var myData=res.data;
            if(myData.length===0){
              this.$message('查询无果')
            }else{
              this.tableData=this.DataTransfer(res.data)
            }
          })
      },
      searchAll:function(){
        this.getRoleData();
        this.username='';
      },
      editRole: function (index) {
        var myData=this.tableData
        var newObj={}
        var newArr=[]
        for(var i = 0 ; i < myData.length ; i++){
          if(index===myData[i].role_id){
            for(var key in myData[i]){
              newObj[key]=myData[i][key]
            }
            newArr.push(newObj)
            break;
          }
        }
        // localStorage.setItem('roleData',JSON.stringify(newArr));
        this.isInLocalStorage=true
        this.$router.push('/roleEdit',{
            roleData:newArr
        })
      },
      deleteRole: function (index) {
        this.$confirm('是否要删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(var i = 0 ; i < this.tableData.length ; i++){
            if(index===this.tableData[i].role_id){
              this.$http.post('/api/systemManage/deleteRole',{
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
                    this.getRoleData()
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
      getRoleData: function () {
        this.$http.post('/api/systemManage/getRole')
          .then(res=>{
            // console.log(res.data)
            this.tableData=this.DataTransfer(res.data)
          })
      },
      addRole:function () {
        this.$router.push('/roleEdit')
      }
    },
    created() {
     this.getRoleData()
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
    padding-left: 3%;
    width: 97%;
    margin-top: 50px;
  }
</style>
