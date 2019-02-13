<template>
  <div class="main-wrapper">
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
  </div>
</template>

<script>
import { getDelayConfirmPage } from '@/api/event'

export default {
  data() {
    return {
      eventList: null,
      total: 0
    }
  },
  created() {
    const params = {
      pageNum: 1,
      pageSize: 20
    }
    this.fetchData(params)
  },
  methods: {
    fetchData(params) {
      getDelayConfirmPage(params).then(response => {
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
      this.$router.push({ name: 'delayCheckDetail', params: { id: row.id }})
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
