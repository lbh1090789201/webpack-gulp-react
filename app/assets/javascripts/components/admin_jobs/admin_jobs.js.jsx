var AdminJob = React.createClass({
  //初始化
  getInitialState: function() {
    return {
      jobs: this.props.data,
      checkValue: [],
      view_display: false,
      jid: '',
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
        this.setState({jobs : data.jobs})
      }.bind(this),
      error: function(data){
        alert(data.responseText)
      },
    })
  }
  ,bandleSubmit: function(){
    console.log(this)
  }
  // 输出组件
  ,render: function() {
    var see_job = this.state.view_display? <AdminJobSee job={this.state.jobs} dad={this} /> : '',
        jobs_all = []

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
              // this.state.jobs.map(function(job) {
              //   // console.log(this.AdminJob.prototype.clickMe)
              //   return(<Job key={job.id} data={job} handleCheck={this.AdminJob.prototype.handleCheck} />)
              // })
              jobs_all
            }
          </tbody>
        </table>
        {see_job}
      </div>
    )
  }
})
