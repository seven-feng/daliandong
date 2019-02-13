<template>
  <div>
    <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="120px">
      <div class="title">基本信息</div>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="反映编号">
            <el-input v-model="form.eventNo" size="small"></el-input>
            <el-input v-model="form.eventId" style="display: none;"></el-input>
            <el-input v-model="form.id" style="display: none;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="反映时间">
            <el-input v-model="form.issueTime" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="发生网格" prop="occurOrg">
            <el-input v-model="form.occurOrg" size="small" @focus="handleGridDialog"></el-input>
            <el-input v-model="form.occurOrgId" style="display: none;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="反映渠道" prop="eventChannel">
              <el-select v-model="form.eventChannel" placeholder="请选择反映渠道" size="small" style="width: 100%">
                <el-option v-for="(item, index) in eventChannels" :key="index" :label="item.name" :value="item.code"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
              <el-radio-group v-model="form.petitionCode">
                <el-radio v-for="(item, index) in petitionCodes" :key="index" :label="item.code">{{item.name}}</el-radio>
              </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="3">
          <el-form-item label="反映类型">
            <el-radio-group v-model="form.eventType">
              <el-radio v-for="(item, index) in eventTypes" :key="index" :label="item.code">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="归属类型">
            <el-select v-model="form.attrType" placeholder="请选择归属类型" size="small" style="width: 100%">
              <el-option v-for="(item, index) in attrTypes" :key="index" :label="item.name" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="事件类型" prop="eventTypeStr">
            <el-input v-model="form.eventTypeStr" size="small" @focus="handleTypeDialog"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="初重标识">
            <el-select v-model="form.firstStatus" placeholder="请选择初重标识" size="small" style="width: 100%">
              <el-option label="初" value="0"></el-option>
              <el-option label="重" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="紧急程度" prop="emDegree">
            <el-radio-group v-model="form.emDegree">
              <el-radio label="0">平急</el-radio>
              <el-radio label="1">紧急</el-radio>
              <el-radio label="2">特急</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="催办次数">
            <el-input v-model="form.reminderCount" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="title">反映人信息</div>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="性别">
              <el-select v-model="form.gender" placeholder="请选择性别" size="small" style="width: 100%">
                <el-option label="女" value="0"></el-option>
                <el-option label="男" value="1"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="民族">
            <el-input v-model="form.nation" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="身份证号">
            <el-input v-model="form.certificateNo" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="年龄">
            <el-input v-model="form.age" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="从事职业">
              <el-select v-model="form.job" placeholder="请选择从事职业" size="small" style="width: 100%">
                <el-option v-for="(item, index) in jobs" :key="index" :label="item.name" :value="item.code"></el-option>
              </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="电子邮箱">
            <el-input v-model="form.email" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="来电号码">
            <el-input v-model="form.phone" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="其他联系方式">
            <el-input v-model="form.mobile" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="13">
          <el-form-item label="住址" prop="address">
            <el-input v-model="form.address" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" :offset="3">
          <el-form-item label="是否保密">
            <el-radio-group v-model="form.isSecret">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="13">
          <el-form-item label="问题发生地" prop="occurPlace">
              <el-input v-model="form.occurPlace" size="small"></el-input>
          </el-form-item>
        </el-col>
        <el-button type="primary" size="mini" @click="handleMap" plain style="margin-top: 5px;">定位</el-button>
      </el-row>

      <div class="title">事件信息</div>
      <el-row :gutter="10">
        <el-col :span="13">
          <el-form-item label="反映主题" prop="subject">
            <el-input v-model="form.subject" size="small" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="13">
          <el-form-item label="反映内容" prop="issueContent">
            <el-input v-model="form.issueContent" type="textarea" :rows="3" placeholder="请输入反映主题" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="是否排查">
            <el-radio-group v-model="form.isCheck">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否效能件">
            <el-radio-group v-model="form.isEffective">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否二次交办">
            <el-radio-group v-model="form.isSecondAssignEvent">
              <el-radio label="0">是</el-radio>
              <el-radio label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="附件上传">
            <el-upload ref="file" action="" :before-remove="beforeRemove" multiple :auto-upload="false"
              :file-list="fileList" :on-change="filesChange" :on-remove="filesRemove" style="width: 30%;">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">如需更改，请重新上传所有文件</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="text-align: center; margin: 10px auto;">
          <el-button size="small" @click="handleBack">返回</el-button>
          <el-button type="primary" size="small" @click="submitForm('form')">保存</el-button>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="typeDialogVisible" width="30%" lock-scroll top="1vh">
      <div>
        <div style="display: inline-block; width: 50%">
          <el-tree :load="loadNode" :props="defaultProps" @node-click="handleNodeClick" lazy accordion></el-tree>
        </div>
        <div v-if="secondEventType !== '其他' && firstEventType !== ''" style="display: inline-block; height: 100%; vertical-align: top;">
          {{'[' + firstEventType + ']：' + secondEventType}}
        </div>
        <div v-else-if="secondEventType === '其他' && firstEventType !== ''" style="display: inline-block; height: 100%; vertical-align: top;">
          <el-input v-model="otherEventType" placeholder="请输入其他" size="small" maxlength="15" style="width: 200px;"></el-input>
          <div>{{'[' + firstEventType + ']：' + otherEventType}}</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="typeDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="confirmEventType">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="gridDialogVisible" width="200px" lock-scroll top="10vh">
      <el-tree :load="loadGrid" :props="defaultProps" @node-click="handleGridClick" lazy accordion></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="gridDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="confirmGrid">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="mapDialogVisible" width="540px" lock-scroll top="10vh">
      <div id="mapDiv" style="width: 500px; height: 400px;"></div> 
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="mapDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="returnResult">确 定</el-button>
      </span> 
    </el-dialog>
  </div>
</template>

<script>
import { getAllDict, getOne, getIssueFirstType, getIssueSecondType, getDepartmentChildren, update } from '@/api/detail'
import axios from 'axios'
export default {
  data() {
    return {
      id: '',
      form: {
        id: '',
        eventId: '',
        eventNo: '',
        issueTime: '',
        occurOrg: '',
        occurOrgId: '',
        eventChannel: '',
        petitionCode: '',
        eventType: '',
        attrType: '',
        eventTypeStr: '',
        firstStatus: '',
        emDegree: '',
        reminderCount: '',
        name: '',
        gender: '',
        nation: '',
        certificateNo: '',
        age: '',
        job: '',
        email: '',
        phone: '',
        mobile: '',
        address: '',
        isSecret: '',
        occurPlace: '',
        subject: '',
        issueContent: '',
        isCheck: '',
        isEffective: '',
        isSecondAssignEvent: ''
      },
      eventChannels: null, // 反映渠道,
      petitionCodes: null,
      attrTypes: null, // 归属类型
      jobs: null, // 从事职业
      eventTypes: null, // 反映类型
      typeDialogVisible: false,
      gridDialogVisible: false,
      mapDialogVisible: false,
      defaultProps: {
        label: 'name'
      },
      eventTypeData: null, // 事件类型数据
      gridData: null, // 网格数据
      firstEventType: '', // 一级事件类型
      secondEventType: '', // 二级事件类型
      otherEventType: '', // 其他事件类型
      gridName: '',
      gridId: '',
      mapE: null,
      files: [],
      fileList: [],
      rules: {
        occurOrg: [
          { required: true, message: '请选择发生网格', trigger: 'blur' }
        ],
        eventChannel: [
          { required: true, message: '请选择反映渠道', trigger: 'change' }
        ],
        eventTypeStr: [
          { required: true, message: '请选择事件类型', trigger: 'blur' }
        ],
        emDegree: [
          { required: true, message: '请选择紧急程度', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入住址', trigger: 'blur' }
        ],
        occurPlace: [
          { required: true, message: '请输入问题发生地', trigger: 'blur' }
        ],
        subject: [
          { required: true, message: '请输入反映主题', trigger: 'blur' }
        ],
        issueContent: [
          { required: true, message: '请输入反映内容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRequestParams()
    this.initSelect()
    this.initDetail()
    this.initEventType()
    this.initGrid()
  },
  methods: {
    getRequestParams() {
      this.id = this.$route.params.id // 获取业务id
    },
    initSelect() { // 初始化选择器
      getAllDict().then(res => {
        this.eventChannels = res.data.dictEventChannel
        this.petitionCodes = res.data.dictPetitionCode
        this.attrTypes = res.data.dictAttrType
        this.jobs = res.data.dictJob
        this.eventTypes = res.data.dictEventType
      })
    },
    initDetail() { // 数据回显
      getOne(this.id).then(res => {
        this.form = res.data
        const fileNames = res.data.fileName.split('|')
        const fileUrls = res.data.filePath.split('|')
        for (let i = 0; i < fileNames.length; i++) {
          const obj = {
            name: fileNames[i],
            url: fileUrls[i]
          }
          this.fileList.push(obj)
        }
      })
    },
    initEventType() { // 初始化事件类型
      getIssueFirstType().then(res => {
        this.eventTypeData = res.data
      })
    },
    initGrid() { // 初始化网格
      getDepartmentChildren().then(res => {
        this.gridData = res.data
      })
    },
    handleTypeDialog() {
      this.typeDialogVisible = true
    },
    handleGridDialog() {
      this.gridDialogVisible = true
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.eventTypeData)
      }
      if (node.level > 1) return resolve([]) // 只有两层

      setTimeout(() => {
        getIssueSecondType(node.data.id).then(res => {
          resolve(res.data)
        })
      }, 500)
    },
    loadGrid(node, resolve) {
      if (node.level === 0) {
        return resolve(this.gridData)
      }
      setTimeout(() => {
        getDepartmentChildren(node.data.id).then(res => {
          resolve(res.data)
        })
      }, 500)
    },
    handleNodeClick(data, node) {
      if (node.level === 1) {
        this.firstEventType = data.name
        this.secondEventType = ''
        this.otherEventType = ''
      } else {
        this.secondEventType = data.name
        if (data.name !== '其他') {
          this.otherEventType = ''
        }
      }
    },
    handleGridClick(data, node) {
      this.gridId = data.id
      this.gridName = data.name
    },
    confirmEventType() {
      if (this.secondEventType === '' && this.otherEventType === '') {
        this.$message({
          type: 'info',
          message: '请选择二级类型！',
          center: true
        })
      } else if (this.secondEventType === '其他' && this.otherEventType !== '') {
        this.form.eventTypeStr = '[' + this.firstEventType + ']：其他-' + this.otherEventType
        this.typeDialogVisible = false
      } else if (this.secondEventType !== '其他' && this.otherEventType === '') {
        this.form.eventTypeStr = '[' + this.firstEventType + ']：' + this.secondEventType
        this.typeDialogVisible = false
      }
    },
    confirmGrid() {
      if (this.gridId === '') {
        this.$message({
          type: 'info',
          message: '请选择网格！',
          center: true
        })
      } else {
        this.form.occurOrg = this.gridName
        this.form.occurOrgId = this.gridId
        this.gridDialogVisible = false
      }
    },
    handleMap() { // 定位按钮
      const _this = this
      this.mapDialogVisible = true
      setTimeout(function() { // 添加延时加载。解决问题
        // eslint-disable-next-line
        const map = new T.Map('mapDiv')
        // eslint-disable-next-line
        map.centerAndZoom(new T.LngLat(104.73343, 27.129031), 12)
        // 禁止拖拽
        // map.disableDrag();
        // 禁止拖拽惯性
        map.disableInertia()
        // 禁止双击放大
        map.disableDoubleClickZoom()
        map.addEventListener('click', (e) => {
          var position = {}
          var arrayLngLat = []

          arrayLngLat[0] = e.lnglat.getLng()
          arrayLngLat[1] = e.lnglat.getLat()

          map.clearOverLays()
          // 创建标注对象
          // eslint-disable-next-line
          var marker = new T.Marker(new T.LngLat(arrayLngLat[0], arrayLngLat[1]))
          // 向地图上添加标注
          map.addOverLay(marker)

          position.type = 'Point'
          position.coordinates = arrayLngLat

          _this.mapE = e.lnglat // 保存经纬坐标
        })
      }, 300)
    },
    returnResult() {
      const lnglat = this.mapE
      axios.get('http://api.tianditu.com/api?v=4.0')
        .then(() => {
          // eslint-disable-next-line
          const geocode = new T.Geocoder()
          geocode.getLocation(lnglat, result => {
            this.form.occurPlace = result.getAddress()
          })
        })
      this.mapDialogVisible = false
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    },
    filesChange(file, fileList) {
      this.files = []
      fileList.map(item => {
        this.files.push(item.raw)
      })
    },
    filesRemove(file, fileList) {
      this.files = []
      fileList.map(item => {
        this.files.push(item.raw)
      })
    },
    handleBack() { // 返回按钮
      this.$router.go(-1)
    },
    submitForm(formName) { // 保存按钮
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = new FormData()
          this.files.map(item => {
            formData.append('file', item)
          })
          formData.append('eventNo', this.form.eventNo)
          formData.append('eventId', this.form.eventId)
          formData.append('id', this.form.id)
          formData.append('issueTime', this.form.issueTime)
          formData.append('occurOrgId', this.form.occurOrgId)
          formData.append('occurOrg', this.form.occurOrg)
          formData.append('eventChannel', this.form.eventChannel)
          formData.append('petitionCode', this.form.petitionCode)
          formData.append('eventType', this.form.eventType)
          formData.append('eventTypeStr', this.form.eventTypeStr)
          formData.append('firstStatus', this.form.firstStatus)
          formData.append('emDegree', this.form.emDegree)
          formData.append('reminderCount', this.form.reminderCount)
          formData.append('attrType', this.form.attrType)
          formData.append('name', this.form.name)
          formData.append('gender', this.form.gender)
          formData.append('nation', this.form.nation)
          formData.append('certificateNo', this.form.certificateNo)
          formData.append('age', this.form.age)
          formData.append('job', this.form.job)
          formData.append('email', this.form.email)
          formData.append('phone', this.form.phone)
          formData.append('mobile', this.form.mobile)
          formData.append('address', this.form.address)
          formData.append('isSecret', this.form.isSecret)
          formData.append('occurPlace', this.form.occurPlace)
          formData.append('subject', this.form.subject)
          formData.append('issueContent', this.form.issueContent)
          formData.append('isCheck', this.form.isCheck)
          formData.append('isEffective', this.form.isEffective)
          formData.append('isSecondAssignEvent', this.form.isSecondAssignEvent)

          update(formData)
            .then(() => {
              this.$message({ message: '保存成功！', type: 'success', center: true })
              this.handleBack()
            })
            .catch(() => {
              this.$message({ message: '保存失败！', type: 'error', center: true })
            })
        } else {
          this.$message({ message: 'error!', type: 'error', center: true })
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
    font-size: 18px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.el-row {
  width: 100%;
}
.el-form-item {
  margin-bottom: 20px;
  width: 100%;
}
</style>
