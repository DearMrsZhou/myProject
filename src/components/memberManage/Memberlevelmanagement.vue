<template>
<div>
  <div v-if="showzu">
    <SmallHead v-bind:urlObj="nameObj"></SmallHead>
  <div style="text-align:   left;margin-left: 25px;margin-top: 15px;"><el-button size="small" class="el-button" @click="add" type="primary">添加等级</el-button></div>
  <el-table
    :data="tableData"
    style="width: 95%;margin: 0 auto">
    <el-table-column
      label="名称"
      prop="position">
    </el-table-column>
    <el-table-column
      label="达标积分"
      prop="Markuppoints">
    </el-table-column><el-table-column
      label="折扣"
      prop="discount">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot-scope="scope">
        <el-button
          size="small" type="primary"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
  <!--添加等级-->
  <div v-if="showcha" class="add" style="padding:0 3%">
    <div>
      <span>等级名称</span>
    <el-input v-model="inputvip" placeholder="请输入内容" class="input"></el-input>
      <el-col :span="4" v-if="inputvipRealName">
        <span style="color: red">等级名称必须是汉字！</span>
      </el-col>
    </div><div>
      <span>达标积分</span>
    <el-input v-model="inputMarkuppoints" placeholder="请输入内容" class="input"></el-input>
    <el-col :span="4" v-if="MarkuppointsReal">
      <span style="color: red">积分必须是非零正整数</span>
    </el-col>
    </div><div>
      <span>购物折扣</span>
    <el-input v-model="inputdiscount" placeholder="请输入内容" class="input"></el-input>
    <el-col :span="4" v-if="discountReal">
      <span style="color: red">折扣必须含有一位小数！</span>
    </el-col>
    </div>
    <el-button size="small" class="el-button" @click="add2">添加</el-button></div>
  <!--编辑页面-->
  <div v-if="bianji">
    <div class="add">
      <div>
        <span>等级名称</span>
        <el-input v-model="tableData[edi].position" placeholder="请输入内容" class="input"></el-input>
      </div><div>
      <span>达标积分</span>
      <el-input v-model="tableData[edi].Markuppoints" placeholder="请输入内容" class="input"></el-input>
    </div><div>
      <span>购物折扣</span>
      <el-input v-model="tableData[edi].discount" placeholder="请输入内容" class="input"></el-input>
    </div>
      <el-button size="small" class="el-button" @click="add3">保存</el-button></div>
  </div>
  </div>
</template>

<script>
import SmallHead from '../common/SamllHead'
export default {
  name: 'Memberlevelmanagement',
  components: {
    SmallHead
  },
  data() {
    return {
      edi: '',
      edirow: '',
      showzu: true,
      showcha: false,
      bianji: false,
      tableData: [],
      inputvip: '',
      inputMarkuppoints: '',
      inputdiscount: '',
      inputvipRealName:false,
      MarkuppointsReal: false,
      discountReal :false,
      nameObj: {
        name1:'会员管理',
        name2:'会员信息管理'
      },
    }
  },
  created() {
    this.getvip()
  },
  methods: {
    handleEdit(index, row) {
      var edirow = row
      this.edi=index;
      this.edirow=edirow;
      this.bianji=true;
      this.showzu=false;
      console.log(this.edi);
    },
    handleDelete(index, row) {
      var edirow = row
      this.edi=index;
      this.edirow=edirow;
      console.log(index, row);
      this.tableData.splice(index,1 )
      this.$http.post('/api/memberManage/deletevip',{
        position:this.tableData[this.edi].position,
        MarkuppointsReal:this.tableData[this.edi].Markuppoints,
        discount: this.tableData[this.edi].discount,
        indexrow: this.edirow.position
      }).then(res=>{
        if(res.data==='ok') {
          if (this.isInLocal === true) {
            this.$message({
              message: '编辑成功！',
              type: 'success'
            });
            this.isInLocal = false
          } else {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.isInLocal = false
          }
        }
      })
    },
    add: function () {
      this.showcha = true;
      this.showzu = false;
    },
    add2: function () {

      var isOk = true;
      //等级名称的判断
      let judgeRealName=/^[\u4e00-\u9fa5]+$/;
      if(judgeRealName.test(this.inputvip)){
        this.inputvipRealName=false
      }else{
        isOk=false;
        this.inputvipRealName=true
      };
      //积分判断
      let Markuppoints=/^\d+$/ ;
      if (Markuppoints.test(this.inputMarkuppoints)){
        this.MarkuppointsReal = false
      }else {
        isOk=false;
        this.MarkuppointsReal=true
      }
      //折扣判断
      let discount = /^[0-9]+(.[0-9]{2})?$/;
      if (discount.test(this.inputdiscount)) {
        this.discountReal= false
      }else {
        isOk=false;
        this.discountReal=true
      }
      //添加数据
      if(isOk===true){
        this.$http.post('/api/memberManage/addvip',{
          inputvip:this.inputvip,
          inputMarkuppoints:this.inputMarkuppoints,
          inputdiscount:this.inputdiscount,
        })
          .then(res=>{
            if(res.data==='ok'){
              if(this.isInLocal===true){
                this.$message({
                  message: '编辑成功！',
                  type: 'success'
                });
                this.isInLocal=false
              }else{
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
                this.isInLocal=false
              }
              this.inputvip='';
              this.inputdiscount='';
              this.inputMarkuppoints=''
            }
          })
        this.showcha = false;
        this.showzu = true;
        console.log('daa')
        this.getvip()
      }

      // setTimeout(()=>{
      //   this.getvip()
      // },100)
    },
    add3: function () {
      if (this.showcha==false) {
        this.showzu=true;
        this.bianji = false;
        this.$http.post('/api/memberManage/updatevip',{
          position:this.tableData[this.edi].position,
          MarkuppointsReal:this.tableData[this.edi].Markuppoints,
          discount: this.tableData[this.edi].discount,
          indexrow: this.edirow.position
        }).then(res=>{
          if(res.data==='ok') {
            if (this.isInLocal === true) {
              this.$message({
                message: '编辑成功！',
                type: 'success'
              });
              this.isInLocal = false
            } else {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.isInLocal = false
            }
          }
        })
      }
    },
    getvip(){
      var that = this
      this.$http.post('api/memberManage/getvip').then(result=>{
        var result = result.data
        that.tableData=result
    })}
  }
}
</script>

<style scoped>
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
    width: 200px;
    height: 50px;
    padding: 10px;
  }
  .add{
    width: 40%;
  }
  .add>div{
    height: 50px;
    text-align: left;
  }
</style>
