<template>
    <!-- <el-radio-group v-model="choice" size="medium"> -->
      <!-- <el-radio :label="0">转告</el-radio> -->
      <!-- <el-radio-button :label="1">备注</el-radio-button> -->
      <!-- <el-radio-button :label="2">上报</el-radio-button> -->
      <!-- <el-radio-button :label="3">回退</el-radio-button> -->
      <!-- <el-radio-button :label="4">直接回复</el-radio-button> -->
      <!-- <el-radio-button :label="5">交办</el-radio-button> -->
      <!-- <el-radio-button :label="6">批示</el-radio-button> -->
      <!-- <el-radio :label="7">提交领导批示</el-radio> -->
      <!-- <el-radio-button :label="8">结案审核</el-radio-button> -->
      <!-- <el-radio-button :label="9">县级退办</el-radio-button> -->
      <!-- <el-radio :label="10">单位申请退办</el-radio> -->
      <!-- <el-radio :label="11">办理</el-radio>
      <el-radio :label="12">结案申请</el-radio>
      <el-radio :label="13">延期审核</el-radio>
      <el-radio :label="14">延期申请</el-radio> -->
    <!-- </el-radio-group> -->

  <el-tabs v-model="tabName" type="border-card">
    <el-tab-pane label="备注" name="remark" v-if="isRemark">
      <el-form ref="remarkForm" :model="form" :rules="rules" label-width="80px">
        <el-input v-model="eventId" style="display: none;"></el-input>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="备注人">
              <el-input v-model="username" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注时间">
              <el-input v-model="currentTime" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注单位">
              <el-input v-model="deptname" size="small" readonly></el-input>
              <!-- <el-input v-model="deptid" style="display: none;"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注内容" prop="remarkContent">
            <el-input type="textarea" :rows="4" placeholder="请输入备注内容" v-model="form.remarkContent" style="width: 80%;"></el-input>
        </el-form-item>
        <el-row style="text-align: right;">
          <el-button size="small" @click="resetForm('remarkForm')">重置</el-button>
          <el-button type="primary" size="small" @click="submitOtherForm('remarkForm')">确定</el-button>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="上报" name="report" v-if="isReport">
      <el-form ref="reportForm" :model="eventReport" :rules="rules" label-width="80px">
        <el-input v-model="eventId" style="display: none;"></el-input>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="上报人">
              <el-input v-model="username" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input v-model="phone" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="上报单位">
              <el-input v-model="deptname" size="small" readonly></el-input>
              <!-- <el-input v-model="deptid" style="display: none;"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="上报时间">
              <el-input v-model="currentTime" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="上报意见" prop="reportOpinion">
            <el-input type="textarea" :rows="4" placeholder="请输入上报意见" v-model="eventReport.reportOpinion" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="附件上传">
          <el-upload ref="reportUpload" action="" :before-remove="beforeRemove"  multiple :file-list="fileList"
           :auto-upload="false" :on-change="reportFilesChange" :on-remove="reportFilesRemove" style="width: 30%;">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">如需更改，请重新上传所有文件</div>
          </el-upload>
        </el-form-item>
        <el-row style="text-align: right;">
          <el-button size="small" @click="resetForm('reportForm')">重置</el-button>
          <el-button size="small" @click="saveReportData">保存</el-button>
          <el-button type="primary" size="small" @click="submitForm('reportForm')">确定</el-button>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="回退" name="back" v-if="isBack">
      <el-form ref="backForm" :model="postponeBack" :rules="rules" label-width="80px">
        <el-input v-model="postponeBack.eventId" style="display: none;"></el-input>
        <el-input v-model="postponeBack.id" style="display: none;"></el-input>
        <el-form-item label="回退理由" prop="backReason">
            <el-input v-model="postponeBack.backReason" type="textarea" :rows="4" placeholder="请输入回退理由" style="width: 80%;"></el-input>
        </el-form-item>
        <el-row style="text-align: right;">
          <el-button size="small" @click="resetForm('backForm')">重置</el-button>
          <el-button type="primary" size="small" @click="submitForm('backForm')">确定</el-button>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="直接回复" name="reply" v-if="isReply">
      <el-form ref="replyForm" :model="form" :rules="rules" label-width="80px">
        <el-input v-model="eventId" style="display: none;"></el-input>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="回复人">
              <el-input v-model="username" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="回复时间">
              <el-input v-model="currentTime" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="回复单位">
              <el-input v-model="deptname" size="small" readonly></el-input>
              <!-- <el-input v-model="deptid" style="display: none;"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="回复内容" prop="replyContent">
            <el-input type="textarea" :rows="4" placeholder="请输入回复内容" v-model="form.replyContent" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="短信内容">
            <el-input type="textarea" :rows="4" v-model="form.messageContent" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="附件上传">
          <el-upload ref="replyUpload" action="" :before-remove="beforeRemove"  multiple :file-list="fileList"
           :auto-upload="false" :on-change="replyFilesChange" :on-remove="replyFilesRemove" style="width: 30%;">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">如需更改，请重新上传所有文件</div>
          </el-upload>
        </el-form-item>
        <el-row style="text-align: right;">
          <el-button size="small" @click="resetForm('replyForm')">重置</el-button>
          <el-button size="small" @click="saveReplyData">保存</el-button>
          <el-button type="primary" size="small" @click="submitForm('replyForm')">确定</el-button>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="交办" name="assign" v-if="isAssign">
      <el-form ref="assignForm" :model="form" :rules="rules" label-width="80px">
        <el-input v-model="eventId" style="display: none;"></el-input>
        <el-row :gutter="20">
            <el-col :span="6"> 
              <el-form-item label="受理时间"><el-input v-model="acceptTime" size="small" readonly></el-input></el-form-item>
            </el-col>
            <el-col :span="6"> 
              <el-form-item label="反馈时间"><el-input v-model="feedbackTime" size="small" readonly></el-input></el-form-item>
            </el-col>
            <el-col :span="6"> 
              <el-form-item label="联系电话"><el-input v-model="phone" size="small" readonly></el-input></el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"> 
              <el-form-item label="交办人"><el-input v-model="username" size="small" readonly></el-input></el-form-item>
            </el-col>
            <el-col :span="6"> 
              <el-form-item label="交办时间"><el-input v-model="currentTime" size="small" readonly></el-input></el-form-item>
            </el-col>
            <!-- 只有指挥中心行使“联合执法”功能 -->
            <el-col :span="6" v-if="deptid === 4"> 
              <el-form-item label="联合执法"><el-checkbox v-model="form.isJoint"></el-checkbox></el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="办理期限">
                <el-input v-model="feedbackTime" size="small" readonly style="width: 65%"></el-input><el-input v-model="period" size="small" style="width: 15%"></el-input>天
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6"> 
              <el-form-item label="是否要件">
                  <el-radio v-model="form.isImportant" label="0">是</el-radio>
                  <el-radio v-model="form.isImportant" label="1">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="6"> 
              <el-form-item label="外网公开">
                <el-radio v-model="form.isPublic" label="0">公开</el-radio>
                <el-radio v-model="form.isPublic" label="1">匿名</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="6"> 
              <el-form-item label="特事特办">
                <el-radio v-model="form.isSpecial" label="0">是</el-radio>
                <el-radio v-model="form.isSpecial" label="1">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="主办单位" prop="department">
            <el-select v-model="form.department" filterable clearable default-first-option placeholder="请选择主办单位" style="width: 80%;">
              <el-option v-for="dept in depts" :key="dept.id" :label="dept.name" :value="dept.id"></el-option>
            </el-select>
          </el-form-item>
          <el-collapse-transition>
          <el-form-item label="协办单位" v-if="form.isJoint" prop="assistDepartments">
            <el-select v-model="form.assistDepartments" multiple filterable default-first-option placeholder="请选择协办单位" style="width: 80%;">
              <el-option v-for="dept in adepts" :key="dept.id" :label="dept.name" :value="dept.id"></el-option>
            </el-select>
          </el-form-item>
          </el-collapse-transition>
          <el-collapse-transition>
          <el-form-item label="领导批示" v-if="leaderInstructionFlag">
            <el-input type="textarea" :rows="4" placeholder="请输入领导批示" v-model="form.leaderInstruction" style="width: 80%;"></el-input>
          </el-form-item>
          </el-collapse-transition>
          <el-form-item label="交办意见" prop="assignContent">
            <el-input v-model="form.assignContent" type="textarea" :rows="4" placeholder="请输入交办意见" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="附件上传">
            <el-upload ref="assignUpload" action="" :before-remove="beforeRemove"  multiple :file-list="fileList"
              :auto-upload="false" :on-change="assignFilesChange" :on-remove="assignFilesRemove" style="width: 30%;">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">如需更改，请重新上传所有文件</div>
            </el-upload>
          </el-form-item>
          <el-row style="text-align: right;">
            <el-button size="small" @click="resetForm('assignForm')">重置</el-button>
            <el-button size="small" @click="saveAssignData">保存</el-button>
            <el-button type="primary" size="small" @click="submitForm('assignForm')">确定</el-button>
          </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="批示" name="instruct" v-if="isInstruct">
      <el-form ref="instructForm" :model="form" :rules="rules" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="批示人">
              <el-input v-model="username" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input v-model="phone" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="批示内容" prop="instructContent">
          <el-input v-model="form.instructContent" type="textarea" :rows="4" placeholder="请输入批示内容" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="附件上传">
          <el-upload ref="instructUpload" action="" :before-remove="beforeRemove" multiple :file-list="fileList"
            :auto-upload="false" :on-change="instructFilesChange" :on-remove="instructFilesRemove" style="width: 30%;">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">如需更改，请重新上传所有文件</div>
          </el-upload>
        </el-form-item>
        <el-row style="text-align: right;">
          <el-button size="small" @click="resetForm('instructForm')">重置</el-button>
          <el-button size="small" @click="saveInstructData">保存</el-button>
          <el-button type="primary" size="small" @click="submitForm('instructForm')">确定</el-button>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="延期审核" name="delayCase" v-if="isDelayCase">
      <el-form ref="delayCaseForm" :model="postponeBack" :rules="rules" label-width="80px">
        <el-input v-model="postponeBack.eventId" style="display: none;"></el-input>
        <el-input v-model="postponeBack.id" style="display: none;"></el-input>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="延期天数">
              <el-input v-model="postponeBack.delayDay" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="经手人">
              <el-input v-model="postponeBack.createruser" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input v-model="postponeBack.postPhone" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="延期理由">
            <el-input v-model="postponeBack.postponeReason" type="textarea" :rows="4" readonly style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="审批结果">
          <el-radio-group v-model="postponeBack.examinationResault">
            <el-radio label="0">同意</el-radio>
            <el-radio label="1">不同意</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审批意见" prop="examinationOpinion">
            <el-input v-model="postponeBack.examinationOpinion" type="textarea" :rows="4" placeholder="请输入审批意见" style="width: 80%;"></el-input>
        </el-form-item>
        <el-row style="text-align: right;">
          <el-button size="small" @click="resetForm('delayCaseForm')">重置</el-button>
          <el-button type="primary" size="small" @click="submitForm('delayCaseForm')">确定</el-button>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="结案审核" name="endCheck" v-if="isEndCheck">
      <el-form ref="endCheckForm" :model="eventDealComfirm" :rules="rules" label-width="100px">
        <el-input v-model="eventId" style="display: none;"></el-input>
        <el-form-item label="评价" prop="serviceOpinion">
          <el-input v-model="eventDealComfirm.serviceOpinion" type="textarea" placeholder="请输入评价" :rows="4" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="工作态度意见">
          <el-col :span="8">
            <el-radio-group v-model="eventDealComfirm.personOpinion">
              <el-radio label="满意">满意</el-radio>
              <el-radio label="基本满意">基本满意</el-radio>
              <el-radio label="不满意">不满意</el-radio>
              <el-radio label="其他">其他</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="6">
            <el-input v-model="eventDealComfirm.otherPersonOpinion" size="small" v-if="eventDealComfirm.personOpinion === '其他'"></el-input>
          </el-col>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="反馈人" prop="feedbackPerosn">
              <el-input v-model="eventDealComfirm.feedbackPerosn" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="办理结果意见">
          <el-col :span="8">
            <el-radio-group v-model="eventDealComfirm.resultOpnion">
              <el-radio label="满意">满意</el-radio>
              <el-radio label="基本满意">基本满意</el-radio>
              <el-radio label="不满意">不满意</el-radio>
              <el-radio label="其他">其他</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="6">
            <el-input v-model="eventDealComfirm.otherResultOpinion" size="small" v-if="eventDealComfirm.resultOpnion === '其他'"></el-input>
          </el-col>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="是否热点">
              <el-radio-group v-model="eventDealComfirm.isHotSpot">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="进入样本库">
              <el-radio-group v-model="eventDealComfirm.enterSampleLibrary">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="外网公开">
              <el-radio-group v-model="eventDealComfirm.openNetwork">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="是否排查">
              <el-radio-group v-model="eventDealComfirm.isCheck">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否效能件">
              <el-radio-group v-model="eventDealComfirm.isEffective">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否已回访">
              <el-radio-group v-model="eventDealComfirm.isVisit">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="告知单位" prop="informUnit">
              <el-input v-model="eventDealComfirm.informUnit" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="告知时间">
              <el-input v-model="currentTime" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="告知人" prop="informPerson">
              <el-input v-model="eventDealComfirm.informPerson" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="告知电话" prop="informPhone">
              <el-input v-model="eventDealComfirm.informPhone" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align: right;">
          <el-button size="small" @click="resetForm('endCheckForm')">重置</el-button>
          <el-button size="small" @click="saveEndCheckData">保存</el-button>
          <el-button type="primary" size="small" @click="submitForm('endCheckForm')">确定</el-button>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="县级退办" name="countryBack" v-if="isCountryBack">
      <el-form ref="countryBackForm" :model="eventDealComfirm" :rules="rules" label-width="80px">
        <el-input v-model="eventId" style="display: none;"></el-input>
        <el-form-item label="延期时间" prop="delayDay">
            <el-radio-group v-model="eventDealComfirm.delayDay">
              <el-radio label="1">1天</el-radio>
              <el-radio label="3">3天</el-radio>
              <el-radio label="5">5天</el-radio>  
            </el-radio-group>
        </el-form-item>
        <el-form-item label="退办理由" prop="rejectReason">
            <el-input v-model="eventDealComfirm.rejectReason" type="textarea" :rows="4" placeholder="请输入退办理由" style="width: 80%;"></el-input>
        </el-form-item>
        <el-row style="text-align: right;">
          <el-button size="small" @click="resetForm('countryBackForm')">重置</el-button>
          <el-button type="primary" size="small" @click="submitForm('countryBackForm')">确定</el-button>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="办理" name="handle" v-if="isHandle">
      <el-form ref="handleForm" :model="eventDealInfo" :rules="rules" label-width="80px">
        <el-input v-model="eventId" style="display: none;"></el-input>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="承办单位">
              <el-input v-model="deptname" size="small" readonly></el-input>
              <!-- <el-input v-model="deptid" style="display: none;"></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承办科室" prop="departmentOffice">
              <el-input v-model="eventDealInfo.departmentOffice" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="签发领导">
              <el-input v-model="eventDealInfo.signLeader" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="承办人">
              <el-input v-model="username" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
                <el-input v-model="phone" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="承办单位领导意见" prop="departmentLeaderComment">
            <el-input type="textarea" :rows="4" placeholder="请输入承办单位领导意见" v-model="eventDealInfo.departmentLeaderComment" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="办理结果" prop="result">
            <el-input type="textarea" :rows="4" placeholder="请输入办理结果" v-model="eventDealInfo.result" style="width: 80%;"></el-input>
        </el-form-item>
        <el-row style="text-align: right;">
          <el-button size="small" @click="resetForm('handleForm')">重置</el-button>
          <el-button type="primary" size="small" @click="submitForm('handleForm')">确定</el-button>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="结案申请" name="endCase" v-if="isEndCase">
      <el-form ref="endCaseForm" :model="eventDealInfo" :rules="rules" label-width="80px">
        <el-input v-model="eventId" style="display: none;"></el-input>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="承办单位">
              <el-input v-model="deptname" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="承办科室" prop="departmentOffice">
              <el-input v-model="eventDealInfo.departmentOffice" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="承办人">
              <el-input v-model="username" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
                <el-input v-model="phone" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="承办单位领导意见" prop="departmentLeaderComment">
            <el-input type="textarea" :rows="4" placeholder="请输入承办单位领导意见" v-model="eventDealInfo.departmentLeaderComment" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="办理结果" prop="result">
            <el-input type="textarea" :rows="4" placeholder="请输入办理结果" v-model="eventDealInfo.result" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="附件上传">
          <el-upload ref="endCaseUpload" action="" :before-remove="beforeRemove" multiple :file-list="fileList"
            :auto-upload="false" :on-change="endCaseFilesChange" :on-remove="endCaseFilesRemove" style="width: 30%;">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">如需更改，请重新上传所有文件</div>
          </el-upload>
        </el-form-item>
        <el-row style="text-align: right;">
          <el-button size="small" @click="resetForm('endCaseForm')">重置</el-button>
          <el-button type="primary" size="small" @click="submitForm('endCaseForm')">确定</el-button>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="延期申请" name="applyDelay" v-if="isApplyDelay">
      <el-form ref="applyDelayForm" :model="postponeBack" :rules="rules" label-width="80px">
        <el-input v-model="eventId" style="display: none;"></el-input>
        <el-form-item label="延期理由" prop="postponeReason">
            <el-input v-model="postponeBack.postponeReason" type="textarea" placeholder="请输入延期理由" :rows="4" style="width: 80%;"></el-input>
        </el-form-item>
        <el-form-item label="延期天数">
          <el-radio-group v-model="postponeBack.delayDay">
            <el-radio label="1">1天</el-radio>
            <el-radio label="3">3天</el-radio>
            <el-radio label="5">5天</el-radio>  
          </el-radio-group>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="经手人">
              <el-input v-model="username" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="联系电话">
              <el-input v-model="phone" size="small" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align: right;">
          <el-button size="small" @click="resetForm('applyDelayForm')">重置</el-button>
          <el-button type="primary" size="small" @click="submitForm('applyDelayForm')">确定</el-button>
        </el-row>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>

import { mapGetters } from 'vuex'
import { parseTime } from '@/utils'
import { getFeedbackTime, getDepartmentChildren, postTempStorage, getTempStorage, postFormData,
  getConfirmInfo, getTempDealConfirm, tempDealConfirm, remarkEvent } from '@/api/detail'

export default {
  props: ['id', 'oper', 'isRemark', 'isReport', 'isBack', 'isReply', 'isAssign',
    'isInstruct', 'isDelayCase', 'isEndCheck', 'isCountryBack', 'isHandle', 'isEndCase', 'isApplyDelay'],
  data() {
    return {
      eventId: '',
      acceptTime: '',
      currentTime: '',
      feedbackTime: '',
      period: 5,
      fileList: [],
      form: {
        replyContent: '',
        messageContent: '',
        isJoint: false,
        isImportant: '1',
        isPublic: '0',
        isSpecial: '1',
        department: '',
        assistDepartments: [],
        leaderInstruction: '',
        assignContent: ''
      },
      postponeBack: {
        id: '',
        eventId: '',
        createruser: '',
        postPhone: '',
        delayDay: '5',
        postponeReason: '',
        examinationResault: '0'
      },
      eventDealComfirm: {
        eventId: '',
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
        informUnit: '',
        informTime: '',
        informPerson: '',
        informPhone: '',
        delayDay: 5
      },
      eventReport: {
        reportOpinion: ''
      },
      eventDealInfo: {
        departmentLeaderComment: '',
        result: ''
      },
      depts: [], // 主办部门列表
      loadDepts: false,
      replyFiles: [],
      assignFiles: [],
      instructFiles: [],
      reportFiles: [],
      endCaseFiles: [],
      tabName: '',
      rules: {
        replyContent: [
          { required: true, message: '请输入回复内容', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择主办单位', trigger: 'change' }
        ],
        assistDepartments: [
          { required: true, message: '请选择协办单位', trigger: 'change' }
        ],
        assignContent: [
          { required: true, message: '请输入交办意见', trigger: 'blur' }
        ],
        instructContent: [
          { required: true, message: '请输入批示内容', trigger: 'blur' }
        ],
        examinationOpinion: [
          { required: true, message: '请输入审批意见', trigger: 'blur' }
        ],
        backReason: [
          { required: true, message: '请输入回退理由', trigger: 'blur' }
        ],
        serviceOpinion: [
          { required: true, message: '请输入评价', trigger: 'blur' }
        ],
        feedbackPerosn: [
          { required: true, message: '请输入反馈人', trigger: 'blur' }
        ],
        informUnit: [
          { required: true, message: '请输入告知单位', trigger: 'blur' }
        ],
        informPerson: [
          { required: true, message: '请输入告知人', trigger: 'blur' }
        ],
        informPhone: [
          { required: true, message: '请输入告知电话', trigger: 'blur' }
        ],
        remarkContent: [
          { required: true, message: '请输入备注内容', trigger: 'blur' }
        ],
        rejectReason: [
          { required: true, message: '请输入退办理由', trigger: 'blur' }
        ],
        delayDay: [
          { required: true, message: '请选择延期时间', trigger: 'blur' }
        ],
        reportOpinion: [
          { required: true, message: '请输入上报意见', trigger: 'blur' }
        ],
        departmentLeaderComment: [
          { required: true, message: '请输入承办单位领导意见', trigger: 'blur' }
        ],
        result: [
          { required: true, message: '请输入办理结果', trigger: 'blur' }
        ],
        departmentOffice: [
          { required: true, message: '请输入承办科室', trigger: 'blur' }
        ],
        postponeReason: [
          { required: true, message: '请输入延期理由', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initDetail()
    this.getTempData()
  },
  watch: {
    period: function(newValue) {
      getFeedbackTime(newValue).then(res => {
        if (res.retCode === '0' && res.data != null) {
          this.feedbackTime = res.data
        }
      })
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'phone',
      'deptid',
      'deptname'
    ]),
    adepts() { // 协办部门列表，根据主办部门变化
      if (!this.loadDepts) { // 除回显临时数据的情况，其他情况都需要清空协办单位
        this.form.assistDepartments = []
      }
      this.loadDepts = false
      if (this.form.department === '') { // 主办单位清空时，清空协办单位下拉列表，以防只有协办单位而没有主办单位的情况
        return []
      } else { // 根据主办单位，过滤协办单位下拉列表
        return this.depts.filter(item => {
          return item.id !== this.form.department
        })
      }
    },
    leaderInstructionFlag() {
      if (this.form.isImportant === '0') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    initDetail() { // 初始化信息
      this.eventId = this.id
      this.tabName = this.oper // 防止子组件内部改变prop值
      this.ifAssign = this.isAssign
      this.acceptTime = parseTime(Date.now()) // 受理时间
      getFeedbackTime().then(res => { // 反馈时间、办理期限
        this.feedbackTime = res.data
      })
      setInterval(() => { this.currentTime = parseTime(Date.now()) }, 1000) // 回复时间、交办时间、告知时间
      getDepartmentChildren().then(response => { // 部门列表
        this.depts = response.data
        this.loadDepts = true
      })
      getConfirmInfo(this.id).then(res => { // 延期审核信息
        if (res.retCode === '0' && res.data != null) {
          this.postponeBack = res.data
          if (res.data.examinationResault === 0) { // 默认同意
            this.postponeBack.examinationResault = '0'
          }
        }
      })
    },
    getTempData() { // 回显临时数据
      getTempStorage(this.id).then(res => {
        if (res.retCode === '0' && res.data != null) {
          this.form = res.data
          this.loadDepts = true
          if (this.form.assistDepartments !== '') {
            const assistDepartments = []
            this.form.assistDepartments.split(',').map(item => {
              assistDepartments.push(item)
            })
            this.form.assistDepartments = assistDepartments
          } else {
            this.form.assistDepartments = []
          }
          if (this.form.isJoint === '0') { // 后端回传数据是0和1，所以要做一下处理
            this.form.isJoint = true
          } else {
            this.form.isJoint = false
          }
        }
      })
      getTempDealConfirm(this.id).then(res => {
        if (res.retCode === '0' && res.data != null) {
          this.eventDealComfirm = res.data
        }
      })
    },
    saveReplyData() { // 保存“直接回复”
      const replyForm = {
        'eventBasicInfo.id': this.eventId,
        'eventDerictReply.replyPerson': this.username,
        'eventDerictReply.replyTime': this.currentTime,
        // 'eventDerictReply.departmentId': this.deptid,
        'eventDerictReply.replyDept': this.deptname,
        'eventDerictReply.replyContent': this.form.replyContent,
        'eventDerictReply.messageContent': this.form.messageContent,
        busId: this.eventId
      }
      postTempStorage(replyForm)
        .then(() => {
          this.$message({ message: '保存成功！', type: 'success', center: true })
        })
        .catch(() => {
          this.$message({ message: '保存失败！', type: 'error', center: true })
        })
    },
    saveReportData() { // 保存“上报”
      const reportForm = {
        'eventReport.eventId': this.eventId,
        'eventReport.reportPerson': this.username,
        'eventReport.reportPhone': this.phone,
        // 'eventReport.reportUnit': this.deptid,
        'eventReport.reportUnitId': this.deptname,
        'eventReport.reportTime': this.currentTime,
        'eventReport.reportOpinion': this.eventReport.reportOpinion,
        busId: this.eventId
      }
      postTempStorage(reportForm)
        .then(() => {
          this.$message({ message: '保存成功！', type: 'success', center: true })
        })
        .catch(() => {
          this.$message({ message: '保存失败！', type: 'error', center: true })
        })
    },
    saveAssignData() { // 保存“交办”
      let assistDepartments = ''
      this.form.assistDepartments.map((item, index) => {
        if (index === 0) {
          assistDepartments += item
        } else {
          assistDepartments += ',' + item
        }
      })
      let isJoint = '0'
      if (this.form.isJoint === false) {
        isJoint = '1'
      }
      const assignForm = {
        'eventAssign.eventId': this.eventId,
        'eventAssign.acceptTime': this.acceptTime,
        'eventAssign.feedbackTime': this.feedbackTime,
        'eventAssign.phone': this.phone,
        'eventAssign.assignPerson': this.username,
        'eventAssign.assignTime': this.currentTime,
        'eventAssign.period': this.period,
        'eventAssign.isImportant': this.isImportant,
        'eventAssign.isPublic': this.isPublic,
        'eventAssign.isSpecial': this.isSpecial,
        'eventAssign.department': this.form.department,
        'assistDepartments': assistDepartments,
        'eventAssign.leaderInstruction': this.form.leaderInstruction,
        'eventAssign.assignContent': this.form.assignContent,
        busId: this.eventId,
        isJoint: isJoint
      }
      postTempStorage(assignForm)
        .then(() => {
          this.$message({ message: '保存成功！', type: 'success', center: true })
        })
        .catch(() => {
          this.$message({ message: '保存失败！', type: 'error', center: true })
        })
    },
    saveInstructData() { // 保存“批示”
      const instructForm = {
        'eventInstruction.eventId': this.eventId,
        'eventInstruction.assignPerson': this.username,
        'eventInstruction.phone': this.phone,
        'eventInstruction.instructContent': this.form.instructContent,
        busId: this.eventId
      }
      postTempStorage(instructForm)
        .then(() => {
          this.$message({ message: '保存成功！', type: 'success', center: true })
        })
        .catch(() => {
          this.$message({ message: '保存失败！', type: 'error', center: true })
        })
    },
    saveEndCheckData() { // 保存“结案审核”
      const endCheckForm = {
        'eventDealComfirm.eventId': this.eventId,
        'eventDealComfirm.serviceOpinion': this.eventDealComfirm.serviceOpinion,
        'eventDealComfirm.personOpinion': this.eventDealComfirm.personOpinion,
        'eventDealComfirm.otherPersonOpinion': this.eventDealComfirm.otherPersonOpinion,
        'eventDealComfirm.feedbackPerosn': this.eventDealComfirm.feedbackPerosn,
        'eventDealComfirm.resultOpnion': this.eventDealComfirm.resultOpnion,
        'eventDealComfirm.otherResultOpinion': this.eventDealComfirm.otherResultOpinion,
        'eventDealComfirm.isHotSpot': this.eventDealComfirm.isHotSpot,
        'eventDealComfirm.enterSampleLibrary': this.eventDealComfirm.enterSampleLibrary,
        'eventDealComfirm.openNetwork': this.eventDealComfirm.openNetwork,
        'eventDealComfirm.isCheck': this.eventDealComfirm.isCheck,
        'eventDealComfirm.isEffective': this.eventDealComfirm.isEffective,
        'eventDealComfirm.isVisit': this.eventDealComfirm.isVisit,
        'eventDealComfirm.informUnit': this.eventDealComfirm.informUnit,
        'eventDealComfirm.informTime': this.currentTime,
        'eventDealComfirm.informPerson': this.eventDealComfirm.informPerson,
        'eventDealComfirm.informPhone': this.eventDealComfirm.informPhone,
        busId: this.eventId
      }
      tempDealConfirm(endCheckForm)
        .then(() => {
          this.$message({ message: '保存成功！', type: 'success', center: true })
        })
        .catch(() => {
          this.$message({ message: '保存失败！', type: 'error', center: true })
        })
    },
    submitOtherForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const formData = {
            eventId: this.eventId,
            remarkPerson: this.username,
            remarkDept: this.deptname,
            remarkTime: this.currentTime,
            remarkContent: this.form.remarkContent
          }
          remarkEvent(formData)
            .then(() => {
              this.$message({ message: '提交成功！', type: 'success', center: true })
              this.$router.go(-1)
            })
            .catch(() => {
              this.$message({ message: '提交失败！', type: 'error', center: true })
            })
        } else {
          this.$message({ message: '验证失败！', type: 'error', center: true })
        }
      })
    },
    submitForm(formName) { // 提交表单数据
      this.$refs[formName].validate(valid => {
        if (valid) {
          debugger
          const formData = new FormData()
          if (formName === 'replyForm') { // 直接回复3
            this.replyFiles.map(item => {
              formData.append('replyFile', item)
            })
            formData.append('eventBasicInfo.id', this.eventId)
            formData.append('eventDerictReply.replyPerson', this.username)
            formData.append('eventDerictReply.replyTime', this.currentTime)
            // formData.append('eventDerictReply.departmentId', this.deptid)
            formData.append('eventDerictReply.replyDept', this.deptname)
            formData.append('eventDerictReply.replyContent', this.form.replyContent)
            formData.append('eventDerictReply.messageContent', this.form.messageContent)
            formData.append('busId', this.eventId)
            formData.append('varName', 'agreeAndOpera')
            formData.append('varValue', 3)
            formData.append('nextUserIds', 4)
          } else if (formName === 'reportForm') { // 上报5
            this.reportFiles.map(item => {
              formData.append('reportFile', item)
            })
            formData.append('eventReport.eventId', this.eventId)
            formData.append('eventReport.reportPerson', this.username)
            formData.append('eventReport.reportPhone', this.phone)
            // formData.append('eventReport.reportUnitId', this.deptid)
            formData.append('eventReport.reportUnit', this.deptname)
            formData.append('eventReport.reportTime', this.currentTime)
            formData.append('eventReport.reportOpinion', this.eventReport.reportOpinion)
            formData.append('busId', this.eventId)
            formData.append('varName', 'agreeAndOpera')
            formData.append('varValue', 5)
            formData.append('nextUserIds', 4)
          } else if (formName === 'handleForm') { // 办理7
            formData.append('eventDealInfo.eventId', this.eventId)
            formData.append('eventDealInfo.replyUnit', this.deptname)
            formData.append('eventDealInfo.departmentOffice', this.eventDealInfo.departmentOffice)
            formData.append('eventDealInfo.signLeader', this.eventDealInfo.signLeader)
            formData.append('eventDealInfo.replyPerson', this.username)
            formData.append('eventDealInfo.phone', this.phone)
            formData.append('eventDealInfo.departmentLeaderComment', this.eventDealInfo.departmentLeaderComment)
            formData.append('eventDealInfo.result', this.eventDealInfo.result)
            formData.append('busId', this.eventId)
            formData.append('varName', 'agreeAndOpera')
            formData.append('varValue', 7)
            formData.append('nextUserIds', 4)
          } else if (formName === 'endCaseForm') { // 结案申请4
            this.endCaseFiles.map(item => {
              formData.append('endCaseFile', item)
            })
            formData.append('eventDealInfo.eventId', this.eventId)
            formData.append('eventDealInfo.replyUnit', this.deptname)
            formData.append('eventDealInfo.departmentOffice', this.eventDealInfo.departmentOffice)
            formData.append('eventDealInfo.replyPerson', this.username)
            formData.append('eventDealInfo.phone', this.phone)
            formData.append('eventDealInfo.departmentLeaderComment', this.eventDealInfo.departmentLeaderComment)
            formData.append('eventDealInfo.result', this.eventDealInfo.result)
            formData.append('busId', this.eventId)
            formData.append('varName', 'agreeAndOpera')
            formData.append('varValue', 4)
            formData.append('nextUserIds', 4)
          } else if (formName === 'assignForm') { // 交办2
            let assistDepartments = ''
            this.form.assistDepartments.map((item, index) => {
              if (index === 0) {
                assistDepartments += item
              } else {
                assistDepartments += ',' + item
              }
            })
            let isJoint = '0'
            if (this.form.isJoint === false) {
              isJoint = '1'
            }
            this.assignFiles.map(item => {
              formData.append('assignFile', item)
            })
            formData.append('eventAssign.eventId', this.eventId)
            formData.append('eventAssign.acceptTime', this.acceptTime)
            formData.append('eventAssign.feedbackTime', this.feedbackTime)
            formData.append('eventAssign.phone', this.phone)
            formData.append('eventAssign.assignPerson', this.username)
            formData.append('eventAssign.assignTime', this.currentTime)
            formData.append('eventAssign.isImportant', this.form.isImportant)
            formData.append('eventAssign.isPublic', this.form.isPublic)
            formData.append('eventAssign.isSpecial', this.form.isSpecial)
            formData.append('eventAssign.department', this.form.department)
            formData.append('assistDepartments', assistDepartments)
            formData.append('eventAssign.leaderInstruction', this.form.leaderInstruction)
            formData.append('eventAssign.assignContent', this.form.assignContent)
            formData.append('busId', this.eventId)
            formData.append('isJoint', isJoint)
            formData.append('varName', 'agreeAndOpera')
            formData.append('varValue', 2)
            formData.append('nextUserIds', 4)
          } else if (formName === 'instructForm') { // 批示8
            debugger
            this.instructFiles.map(item => {
              formData.append('instructFile', item)
            })
            formData.append('eventInstruction.eventId', this.eventId)
            formData.append('eventInstruction.assignPerson', this.username)
            formData.append('eventInstruction.phone', this.phone)
            formData.append('eventInstruction.instructContent', this.form.instructContent)
            formData.append('busId', this.eventId)
            formData.append('varName', 'agreeAndOpera')
            formData.append('varValue', 8)
            formData.append('nextUserIds', 4)
          } else if (formName === 'delayCaseForm') { // 延期审核 同意0 不同意1
            formData.append('postponeBack.id', this.postponeBack.id)
            formData.append('postponeBack.eventId', this.postponeBack.eventId)
            formData.append('postponeBack.delayDay', this.postponeBack.delayDay)
            formData.append('postponeBack.createruser', this.postponeBack.createruser)
            formData.append('postponeBack.postPhone', this.postponeBack.postPhone)
            formData.append('postponeBack.postponeReason', this.postponeBack.postponeReason)
            formData.append('postponeBack.examinationResault', this.postponeBack.examinationResault)
            formData.append('postponeBack.examinationOpinion', this.postponeBack.examinationOpinion)
            formData.append('busId', this.eventId)
            formData.append('varName', 'agreeAndOpera')
            formData.append('varValue', this.postponeBack.examinationResault)
            formData.append('nextUserIds', 4)
          } else if (formName === 'applyDelayForm') { // 延期申请6
            formData.append('postponeBack.eventId', this.eventId)
            formData.append('postponeBack.examinationResault', this.postponeBack.examinationResault)
            formData.append('postponeBack.delayDay', this.postponeBack.delayDay)
            formData.append('postponeBack.createruser', this.username)
            formData.append('postponeBack.postPhone', this.phone)
            formData.append('postponeBack.postponeReason', this.postponeBack.postponeReason)
            formData.append('busId', this.eventId)
            formData.append('varName', 'agreeAndOpera')
            formData.append('varValue', 6)
            formData.append('nextUserIds', 4)
          } else if (formName === 'endCheckForm') { // 结案审核0
            formData.append('eventDealComfirm.eventId', this.eventId)
            formData.append('eventDealComfirm.serviceOpinion', this.eventDealComfirm.serviceOpinion)
            formData.append('eventDealComfirm.personOpinion', this.eventDealComfirm.personOpinion)
            formData.append('eventDealComfirm.otherPersonOpinion', this.eventDealComfirm.otherPersonOpinion)
            formData.append('eventDealComfirm.feedbackPerosn', this.eventDealComfirm.feedbackPerosn)
            formData.append('eventDealComfirm.resultOpnion', this.eventDealComfirm.resultOpnion)
            formData.append('eventDealComfirm.otherResultOpinion', this.eventDealComfirm.otherResultOpinion)
            formData.append('eventDealComfirm.isHotSpot', this.eventDealComfirm.isHotSpot)
            formData.append('eventDealComfirm.enterSampleLibrary', this.eventDealComfirm.enterSampleLibrary)
            formData.append('eventDealComfirm.openNetwork', this.eventDealComfirm.openNetwork)
            formData.append('eventDealComfirm.isCheck', this.eventDealComfirm.isCheck)
            formData.append('eventDealComfirm.isEffective', this.eventDealComfirm.isEffective)
            formData.append('eventDealComfirm.isVisit', this.eventDealComfirm.isVisit)
            formData.append('eventDealComfirm.informUnit', this.eventDealComfirm.informUnit)
            formData.append('eventDealComfirm.informTime', this.currentTime)
            formData.append('eventDealComfirm.informPerson', this.eventDealComfirm.informPerson)
            formData.append('eventDealComfirm.informPhone', this.eventDealComfirm.informPhone)
            formData.append('busId', this.eventId)
            formData.append('varName', 'agreeAndOpera')
            formData.append('varValue', 0)
            formData.append('nextUserIds', 4)
          } else if (formName === 'backForm') { // 回退9
            formData.append('postponeBack.id', this.postponeBack.id)
            formData.append('postponeBack.eventId', this.postponeBack.eventId)
            formData.append('postponeBack.backReason', this.postponeBack.backReason)
            formData.append('busId', this.eventId)
            formData.append('varName', 'agreeAndOpera')
            formData.append('varValue', 9)
            formData.append('nextUserIds', 4)
          } else if (formName === 'countryBackForm') { // 县级退办1
            formData.append('eventDealComfirm.eventId', this.eventId)
            formData.append('eventDealComfirm.delayDay', this.eventDealComfirm.delayDay)
            formData.append('eventDealComfirm.rejectReason', this.eventDealComfirm.rejectReason)
            formData.append('busId', this.eventId)
            formData.append('varName', 'agreeAndOpera')
            formData.append('varValue', 1)
            formData.append('nextUserIds', 4)
          }
          postFormData(formData)
            .then(() => {
              this.$message({ message: '提交成功！', type: 'success', center: true })
              this.$router.go(-1)
            })
            .catch(() => {
              this.$message({ message: '提交失败！', type: 'error', center: true })
            })
        } else {
          this.$message({ message: '验证失败！', type: 'error', center: true })
        }
      })
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    },
    replyFilesChange(file, fileList) {
      this.replyFiles = []
      fileList.map(item => {
        this.replyFiles.push(item.raw)
      })
    },
    replyFilesRemove(file, fileList) {
      this.replyFiles = []
      fileList.map(item => {
        this.replyFiles.push(item.raw)
      })
    },
    assignFilesChange(file, fileList) {
      this.assignFiles = []
      fileList.map(item => {
        this.assignFiles.push(item.raw)
      })
    },
    assignFilesRemove(file, fileList) {
      this.assignFiles = []
      fileList.map(item => {
        this.assignFiles.push(item.raw)
      })
    },
    instructFilesChange(file, fileList) {
      this.instructFiles = []
      fileList.map(item => {
        this.instructFiles.push(item.raw)
      })
    },
    instructFilesRemove(file, fileList) {
      this.instructFiles = []
      fileList.map(item => {
        this.instructFiles.push(item.raw)
      })
    },
    reportFilesChange(file, fileList) {
      this.reportFiles = []
      fileList.map(item => {
        this.reportFiles.push(item.raw)
      })
    },
    reportFilesRemove(file, fileList) {
      this.reportFiles = []
      fileList.map(item => {
        this.reportFiles.push(item.raw)
      })
    },
    endCaseFilesChange(file, fileList) {
      this.endCaseFiles = []
      fileList.map(item => {
        this.endCaseFiles.push(item.raw)
      })
    },
    endCaseFilesRemove(file, fileList) {
      this.endCaseFiles = []
      fileList.map(item => {
        this.endCaseFiles.push(item.raw)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
