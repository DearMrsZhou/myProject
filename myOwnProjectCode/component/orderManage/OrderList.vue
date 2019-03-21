<template>
  <div>
    <SamllHead v-bind:urlObj="nameObj"></SamllHead>
    <el-row class="information"  type="flex" justify="left" align="middle" style="height: 60px; margin-top: 10px">
          <el-col :span="2">订单编号</el-col>
           <el-col :span="4"><el-input
            size="small"
             placeholder="请输入内容"
             v-model="order_number"
             clearable>
           </el-input></el-col>
           <el-col :span="2">订单状态</el-col>
           <el-col :span="2"> <el-select v-model="order_status" placeholder="全部">
             <el-option
               v-for="item in options1"
               :key="item"
               :label="item"
               :value="item">
             </el-option>
           </el-select></el-col>

      <el-col :span="2">下单日期:</el-col>
      <el-col :span="6"><div class="block">
        <span class="demonstration"></span>
        <el-date-picker
          v-model="order_date"
          value-format="yyyy-MM-dd"
          type="daterange"
          @change="dateChange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div></el-col>

    </el-row>

   <el-row  class="information1" type="flex" justify="left" align="middle" style="height: 60px;">



     <el-col :span="2" >用户名：</el-col>
     <el-col :span="4"><el-input v-model="user_name" placeholder="请输入内容"></el-input></el-col>


     <el-col :span="2" :offset="2"><el-button type="primary" icon="el-icon-search" @click="searchData">搜索</el-button></el-col>
     <el-button type="primary"  style="width: 90px;margin-left: 40px" @click="searchAll">全部</el-button>
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
          >
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
          label="商品金额"
          align="center"
         >
          <template slot-scope="scope">
            {{scope.row.price.toFixed(2)}}
          </template>
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
          width="180%">
        </el-table-column>
      </el-table>
    </el-row>

    <!--分页功能-->
    <el-row >
       <el-col style="margin-top: 30px" :span="8" :offset="16"><el-pagination
         background
         :current-page.sync="pageList"
         layout="prev, pager, next"
         @current-change="getPageList"
         :page-count="countPage">
       </el-pagination>
       </el-col>
    </el-row>
  </div>
</template>

<script>
import  SamllHead from '../common/SamllHead'
  export default {
    name: "OrderManage",
    data:function () {
      return{
        /*绑定的数据*/
        order_number:'',
        order_status:'',
        order_date:'',
        user_name:'',

        tableData: [],
        options1:['待发货','已发货','运输中','已收货'],
        pageList:1,
        countPage:5,
        nameObj: {
          name1:'订单管理',
          name2:'订单信息'
        },
      }
    },
    components: {
      SamllHead
    },

    methods:{
      dateChange:function(val){
        console.log(val)
      },
      searchData: function () {
        this.$http.post('/api/orderManage/searchOrder',{
          order_number:this.order_number,
          order_status:this.order_status,
          order_date:this.order_date,
          user_name:this.user_name
        })
          .then(res=>{
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
      getOrderData:function () {
        var that=this
        this.$http.post('/api/orderManage/getOrderList',{
          page:this.pageList
        })
          .then(function (res) {

            var myData=res.data[0]
            // console.log('order；123：',res.data[1])
            /*拿到页数*/
            that.countPage=res.data[1]
            that.tableData=myData
          })
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
      getPageList:function () {
        //拿到当前的页数
        var currentPage=this.pageList;
        this.$http.post('/api/orderManage/getOrderPageData',{
          page:currentPage
        }) .then((res)=>{
          this.tableData=this.DataTransfer(res.data)
        })
      }
    },
    created(){
      this.getOrderData()
    }

  }

</script>

<style scoped>
  .information{
    /*height: 150px;*/
    background-color: #ffffff;
    /*border-bottom: 1px solid lightgray;*/
    flex-wrap: wrap;   /*//自动换行*/
    /*justify-content: flex-start;*/
    /*align-content: flex-start;*/
  }
  .information1{
    padding-bottom:10px;
    background-color: #ffffff;
    border-bottom: 1px solid lightgray;
    flex-wrap: wrap;
  }
  .right{
    margin-top: 30px;
    /*float: right;*/
  }
  .samllHeader{
    /*padding: 15px 30px;*/
    height: 50px;
    line-height: 50px;
    background-color: #dedede;
    border-bottom: 1px solid black;
  }
  .myTable{
    margin-top: 30px;

  }
  .myTable .el-table__body-wrapper::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  .myTable .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #72a945;
    border-radius: 3px;
  }
</style>
