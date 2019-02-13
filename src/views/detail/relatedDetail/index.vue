<template>
  <div class="main-wrapper">
    <el-row>
      <el-button type="info" size="small" plain @click="handleBack">返回</el-button>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <detail-a :id="id" :relatedEventVisiable="false"></detail-a>
        <detail-c :id="id" :relatedEventVisiable="false"></detail-c>
      </el-col>
      <el-col :span="6">
        <detail-d :id="id"></detail-d>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DetailA from '../detail-a'
import DetailC from '../detail-c'
import DetailD from '../detail-d'

export default {
  components: {
    DetailA,
    DetailC,
    DetailD
  },
  data() {
    return {
      id: ''
    }
  },
  created() {
    this.getRequestParams()
  },
  methods: {
    getRequestParams() {
      this.id = this.$route.params.id // 获取业务id
    },
    handleBack() {
      this.$router.go(-1)
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
  .bg-purple {
    background: #F5F7FA;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .print-table {
    width: 100%;
    border-top: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    font-size: 12px;
  }
  .print-table td {
    border-left: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    width: 150px;
    height: 30px;
    text-align: center;
  }
  .print-title {
    height: 50px; 
    text-align: center;
    font-size: 18px; 
    line-height: 50px;
  }
</style>
