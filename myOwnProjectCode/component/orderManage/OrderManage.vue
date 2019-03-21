<template>
    <div>
      <SamllHead v-bind:urlObj="nameObj"></SamllHead>
      <el-row class="information" type="flex" justify="left" align="middle" style="height: 80px;">
        <el-col :span="2">订单号：</el-col>
        <el-col :span="4"><el-input
          placeholder="请输入内容"
          v-model="order_number"
          clearable>
        </el-input></el-col>

        <el-col :span="2">用户名：</el-col>
        <el-col :span="3"><div class="demo-input-size">
          <el-input
            placeholder="请输入内容"
            v-model="user_name">
          </el-input></div></el-col>


        <el-col :span="2" :offset="1"><el-button type="primary" icon="el-icon-search"
        @click="searchData">搜索</el-button></el-col>
        <el-button @click="searchAll" type="primary"  style="width: 90px;margin-left: 30px">全部</el-button>
      </el-row>

      <!--表格内容-->
      <el-row>
        <el-table class="myTable"
                  :data="tableData"
                  border
                  style="width: 100%">
          <el-table-column
            align="center"
            prop="order_id"
            label="订单编号"
            width="130%">
          </el-table-column>
          <el-table-column
            prop="product_name"
            align="center"
            label="商品"
            width="250%">
          </el-table-column>
          <el-table-column
            prop="color_name"
            align="center"
            label="色号"
           >
          </el-table-column>
          <el-table-column
            prop="username"
            align="center"
            label="用户名"
           >
          </el-table-column>
          <el-table-column
            prop="price"
            label="商品金额"
            align="center"
           >
          </el-table-column>
          <el-table-column
            prop="fare"
            label="运费"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="数量"
            align="center"
           >
          </el-table-column>
          <el-table-column
            label="订单总额"
            align="center"
           >
            <template  slot-scope="scope">
              <!--{{getMoney(scope.row.user_id)}}-->
              {{tableData[scope.$index].price*tableData[scope.$index].quantity+tableData[scope.$index].fare}}
            </template>
          </el-table-column>

          <el-table-column
            prop="STATUS"
            label="订单状态"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="pay_time"
            label="下单时间"
            align="center"
           >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="操作"
            >
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row.order_id)" type="primary" size="mini">配送</el-button>
            </template>

          </el-table-column>
        </el-table>
      </el-row>


    </div>
</template>

<script>
    import SamllHead from '../common/SamllHead'
    export default {
        name: "delivery",
      components: {SamllHead},
      data: function () {
        return {
          /*绑定的数据*/

          order_status:'',
          order_date:'',

          /*搜索数据*/
          order_number:'',
          user_name:'',

          tableData: [],

          pageList:1,
          countPage:5,

          nameObj: {
            name1:'订单管理',
            name2:'发货管理'
          },
        }
      },
      methods: {
        handleClick(index) {
          var newData=this.tableData;
          let myData=[];
          for(var i = 0 ; i < newData.length ; i++){
            if(index===newData[i].order_id){
              myData=newData[i];
              break;
            }
          }
          // console.log(myData)
          this.$router.push({
            name:'orderConfig',
            params:{
              dataArr:myData
            }
          })
        },
        searchData: function () {
          this.$http.post('/api/orderManage/searchNoDelivery',{
            order_number:this.order_number,
            user_name:this.user_name
          })
            .then(res=>{
            /*  console.log(res.data)*/
              var myData=res.data
              if(myData.length===0){
                this.$message('查询无果');
              }else{
                this.tableData=myData;
              }
            })
          this.order_number='';
          this.order_status='';
          this.order_date='';
          this.user_name='';
        },
        searchAll: function () {
          this.getOrderData()
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

        getOrderData:function () {
          var that = this
          this.$http.post('/api/orderManage/getDeliveryList',{
            page:this.pageList
          })
            .then(function (res) {
              // console.log(res.data)
              var myData=res.data[0]
              var newData=[]
              for(var i=0; i<myData.length; i++){
                var newObj={}
                for(var key in myData[i]){
                  newObj[key]=myData[i][key]
                }
                newData.push(newObj)
              }
              that.tableData=myData
            })
        },
      },
      created(){
          this.getOrderData()
      }
    }
</script>

<style scoped>
  .samllHeader{
    /*padding: 15px 30px;*/
    height: 50px;
    line-height: 50px;
    background-color: #dedede;
    border-bottom: 1px solid black;
  }
  .right{
    margin-top: 30px;
  }
</style>
