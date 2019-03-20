<template>
<div style="margin-left: 2%;position: relative">
  <SmallHead v-bind:urlObj="nameObj"></SmallHead>
    <div class="yonghu">
        <div>
            <i class="fa fa-user-circle"></i>
            <b>{{xinzeng}}</b>
            <p>新增用户</p>
        </div>
        <div style="margin: 0 5%">
            <i class="fa fa-user-circle-o"></i>
            <b>{{quanbu}}</b>
            <p>全部用户</p>
        </div>
    </div>
    <div class="vip">
        <div>
            <i class="fa fa-user"></i>
            <b>{{putong}}</b>
            <p>普通会员</p>
        </div>
        <div style="margin: 0 5%">
            <i class="fa fa-user-o"></i>
            <b>{{huangjin}}</b>
            <p>黄金会员</p>
        </div>
        <div>
            <i class="fa fa-user-secret"></i>
            <b>{{zuanshi}}</b>
            <p>钻石会员</p>
        </div>
    </div>
    <div class="liulanqi">
        <ul>
            <li>
                <p style="overflow: hidden">
                    <strong style="float: left">Google</strong>
                    <span style="float: right">58%</span>
                </p>
                <div>
                    <div style="width: 58%;background: rgba(0, 0, 255, 0.28);"></div>
                </div>
            </li>
            <li>
                <p style="overflow: hidden">
                    <strong style="float: left">Firefox</strong>
                    <span style="float: right">24%</span>
                </p>
                <div>
                    <div style="width: 24%;background: #13ce66"></div>
                </div>
            </li>
            <li>
                <p style="overflow: hidden">
                    <strong style="float: left">UC</strong>
                    <span style="float: right">14%</span>
                </p>
                <div>
                    <div style="width: 14%;background: #c43231"></div>
                </div>
            </li>
            <li>
                <p style="overflow: hidden">
                    <strong style="float: left">IE</strong>
                    <span style="float: right">4%</span>
                </p>
                <div>
                    <div style="width: 2%;background: #c4c400"></div>
                </div>
            </li>
        </ul>
    </div>
    <div style="position: absolute;left:5%;top: 350px;width: 50%" class="charts">
        <div id="barGraph" style="height: 300px;"></div>
    </div>
</div>
</template>

<script>
  import SmallHead from '../common/SamllHead'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'YongHu',
  components: {
    SmallHead
  },
  data() {
    return{
      xinzeng:0,
      quanbu:0,
      putong:0,
      huangjin:0,
      zuanshi:0,
      nameObj: {
        name1:'统计报表',
        name2:'用户统计'
      }
    }
  },
  mounted(){
    this.user()
  },
  methods:{
    drawBar(){
      // 基于dom，初始化echarts实例
      let barGraph = echarts.init(document.getElementById('barGraph'));
      // 绘制图表
      barGraph.setOption({
        title: {
          text: '',
          left: ''
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          left: 'center',
          data: ['普通会员','黄金会员','钻石会员'],
          bottom:0
        },
        xAxis: {
          type: 'category',
          name: '',
          splitLine: {show: false},
          data: ['普通会员', '黄金会员', '钻石会员']
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
            name: '普通会员',
            type: 'bar',
            data: [this.putong, 0, 0]
          },
          {
            name: '黄金会员',
            type: 'bar',
            data: [0, this.huangjin, 0]
          },
          {
            name: '钻石会员',
            type: 'bar',
            data: [0, 0,this.zuanshi]
          }
        ]
      })
    },
    user(){
      this.$http.post('/api/reportManage/user')
        .then((res)=>{
          var user=res.data
          var date=new Date().toLocaleDateString()
          this.quanbu=user.length
          for (var i=0;i<user.length;i++){
            if (user[i].position==='普通'){
                this.putong++
            }else if (user[i].position==='黄金'){
                this.huangjin++
            } else if (user[i].position==='钻石'){
              this.zuanshi++
            }
          }
          for (var j=0;j<user.length;j++){
            if (user[j].date===date){
                this.xinzeng++
            }
          }
          this.drawBar()
        })
    }
  },
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
    .yonghu{
        width: 90%;
        padding: 20px;
        overflow: hidden;
    }
    .yonghu>div{
        width: 29.5%;
        height: 150px;
        background: gainsboro;
        border: 1px solid white;
        float: left;
        text-align: center;
        margin: 0 auto;
        line-height: 30px;
    }
    .yonghu>div>i{
        font-size:50px;
        display: block;
        margin-top: 20px;
    }
    .yonghu>div>p{
        margin: 0;
    }
    .vip{
        width: 60%;
        padding: 20px;
        overflow: hidden;
        float: left;
    }
    .vip>div{
        width: 28.8%;
        float: left;
        background: #8c939d;
        text-align: center;
        margin: 0 auto;
        line-height: 30px;
    }
    .liulanqi{
        width: 27.5%;
        float: left;
        margin-left:-2.7% ;
        height: 300px;
        position: absolute;
        top: 25%;
        right: 10%;
    }
    .liulanqi>ul{
        height: 100%;
    }
    .liulanqi>ul>li{
        border-bottom: 1px solid gray;
        background: #b0fffd;
        padding: 15px;
        width: 100%;
    }
    ul,li{
        list-style: none;
    }
    li>div{
        width: 100%;
        height: 10px;
        background: whitesmoke;
        border: 1px solid gray;
        border-radius: 5px;
    }
    li>div>div{
        height: 10px;
    }
</style>
