<template>
  <div>
    <div class="title">图片</div>
    <div class="img-wrapper">
      <span class="img-title">处理前</span>
      <el-carousel indicator-position="none" height="180px">
         <el-carousel-item v-if="images.preProcessFile.length === 0" style="text-align: center;">
          <img src="@/assets/img/img-none.png" style="height: 100%;">
        </el-carousel-item>
        <el-carousel-item v-for="(item, index) in images.preProcessFile" :key="index" style="text-align: center;">
          <img :src="'/CLGSHZ' + item" style="height: 100%;">
        </el-carousel-item>
      </el-carousel>
      <span class="img-title">处理后</span>
      <el-carousel indicator-position="none" height="180px" >
        <el-carousel-item v-if="images.postProcessFile.length === 0" style="text-align: center;">
          <img src="@/assets/img/img-none.png" style="height: 100%;">
        </el-carousel-item>
        <el-carousel-item v-for="(item, index) in images.postProcessFile" :key="index" style="text-align: center">
          <img :src="'/CLGSHZ' + item" style="height: 100%;">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="download-wrapper">
      <div class="title">附件</div>
      <el-badge is-dot v-if="isZipFile">
        <el-button @click="download" icon="el-icon-download" type="primary" size="small" plain>批量下载</el-button>
      </el-badge>
    </div>
  </div>
</template>
<script>
import { getProcessImg, fileToZip, getZipFilePath } from '@/api/detail'
export default {
  props: ['id'],
  data() {
    return {
      images: {
        preProcessFile: [],
        postProcessFile: []
      },
      isZipFile: false,
      filePath: ''
    }
  },
  created() {
    this.initImg()
    this.initFile()
  },
  methods: {
    initImg() { // 初始化图片
      getProcessImg(this.id).then(res => {
        if (res.retCode === '0' && res.data != null) {
          this.images = res.data
        }
      })
    },
    initFile() { // 初始化文件
      getZipFilePath(this.id).then(res => {
        if (res.retCode === '0' && res.data != null) {
          this.filePath = '/CLGSHZ/' + res.data
          this.isZipFile = true
        }
      })
    },
    download() { // 附件下载
      fileToZip(this.id).then(res => {
        if (res.retCode === '0') {
          window.location.href = this.filePath
        }
      })
    }
  }
}
</script>
<style scoped>
  .title {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    background: #F5F7FA;
    border-radius: 4px;
    color: #000;
    font-size: 20px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.img-wrapper {
  padding: 0px 30px;
}
.img-title {
  display: block;
  color: #8492a6;
  font-size: 16px;
  font-weight: bold;  
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.download-wrapper {
  margin-top: 10px;
}
a.download {
  height: 20px;
  font-size: 12px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>
