<template>
    <div class="delivery_box">
      <SmallHead v-bind:urlObj="nameObj"></SmallHead>
      <div class="box_search">
        <div class="box_search_input">
          <span>配送方式: </span>
          <!--v-model的值为当前被选中的el-option的 value 属性值-->
          <el-select size="20%"  class="e_select" v-model="selectValue" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="box_search_btn">
          <el-button @click="toSearch" type="primary">搜索</el-button>
          <el-button @click="getALL" type="primary">全部</el-button>
        </div>
        <div class="addTransportation">
          <el-button @click="add" type="primary">添加配送方式</el-button>
        </div>
      </div>
      <div class="box_table">
        <el-table class="myTable"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="trans_name"
            label="配送方式"
            >
          </el-table-column>
          <el-table-column
            prop="trans_desc"
            label="描述" width="350">
          </el-table-column>
          <el-table-column
            label="排序"  align="center">
            <template slot-scope="scope">
              {{scope.$index+1}}
            </template>
          </el-table-column>
          <el-table-column class="table_status"
            prop="trans_status"
            label="状态"  align="center">
          </el-table-column>
          <el-table-column class="table_button"
            label="操作"  type="index" align="center" width="200">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row.trans_id)" type="primary" size="small">编辑</el-button>
              <!--<el-button @click="btn1(scope.row.trans_id)" type="success" size="small">配送</el-button>-->
              <el-button @click="deleteData(scope.row.trans_id)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="0" v-if="countPage>1">
          <el-col :span="4" :offset="17" style="margin-top: 20px">
            <el-pagination
              background
              :current-page.sync="pageList"
              layout="prev, pager, next"
              @current-change="getPageList"
              :page-count="countPage">
            </el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>

</template>

<script>
  import SmallHead from '../common/SamllHead'
export default {
  name: 'delivery',
  components: {
    SmallHead
  },
  data: function () {
    return {
      selectValue:'',
      options:[],
      tableData:[],
      pageList:1,
      countPage:5,
      nameObj: {
        name1:'系统管理',
        name2:'配送方式'
      },
    }
  },
  methods: {
      /*进行查询的方法*/
    toSearch: function () {
      let selectValue=this.selectValue
      if(selectValue.length!==0){
        this.$http.post('/api/systemManage/search',{
          searchValue:selectValue
        })
          .then((res)=>{
            this.countPage=Math.ceil(res.data.length/4)
             this.tableData=this.DataTransfer(res.data)
          })
      }
    },
    getPageList:function(){
      // 获取分页列表
      let page=this.pageList
      this.$http.post('/api/systemManage/getPage',{
        currentPage:page
      })
        .then((res)=>{
          this.tableData=this.DataTransfer(res.data)
        })
    },
      /*拿到分页的总页数以及所有的数据*/
    getALL: function () {
      this.$http.post('/api/systemManage/allData')
        .then((res)=>{
          this.countPage=Math.ceil(res.data[1][0].trans_Length/4)
          this.tableData=this.DataTransfer(res.data[0])
        })
    },
    deleteData: function(index) {
        this.$confirm('是否要删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for(var i = 0 ; i < this.tableData.length ; i++){
            if(index===this.tableData[i].trans_id){
              this.$http.post('/api/systemManage/deleteDelivery',{
                currentIndex:index
              })
                .then((res)=>{
                  if(res.data==='ok'){
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    // 删除成功，重新渲染页面
                    this.pageList=1;
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
    edit: function(index) {
      let newArr=[]
      for(var i = 0 ; i < this.tableData.length ; i++){
        let deliveryEditObj={}
        if(index=== this.tableData[i].trans_id){
          for(var key in this.tableData[i]){
            deliveryEditObj[key]=this.tableData[i][key]
          }
          newArr.push(deliveryEditObj)
          break;
        }
      }
      this.$router.push('/editDelivery',{
          deliveryData:newArr
      })
    },
    add: function () {
      this.$router.push('/editDelivery')
    },
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
      /*获取数据*/
    getData: function () {
      this.$http.post('/api/systemManage/getAllDeliveryData')
        .then((res)=>{
          var myData=res.data[0]
            /*拿到页数值*/
          this.countPage=Math.ceil((res.data[1][0].trans_Length)/4)
          // newOption渲染左上角的下拉框的值
          var newOptions=[];
          var newData=[]
          // 循环遍历数据，对上面的数据进行渲染
          for(var i = 0 ; i< myData.length ; i++){
            var newObj={};
            for(var key in myData[i]){
              newObj[key]=myData[i][key]
            }
            newData.push(newObj)
          }
          //对右上角的下拉框进行渲染
          for(var j = 0 ; j < res.data[2].length;j++){
            let newObj={}
            for(var key in res.data[2][j]){
              newObj['label']=res.data[2][j][key]
              newObj['value']=res.data[2][j][key]
            }
            newOptions.push(newObj)
          }
          this.tableData =newData
          this.options=newOptions
        })
    }
  },
  created () {
    // 向后台发送请求，拿到相应的数据
    this.getData()
  }
}
</script>

<style scoped>
.delivery_box{
  width: 100%;
  height: auto;
}
  .box_search{
    padding-left: 5%;
    width: 95%;
    height: 60px;
    line-height: 60px;
    /*background-color: #F5F5F5;*/
    /*outline: green 1px solid;*/
    border-bottom: 1px solid #E5E5E5;
  }
  .box_search_input{
    float: left;
    display: inline;
  }
  .box_search_input>select{
    width: 20%!important;
  }
  .box_search_input>span{
    font-size: 16px;
  }
.e_select{
  height: 30px;
}
  .box_search_btn{
    /*display: inline;*/
    width: 240px;
    float: left;
  }
.box_search_btn>button{
  margin-left: 15%;
  width: 30%;
}
  .box_table{
    padding-left: 4%;
    width: 96%;
    height: auto;
    margin-top: 50px;
  }
.table_status{
  width: 100px!important;
}
  .myTable button{
    text-align: center!important;
    width: 70px;
    height: 30px;
    line-height: 10px;
  }
  .addTransportation{
    float: right;
    margin-right: 5%;
  }
</style>
