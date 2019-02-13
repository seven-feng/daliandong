<template>
  <div class="main-wrapper">
    <el-row>
      <el-button type="primary" size="small" plain>新增</el-button>
    </el-row>
    <el-row>
      <el-table :data="eventList" height="calc(100vh - 180px)" border @row-click="handleRowClick">
        <el-table-column prop="eventNo" label="反映编号"></el-table-column>
        <el-table-column prop="issueTime" label="求助时间"></el-table-column>
        <el-table-column prop="name" label="求助人"></el-table-column>
        <el-table-column prop="issueContent" label="求助内容"></el-table-column>
        <el-table-column prop="issueTypeName" label="事件类型"></el-table-column>
      </el-table>
    </el-row>
    <el-row class="event-pagination">
      <el-pagination background layout="prev, pager, next, jumper" :page-size="20" :total="total" @current-change="handlePageChange"></el-pagination>
    </el-row>
    <el-dialog :visible.sync="acceptDialogVisible" lock-scroll top="20vh" width="320px">
      <el-form label-width="80px" inline>
        <el-input v-model="eventId" style="display: none;"></el-input>
        <el-form-item label="受理人">
          <el-input v-model="username" size="small" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="phone" size="small" readonly></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="acceptDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="handleAccept">确 定</el-button>
      </span> 
    </el-dialog>
  </div>
</template>

<script>
import { getToDeallPage } from '@/api/event'
import { getOne, startFlow, postFormData } from '@/api/detail'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      eventList: null,
      total: 0,
      acceptDialogVisible: false,
      eventId: ''
    }
  },
  created() {
    const params = {
      pageNum: 1,
      pageSize: 20
    }
    this.fetchData(params)
  },
  computed: {
    ...mapGetters([
      'username',
      'phone',
      'deptid',
      'deptname'
    ])
  },
  methods: {
    fetchData(params) {
      getToDeallPage(params).then(response => {
        this.eventList = response.data.list
        this.total = response.data.total
      })
    },
    handlePageChange(val) {
      const params = {
        pageNum: val,
        pageSize: 20
      }
      this.fetchData(params)
    },
    handleRowClick(row) {
      if (this.deptid === 4) { // 指挥中心才启动流程
        getOne(row.id).then(res => {
          if (res.retCode === '0' && res.data != null) {
            if (res.data.processStatus === '') {
              startFlow(row.id, 4).then(res => {
                if (res.code === '0') {
                  this.$message({ message: '流程启动成功!', type: 'success', center: true })
                } else {
                  this.$message({ message: '流程启动失败!', type: 'error', center: true })
                }
              })
            }
          }
        })
      }
      if (row.dealStatus === '3') {
        this.acceptDialogVisible = true
        this.eventId = row.id
      } else {
        this.$router.push({ name: 'predetail', params: { id: row.id }})
      }
    },
    handleAccept() {
      const formData = new FormData()
      formData.append('acceptPerson', this.username)
      formData.append('phone', this.phone)
      formData.append('nextUserIds', 8)
      formData.append('busId', this.eventId)

      postFormData(formData)
        .then(() => {
          this.$message({ message: '受理成功！', type: 'success', center: true })
          this.acceptDialogVisible = false
          this.$router.push({ name: 'predetail', params: { id: this.eventId }})
        })
        .catch(() => {
          this.$message({ message: '受理失败！', type: 'error', center: true })
        })
    }
  }
}
</script>
<style scoped>
  .main-wrapper {
    width: 100%;
    height: 100%;
    padding: 10px;
  }
  .el-row {
     margin-bottom: 10px;
  }
  .event-pagination {
    text-align: center;
    padding-top: 10px;
  }
</style>
