var FairNow = React.createClass({
  getInitialState: function() {
    return {
      new_display: false,
      edit_display: false,
      fairs: this.props.fairs,
      fair: '',
      index: 0,
    }
  }
  ,handleClick: function(e) {
    let key = e.target.name,
        val = JSON.parse(e.target.value);

    this.setState({
      [key]: val
    })
  }
  ,render: function() {
    let fair_new = this.state.new_display ? <FairNew dad={this} /> : '',
        fair_edit = this.state.edit_display ? <FairEdit dad={this} /> : ''

    return (
      <div className="main">
        <FairForm dad={this}/>
        <FairBtn handleClick={this.handleClick}/>
        <FairTable fairs={this.state.fairs} dad={this} />
        {fair_new}
        {fair_edit}
      </div>
    )
  }
})

/*********** 发布按钮 ************/
var FairBtn = React.createClass({
  render: function() {
    return (
      <div className="handle-button">
        <button className="btn btn-info pull-right" onClick={this.props.handleClick} name="new_display" value="true" >发布专场</button>
      </div>
    )
  }
})

/*********** 搜索表格 ************/
var FairForm = React.createClass({
  getInitialState: function() {
    return {
      status: '',

    }
  }
  ,handleRadio: function(e) {
    this.setState({
      status: e.target.value
    })
  }
  ,handleFocus: function(e) {
      let id = e.target.id

      $("#"+id).datetimepicker({
        language: 'zh-CN',
        format: "yyyy-mm-dd",
        autoclose: true,
        minView: "month",
        todayBtn:  1,
        showMeridian: 1,
      });
    }
  ,handleSubmit: function(e) {
    e.preventDefault()
    $(".pagination").hide()

    $.ajax({
      url: '/admin/fairs',
      type: 'GET',
      data: {
        search: true,
        status: this.state.status,
        time_from: this.refs.time_from.value,
        time_to: this.refs.time_to.value,
        name: this.refs.name.value,
      },
      success: function(data) {
        this.props.dad.setState({
          fairs: data.fairs
        })
      }.bind(this),
      error: function(data) {
        alert('查询失败。')
      }
    })
  }
  ,render: function() {
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <div className='form-group col-sm-12'>
          <FairRadio handleRadio={this.handleRadio} />
        </div>
          <div className='form-group col-sm-3'>
            <input type="text" id="time_from" className="form-control" placeholder='开始时间' name='time_from'
                  onFocus={this.handleFocus} defaultValue={this.state.time_from} ref="time_from" />
          </div>
          <div className='form-group col-sm-3'>
            <input type="text" id="time_to" className="form-control" placeholder='结束时间' name='time_to'
                   onFocus={this.handleFocus} defaultValue={this.state.time_to} ref="time_to" />
          </div>
          <div className='form-group col-sm-3'>
            <input type="text" className="form-control" placeholder='专场名' name='name'
                   defaultValue={this.state.show_name} ref="name" />
          </div>
          <button type='submit' className='btn btn-primary'>查询</button>
     </form>
    )
  }
})

var FairRadio = React.createClass({
  render: function() {
    return (
      <span>
        <label className="checkbox-inline">
        <input onChange={this.props.handleRadio} name="goodRadio" type="radio" value="" />全部
        </label>

        <label className="checkbox-inline">
        <input onChange={this.props.handleRadio} name="goodRadio" type="radio" value="processing" />进行中
        </label>

        <label className="checkbox-inline">
        <input onChange={this.props.handleRadio} name="goodRadio" type="radio" value="pause" />暂停中
        </label>
      </span>
    )
  }
});


/*********** 专场列表 ***********/
var FairTable = React.createClass({
  getInitialState: function() {
    return {

    }
  }
  ,render: function() {
    return (
      <table className="table table-bordered">
        <FairTableHead />
        <FairTableContent fairs={this.props.fairs} dad={this.props.dad} />
      </table>
    )
  }
})

var FairTableHead = React.createClass({
  render: function() {
    return (
      <thead>
        <tr>
          <th>序号</th>
          <th>专场名称</th>
          <th>开始时间</th>
          <th>结束时间</th>
          <th>参加机构数</th>
          <th>发布职位数</th>
          <th>收到简历数</th>
          <th>状态</th>
          <th>参与机构</th>
          <th>修改专场</th>
        </tr>
      </thead>
    )
  }
})

var FairTableContent = React.createClass({
  render: function() {
    return (
      <tbody>
        {
          this.props.fairs.map(
            function(fair, index) {
              return (<FairItem key={fair.id} fair={fair} index={index} dad={this.props.dad} />)
            }.bind(this)
          )
        }
      </tbody>
    )
  }
})

var FairItem = React.createClass({
  clickEdit: function() {
    this.props.dad.setState({
      fair: this.props.fair,
      index: this.props.index,
      edit_display: true
    })
  }
  ,render: function() {
    let fair = this.props.fair,
        index = this.props.index + 1

    return (
      <tr>
        <td>{index}</td>
        <td>{fair.name}</td>
        <td>{fair.begain_at.slice(0, 10)}</td>
        <td>{fair.end_at.slice(0, 10)}</td>
        <td>{fair.hospitals_count}</td>
        <td>{fair.jobs_count}</td>
        <td>{fair.resumes_count}</td>
        <td>{trans_fair(fair.status)}</td>
        <td><a href={"/admin/fairs/" + fair.id + "/fair_hospitals"} className="btn btn-primary btn-form">管理</a></td>
        <td><button onClick={this.clickEdit} className="btn btn-default btn-form">修改</button></td>
      </tr>
    )
  }
})

/********** 转译专场状态 ************/
function trans_fair(status) {
  switch (status) {
    case 'processing':
      return '进行中'
      break
    case 'pause':
      return '已暂停'
      break
    case 'end':
      return '已结束'
      break
    default:
      return '未知'
  }
}
