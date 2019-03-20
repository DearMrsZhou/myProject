<template>
  <div>
    <SmallHead v-bind:urlObj="nameObj"></SmallHead>
    <div>
      <el-row :gutter="10" class="adminHeader">
        <el-col :span="4" :offset="20">
          <el-row>
            <el-col :span="16"><el-button type="primary" @click="addPayWay">添加支付方式</el-button></el-col>
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
                    style="width: 120%">
            <el-table-column
              label="payId"
             >
              <template slot-scope="scope">
                {{scope.$index+1}}
              </template>
            </el-table-column>
            <el-table-column
              prop="pay_name"
              label="支付方式">
            </el-table-column>
            <el-table-column
              prop="pay_logoPath"
              label="LOGO" >
              <template slot-scope="scope">
                <img :src="scope.row.pay_logoPath" class="pay_pic"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="pay_status"
              label="状态">
            </el-table-column>
            <el-table-column class="table_status"
                             prop="pay_desc"
                             label="描述"  align="center">
            </el-table-column>
            <el-table-column class="table_button"
                             label="操作"  type="index" align="center" width="200">
              <template slot-scope="scope">
                <el-button size="mini" @click="configure(scope.row.pay_id)" type="primary" plain>配置</el-button>
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
    name: 'pay',
    data: function () {
      return {
        username: '',
        name: '',
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
          name2:'支付方式管理'
        },
      }
    },
    methods: {
      configure: function (index) {
        var myData=this.tableData;
        for(var i = 0 ; i < myData.length ; i++){
          if(index===myData[i].pay_id){
            localStorage.setItem('payConfig',JSON.stringify(myData[i]));
            this.$router.push('/payConfig');
            break;
          }
        }
      },
      getPay:function () {
        this.$http.post('/api/systemManage/getPay')
          .then(res=>{
            let myData=res.data;
           /* console.log(myData)*/
            this.tableData=myData;
          })
      },
      addPayWay: function () {
        this.$router.push('/payConfig');
      }
    },
    components: {
      SmallHead
    },
    created:function () {
     this.getPay()
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
    padding-left: 2%;
    width: 98%;
    margin-top: 20px;
  }
  .pay_pic{
    width: 150px;
    height: 60px;
  }
</style>
