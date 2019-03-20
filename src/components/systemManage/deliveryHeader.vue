<template>
  <div class="box_header">
    <div class="box_header_text">
      <i class="el-icon-tickets"></i>
      <span>{{categoryName}} > {{category_item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'deliveryHeader',
  data: function () {
    return {
      categoryName: '系统管理',
      category_item: '配送方式',
    }
  }
}
</script>

<style scoped>
  .box_header{
    padding-left: 5%;
    width: 95%;
    height: 50px;
    line-height: 50px;
    background-color: #F5F5F5;
  }
  .box_header_text{
    float: left;
    display: inline;
  }
</style>
