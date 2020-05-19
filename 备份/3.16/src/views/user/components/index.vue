<template>
  <section class="codegnrteldialog">
    <el-dialog :title="isdisabled?'编辑账号':'添加账号'" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="userForm" :rules="rules" :model="userform" class="hj-form">
        <el-form-item label="昵称" :label-width="labelwidth">
          <el-input v-model="userform.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话(认证)" :label-width="labelwidth">
          <el-input v-model="userform.authTel" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="!isdisabled" label="口令" :label-width="labelwidth" class="mandatory_style">
          <el-input v-model="userform.lgnPwd" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取 消</el-button>
        <el-button size="small" :loading="btnloading" type="primary" @click="submitFunc">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  props: {
    userform: {
      type: Object,
      default() {
        return {}
      }
    },
    isdisabled: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      labelwidth: '120px',
      btnloading: false,
      rules: {}
    }
  },
  methods: {
    openDialog() {
      this.dialogFormVisible = true
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.$emit('resetForm')
    },
    submitFunc() {
      this.btnloading = true
      if (!this.userform.nickName && !this.userform.authTel) {
        this.btnloading = false
        this.$message({
          message: '昵称与电话不能同时为空',
          type: 'error',
          duration: 2 * 1000
        })
      } else {
        if (this.isdisabled) {
          console.log({ ...this.userform })
          this.$store.dispatch('user/userupdate', { ...this.userform }).then(() => {
            this.btnloading = false
            this.$emit('updatefrom')
            this.closeDialog()
          }).catch(() => {
            this.btnloading = false
          })
        } else {
          if (!this.userform.lgnPwd) {
            this.btnloading = false
            this.$message({
              message: '密码不能为空',
              type: 'error',
              duration: 2 * 1000
            })
          } else {
            this.$store.dispatch('user/usercreate', { ...this.userform }).then(() => {
              this.btnloading = false
              this.$emit('updatefrom')
              this.closeDialog()
            }).catch(() => {
              this.btnloading = false
            })
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
.codegnrteldialog{
  position: relative;
  .hj-form .el-input.el-input--medium,.hj-form .el-input.el-input--default{
    width: 190px;
  }
  .mandatory_style{
    .el-form-item__content{
      display:flex;
      justify-content: flex-start;
      justify-items: center;
      position: relative;
      .hj-tig
      {
        margin-left: 10px;
        color: #999;
      }
    }
    input.el-input__inner{
      border-left-color: #FF5722;
    }
  }
}
</style>
