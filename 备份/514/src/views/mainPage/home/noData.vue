<template>
  <div class="mian-nodatd">
    <div class="nodata-box">
      <div class="back-img" />
      <div class="font-16">未选择对象和属性</div>
      <div>请从左侧导航栏选择对象和属性</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .nodata-box{
    width: 334px;
    height: 210px;
    color: #999;
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    margin-left: 100px;
    text-align: center;
    line-height: 22px;

    .back-img{
      width: 100%;
      height:100%;
      background-image: url('../../../assets/no-data.png');
      background-repeat: no-repeat;
      background-size: 100%;
    }

    .font-16{
      font-size: 16px;
      color: #666;
    }
  }
</style>
