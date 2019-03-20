<template>
<div>
  <SmallHead v-bind:urlObj="nameObj"></SmallHead>
  <el-container style="margin-top: 20px">
    <el-header class="myForm">
      <el-row>
        <el-col :span="1">分类：</el-col>
        <el-col :span="4">
          <el-select v-model="value" placeholder="请选择" @change="select(value)">
            <el-option v-for="item in options" :key="item.category_id" :label="item.category_name" :value="item.category_id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="1">状态：</el-col>
        <el-col :span="2">
          <el-select v-model="value1" placeholder="请选择" @change="select1(value1)">
            <el-option v-for="item in zhuangtai" :key="item.id" :label="item.zt" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="1">排序：</el-col>
        <el-col :span="2">
          <el-select v-model="value2" placeholder="请选择" @change="paiXu(value2)">
            <el-option v-for="item in paixu" :key="item.id" :label="item.px" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-button type="primary">搜索</el-button>
        </el-col>
        <el-col :span="1" :offset="1">
          <el-button @click="shopL" type="primary">全部</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary">添加商品</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="ID"
          width="100"
          prop="product_id">
        </el-table-column>
        <el-table-column
          prop="product_name"
          label="商品名称"
          width="300">
        </el-table-column>
        <el-table-column
          label="分类">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价">
        </el-table-column>
        <el-table-column
          label="上架">
          <template slot-scope="scope">
            {{scope.row.state?'上架':'下架'}}
          </template>
        </el-table-column>
        <el-table-column
          label="折扣">
          <template slot-scope="scope">
            {{scope.row.old_price==100?'不打折':(parseInt(scope.row.old_price)/10).toFixed(1)+'折'}}
          </template>
        </el-table-column>
        <el-table-column
          label="新品">
          <template slot-scope="scope">
            新品
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" plain size="small" @click="goToEdit(scope.row.product_id)">编辑</el-button>
            <el-button type="danger" plain size="small" @click="delShop(scope.row.product_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-footer style="margin-top: 50px">
      <el-pagination background layout="prev, pager, next"  :page-count="7" @prev-click="prevPage" @next-click="nextPage" @current-change="currentChange">
      </el-pagination>
    </el-footer>
    <el-container class="myFooter">
  <!--    <el-row>
        <el-col :span="6">批量操作：</el-col>
        <el-col :span="10">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary">确定</el-button>
        </el-col>
      </el-row>-->
    </el-container>
  </el-container>
</div>
</template>

<script>
import editShop from './AddShop'
import SmallHead from '../common/SamllHead'
export default {
  name: 'shopList',
  components: {SmallHead},
  data: function () {
    return {
      page:0,
      options: [
        {
          category_id:1,
          category_name:'脸类护肤品'
        },
        {
          category_id:2,
          category_name:'嘴唇类'
        },
        {
          category_id:3,
          category_name:'眼睛类'
        },
        {
          category_id:4,
          category_name:'脸颊类'
        },
        {
          category_id:5,
          category_name:'皮肤护理类 '
        },
        {
          category_id:6,
          category_name:'工具类'
        },
        {
          category_id:7,
          category_name:'香水类'
        },
      ],
      value: '',
      value1:'',
      value2:'',
      tableData: [],
      allShopData:[],
      multipleSelection: [],
      zhuangtai:[{
        id:0,
        zt:'下架'
      },{
        id:1,
        zt:'上架'
      }],
      paixu:[
        {
          id:0,
          px:'ID升序'
        },
        {
          id:1,
          px:'ID降序'
        },
        {
          id:2,
          px:'单价升序'
        },
        {
          id:3,
          px:'单价降序'
        }
      ],
      nameObj: {
        name1:'商品管理',
        name2:'商品列表'
      }
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    goToEdit(id){
      this.$router.push({
        name:'addShop',
        params:{
          productId:id
        }
      })
    },
    delShop(id){
      let that=this
      this.$http.post('/api/shopManage/delShop',{productId:id})
        .then(function (data) {
          if (data.data.code==200){
            that.$message({message:'删除成功',type:'success'})
            that.loadPage()
          }
          else {
            if (data.data.code==200){
              that.$message({message:'删除失败',type:'warning'}
              )
            }
          }
        })
    },
    loadPage(){
      var that=this
      that.$http.post('/api/shopManage/getAllShopData')
        .then(function (data) {
          var allData=data.data
          that.allShopData=allData
          for (let i=0;i<15;i++){
            that.tableData.push(data.data[i])
          }
        })
        .catch(function (err) {
          console.log(err)
        })

    },
    prevPage(){
      if (this.page>0){
        this.page--
        this.tableData=[]
        for (let i=this.page*15;i<(this.page+1)*15;i++){
          this.tableData.push(this.allShopData[i])
        }
      }
    },
    nextPage(){
      if (this.page<20){
        this.page++
        this.tableData=[]
        for (let i=this.page*15;i<(this.page+1)*15;i++){
          this.tableData.push(this.allShopData[i])
        }
      }
    },
    currentChange(n){
      this.page=n-1
      this.loadTable()
    },
    loadTable(){
      this.tableData=[]
      for (let i=this.page*15;i<(this.page+1)*15;i++){
        this.tableData.push(this.allShopData[i])
      }
    },
    select(val){
      var shop=this.allShopData
      if (this.value1){
        var list=[]
        for (var j=0;j<shop.length;j++){
          if (shop[j].state===this.value1){
            list.push(shop[j])
          }
        }
        var list1=[]
        for (var k=0;k<list.length;k++){
          if (list[k].category_id===val){
            list1.push(list[k])
          }
        }
        this.tableData=list1
      } else {
        this.tableData=[]
        for (var i=0;i<shop.length;i++){
          if (shop[i].category_id===val){
            this.tableData.push(shop[i])
          }
        }
      }
    },
    select1(val){
      var shop=this.allShopData
      if (this.value){
        var list=[]
        for (var j=0;j<shop.length;j++){
          if (shop[j].category_id===this.value){
            list.push(shop[j])
          }
        }
        var list1=[]
        for (var k=0;k<list.length;k++){
          if (list[k].state===val){
            list1.push(list[k])
          }
        }
        this.tableData=list1
      } else {
        this.tableData=[]
        for (var i=0;i<shop.length;i++){
          if (shop[i].state===val){
            this.tableData.push(shop[i])
          }
        }
      }
    },
    shopL(){
      this.tableData=this.allShopData
      this.loadTable()
    },
    paiXu(val){
      function px(prop) {
        return function (a,b) {
          var value1=a[prop]
          var value2=b[prop]
          return value1 - value2
        }
      }
      function px1(prop) {
        return function (a,b) {
          var value1=a[prop]
          var value2=b[prop]
          return value2 - value1
        }
      }
      if (val===0){
        this.allShopData=this.allShopData.sort(px('product_id'))
        this.loadTable()
      }else if (val===1){
        this.allShopData=this.allShopData.sort(px1('product_id'))
        this.loadTable()
      } else if (val===2){
        this.allShopData=this.allShopData.sort(px('price'))
        this.loadTable()
      }else if (val===3){
        this.allShopData=this.allShopData.sort(px1('price'))
        this.loadTable()
      }
    }
  },
  created(){
    this.loadPage();
  },
}
</script>
<style scoped>
.myForm{
  line-height: 60px;
}
.myFooter{
    line-height: 60px;
    margin-bottom: 50px
}
</style>
