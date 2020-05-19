<template>
  <div class="home-container">
    <div v-show="nodeName" class="p-c-info-title">
      <i />
      <span>{{ nodeName }}</span>
    </div>
    <div

      class="data-analysis-box"
    >
      <iconData
        v-for="attrId in attributeIdArr"
        :key="attrId"
        ref="stupop"
        :card-id="attrId"
        @handleSeeDetail="handleSeeDetail(attrId)"
      />
    </div>
  </div>

</template>

<script>

import iconData from './_iconData'

export default {
  components: {
    iconData
  },
  data() {
    return {
      objList: {}
    }
  },
  computed: {
    objectId() {
      return this.$route.params.objectId
    },
    analysisObject() {
      return this.$route.params.analysisObject
    },
    attributeIdArr() {
      const strArr = this.$route.params.attributeIdArr
      const Arr = []
      if (strArr === undefined) {
        return Arr
      } else {
        return strArr.split(',')
      }
    },
    nodeName() {
      return this.$route.params.nodeName
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function(query) {
        if (this.attributeIdArr.length) {
          this.attributeIdArr.forEach(element => {
            this.getChaiconFunc(element)
          })
        } else {
          this.$router.push({
            name: 'noData'
          })
        }
      }
    }
  },
  methods: {
    getChaiconFunc(attrId) {
      this.$store.dispatch('chaicon/getChaicon', { objectId: this.objectId, attributeId: attrId })
    },
    stuSeeDetail() {
      this.$router.push({
        name: 'LEATable',
        query: {
          attributeId: 1
        },
        params: {
          objectId: this.objectId
        }
      })
    },
    handleSeeDetail(attrId) {
      this.$router.push({
        name: 'LEATable',
        query: {
          attributeId: attrId,
          analysis: 1
        },
        params: {
          objectId: this.objectId,
          analysis: this.analysisObject
        }
      })
    }
  }
}
</script>

<style lang="scss" >
	@import "~@/styles/label.scss";

  $border-one:#4CDFC1;
  $border-three:#FACF2B;

	.home-container{
		width: 100%;
		height: calc(100% - 40px);
    background-color: $pageBg;
    overflow: auto;
    padding-bottom: 20px;
	}
	.p-c-info-title{

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
			min-width: 375px;
			height: 260px;
			border-radius: 6px;
			background-color: $white;
      margin: 30px 0 0 36px;
      padding: 0 5px;

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
      .public-img{
        background-image: url('../../../assets/home/publicIcon.png');
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
      margin-top: 48px;
      padding: 0 20px;
      display: flex;
      flex-flow: row wrap;

      .card_multiple{
        text-align: center;

        .name{
          font-size: 13px;
          color: $font-666;
          margin-top: 8px;
        }
      }

      .graphics-style{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        text-align: center;
        border:8px solid transparent;
        font-size: 12px;
        position: relative;
        left: 50%;
        margin-left: -50px;

        &:nth-child(n+2){
          margin-left: 24px;
        }

        .num{
          font-size: 20px;
          line-height: 30px;
          color: $font-333;
          margin-top: 19px;
        }

        .unit{
          color: $font-999;
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

