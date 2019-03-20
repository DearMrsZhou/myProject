<template>
  <div>
    <!--<DeliveryHead></DeliveryHead>-->
    <div class="editBox" >
      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>订单： </span>
        </el-col>
        <el-col :span="4">
          <el-input style="width: 130%" :disabled="true" v-model="order_num" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="0" :offset="1">
      <el-col :span="2">
        <span>商品名： </span>
      </el-col>
      <el-col :span="4">
        <el-input style="width: 130%" :disabled="true" v-model="product_name" type="text" placeholder="请输入内容"></el-input>
      </el-col>
    </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>色号： </span>
        </el-col>
        <el-col :span="4">
          <el-input style="width: 130%" :disabled="true" v-model="color_num" type="text" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>用户名： </span>
        </el-col>
        <el-col :span="4">
          <el-input style="width: 130%" :disabled="true" v-model="user_name" type="text" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>商品金额： </span>
        </el-col>
        <el-col :span="4">
          <el-input style="width: 130%" :disabled="true" v-model="pro_price" type="text" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>运费： </span>
        </el-col>
        <el-col :span="4">
          <el-input style="width: 130%" :disabled="true" v-model="fare" type="text" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>数量： </span>
        </el-col>
        <el-col :span="4">
          <el-input style="width: 130%" :disabled="true" v-model="quantity" type="text" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>订单总额： </span>
        </el-col>
        <el-col :span="4">
          <el-input style="width: 130%" :disabled="true" v-model="TotalMoney" type="text" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>订单状态： </span>
        </el-col>
        <el-col :span="4">
          <el-input style="width: 130%" :disabled="true" v-model="status" type="text" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>下单时间： </span>
        </el-col>
        <el-col :span="4">
          <el-input style="width: 130%" :disabled="true" v-model="pay_time" type="text" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>


      <el-row :gutter="0" :offset="1">
        <el-col :span="2">
          <span>订单描述： </span>
        </el-col>
        <el-col :span="4">
          <textarea :disabled="true" v-model="admin_desc" name="" id="" cols="50" rows="10" value="">
        </textarea>
        </el-col>
      </el-row>

      <el-row :gutter="0" :offset="1">
        <el-col :span="4">
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="ensureToSave">确认发货</el-button>
        </el-col>
      </el-row>
      <div>

      </div>
    </div>
  </div>
</template>

<script>
  // import DeliveryHead from './deliveryHeader'
  export default {
    name: 'orderConfig',
    data: function() {
      return {
        user_name:'',
        order_num:'',
        product_name:'',
        color_num:'',
        pro_price:'',
        fare:'',
        quantity:'',
        TotalMoney:'',
        status:'',
        pay_time:'',
        admin_desc:'',

      }
    },
    components: {

    },
    methods:{
      ensureToSave:function(){
        let orderData=this.$route.params.dataArr;
        let id=orderData.order_id
        this.$http.post('/api/orderManage/modifyOrder',{
          orderId:id
        })
          .then(res=>{
            if(res.data==='ok'){
              this.$message({
                showClose: true,
                message: '发货成功!',
                type: 'success'
              });
              this.$router.push('/OrderManage');
            }
          })
      },
      adaptData:function () {
        let orderData=this.$route.params.dataArr;
       /* console.log(orderData)*/
        this.user_name=orderData.username;
        this.order_num=orderData.order_id;
        this.product_name=orderData.product_name;
        this.color_num=orderData.color_name;
        this.TotalMoney=orderData.price*orderData.quantity+orderData.fare;
        this.fare=orderData.fare;
        this.quantity=orderData.quantity;
        this.pro_price=orderData.price;
        this.status=orderData.STATUS;
        this.pay_time=orderData.pay_time;
      }
    },
    created:function () {
     this.adaptData();
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
  .radioList{
    min-width: 200px;
    float: left;
  }

  input{
    width: 200px!important;
  }
</style>
