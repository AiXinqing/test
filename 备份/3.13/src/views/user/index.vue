<template>
  <el-main class="usercontainer">
    <el-container>
      <el-card class="user_elcard">
        <div slot="header">
          <!-- <span>信息代码</span> -->
          <section class="header_row">
            <el-input v-model="searchinput" class="header_row_left" placeholder="用户编号/昵称/电话">
              <template slot="prepend">关键字</template>
            </el-input>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              round
              @click="searchsubmit"
            >搜索</el-button>
          </section>
        </div>
        <section class="top">
          <el-button size="small" type="primary" icon="el-icon-plus" round @click="addsbumit">添加</el-button>
        </section>
        <section class="bottom">
          <TablePaging
            :datas="userList"
            :info="info"
            :total="recordCount"
            :v-loading="userloading"
            is-index="true"
            :isborder="isborder"
            :page="page"
            :limit="limit"
            @pagination="currentChangePage"
          >
            <el-table-column slot="operation" label="是否校验" width="100" align="center">
              <template slot-scope="scope">
                <el-checkbox :indeterminate="scope.row.chkFlag" disabled />
              </template>
            </el-table-column>
            <el-table-column slot="operation" fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="mini"
                  @click="handleClick(scope.row)"
                >编辑</el-button>
                <el-button
                  type="text"
                  size="mini"
                  class="delete"
                  @click="handleClickDelete(scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </TablePaging>
        </section>
      </el-card>
    </el-container>
    <edit-and-add ref="editandadd" :userform="userform" :isdisabled="isdisabled" @resetForm="resetForm" @updatefrom="updatefrom" />
  </el-main>
</template>

<script>
import TablePaging from '@/components/TablePaging'
import EditAndAdd from './components/index'
export default {
  name: 'ecbcodegnrt',
  components: {
    TablePaging,
    EditAndAdd
  },
  data() {
    return {
      isborder: true,
      page: this.pageIndex,
      limit: this.pageSize,
      info: [
        {
          prop: 'userNo',
          label: '用户编号',
          width: '120'
        },
        {
          prop: 'nickName',
          label: '昵称',
          width: '160'
        },
        {
          prop: 'authTel',
          label: '电话(认证)',
          width: '160'
        },
        {
          prop: 'regDtt',
          label: '注册时间'
        }
      ],
      searchinput: '',
      userform: {
        userNo: '',
        nickName: '',
        authTel: '',
        lgnPwd: ''
      },
      isdisabled: false
    }
  },
  computed: {
    pageIndex() {
      return this.$store.state.user.pageIndex
    },
    pageSize() {
      return this.$store.state.user.pageSize
    },
    recordCount() {
      return this.$store.state.user.recordCount
    },
    userList() {
      return this.$store.state.user.userList
    },
    userloading() {
      return this.$store.state.user.userloading
    }
  },
  created: function() {
    this.$store.dispatch('user/usergetpage', { pageIndex: this.pageIndex, pageSize: this.pageSize })
  },
  methods: {
    // 分页方法（重点）
    currentChangePage(list) {
      const { limit, page } = list
      this.page = page
      this.limit = limit
      this.$store.dispatch('user/usergetpage', { pageIndex: page, pageSize: limit, keyWord: this.searchinput })
    },
    searchsubmit() {
      this.$store.dispatch('user/usergetpage', { pageIndex: this.pageIndex, pageSize: this.pageSize, keyWord: this.searchinput })
    },
    handleClickDelete(row) {
      const { userNo, nickName } = row
      if (userNo !== null) {
        this.$confirm('请确认删除账户[' + nickName + ']吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.$store.dispatch('user/userdelete', {
              userNo: userNo
            }).then(() => {
              this.$store.dispatch('user/usergetpage', { pageIndex: this.pageIndex, pageSize: this.pageSize, keyWord: this.searchinput })
            })
          })
          .catch(() => {})
      } else {
        this.$message({
          message: '当前数据不存在无法删除，请刷新页面重试',
          type: 'error',
          duration: 2 * 1000
        })
      }
    },
    handleClick(row) {
      const { userNo, nickName, authTel } = row
      this.userform = {
        userNo: userNo,
        nickName: nickName,
        authTel: authTel
      }
      this.isdisabled = true
      this.$refs.editandadd.openDialog()
    },
    addsbumit() {
      this.$refs.editandadd.openDialog()
    },
    resetForm() {
      this.userform = {
        userNo: '',
        nickName: '',
        authTel: '',
        lgnPwd: ''
      }
      this.isdisabled = false
    },
    updatefrom() {
      this.$store.dispatch('user/usergetpage', { pageIndex: this.pageIndex, pageSize: this.pageSize, keyWord: this.searchinput })
    }
  }
}
</script>
<style lang="scss">
.usercontainer {
  width: 100%;
  height: calc(100vh - 90px);
  position: relative;
  background-color: #f2f2f2;
  .el-container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    .user_elcard {
      width: 100%;
      height: 100%;
      position: relative;
      .el-card__header {
        height: 74px;
      }
      .el-card__body {
        height: calc(100% - 74px);
        position: relative;
        padding: 15px;
        .top {
          width: 100%;
          height: 48px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          background-color: #f2f2f2;
          border: #e6e6e6 1px solid;
          padding-left: 15px;
        }
        .bottom {
          width: 100%;
          height: calc(100% - 48px);
          position: relative;
        }
      }
    }
  }
  .header_row {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    .header_row_left {
      height: 100%;
      width: 280px;
      margin-right: 15px;
      position: relative;
      .el-input-group__prepend {
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
      }
      input {
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
      }
    }
  }
}
</style>
