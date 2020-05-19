<template>
  <div class="home-container">
    <div class="p-c-info-title">
      <i />
      <span>四川省成都市天府新区教育局下<strong>200</strong>所学校</span>
    </div>
    <div class="data-analysis-box">
      <div
        v-for="(item, index) in cardList"
        :key="index"
        class="data-card"
      >
        <div class="card-title">
          <i class="card-tig" />
          <span>{{ item.description }}</span>
          <span class="card-jump">详情 <i class="el-icon-arrow-right" /></span>
        </div>
        <div
          v-for="(row, i) in item.columns"
          v-show="item.columns.length > 0"
          :key="i"
          class="card-imgBox"
        >
          <div :class="[row.classImg, 'card-imgStyle']" />
          <div class="imgData-num">
            <span>{{ row.text }}</span>
            <span class="num">{{ row.num }}</span>
            <span>{{ row.unit }}</span>
          </div>
        </div>
        <div
          v-show="item.graphicsData.length > 0"
          class="card-circleBox"
        >
          <div
            v-for="(row, d) in item.graphicsData"
            :key="d"
            :class="[row.class, 'graphics-style']"
          >
            <div class="num">{{ row.num }}</div>
            <div class="unit">{{ row.unit }}</div>
            <div class="name">{{ row.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  data() {
    return {
      cardList: [],
      objList: {}
    }
  },
  computed: {
    chaiconList() {
      return this.$store.state.chaicon.stuChaiconList
    },
    objectId() {
      return this.$route.query.objectId
    }
  },
  watch: {
    $route: {
      handler: function(query) {
        if (query) {
          this.getlistFunc()
        }
      }
    }
  },
  mounted() {
    if (this.objectId) {
      this.getChaiconFunc()
    }
  },
  methods: {
    getChaiconFunc() {
      for (let i = 1; i < 6; i++) {
        this.$store.dispatch('chaicon/getChaicon', { objectId: this.objectId, attributeId: i })
          .then(() => {
            const caseIds = this.chaiconList.caseId
            const datas = []
            for (let b = 0; b < this.chaiconList.columns.length; b++) {
              // console.log(this.chaiconList.datas[0].itemArray[b])
              if (this.chaiconList.datas.length > 0) {
                datas.push(this.chaiconList.datas[b].itemArray[b])
              } else {
                datas.push(0)
              }
            }
            switch (caseIds) {
              case 1:
              case 2:
              case 3:
                this.objList = {
                  ...this.chaiconList,
                  columns: this.chaiconList.columns.map((item, index) => ({
                    classImg: caseIds === 1 ? 'student-img' : caseIds === 2 ? 'teacher-img' : caseIds === 3 ? 'examination-img' : '',
                    text: caseIds === 1 ? '共有学生' : caseIds === 2 ? '共有教职工' : caseIds === 3 ? '累计组织考试' : '',
                    num: datas[index],
                    unit: caseIds === 3 ? '次' : '人'
                  })),
                  graphicsData: []
                }
                this.cardList.push(this.objList)
                break
              default:
                this.objList = {
                  ...this.chaiconList,
                  graphicsData: this.chaiconList.columns.map((item, index) => ({
                    name: caseIds === 4 ? '迟到' : '消费',
                    unit: caseIds === 4 ? '万人次' : '万元',
                    num: datas[index],
                    class: index === 0 ? 'graphics-one' : index === 1 ? 'graphics-two' : 'graphics-three'
                  })),
                  columns: []
                }
                this.cardList.push(this.objList)
            }
          })
        // const Arr = this.chaiconList
      }
    }
  }
}
</script>

<style lang="scss" scoped>
	@import "~@/styles/label.scss";

  $border-one:#4CDFC1;
  $border-three:#FACF2B;

	.home-container{
		width: 100%;
		height: calc(100% - 40px);
		background-color: $pageBg;
	}
	.p-c-info-title{
		padding: 10px 0 0 15px;
		font-size: 16px;
		color: $font-333;

		i{
      @include graphics(3px, 16px, 3px, 0, $chart);
			border-top-right-radius: 3px;
			border-bottom-right-radius: 3px;
			margin-right: 5px;
		}
		span{
			strong{
				color: $main;
				font-size: 20px;
				margin: 0 2px;
			}
		}
	}
	.data-analysis-box{
		display: flex;
    flex-flow: row wrap;

		.data-card{
			width: 342px;
			height: 260px;
			border-radius: 6px;
			background-color: $white;
      margin: 30px 0 0 36px;

      .card-title{
        margin-top: 12px;
        padding-left: 20px;
        font-size: 15px;
        color: $font-333;
        position: relative;

        .card-tig{
          @include graphics(7px, 7px, 0, 50%, $chart);
          margin-right: 5px;
        }
        .card-jump{
          font-size: 14px;
          color: $font-999;
          position: absolute;
          right: 10px;
          cursor: pointer;
        }
      }
    }
    .card-imgBox{
      margin-top: 30px;
      .card-imgStyle{
         @include graphics(108px, 108px, 0, 50%);
         @extend %bg-parameter;
         left: 50%;
         transform: translateX(-50%);
      }

      .student-img{
        background-image: url('../../../assets/home/student.png');
      }

      .teacher-img{
        background-image: url('../../../assets/home/teacher.png');
      }

      .examination-img{
        background-image: url('../../../assets/home/examination.png');
      }

      .imgData-num{
        text-align: center;
        font-size: 13px;
        color: $font-666;
        margin-top: 10px;

        .num{
          color: $main;
          font-size: 18px;
          margin: 0 2px;
        }
      }
    }
    .card-circleBox{
      margin-top: 55px;
      padding: 0 20px;
      display: flex;

      .graphics-style{
        width: 82px;
        height: 82px;
        border-radius: 50%;
        text-align: center;
        border:8px solid transparent;
        font-size: 12px;
        position: relative;

        &:nth-child(n+2){
          margin-left: 24px;
        }

        .num{
          font-size: 24px;
          line-height: 29px;
          color: $font-333;
          margin-top: 10px;
        }

        .unit{
          color: $font-999;
        }

        .name{
          position: absolute;
          width: 100%;
          bottom: -48px;
          font-size: 13px;
          color: $font-666;
        }
      }

      .graphics-one{
        border-color: $border-one;
      }

      .graphics-two{
        border-color: $chart;
      }

      .graphics-three{
        border-color: $border-three;
      }
    }
	}
</style>

