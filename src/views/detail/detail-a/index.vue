<template>
    <div>
        <div class="title">事件详情</div>
        <table class="table">
            <colgroup>
                <col width="15%">
                <col width="35%">
                <col width="15%">
                <col width="35%">
            </colgroup>
            <tbody>
                <tr>
                    <th>反映编号</th>
                    <td>{{data.eventNo}}
                    <input type="text" name="eventId" style="display: none"/>
                    </td>
                    <th>反映时间</th>
                    <td>{{data.issueTime}}</td>
                </tr>
                <tr class="even">
                    <th>事件类型</th>
                    <td>{{data.eventTypeStr}}</td>
                    <th>反映渠道</th>
                    <td>{{data.eventChannelName}}</td>
                </tr>
                <tr>
                    <th>姓名</th>
                    <td>{{data.name}}</td>
                    <th>联系方式</th>
                    <td>{{data.phone}}</td>
                </tr>
                <tr class="even">
                    <th>反映主题</th>
                    <td>{{data.subject}}</td>
                    <th>归属类别</th>
                    <td>{{data.attrType|aTypeFilter}}</td>
                </tr>
                <tr>
                    <th>紧急程度</th>
                    <td>{{data.emDegree|emFilter}}</td>
                    <th>地址</th>
                    <td>{{data.address}}</td>
                </tr>
                <tr class="even">
                    <th>发生网格</th>
                    <td>{{data.occurOrg}}</td>
                    <th>是否保密</th>
                    <td>{{data.isSecret|normalFilter}}</td>
                </tr>
                <tr id="eventContent">
                    <th>反映内容</th>
                    <td>{{data.issueContent}}</td>
                    <th>相似事件</th>
                    <td><el-button type="primary" size="mini" v-if="relatedEventVisiable" @click="handleRelatedEvent" plain>查看</el-button></td>
                </tr>
            </tbody>
        </table>


        <el-collapse-transition>
        <div v-if="content">
            <table class="table">
                <colgroup>
                    <col width="15%">
                    <col width="18%">
                    <col width="15%">
                    <col width="18%">
                    <col width="15%">
                    <col width="19%">
                </colgroup>
                <tbody>
                    <tr class="even">
                        <th>初重标识</th>
                        <td>{{data.firstStatus|fStatusFilter}}</td>
                        <th>反映类型</th>
                        <td>{{data.eventTypeName}}</td>
                        <th>催办次数</th>
                        <td>{{data.reminderCount}}</td>
                    </tr>
                    <tr>
                        <th>是否排查</th>
                        <td>{{data.isCheck|normalFilter}}</td>
                        <th>是否效能件</th>
                        <td>{{data.isEffective|normalFilter}}</td>
                        <th>是否二次交办</th>
                        <td>{{data.isSecondAssignEvent|normalFilter}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="title">反映人信息</div>
            <table class="table">
                <colgroup>
                    <col width="15%">
                    <col width="18%">
                    <col width="15%">
                    <col width="18%">
                    <col width="15%">
                    <col width="19%">
                </colgroup>
                <tbody>
                    <tr>
                        <th>姓名</th>
                        <td>{{data.name}}</td>
                        <th>性别</th>
                        <td>{{data.gender|genderFilter}}</td>
                        <th>民族</th>
                        <td>{{data.nation}}</td>
                    </tr>
                    <tr class="even">
                        <th>身份证号</th>
                        <td>{{data.certificateNo}}</td>
                        <th>年龄</th>
                        <td>{{data.age}}</td>
                        <th>从事事业</th>
                        <td>{{data.job}}</td>
                    </tr>
                    <tr>
                        <th>电子邮箱</th>
                        <td>{{data.email}}</td>
                        <th>移动电话</th>
                        <td>{{data.mobile}}</td>
                        <th>联系电话</th>
                        <td>{{data.phone}}</td>
                    </tr>
                    <tr class="even">
                        <th>住址</th>
                        <td colspan="5">{{data.address}}</td>
                    </tr>
                    <tr>
                        <th>问题发生地</th>
                        <td colspan="5">{{data.occurPlace}}</td>
                    </tr>
                </tbody>
            </table> 
        </div>
        </el-collapse-transition>
        <div class="hrLine">
            <hr><a @click="handleContent">{{hrTag}}</a>
        </div>
    </div>
</template>

<script>
import { getOne, getRelatedEvent } from '@/api/detail'
export default {
  props: ['id', 'relatedEventVisiable'],
  data() {
    return {
      content: false,
      hrTag: '更多',
      data: {
        eventNo: '',
        issueTime: '',
        eventTypeStr: '',
        eventChannelName: '',
        name: '',
        phone: '',
        subject: '',
        attrType: '',
        emDegree: '',
        address: '',
        occurOrg: '',
        isSecret: '',
        issueContent: '',
        firstStatus: '',
        eventTypeName: '',
        reminderCount: '',
        isCheck: '',
        isEffective: '',
        isSecondAssignEvent: '',
        gender: '',
        nation: '',
        certificateNo: '',
        age: '',
        job: '',
        email: '',
        mobile: '',
        occurPlace: ''
      }
    }
  },
  created() {
    this.initDetail()
  },
  methods: {
    initDetail() {
      getOne(this.id).then(res => {
        if (res.retCode === '0' && res.data != null) {
          this.data = res.data
        }
      })
    },
    handleContent() { // 反映人信息部分隐藏
      this.content = !this.content
      this.hrTag = this.content === true ? '隐藏' : '更多'
    },
    handleRelatedEvent() { // 查看相似事件按钮
      getRelatedEvent(this.id, this.data.issueContent)
        .then(res => {
          if (res.retCode === '0' && res.data != null) {
            this.$router.push({ name: 'relatedDetail', params: { id: res.data.id }})
          } else {
            this.$message({ message: '没有相似内容！', type: 'info', center: true })
          }
        })
        .catch(() => {
          this.$message({ message: 'error!', type: 'error', center: true })
        })
    }
  },
  filters: {
    normalFilter(value) {
      var filter = ['是', '否']
      return filter[value]
    },
    emFilter(value) {
      var filter = ['平急', '紧急', '特急']
      return filter[value]
    },
    genderFilter(value) {
      var filter = ['女', '男']
      return filter[value]
    },
    fStatusFilter(value) {
      var filter = ['初', '重']
      return filter[value]
    },
    aTypeFilter(value) {
      var filter = ['', '百姓热线', '信访局', '无违建县', '五水共治', '110联动', '文明城市创建', '领导交办', '群众线索']
      return filter[value]
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
.table {
    width: 100%;
}
.table tr {
	height: 28px;
    line-height: 28px;
    font-size: 14px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.table th {
    color: #909399;
}
.table td {
    color: #606266;
}
.table th,td {
    border-bottom: 1px solid #ebeef5;
}
.hrLine {
	width: 100%;
	position: relative;
	height: 17px;
}
.hrLine > hr {
	border: dashed 1px #bbbbbb;
	vertical-align: middle;
	margin: 8px 0px;
	position: absolute;
	left: 0px;
    right: 30px;
}
.hrLine a {
	float: right;
    text-align: right;
	line-height: 17px;
	color: #409EFF;
	cursor:pointer;
    font-size: 12px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
</style>


