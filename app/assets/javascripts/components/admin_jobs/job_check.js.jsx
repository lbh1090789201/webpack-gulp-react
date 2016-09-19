var AdminJob = React.createClass({
  //初始化
  getInitialState: function() {
    return {
      jobs: this.props.data,
      checkValue: [],
      view_display: false,
      jid: '',
      close: this.props.close,
    }
  }
  ,handleCheck: function(e) {
    var checkValues = this.state.checkValue.slice(),
        newVal = e.target.value,
        index = checkValues.indexOf(newVal)
    //判断checkValues是否存在 newVal
    if(index == -1) {
      checkValues.push(newVal)
    } else {
      checkValues.splice(index, 1)
    }

    this.setState({
      checkValue: checkValues,
    })

    return e
  }
  // 点击审核通过或者审核失败发生的事件
  ,handleClick: function(e) {
    e.preventDefault();

    var name = e.target.name,
        ids = this.state.checkValue.toString(),
        status= e.target.value

    $.ajax({
      url: '/admin/jobs/update',
      type: 'PATCH',
      data: {'ids': ids, 'status': status},
      success: function(data) {
        this.setState({
          jobs : data.jobs,
          checkValue: [],
        })
        $('input:checkbox').removeAttr('checked');
        myInfo('审核成功！', 'success')
      }.bind(this),
      error: function(data){
        let info = data.responseText
        myInfo(info["info"], 'fail')
      },
    })
  }
  ,bandleSubmit: function(){
    console.log(this)
  }
  // 输出组件
  ,render: function() {
    var jobs_all = [],
        job_view = this.state.view_display ? <AdminJobSee dad={this} /> : ''

    this.state.jobs.forEach(
      function(job, index) {
        jobs_all.push(
          <Job key={index} data={job} handleCheck={this.handleCheck} index={index} dad={this} />
        )
      }.bind(this)
    )

    return (
      <div className="admin-jobs">
        <ReviewJob dad={this} />
        <div className="handle-button">
        <button className="btn btn-info pull-right" onClick={this.handleClick} name="passBtn" value="release">审核通过</button>
        <button className="btn btn-danger pull-right" onClick={this.handleClick} name="refuseBtn" value="fail">审核拒绝</button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>序号</th>
              <th>职位名称</th>
              <th>职位类型</th>
              <th>行业</th>
              <th>发布机构</th>
              <th>提交时间</th>
              <th>状态</th>
              <th>详情</th>
              <th>选择</th>
            </tr>
          </thead>
          <tbody>
            {
              jobs_all
            }
          </tbody>
        </table>
        {job_view}
      </div>
    )
  }
})

/********************** 审核表单 **********************/
var ReviewJob = React.createClass({
  //初始化搜索数据
  getInitialState: function() {
    return {
      time_after: '',
      time_before: '',
      job_type: '',
      hospital_name: '',
      job_name: '',
      job_type: '',
    }
  }
  ,componentDidMount: function() {
    let job_types = ["机构管理人员", "综合门诊/全科医生", "内科医生", "外科医生",
                    "专科医生", "牙科医生", "美容整形师", "麻醉医生", "放射科医师", "理疗师",
                    "中医科医生", "针灸/推拿", "儿科医生", "心理医生", "病理医生", "临床医生", "营养师",
                    "药库主任/药剂师", "医药学检验", "公共卫生/疾病控制", "护理主任/护士长", "护士/护理人员",
                    "验光师", "医学技术支持", "实验室主管", "病理技术员", "病理研究员", "医政研究员", "护管经理",
                    "实施工程师", "临检技术员", "采购专员", "人事专员", "培训经理", "平台主管", "销售", "销售经理",
                    "客户经理", "市场经理", "区域专员", "区域经理", "实验技术员", "检验技术员", "病理室技术员",
                    "测序技术员", "供应链工程师", "质量技术员", "Web前端", "C#程序员", "软件架构师",
                    "质量专员", "质量负责人", "绩效经理", "品牌经理", "需求经理", "仓库管理员", "行政专员",
                    "临检专员", "运营主管", "采购主管", "交付管理", "实验室管理员",
                    "物流专员", "物流主管", "临检内勤", "外勤", "其它"]

    let parent = document.getElementById("job_type")
    for(let i=0;i<job_types.length;i++) {
        let option = document.createElement('option')

        option.value = job_types[i]
        option.innerText = job_types[i]
        parent.appendChild(option)
    }

    formJobCheck('#form_job_check')
  }
  ,handleFocus: function(e) {
      let id = e.target.id
      myDatePicker(id, 'time_begin', 'time_end')
    }
  //点击搜索提交按钮事件1
  ,handleSubmit: function(e){
    e.preventDefault()
    if(invalid('#form_job_check')) return // 不合法就返回

    //隐藏分页码
    $('.pagination').hide()
    // 获取真实dom节点
    let time_begin = this.refs.time_begin.value,
        time_end = this.refs.time_end.value,
        job_type = this.refs.job_type.value,
        hospital_name = this.refs.hospital_name.value,
        job_name = this.refs.job_name.value

    $.ajax({
      url: '/admin/jobs/check',
      type: 'GET',
      data: {
        'search': true,
        'time_after': time_begin,
        'time_before': time_end,
        'job_type': job_type,
        'hospital_name': hospital_name,
        'job_name': job_name
      },
      success: function(data) {
        console.log(this)
        this.props.dad.setState({jobs : data.jobs})

      }.bind(this),
      error: function(data){
        alert(data.responseText)
      },

    })
  }
  ,render: function() {


    return (
      <form className='form-inline' onSubmit={this.handleSubmit} id='form_job_check'>
        <div className='form-group col-sm-4'>
            <input type="text" id="time_begin" className="form-control" placeholder='开始时间' name='time_end'
                   onFocus={this.handleFocus} defaultValue={this.state.time_after} ref="time_begin" />
          </div>
          <div className='form-group col-sm-4'>
            <input type="text" id="time_end" className="form-control" placeholder='结束时间' name='time_begin'
                   onFocus={this.handleFocus} defaultValue={this.state.time_before} ref="time_end" />
          </div>
          <div className='form-group col-sm-4'>
            <select id="job_type" name="job_type" ref="job_type" className="form-control">
              <option value="">工作类型</option>
            </select>
          </div>
          <div className='form-group col-sm-4'>
            <input type="text" className="form-control" placeholder='机构名称' name='hospital_name'
                   defaultValue={this.state.hospital_name} ref="hospital_name" />
          </div>
          <div className='form-group col-sm-4'>
            <input type="text" className="form-control" placeholder='职位名称' name='job_name'
                   defaultValue={this.state.job_name} ref="job_name" />
          </div>
          <button type='submit' className='btn btn-primary search'>查询</button>
     </form>
    )
  }
})

/********************** 表单验证 **********************/
 function formJobCheck(id) {
   $(id).validate({
     rules: {
       time_end: {
         date: true,
       },
       time_begin: {
         date: true,
       },
       hospital_name: {
         maxlength: 20,
         pattern: '^[\u4e00-\u9fa5_a-zA-Z0-9]+$'
       },
       job_name: {
         maxlength: 10,
         pattern: '^[\u4e00-\u9fa5_a-zA-Z0-9]+$'
       },
     },
     messages: {
       hospital_name: {
         pattern: '请输入中文、英文或数字'
       },
       job_name: {
         pattern: '请输入中文、英文或数字'
       }
     }
   })
 }
