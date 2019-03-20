<template>
  <div>
    <SmallHead v-bind:urlObj="nameObj"></SmallHead>
    <div class="container" style="height: 700px">
    <!--会员信息-->
   <div class="member">
     <div class="title-name" style="margin-bottom: 10px">会员信息</div>
     <el-row class="line-info">
       <el-col :span="4" class="mycol">
         <div class="grid-content ">今日新增</div>
       </el-col>
       <el-col :span="8" class="mycol">
         <div class="grid-content ">{{todayAdd}}</div>
       </el-col>
       <el-col :span="4" class="mycol ">
         <div class="grid-content ">昨日新增</div>
       </el-col>
       <el-col :span="8" class="mycol">
         <div class="grid-content  count">{{yesterdayAdd}}</div>
       </el-col>
     </el-row>
     <el-row class="line-info">
       <el-col :span="4" class="mycol">
         <div class="grid-content">本周新增</div>
       </el-col>
       <el-col :span="8" class="mycol">
         <div class="grid-content  count">{{thisweekAdd}}</div>
       </el-col>
       <el-col :span="4" class="mycol ">
         <div class="grid-content">上周新增</div>
       </el-col>
       <el-col :span="8" class="mycol">
         <div class="grid-content  count">{{lastweekAdd}}</div>
       </el-col>
     </el-row>
     <el-row class="line-info">
       <el-col :span="4" class="mycol">
         <div class="grid-content ">本月新增</div>
       </el-col>
       <el-col :span="8" class="mycol">
         <div class="grid-content  count">{{thismonthAdd}}</div>
       </el-col>
       <el-col :span="4" class="mycol ">
         <div class="grid-content bg-purple-dark">上月新增</div>
       </el-col>
       <el-col :span="8" class="mycol">
         <div class="grid-content count">{{lastmonthAdd}}</div>
       </el-col>
     </el-row>
     <el-row class="line-info addbtm">
       <el-col :span="4" class="mycol">
         <div class="grid-content ">会员总数</div>
       </el-col>
       <el-col :span="8" class="mycol">
         <div class="grid-content  count">{{totalMember}}</div>
       </el-col>
     </el-row>
   </div>
    <!--订单统计-->
    <div class="order-list">
      <div class="title-name" style="margin-bottom: 10px">订单统计</div>
      <el-row class="line-info">
        <el-col :span="4" class="mycol">
          <div class="grid-content ">待付款</div>
        </el-col>
        <el-col :span="8" class="mycol">
          <div class="grid-content count">15</div>
        </el-col>
        <el-col :span="4" class="mycol ">
          <div class="grid-content">已付款</div>
        </el-col>
        <el-col :span="8" class="mycol">
          <div class="grid-content count">{{paid}}</div>
        </el-col>
      </el-row>
      <el-row class="line-info">
        <el-col :span="4" class="mycol">
          <div class="grid-content">待发货</div>
        </el-col>
        <el-col :span="8" class="mycol">
          <div class="grid-content  count">{{unship}}</div>
        </el-col>
        <el-col :span="4" class="mycol ">
          <div class="grid-content ">已发货</div>
        </el-col>
        <el-col :span="8" class="mycol">
          <div class="grid-content  count">{{ship}}</div>
        </el-col>
      </el-row>
      <el-row class="line-info addbtm">
        <el-col :span="4" class="mycol">
          <div class="grid-content">售后申请</div>
        </el-col>
        <el-col :span="8" class="mycol">
          <div class="grid-content count">{{myService}}</div>
        </el-col>
        <el-col :span="4" class="mycol ">
          <div class="grid-content">订单总数</div>
        </el-col>
        <el-col :span="8" class="mycol">
          <div class="grid-content count">{{totalOrder}}</div>
      </el-col>
      </el-row>
    </div>
    <!---商品统计-->
    <div class="goods-list">
      <div class="title-name" style="margin-bottom: 10px">访问量统计</div>
      <el-row class="line-info">
        <el-col :span="4" class="mycol">
          <div class="grid-content">今日访问</div>
        </el-col>
        <el-col :span="8" class="mycol">
          <div class="grid-content  count">{{thisVisit}}</div>
        </el-col>
        <el-col :span="4" class="mycol ">
          <div class="grid-content">昨日访问</div>
        </el-col>
        <el-col :span="8" class="mycol">
          <div class="grid-content count">{{lastVisit}}</div>
        </el-col>
      </el-row>
      <el-row class="line-info">
        <el-col :span="4" class="mycol">
          <div class="grid-content ">本周访问</div>
        </el-col>
        <el-col :span="8" class="mycol">
          <div class="grid-content  count">{{ theweek}}</div>
        </el-col>
        <el-col :span="4" class="mycol ">
          <div class="grid-content ">上周访问</div>
        </el-col>
        <el-col :span="8" class="mycol">
          <div class="grid-content  count">{{onced}}</div>
        </el-col>
      </el-row>
      <el-row class="line-info addbtm">
        <el-col :span="4" class="mycol">
          <div class="grid-content ">本月访问</div>
        </el-col>
        <el-col :span="8" class="mycol">
          <div class="grid-content  count">{{themonth}}</div>
        </el-col>
        <el-col :span="4" class="mycol ">
          <div class="grid-content ">上月访问</div>
      </el-col>
      <el-col :span="8" class="mycol">
        <div class="grid-content  count">{{oncemonth}}</div>
      </el-col>
      </el-row>
    </div>
 </div>
  </div>
</template>
<script>
import SmallHead from '../common/SamllHead'

export default {
  name: 'SystemMain',
  data: function () {
    return {
      todayAdd: 6,
      yesterdayAdd: 3,
      thisweekAdd: 25,
      lastweekAdd: 36,
      thismonthAdd: 186,
      lastmonthAdd: 213,
      totalMember: 368,
      paid: 21,
      unship: 25,
      ship: 18,
      myService: 3,
      totalOrder: 55,
      thisVisit:80,
      lastVisit:90,
      theweek:400,
     onced:380,
      themonth:1200,
      oncemonth:1500,
      nameObj: {
        name1:'管理首页',
        name2:'所有列表'
      }
    }
  },
  components: {
    SmallHead
  },
  computed:{
    getTime:function () {
      let date=new Date();
      var day=date.getDate();
      var month=date.getMonth()+1;
      var year=date.getFullYear();
      if(day<10){
        day='0'+day
      }
      if(month<10){
        month='0'+month;
      }
      var today=year+'/'+month+'/'+day;
      return today
    }
  },
  methods: {
    get: function () {
      // console.log(this.getTime)
      this.$http.post('/api/systemMain/getData')
        .then(res => {
          var myData=res.data;
          this.todayAdd=myData[0][0].todayAdd;
          this.thisweekAdd=myData[1][0].thisWeekAdd;
          this.thismonthAdd=myData[2][0].thisMonthAdd;
          this.lastweekAdd=myData[3][0].lastWeekAdd;
          this.lastmonthAdd=myData[4][0].lastMonthAdd;
          this.totalMember=myData[5][0].totalMember;
          this.totalOrder=myData[6][0].orderList;
          this.paid=myData[6][0].orderList;
          this.ship=myData[7][0].yifahuo;
          this.unship=myData[8][0].daifahuo;

        })
    }
  },
  created () {
    this.get()

  }
}
</script>

<style scoped>
  .title-name {
    text-align: left;
    margin: 5px;
    padding: 10px;
    color: #8c939d;
    font-weight: bold;
  }
  .line-info{
    vertical-align: middle;
  }
  .line-info div{
    text-align: center;
  }
  .mycol{
    padding: 15px 0;
    height: 40px;
  }
  .addbtm{

  }
  .container{
    padding: 0 5%;
  }
  .mycol{
    /*border-bottom: 1px solid #15fdff;*/
  }
</style>
