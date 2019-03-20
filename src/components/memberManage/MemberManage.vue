<template>
<div>
  <SmallHead v-bind:urlObj="nameObj"></SmallHead>
  <div style="margin-top: 15px;margin-left: 20px">
    <div class="div1">
    <div>
      <span>用户名：</span>
      <el-input v-model="input1" placeholder="请输入内容" class="input"></el-input>
    </div><div>
    <span>姓名：</span>
    <el-input v-model="input2" placeholder="请输入内容" class="input"></el-input>
  </div>
    <div>
      <span>状态：</span>
      <el-select style="width: 150px" v-model="input3" :value="input3" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
    </div>
    <div class="button">
      <el-button size="small" class="el-button" @click="search">搜索</el-button>
      <el-button size="small" class="el-button" @click="getall">全部</el-button>
    </div>
    <el-button szie="small" class="el-button" @click="add">添加会员</el-button>
  </div>
    <el-table
      :data="tableData"
      style="width: 95%;margin: 15px auto">
      <el-table-column
        prop="user_id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column><el-table-column
      prop="user_status"
      label="状态">
    </el-table-column><el-table-column
      prop="phone"
      label="手机号码">
    </el-table-column><el-table-column
      prop="position"
      label="会员等级">
    </el-table-column><el-table-column
      prop="email"
      label="邮箱地址" width="200">
    </el-table-column><el-table-column
      prop="date"
      label="注册日期">
    </el-table-column>
    </el-table>
  </div>
  <el-row >
    <el-col style="margin-top: 30px" :span="8" :offset="8"><el-pagination
      background
      layout="prev, pager, next"
      :page-count="15">
    </el-pagination>
    </el-col>
  </el-row>
</div>
</template>

<script>
import SmallHead from '../common/SamllHead'
export default {
  name: 'MemberManage',
  components: {
    SmallHead
  },
    data() {
      return {
        tabaledata: this.value13,
        from1: false,
        div1: true,
        input1: '',
        input2: '',
        input3: '全部',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '选项1',
        value7: '',
        options: [{
          value: '选项1',
          label: '全部'
        }, {
          value: '正常',
          label: '正常'
        }, {
          value: '禁用',
          label: '禁用'
        }],
        value8: '选项1',
        status: '',
        value13: '',
        tableData: [],
        shopAllData:[],
        searchlist: [],
        nameObj: {
          name1:'会员管理',
          name2:'会员信管理'
        },
      }
    },
  computed: {

  },
  //生命周期函数
  created() {
    this.getlist()
  },
  methods: {
    getstatus:function(val){
      this.status=val
      console.log(this.value13)
    },
    add: function () {
      this.$router.push('/addvip')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
       this.$http.post()
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //获取数据
    getlist() {
      console.log(123)
      this.$http.get('/api/memberManage/getlist').then(result =>{
        console.log(result)
        var result = result.data;
        this.tableData = result;
        this.shopAllData=result
      })
    },
    search:function(){
      this.tableData=[]
      for(let i=0;i<this.shopAllData.length;i++){

        if(this.shopAllData[i].username.indexOf(this.input1)!=-1 && this.shopAllData[i].name.indexOf(this.input2)!=-1){
          if (this.input3=='全部'){
            this.tableData.push(this.shopAllData[i])
          }
          else if (this.input3==this.shopAllData[i].user_status) {
            this.tableData.push(this.shopAllData[i])
          }
        }
      }
    },
    getall(){
      this.getlist();
      this.input1='';
      this.input2= '';
    }
  }
  };
</script>

<style scoped>
  table{
    width: 100%;
    border: 1px solid gainsboro;
  }
  table>thead{
    background-color: #f1f1f1;
    border: 1px solid gainsboro;
  }
  tbody th{
    border: 1px solid gainsboro;
  }
  header{
    height: 54px;
    width: 100%;
    border-bottom: 1px solid gray;
    line-height: 54px;
    font-size: 15px;
    text-align: left;
    background-color: #f5f5f5;
  }
  header>i{
    width: 4px;
    height: 4px;
  }
  .input{
    width: 150px;
    height: 30px;
  }
  .div1>div{
    float: left;
  }
  .button{
    margin-left: 5px;
    margin-top: 5px;
  }
  .el-button{
    background-color: #3a8ee6;
    color: white;
    margin: 0;
  }
  .from1{
    margin-top: 20px;
    width: 40%;
  }

</style>
