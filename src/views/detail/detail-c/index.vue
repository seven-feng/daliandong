<template>
  <el-tabs v-model="progressTab" type="card">
    <el-tab-pane label="办理进度" name="first">
      <el-table :data="progressList" :default-sort = "{prop: 'time', order: 'descending'}">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form v-if="props.row.type == '2'" inline class="table-expand" label-position="left" label-width="100px">
              <el-form-item label="是否要件">
                <span>{{ props.row.otherInfo.isImportant|normalFilter }}</span>
              </el-form-item>
              <el-form-item label="受理时间">
                <span>{{ props.row.otherInfo.acceptTime }}</span>
              </el-form-item>
              <el-form-item label="交办人">
                <span>{{ props.row.operationPerson }}</span>
              </el-form-item>
              <el-form-item label="交办时间">
                <span>{{ props.row.otherInfo.assignTime }}</span>
              </el-form-item>
              <el-form-item label="反馈时间">
                <span>{{ props.row.otherInfo.feedbackTime }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.otherInfo.phone }}</span>
              </el-form-item>
              <el-form-item label="联合执法">
                <span>{{ props.row.otherInfo.isJoint|normalFilter }}</span>
              </el-form-item>
               <el-form-item label="主办单位">
                <span>{{ props.row.otherInfo.departmentName }}</span>
              </el-form-item>
               <el-form-item label="交办意见">
                <span>{{ props.row.otherInfo.assignContent }}</span>
              </el-form-item>
              <el-form-item label="附件下载" class="single">
                <a v-for="(file, index) in props.row.otherInfo.filePaths" :key="index" :href="'/CLGSHZ/' + file" style="text-decoration:underline">
                  {{file.substring(file.lastIndexOf('/') + 1, file.length)}}
                </a>
              </el-form-item>
            </el-form>

            <el-form v-else-if="props.row.type == '4'" inline class="table-expand" label-position="left" label-width="100px">
              <el-form-item label="转办理由" class="single">
                <span>{{ props.row.otherInfo.backReason }}</span>
              </el-form-item>
              <el-form-item label="经手人">
                <span>{{ props.row.otherInfo.createruser }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.otherInfo.postPhone }}</span>
              </el-form-item>
            </el-form>

            <el-form v-else-if="props.row.type == '5'" inline class="table-expand" label-position="left" label-width="100px">
              <el-form-item label="回退理由" class="single">
                <span>{{ props.row.otherInfo.backReason }}</span>
              </el-form-item>
            </el-form>

            <el-form v-else-if="props.row.type == '6'" inline class="table-expand" label-position="left" label-width="100px">
              <el-form-item label="续保理由" class="single">
                <span>{{ props.row.otherInfo.postponeReason }}</span>
              </el-form-item>
              <el-form-item label="经手人">
                <span>{{ props.row.otherInfo.createruser }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.otherInfo.postPhone }}</span>
              </el-form-item>
            </el-form>

            <el-form v-else-if="props.row.type == '7'" inline class="table-expand" label-position="left" label-width="100px">
              <el-form-item label="审批意见" class="single">
                <span>{{ props.row.otherInfo.examinationOpinion }}</span>
              </el-form-item>
            </el-form>

            <el-form v-else-if="props.row.type == '8'" inline class="table-expand" label-position="left" label-width="100px">
              <el-form-item label="单位领导意见" class="single">
                <span>{{ props.row.otherInfo.departmentLeaderComment }}</span>
              </el-form-item>
              <el-form-item label="承办单位">
                <span>{{ props.row.otherInfo.departmentName }}</span>
              </el-form-item>
              <el-form-item label="承办科室">
                <span>{{ props.row.otherInfo.departmentOffice }}</span>
              </el-form-item>
              <el-form-item label="承办人">
                <span>{{ props.row.operationPerson }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.otherInfo.phone }}</span>
              </el-form-item>
              <el-form-item label="办理结果" class="single">
                <span>{{ props.row.otherInfo.result }}</span>
              </el-form-item>
              <el-form-item label="附件下载" class="single">
                <a v-for="(file, index) in props.row.otherInfo.filePaths" :key="index" :href="'/CLGSHZ/' + file" style="text-decoration:underline">
                  {{file.substring(file.lastIndexOf('/') + 1, file.length)}}
                </a>
              </el-form-item>
            </el-form>

            <el-form v-else-if="props.row.type == '9'" inline class="table-expand" label-position="left" label-width="100px">
              <el-form-item label="结案评价" v-if="props.row.otherInfo.isAgree=='0'" class="single">
                <span>{{ props.row.otherInfo.serviceOpinion }}</span>
              </el-form-item>
              <el-form-item v-else label="退办理由" class="single">
                <span>{{ props.row.otherInfo.rejectReason }}</span>
              </el-form-item>

              <el-form-item label="反映人意见" v-if="props.row.otherInfo.isAgree=='0'">
                <span v-if="props.row.otherInfo.personOpinion === '其他'">{{ props.row.otherInfo.otherPersonOpinion }}</span>
                <span v-else>{{ props.row.otherInfo.personOpinion }}</span>
              </el-form-item>
              <el-form-item label="反映人" v-if="props.row.otherInfo.isAgree=='0'">
                <span>{{ props.row.otherInfo.feedbackPerosn }}</span>
              </el-form-item>
              <el-form-item label="办理结果意见" v-if="props.row.otherInfo.isAgree=='0'">
                <span v-if="props.row.otherInfo.resultOpnion === '其他'">{{ props.row.otherInfo.otherResultOpinion }}</span>
                <span v-else>{{ props.row.otherInfo.resultOpnion }}</span>
              </el-form-item>
              <el-form-item label="外网公开" v-if="props.row.otherInfo.isAgree=='0'">
                <span>{{ props.row.otherInfo.openNetwork|normalFilter }}</span>
              </el-form-item>
            </el-form>

            <el-form v-else-if="props.row.type == '10'" inline class="table-expand" label-position="left" label-width="100px">
              <el-form-item label="回复内容" class="single">
                <span>{{ props.row.otherInfo.replyContent }}</span>
              </el-form-item>
              <el-form-item label="附件下载" class="single">
                <a v-for="(file, index) in props.row.otherInfo.filePaths" :key="index" :href="'/CLGSHZ/' + file" style="text-decoration:underline">
                  {{file.substring(file.lastIndexOf('/') + 1, file.length)}}
                </a>
              </el-form-item>
            </el-form>

            <el-form v-else-if="props.row.type == '13'" inline class="table-expand" label-position="left" label-width="100px">
              <el-form-item label="上报意见" class="single">
                <span>{{ props.row.otherInfo.reportOpinion }}</span>
              </el-form-item>
              <el-form-item label="附件下载" class="single">
                <a v-for="(file, index) in props.row.otherInfo.filePaths" :key="index" :href="'/CLGSHZ/' + file" style="text-decoration:underline">
                  {{file.substring(file.lastIndexOf('/') + 1, file.length)}}
                </a>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="stage" label="阶段" width="180px"></el-table-column>
        <el-table-column prop="operationPerson" label="操作人员" width="180px"></el-table-column>
        <el-table-column prop="departmentName" label="所属部门" width="180px"></el-table-column>
        <el-table-column prop="opinion" label="意见">
          <template slot-scope="scope">
            <div v-html="scope.row.opinion"></div>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="操作时间" sortable width="180px"></el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="处理记录" name="second">
      <el-steps :active="progressList.length" direction="vertical" align-center space="100px">
        <el-step v-for="(progress,index) in reverseList" :key="index" :title="progress.time + progress.operation"></el-step>
      </el-steps>
    </el-tab-pane>
    <el-tab-pane v-if="relatedEventVisiable" label="查看流程图" name="third">
      <img :src="processImg"/>
    </el-tab-pane>
  </el-tabs>  
</template>
<script>
import { getEventLog } from '@/api/detail'
export default {
  props: ['id', 'relatedEventVisiable'],
  data() {
    return {
      progressTab: 'first', // 默认选中办理进度
      progressList: [],
      processImg: ''
    }
  },
  created() {
    this.getProgressList()
    this.getProcessImg()
  },
  computed: {
    reverseList() { // 反转进度表
      return this.progressList.reverse()
    }
  },
  methods: {
    getProgressList() { // 获取进度表
      getEventLog(this.id).then(res => {
        if (res.retCode === '0' && res.data != null) {
          this.progressList = res.data
        }
      })
    },
    getProcessImg() { // 获取流程图
      this.processImg = '/CLGSHZ/act/deal/showFlowImg?eventId=' + this.id
    }
  },
  filters: {
    normalFilter(value) {
      var filter = ['是', '否']
      return filter[value]
    },
    fileFilter(files) {
      let content = ''
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        content += '<a style="text-decoration:underline" href="../../' + file + '>' +
        file.substring(file.lastIndexOf('/') + 1, file.length) + '</a>' + '&nbsp'
      }
      return content
    }
  }
}
</script>
<style scoped>
.el-tabs {
  margin-top: 10px;
}
.table-expand {
    font-size: 0;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.table-expand .el-form-item.single {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
