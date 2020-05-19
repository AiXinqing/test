<template>
  <div class="head-container">
    <div class="head-info-bar">
      <div class="left-content">
        <div>
          <i class="data-analysis" />
          <span>数据分析</span>
        </div>
      </div>
      <div class="right-content">
        <div class="user-name">
          <span>欢迎您: </span>
          <span>{{ userName }}</span>
        </div>
        <div class="current-date">
          <span>{{ date }}</span>
        </div>
        <div class="loginOut">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '张三',
      date: '2019年10月31 12:12:33'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/label.scss";

  .head-container{
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    position: relative;
    box-shadow:2px 2px 5px $shadow;

    .right-content,
    .head-info-bar{
      display: flex;
    }

    .head-info-bar{
      .left-content{
        margin-left: 30px;
        color:$main;
        font-size: 15px;
        .data-analysis{
          @include graphics(16px, 16px, 3px, 0);
          background-image: url('../../assets/head-data.png');
          @extend %bg-parameter;
          margin-right: 5px;
        }
      }
    }

    .right-content{
      position: absolute;
      right: 0;
      font-size: 13px;
      color: $font-666;

      >div{
        margin-right: 10px;
      }

      .user-name{
        margin-right: 43px;
      }
    }
  }
</style>

