<template>
    <div>
      <el-row class="samllHeader">
        <el-col :span="6">
          <el-row :gutter="0" style="text-align: center">
            <el-col :span="2" :offset="1"><i class="el-icon-bell"></i></el-col>
            <el-col :span="6" style="color: darkgray">{{url1}}</el-col>
            <el-col :span="1">/</el-col>
            <el-col :span="6">{{url2}}</el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row class="information" type="flex" justify="left" align="middle" style="height: 80px;">
        <el-col :span="2">{{Serial}}</el-col>
        <el-col :span="4"><el-input
          placeholder="请输入内容"
          v-model="input10"
          clearable>
        </el-input></el-col>

        <el-col :span="2">{{state}}</el-col>
        <el-col :span="2"> <el-select v-model="value" placeholder="全部">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select></el-col>

        <el-col :span="2">{{username}}</el-col>
        <el-col :span="3"><div class="demo-input-size">
          <el-input
            placeholder="请输入内容"
            suffix-icon="el-icon-date"
            v-model="input6">
          </el-input></div></el-col>

        <el-col :span="2">{{delivery}}</el-col>
        <el-col :span="3"><el-input v-model="input" placeholder="请输入内容"></el-input></el-col>

        <el-col :span="2"><el-button type="primary" icon="el-icon-search">搜索</el-button></el-col>
        <el-button type="primary"  style="width: 90px">全部</el-button>
      </el-row>

      <el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            fixed
            prop="order_id"
            label="订单编号"
            width="300">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="200">
          </el-table-column>
          <el-table-column
            prop="username"
            label="收货人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="STATUS"
            label="订单状态"
            width="170">
          </el-table-column>
          <el-table-column
            prop="address"
            label="支付状态"
            width="200">
          </el-table-column>
          <el-table-column
            prop="pay_time"
            label="下单时间"
            width="300">
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="name"-->
            <!--label="订单状态"-->
            <!--width="300">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="name"
            label="操作"
            width="300">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </el-table-column>

          <!--<el-table-column-->
          <!--fixed="right"-->
          <!--label="操作"-->
          <!--width="100">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
          <!--<el-button type="text" size="small">编辑</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->
        </el-table>
      </el-row>

      <el-row >
        <el-col :span="23" ><el-pagination
          background=""
          layout="prev, pager, next"
          :total="70" class="right">
        </el-pagination>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    import SamllHead from '../common/SamllHead'
    export default {
      methods: {
        handleClick(row) {
          console.log(row);
        }
      },
        name: "delivery",
      components: {SamllHead},
      data: function () {
        return {
          url1: '订单管理',
          url2: '发货管理',
          Serial:'订单编号：',
          state:'发货状态：',
          username:'用户名：',
          delivery:'收货人：',
          value: '',
          input: '',
          input10: '',
          input6: '',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '',
            zip: 200333
          }, {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '  ',
            zip: 200333
          }, {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '',
            zip: 200333
          }, {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '',
            zip: 200333
          }],
        }
      },
      created(){
        var that = this
        console.log(this)
        this.$http.post('/api/orderManage/getDeliveryList')
          .then(function (res) {
            console.log(res.data)
            var myData=res.data
            var newData=[]
            for (var i=0; i<myData.length; i++){
              var newObj = {}
              for (var key in myData[i]){
                newObj[key]=myData[i][key]
              }
              newData.push(newObj)
            }
            that.tableData=myData
            console.log(that.tableData)
          })
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
