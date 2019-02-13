<template>
  <div class="main-wrapper">
    <el-row>
      <el-button type="info" size="small" plain @click="handleBack">返回</el-button>
      <el-button type="info" size="small" plain @click="handleCancel">作废</el-button>
      <el-button type="info" size="small" plain @click="handlePrint">打印</el-button>
      <el-button type="info" size="small" plain @click="evaluationDialogVisible = true" v-if="isEvaluation">修改评价</el-button>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="18">
        <detail-a :id="id" :relatedEventVisiable="true"></detail-a>
        <detail-b :id="id" :isRemark="true" :oper="oper"></detail-b>
        <detail-c :id="id" :relatedEventVisiable="true"></detail-c>
      </el-col>
      <el-col :span="6">
        <detail-d :id="id"></detail-d>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="printDialogVisible" width="60%" top="5vh">
      <section ref="print">
      <div class="print-title">
        <span>基层治理综合信息平台交办单</span>
      </div>
      <table class="print-table">
        <tbody>
          <tr>
            <td>交办人</td>
            <td colspan="2">{{printData.assignPerson}}</td>
            <td>联系电话</td>
            <td colspan="2">{{printData.assignPhone}}</td>
          </tr>
          <tr>
            <td>编号</td>
            <td colspan="2">{{printData.eventNo}}</td>
            <td>受理单位</td>
            <td colspan="2">{{printData.assignUnit}}</td>
          </tr>
          <tr>
            <td rowspan="4">事件情况</td>
            <td>求助人</td>
            <td>{{printData.appealPerson}}</td>
            <td>求助电话</td>
            <td colspan="2">{{printData.appealPhone}}</td>
          </tr>
          <tr>
            <td>住址</td>
            <td colspan="4">{{printData.address}}</td>
          </tr>
          <tr>
            <td>求助日期</td>
            <td>{{printData.issueTime}}</td>
            <td>办理期限</td>
            <td colspan="2">{{printData.feedbackTime}}</td>
          </tr>
          <tr>
            <td>问题发生地</td>
            <td colspan="2">{{printData.occurPlace}}</td>
            <td>来源方式</td>
            <td>{{printData.eventSourceWay}}</td>
          </tr>
          <tr style="height: 50px;">
            <td>求助内容</td>
            <td colspan="5">{{printData.issueContent}}</td>
          </tr>
          <tr style="height: 50px;">
            <td>交办意见</td>
            <td colspan="5">{{printData.assignContent}}</td>
          </tr>
          <tr style="height: 50px;">
            <td>承办单位领导意见</td>
            <td colspan="5">{{printData.departmentLeaderConmment}}</td>
          </tr>
          <tr>
            <td>承办单位（科室）</td>
            <td>{{printData.hostUnit}}</td>
            <td>承办人</td>
            <td>{{printData.hostPerson}}</td>
            <td>联系电话</td>
            <td>{{printData.hostPhone}}</td>
          </tr>
          <tr>
            <td rowspan="3">办理结果</td>
            <td colspan="5">{{printData.handleResult}}</td>
          </tr>
          <tr>
            <td>办理结果意见</td>
            <td colspan="4">{{printData.resultOpinion}}</td>
          </tr>
          <tr>
            <td>签发领导</td>
            <td>{{printData.signLeader}}</td>
            <td>办结时间</td>
            <td colspan="2">{{printData.endTime}}</td>
          </tr>
          <tr>
            <td>协办单位（科室）</td>
            <td>{{printData.assistUnit}}</td>
            <td>协办人</td>
            <td>{{printData.assistPerson}}</td>
            <td>联系电话</td>
            <td>{{printData.assistPhone}}</td>
          </tr>
          <tr>
            <td style="height: 50px;">其他办理结果意见</td>
            <td colspan="5">{{printData.otherResult}}</td>
          </tr>
          <tr>
            <td style="height: 50px;">备注</td>
            <td colspan="5">{{printData.remarkContent}}</td>
          </tr>
        </tbody>
      </table>
      </section>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="printDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="exportWord">导出word</el-button>
        <el-button type="primary" size="small" @click="printTable">打 印</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="evaluationDialogVisible" width="60%" lock-scroll top="10vh">
      <el-form ref="form" :model="form" label-width="100px">
        <el-input v-model="form.id" style="display: none;"></el-input>
        <el-form-item label="评价" prop="serviceOpinion">
          <el-input v-model="form.serviceOpinion" type="textarea" placeholder="请输入评价" :rows="4" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="工作态度意见">
          <el-col :span="10">
            <el-radio-group v-model="form.personOpinion">
              <el-radio label="满意">满意</el-radio>
              <el-radio label="基本满意">基本满意</el-radio>
              <el-radio label="不满意">不满意</el-radio>
              <el-radio label="其他">其他</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.otherPersonOpinion" size="small" v-if="form.personOpinion === '其他'"></el-input>
          </el-col>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="反馈人" prop="feedbackPerosn">
              <el-input v-model="form.feedbackPerosn" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="办理结果意见">
          <el-col :span="10">
            <el-radio-group v-model="form.resultOpnion">
              <el-radio label="满意">满意</el-radio>
              <el-radio label="基本满意">基本满意</el-radio>
              <el-radio label="不满意">不满意</el-radio>
              <el-radio label="其他">其他</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.otherResultOpinion" size="small" v-if="form.resultOpnion === '其他'"></el-input>
          </el-col>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="是否热点">
              <el-radio-group v-model="form.isHotSpot">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进入样本库">
              <el-radio-group v-model="form.enterSampleLibrary">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="外网公开">
              <el-radio-group v-model="form.openNetwork">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="是否排查">
              <el-radio-group v-model="form.isCheck">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否效能件">
              <el-radio-group v-model="form.isEffective">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否已回访">
              <el-radio-group v-model="form.isVisit">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="evaluationDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="confirmEvaluation">确 定</el-button>
      </span> 
    </el-dialog>
  </div>
</template>

<script>
import DetailA from '../detail-a'
import DetailB from '../detail-b'
import DetailC from '../detail-c'
import DetailD from '../detail-d'
import { invalidEvent, getEventGeneralInfo, getEvaluation, updateEvaluation } from '@/api/detail'
import Print from '@/plugins/print'
import Vue from 'vue'
Vue.use(Print)

export default {
  components: {
    DetailA,
    DetailB,
    DetailC,
    DetailD
  },
  data() {
    return {
      id: '', // 业务id
      printDialogVisible: false,
      evaluationDialogVisible: false,
      isEvaluation: true,
      oper: 'remark', // 初始选中备注
      printData: {
        assignPerson: '',
        assignPhone: '',
        eventNo: '',
        assignUnit: '',
        appealPerson: '',
        appealPhone: '',
        address: '',
        issueTime: '',
        feedbackTime: '',
        occurPlace: '',
        eventSourceWay: '',
        issueContent: '',
        assignContent: '',
        departmentLeaderConmment: '',
        hostUnit: '',
        hostPerson: '',
        hostPhone: '',
        handleResult: '',
        resultOpinion: '',
        signLeader: '',
        endTime: '',
        assistUnit: '',
        assistPerson: '',
        assistPhone: '',
        otherResult: '',
        remarkContent: ''
      },
      form: {
        id: '',
        serviceOpinion: '',
        personOpinion: '满意',
        feedbackPerosn: '',
        resultOpnion: '满意',
        isHotSpot: '1',
        enterSampleLibrary: '1',
        openNetwork: '1',
        isCheck: '1',
        isEffective: '1',
        isVisit: '0',
        delayDay: 5
      }
    }
  },
  created() {
    this.getRequestParams()
    this.initEvaluation()
  },
  methods: {
    getRequestParams() {
      this.id = this.$route.params.id // 获取业务id
    },
    initEvaluation() { // 获取评价
      getEvaluation(this.id).then(res => {
        if (res.retCode === '0' && res.data != null) {
          this.form = res.data
        } else {
          this.isEvaluation = false
        }
      })
    },
    handleBack() { // 返回按钮
      this.$router.go(-1)
    },
    handleCancel() { // 作废按钮
      this.$confirm('此操作将永远废除该事件, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        invalidEvent(this.id).then(() => {
          this.$message({ message: '废除成功!', type: 'success', center: true })
          this.handleBack()
        }).catch(() => {
          this.$message({ message: '废除失败!', type: 'error', center: true })
        })
      }).catch(() => {
        this.$message({ message: '操作已取消！', type: 'info', center: true })
      })
    },
    handlePrint() { // 打印按钮
      this.printDialogVisible = true
      getEventGeneralInfo(this.id).then(res => {
        if (res.retCode === '0' && res.data != null) {
          this.printData = res.data
        }
      })
    },
    exportWord() { // 导出word
      this.printDialogVisible = false
      window.location.href = '/CLGSHZ/eventBasicInfo/exportDoc?eventId=' + this.id
    },
    printTable() { // 打印
      this.printDialogVisible = false
      this.$print(this.$refs.print)
    },
    confirmEvaluation() { // 修改评价按钮
      updateEvaluation(this.form)
        .then(() => {
          this.$message({ message: '修改成功！', type: 'success', center: true })
        })
        .catch(() => {
          this.$message({ message: '修改失败！', type: 'error', center: true })
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
