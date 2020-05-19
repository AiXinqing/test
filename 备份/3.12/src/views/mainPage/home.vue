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
          <span>{{ item.title }}</span>
          <span class="card-jump">详情 <i class="el-icon-arrow-right" /></span>
        </div>
        <div
          v-for="(row, i) in item.imgData"
          v-show="item.imgData.length > 0"
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
      cardList: [
        {
          title: '学生人口',
          imgData: [
            {
              classImg: 'student-img',
              text: '共有学生',
              num: '5000',
              unit: '人'
            }
          ],
          graphicsData: []
        },
        {
          title: '教职工人口',
          imgData: [
            {
              classImg: 'teacher-img',
              text: '共有学生',
              num: '5000',
              unit: '人'
            }
          ],
          graphicsData: []
        },
        {
          title: '考试情况',
          imgData: [
            {
              classImg: 'examination-img',
              text: '共有学生',
              num: '5000',
              unit: '人'
            }
          ],
          graphicsData: []
        },
        {
          title: '本学年累计考勤',
          imgData: [],
          graphicsData: [
            { name: '迟到', unit: '万人次', num: '25', class: 'graphics-one' },
            { name: '早退', unit: '万人次', num: '25', class: 'graphics-two' },
            { name: '缺勤', unit: '万人次', num: '18', class: 'graphics-three' }
          ]
        },
        {
          title: '学生校园卡消费',
          imgData: [],
          graphicsData: [
            { name: '消费', unit: '万元', num: '1000', class: 'graphics-one' },
            { name: '刷卡', unit: '万次', num: '22', class: 'graphics-two' },
            { name: '人数', unit: '万人', num: '18', class: 'graphics-three' }
          ]
        }
      ]
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
        background-image: url('../../assets/home/student.png');
      }

      .teacher-img{
        background-image: url('../../assets/home/teacher.png');
      }

      .examination-img{
        background-image: url('../../assets/home/examination.png');
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

