<template>
  <div
    class="login-container"
  >
    <div
      class="login-bg-style"
    >
      <div class="main-wrap">
        <el-row>
          <el-col
            :span="13"
            class="left-wrap"
          />
          <el-col
            :span="11"
            class="right-wrap"
          >
            <div class="hj-title">数据改变教育，教育引领未来</div>
            <el-form ref="loginForm" :model="loginForm">
              <el-form-item prop="username">
                <i
                  class="login-icon user-icon"
                />
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  type="text"
                />
                <i
                  v-show="resetIcon"
                  class="js-login-icon login-icon reset-icon"
                  :style="{backgroundImage:'url('+ require('@/assets/login/login-reset.png') +')'}"
                  @click="resetUserName"
                />
              </el-form-item>
              <el-form-item prop="password">
                <i
                  class="login-icon paw-icon"
                />
                <el-input
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                />
                <i
                  v-show="hidePawIcon"
                  class="js-login-icon login-icon eye-icon"
                  :class="[eyeStatus,'js-login-icon', 'login-icon']"
                  @click="handlePasswordType(eyeStatus)"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  class="login-loading"
                  type="primary"
                  :loading="loading"
                  @click.native.prevent="handleLogin"
                >
                  登 录
                </el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>

      <div class="company-labeling"><i>©</i>四川宏劲科技有限公司</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('请输入大于6位的密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      eyeStatus: 'eye-icon'
    }
  },
  computed: {
    resetIcon() {
      return this.loginForm.username !== '' ? 1 : 0
    },

    hidePawIcon() {
      return this.loginForm.password !== '' ? 1 : 0
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              // this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    resetUserName() {
      this.loginForm.username = ''
    },

    handlePasswordType(eyeStatus) {
      switch (eyeStatus) {
        case 'eye-icon':
          this.passwordType = 'text'
          this.eyeStatus = 'eyeO-icon'
          break
        case 'eyeO-icon':
          this.passwordType = 'password'
          this.eyeStatus = 'eye-icon'
          break
        default:
      }
    },

    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
  $bd-radius: 8px;
  @import "~@/styles/label.scss";

  // ------------------------------------------

  .login-container{
    height: 100%;
    width: 100%;
    background-color: #F0F7FD !important;
  }

  .login-bg-style{
    height: 72%;
    width: 100%;
    @extend %bg-parameter;
    background-color: $loginBg;
    background-image: url('../../assets/login/login-bg.png'),linear-gradient(to right, $loginBg , $chart);
  }

  .main-wrap{
    width:850px;
    height: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: $bd-radius;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px 0 $chart;

    .el-row,
    .el-col{
      height: 100%;
    }

    .left-wrap{
      width: 460px;
      background-image: url('../../assets/login/login-leftBg.png');
      @extend %bg-parameter;
      background-color: #E0EFFE;
      border-top-left-radius: $bd-radius;
      border-bottom-left-radius: $bd-radius;
    }

    .right-wrap{
      width: 390px;
      background: #fff;
      border-top-right-radius: $bd-radius;
      border-bottom-right-radius: $bd-radius;

      .hj-title{
        font-size: 16px;
        color: $chart;
        text-align: center;
        margin-top: 65px;
      }

      form.el-form {
        width: 250px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 40px;

        .login-icon{
          width: 14px;
          height: 18px;
          display: inline-block;
          position: absolute;
          top: 6px;
          z-index: 99;
          @extend %bg-parameter;
        }

        .user-icon{
          background-image: url('../../assets/login/login-user.png')
        }

        .paw-icon{
          background-image: url('../../assets/login/login-paw.png')
        }

        .reset-icon{
          background-image: url('../../assets/login/login-reset.png')
        }

        .eye-icon{
          background-image: url('../../assets/login/login-eyeD.png')
        }

        .eyeO-icon{
          background-image: url('../../assets/login/login-eyeO.png')
        }

        .js-login-icon{
          right: 0;
          cursor: pointer;
        }
      }

      .el-form-item{
        position: relative;
      }

      .login-loading{
        background-color: $chart;
        border-color: $chart;
        margin-top: 5px;
        box-shadow:0px 2px 4px 0px rgba(82,163,255,1);
        border-radius:20px;
        width: 100%;
      }
    }
  }

  .company-labeling{
    position: absolute;
    bottom: 20px;
    text-align: center;
    font-size: 14px;
    color: #666666;
    width: 100%;
    i{
      font-size: 16px;
      position: relative;
      top: 1px;
      margin-right: 3px;
    }
  }
</style>

<style>
  .el-input__inner{
    border: none;
    border-bottom: 1px solid #E8E8E8;
    text-indent: 5px;
    border-radius: 0;
  }

  input:-internal-autofill-selected{
    background-color: #fff !important;
  }
</style>
