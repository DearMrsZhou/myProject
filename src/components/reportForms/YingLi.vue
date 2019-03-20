<template>
<div>
  <SmallHead v-bind:urlObj="nameObj"></SmallHead>
    <el-row style="margin: 2%" :gutter="20">
        <el-col :span="6">
            <el-row style="height: 80px;background-color: #359645;color: white">
                <el-col style="height: 100%;line-height: 20px;padding-top: 10px" :span="8"><i style="font-size: 30px" class="fa fa-money"></i><p>成交金额</p></el-col>
                <el-col style="height: 100%;line-height: 80px;background-color: #3ca94d;font-size: 24px" :span="16">{{money}}元</el-col>
            </el-row>
        </el-col>
        <el-col :span="6">
            <el-row style="height: 80px;background-color: #1392d5;color: white">
                <el-col style="height: 100%;line-height: 20px;padding-top: 10px" :span="8"><i>图标</i><p>成交订单</p></el-col>
                <el-col style="height: 100%;line-height: 80px;background-color: #15a4ef;font-size: 24px" :span="16">{{order}}笔</el-col>
            </el-row>
        </el-col>
        <el-col :span="6">
            <el-row style="height: 80px;background-color: #861593;color: white">
                <el-col style="height: 100%;line-height: 20px;padding-top: 10px" :span="8"><i>图标</i><p>已收评论</p></el-col>
                <el-col style="height: 100%;line-height: 80px;background-color: #9718a5;font-size: 24px" :span="16">{{pingLun}}条</el-col>
            </el-row>
        </el-col>
        <el-col :span="6">
            <el-row style="height: 80px;background-color: #da232f;color: white">
                <el-col style="height: 100%;line-height: 20px;padding-top: 10px" :span="8"><i>图标</i><p>商品总数</p></el-col>
                <el-col style="height: 100%;line-height: 80px;background-color: #f52735;font-size: 24px" :span="16">{{num}}个</el-col>
            </el-row>
        </el-col>
    </el-row>
    <div style="width: 100%;margin-top: 5%">
        <div style="float: left;width: 50%" class="charts">
            <div id="barGraph" style="height: 350px;width: 100%"></div>
        </div>
        <div style="float: left;width: 40%;margin-left: 10%" class="charts">
            <div id="pieGraph" style="height: 350px;width: 100%"></div>
        </div>
    </div>
</div>
</template>

<script>
  import SmallHead from '../common/SamllHead'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'YingLi',
  components: {
    SmallHead
  },
  data(){
    return{
      money:0,
      order:0,
      num:0,
      pingLun:0,
      hufu:0,
      zui:0,
      yan:0,
      lian:0,
      pifu:0,
      gongju:0,
      xiangshui:0,
      nameObj: {
        name1:'统计报表',
        name2:'盈利统计'
      }
    }
  },
  mounted(){
    this.orderlist()
    this.pinglun()
    this.Money()
  },
  methods:{
    drawBar(){
      // 基于dom，初始化echarts实例
      let barGraph = echarts.init(document.getElementById('barGraph'));
      // 绘制图表
      barGraph.setOption({
        title: {
          text: '本周收入统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          left: 'center',
          data: ['本周'],
          bottom:0
        },
        xAxis: {
          type: 'category',
          name: '',
          splitLine: {show: false},
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        grid: {
          left: '1%',
          right: '2%',
          bottom: '8%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          name: '',
          splitLine: {show: true}
        },
        series: [
          {
            name: '',
            type: 'bar',
            data: [10, 22, 33, 220, 55,66, 105]
          }
        ]
      })
    },
    drawPie(){
      let pieGraph = echarts.init(document.getElementById('pieGraph'));
      pieGraph.setOption({
        title : {
          text: '各类商品收益统计',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['脸类护肤品','嘴唇类','眼睛类','脸颊类','皮肤护理类','工具类','香水类']
        },
        series : [
          {
            name: '商品类别',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:this.hufu.toFixed(2), name:'脸类护肤品'},
              {value:this.zui.toFixed(2), name:'嘴唇类'},
              {value:this.yan.toFixed(2), name:'眼睛类'},
              {value:this.lian.toFixed(2), name:'脸颊类'},
              {value:this.pifu.toFixed(2), name:'皮肤护理类'},
              {value:this.gongju.toFixed(2), name:'工具类'},
              {value:this.xiangshui.toFixed(2), name:'香水类'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    orderlist(){
      this.$http.post('/api/reportManage/order')
        .then((res)=>{
          var order=res.data
          var money=0
          var ordernum=0
          var num=0
          for (var i=0;i<order.length;i++){
            if (order[i].STATUS=='已收货'){
              money+=order[i].price*order[i].quantity
              ordernum++
              num+=order[i].quantity
            }
          }
          this.money=money.toFixed(2)
          this.order=ordernum
          this.num=num
        })
    },
    pinglun(){
      this.$http.post('/api/reportManage/order')
        .then((res)=>{
          this.pingLun=res.data[0].num
        })
    },
    Money(){
      this.$http.post('/api/reportManage/money')
        .then((res)=>{
          var order=res.data
          for (var i=0;i<order.length;i++){
            if (order[i].STATUS==='已收货'){
              if (order[i].category_name==='脸类护肤品'){
                this.hufu+=order[i].price*order[i].quantity
              }else if(order[i].category_name==='嘴唇类'){
                this.zui+=order[i].price*order[i].quantity
              }else if(order[i].category_name==='眼睛类'){
                this.yan+=order[i].price*order[i].quantity
              }else if(order[i].category_name==='脸颊类'){
                this.lian+=order[i].price*order[i].quantity
              }else if(order[i].category_name==='皮肤护理类'){
                this.pifu+=order[i].price*order[i].quantity
              }else if(order[i].category_name==='工具类'){
                this.gongju+=order[i].price*order[i].quantity
              }else if(order[i].category_name==='香水类'){
                this.xiangshui+=order[i].price*order[i].quantity
              }
            }
          }
          this.drawBar()
          this.drawPie()
        })
    }
  },
  created(){

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
    }
    header>img{
        width: 20px;
        height: 20px;
        margin-right: 5px;
    }
</style>
