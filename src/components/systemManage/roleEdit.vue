<template>
  <div>
    <SmallHead></SmallHead>
    <div class="editBox" >
      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>职位名： </span>
        </el-col>
        <el-col :span="4">
          <el-input v-model="input" placeholder="请输入职位名称"></el-input>
        </el-col>
        <el-col v-if="positionIf" :span="4" style="color: red">
          <span>请输入一个职位名称!</span>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>状态： </span>
        </el-col>
        <el-col :span="4" class="singleChoose">
          <el-radio v-model="radio1" label="启用">启用</el-radio>
          <el-radio v-model="radio1" label="禁用">禁用</el-radio>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>备注信息： </span>
        </el-col>
        <el-col :span="4">
          <textarea v-model="textAreaStr" name="" id="" cols="50" rows="10" value="">
        </textarea>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>授权菜单： </span>
        </el-col>
        <el-col :span="20">
          <table cellspacing="0">
            <tr>
              <th class="firstMenu">一级菜单</th>
              <th class="secondMenu">二级菜单</th>
            </tr>
            <tr>
              <td>
                <template>
                  <span>商品管理</span>
                </template>
              </td>
              <td>
                <template>
                  <el-checkbox-group v-model="checkList_one"  @change="handleCheckedCitiesChange(0)">
                    <el-checkbox  v-for="item in checkArr[0]" :key="item" :label="item">{{item}}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </td>
            </tr>
            <tr>
              <td>
                <template>
                  <span>订单管理</span>
                </template>
              </td>
              <td>
                <template>
                  <el-checkbox-group v-model="checkList_one" @change="handleCheckedCitiesChange(1)">
                    <el-checkbox  v-for="item in checkArr[1]" :key="item" :label="item">{{item}}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </td>
            </tr>
            <tr>
              <td>
                <template>
                  <span>会员管理</span>
                </template>
              </td>
              <td>
                <template>
                  <el-checkbox-group v-model="checkList_one" @change="handleCheckedCitiesChange(2)">
                    <el-checkbox v-for="item in checkArr[2]" :key="item"  :label="item">{{item}}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </td>
            </tr>
            <tr>
              <td>
                <template>
                  <span>专题活动</span>
                </template>
              </td>
              <td>
                <template>
                  <el-checkbox-group v-model="checkList_one" @change="handleCheckedCitiesChange(3)">
                    <el-checkbox v-for="item in checkArr[3]" :key="item"  :label="item">{{item}}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </td>
            </tr>
            <tr>
              <td>
                <template>
                  <span>统计报表</span>
                </template>
              </td>
              <td>
                <template>
                  <el-checkbox-group v-model="checkList_one" @change="handleCheckedCitiesChange(4)">
                    <el-checkbox v-for="item in checkArr[4]" :key="item"  :label="item">{{item}}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </td>
            </tr>
            <tr>
              <td>
                <template>
                  <span>系统管理</span>
                </template>
              </td>
              <td>
                <template>
                  <el-checkbox-group v-model="checkList_one" @change="handleCheckedCitiesChange(5)">
                    <el-checkbox v-for="item in checkArr[5]" :key="item"  :label="item">{{item}}</el-checkbox>
                  </el-checkbox-group>
                </template>
              </td>
            </tr>
            <tr>
              <td>
                <template>
                  <span>模块管理</span>
                </template>
              </td>
              <td>
                <el-checkbox-group v-model="checkList_one" @change="handleCheckedCitiesChange(6)">
                  <el-checkbox v-for="item in checkArr[6]" :key="item"  :label="item">{{item}}</el-checkbox>
                </el-checkbox-group>
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="4">
        </el-col>
        <el-col :span="6">
          <el-button style="margin-top: 30px" type="primary" @click="ensureSave">确认保存</el-button>
        </el-col>
      </el-row>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
  import SmallHead from '../common/SamllHead'
  export default {
    name: 'roleEdit',
    data: function() {
      return {
        isInLocal:false,
        input: '',
        number: '',
        radio1: '启用',
        positionIf:false,
        checkList: [],
        checkList_one: [],
        isIndeterminate: false,
        textAreaStr:'',
        topArr:[],
        checkArr:[
          ['商品列表','添加商品','商品分类','评论管理','优惠券管理'],
          ['订单信息','发货管理'],
          ['会员信息管理','会员等级管理'],
          ['活动列表','新建活动'],
          ['订单统计','用户统计','访问量统计','盈利统计'],
          ['配送方式','操作员管理','职位管理','支付方式管理'],
          ['模块管理'],
        ],
        firstMenuList:['商品管理','订单管理','会员管理','专题活动','统计报表','系统管理','模块管理'],
        firstPower:[]
      }
    },
    components: {
      SmallHead
    },
    methods: {
      // 二级菜单change事件,用来渲染一级菜单
      handleCheckedCitiesChange: function(index){
        // console.log(index)，首先拿到index，来遍历一级菜单
        for(var i = 0 ; i < this.firstMenuList.length;i++){
          // console.log(this.firstMenuList[i])
          if(index===i){
            /*topArr是一个临时数组，进行存放一级菜单*/
            /*每次变化时，先判断这个数组对应的索引有没有值*/
            if(this.topArr[i]===undefined){
              /*如何没有，就把值复制过去*/
              this.topArr[i]=this.firstMenuList[i]
              break;
            }else{
              /*如果当前索引下有值，每次二级菜单的change事件
              * 都去判断我是否选择了一级菜单对应的二级菜单
              * 如果都没选择，即isOk=false 就删除topArr中对应的一项*/
              var isOk=false;
              for(var k = 0 ; k < this.checkArr[i].length ; k++){
                for(var a= 0 ;a < this.checkList_one.length ;a++){
                  if(this.checkArr[i][k]===this.checkList_one[a]){
                    isOk=true;
                  }
                }
              }
              if(isOk===false){
                this.topArr.splice(i,1)
              }
            }

          }
        }
        this.firstPower=this.topArr
      },
      // 添加或者编辑按钮
      ensureSave: function () {
        var isOk=true
        if(this.input.length===0){
          isOk=false
          this.positionIf=true
        }else{
          this.positionIf=false
        }
        if(this.checkList_one.length===0){
          this.$message({
            message: '请给当前职位分配权限',
            type: 'warning'
          });
          isOk=false
        }
        if(isOk!==false){
          this.$http.post('/api/systemManage/addRole',{
            role_name:this.input,
            firstPower:this.firstPower,
            role_status:this.radio1,
            power_list:this.checkList_one,
            role_description:this.textAreaStr
          }).then(res=>{
            if(res.data==='ok'){
              if(this.isInLocal===true){
                this.$message({
                  message:'编辑成功！',
                  type:'success'
                })
                this.isInLocal=false;
              }else{
                this.$message({
                  message:'添加成功！',
                  type:'success'
                })
              }
              this.input='';
              this.radio1='启用';
              this.checkList_one=[];
              this.textAreaStr='';
              this.topArr=[];
              this.firstPower=[];
            }else{
              this.$message.error('错了哦');
            }

          })
        }
      }
    },
    created: function () {
      var localData=JSON.parse(localStorage.getItem('roleData'))
      if(localData){
        for(var i = 0 ; i < localData.length ;i ++){
          this.input=localData[i].role_name
          this.radio1=localData[i].role_status
          this.textAreaStr=localData[i].role_description
          this.checkList_one=localData[i].power_list.split(',')
        }
        // 设置变量的值，判断修改还是新增的提示信息
        this.isInLocal=true
        localStorage.removeItem('roleData');
      }

    }
  }
</script>

<style scoped>
  .editBox{
    width: 95%;
    height: auto;
    margin: 20px auto;
  }

  .editBox>div{
    height: auto;
    line-height: 50px;
    margin-top: 15px;
  }

  .editBox>div>div:nth-child(1){
    text-align: right;
  }
  .editBox>div>div:nth-child(2){
    margin-left: 3%;
  }

  .el-col-5{
    width: 0;
  }
  .firstMenu{
    width: 20%;
    border-bottom: 1px solid #A9A9A9;
  }
  .secondMenu{
    padding-left: 10%;
    width: 80%;
    /*outline: red 1px solid;*/
    border-bottom: 1px solid #A9A9A9;
  }
  table th{
    text-align: left;
  }
  table td{
    text-align: left;
  }
  table>tr>td:nth-child(1){
    border-bottom: 1px solid #A9A9A9;
  }
  table>tr>td:nth-child(2){
    border-bottom: 1px solid #A9A9A9;
  }
</style>
