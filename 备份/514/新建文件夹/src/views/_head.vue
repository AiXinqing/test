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
          <span>{{ nowTimes.Year }}年{{ nowTimes.yy }}月{{ nowTimes.dd }}日 {{ nowTimes.hou }}:{{ nowTimes.min }}:{{ nowTimes.sec }} <i /></span>
        </div>
        <div class="loginOut" @click="handleLoginOut"> <i /> 退出</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: '管理员',
      // date: '2019年10月31 12:12:33',
      nowTimes: {
        Year: 0,
        yy: 0,
        dd: '00',
        hou: '00',
        min: '00',
        sec: '00'
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.setNowTimes()
    }, 1000)
  },
  methods: {
    handleLoginOut() {
      this.$store.dispatch('user/logout')
        .then(() => {
          this.$router.push({ name: 'login' })
          // this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    setNowTimes() {
      const myDate = new Date()
      this.nowTimes.Year = myDate.getFullYear()
      this.nowTimes.yy = myDate.getMonth() + 1
      this.nowTimes.dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      this.nowTimes.hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      this.nowTimes.min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      this.nowTimes.sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
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
          background-image: url('../assets/head-data.png');
          @extend %bg-parameter;
          margin-right: 5px;
        }
      }
    }

    .right-content{
      position: absolute;
      right: 0;
      font-size: 14px;
      color: $font-666;

      >div{
        margin-right: 10px;
      }

      .user-name{
        margin-right: 43px;
      }
    }
  }
  .current-date{
    font-size: 13px;
    i{
        @include graphics(1px, 8px, -1px, 0);
        background-color: #999;
        margin-left: 7px;
      }
  }
  .loginOut{
    cursor: pointer;

    i{
        @include graphics(18px, 18px, 3px, 0);
         background-image: url('../assets/dropOut.png');
        @extend %bg-parameter;
        background-size: 67%;
        left: 4px;
      }
  }
</style>

