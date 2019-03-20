<template>
<div style="margin-left: 2%">
  <SmallHead v-bind:urlObj="nameObj"></SmallHead>
    <div class="charts">
        <div id="barGraph" style="height: 350px;"></div>
    </div>
    <div class="charts">
        <div id="pieGraph" style="height: 350px;"></div>
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
    name: "DingDan",
    components: {
      SmallHead
    },
    data () {
      return {
        Orderdata:[],
        yunshu:0,
        daifahuo:0,
        yifahuo:0,
        yishouhuo:0,
        one:0,
        two:0,
        three:0,
        four:0,
        five:0,
        six:0,
        seven:0,
        eight:0,
        nine:0,
        ten:0,
        eleven:0,
        twelve:0,
        nameObj: {
          name1:'统计报表',
          name2:'订单统计'
        }
      }
    },
    mounted(){

    },
    methods:{
      drawBar(){
        // 基于dom，初始化echarts实例
        let barGraph = echarts.init(document.getElementById('barGraph'));
        // 绘制图表
        barGraph.setOption({
          title: {
            text: '全年订单趋势图',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}'
          },
          legend: {
            left: 'center',
            data: ['本年', '上年'],
            bottom:0
          },
          xAxis: {
            type: 'category',
            name: '',
            splitLine: {show: false},
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
          },
          grid: {
            left: '1%',
            right: '2%',
            bottom: '8%',
            containLabel: true
          },
          yAxis: {
            type: 'value',
            name: '订单量',
            splitLine: {show: true}
          },
          series: [
            {
              name: '本年',
              type: 'line',
              data: [this.one, this.two, this.three, this.four, this.five,this.six, this.seven, this.eight, this.nine, this.ten, this.eleven, this.twelve]
            },
            {
              name: '上年',
              type: 'line',
              data: [7, 2, 4, 8, 16, 3, 6, 1, 5, 25, 63, 65, 12]
            },
          ]
        })
      },
      drawPie(){
        let pieGraph = echarts.init(document.getElementById('pieGraph'));
        pieGraph.setOption({
          title : {
            text: '订单状态',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['待发货','已发货','运输中','已收货']
          },
          series : [
            {
              name: '订单状态',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:this.daifahuo, name:'待发货'},
                {value:this.yifahuo, name:'已发货'},
                {value:this.yunshu, name:'运输中'},
                {value:this.yishouhuo, name:'已收货'},
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
    },
    created() {
      var that = this
      that.$http.post('/api/reportManage/order')
        .then((res)=>{
          console.log(res)
            var order=res
          console.log(order)
            var yunshu=[]
            var yifahuo=[]
            var daifahuo=[]
            var yishouhuo=[]
            for (var i=0;i<order.length;i++){
              if (order[i].STATUS==='运输中'){
                    yunshu.push(order[i])
              }else if(order[i].STATUS==='待发货'){
                    daifahuo.push(order[i])
              }else if(order[i].STATUS==='已发货'){
                    yifahuo.push(order[i])
                    console.log(yifahuo)
              }else if(order[i].STATUS==='已收货'){
                    yishouhuo.push(order[i])
              }
            }
            for (var j=0;j<order.length;j++){
              if (order[j].pay_time.split('-')[1]==='01'){
                that.one++
              }else if (order[j].pay_time.split('-')[1]==='02') {
                that.two++
              }else if (order[j].pay_time.split('-')[1]==='03') {
                that.three++
              }else if (order[j].pay_time.split('-')[1]==='04') {
                that.four++
              }else if (order[j].pay_time.split('-')[1]==='05') {
                that.five++
              }else if (order[j].pay_time.split('-')[1]==='06') {
                that.six++
              }else if (order[j].pay_time.split('-')[1]==='07') {
                that.seven++
              }else if (order[j].pay_time.split('-')[1]==='08') {
                that.eight++
              }else if (order[j].pay_time.split('-')[1]==='09') {
                that.nine++
              }else if (order[j].pay_time.split('-')[1]==='10') {
                that.ten++
              }else if (order[j].pay_time.split('-')[1]==='11') {
                that.eleven++
              }else if (order[j].pay_time.split('-')[1]==='12') {
                that.twelve++
              }

            }
            that.yunshu=yunshu.length
            that.daifahuo=daifahuo.length
            that.yishouhuo=yishouhuo.length
            that.yifahuo=yifahuo.length
            that.drawBar();
            that.drawPie();
        })
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
