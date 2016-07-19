/*请求失败弹窗,1.5秒后自动消失*/
// text: 弹窗展示的内容信息
// div_class: 弹窗插入的父节点id　或 class
function FailMask(div_class,text) {
  var div = $('<div class="mask-fail"></div>');
  var p = $('<p class="mask-middle"></p>');
  p.text(text);
  div.append(p);
  var parent_div = $(div_class);
  parent_div.append(div);
  var timer = setTimeout(function(){
    div.remove();
  },1000);
}

/*返回顶部*/
$(document).scrollTop('0');

/*屏幕自适应开始*/
screenWidth = window.screen.width;
if (screenWidth == 414){
    $('html').css('font-size','20px');
}else{
    $('html').css('font-size',screenWidth/414*20+'px');
};
/*屏幕自适应结束*/

/* 取得屏幕高度并减去 head 开始 */
function fullScreen(dom) {
  $(dom).css('height', $(document.body).height() - 2.32*20);
}
/* 取得屏幕高度并减去 head 结束 */

/*
 * 超过一定字体变成省略号 开始
 * 传入jq选择dom,word值可不传
 */
function wordLimit(dom, word) {
  var content = $(dom).html();

  word ? word = word : word = 60;

  if (content.length > word) {
    $(dom).html(content.substr(0, word) + '……');
  } else {

  }
};
/* 超过一定字体变成省略号 结束 */

/* 蒙版 开始 */

// 进入页面即生成蒙版div

// function generate_mask() {
//   var parentdiv = $('<div></div>');
//   parentdiv.attr('class','before-mask div-hidden');;
//   for (var i = 0; i < obj.length; i++) {
//     var childBtn = $('<p>'+obj[i]+'</p>');
//     childBtn.attr('value',obj[i]);
//     childBtn.attr('onclick', 'change_val(this)');
//     childBtn.attr('class', pclass)
//     parentdiv.append(childBtn);
//   }
// }

function workExperience(obj,api,pclass) {
  // var now_url = window.location.href;
  // now_url+= "?index=1"
  // window.location.href = now_url
  var parentdiv = $('<div></div>');
  parentdiv.attr('class','before-mask div-hidden');;
  for (var i = 0; i < obj.length; i++) {
    var childBtn = $('<p>'+obj[i]+'</p>');
    childBtn.attr('value',obj[i]);
    childBtn.attr('onclick', 'change_val(this)');
    childBtn.attr('class', pclass);
    parentdiv.append(childBtn);
  }
  var workExperienceDiv = $('.edit_basic');
  parentdiv.appendTo(workExperienceDiv);
  var delete_mask = $('<p></p>');
  delete_mask.text('返回');
  delete_mask.attr('onClick','delete_mask()');
  parentdiv.append(delete_mask);
  // edit_title =  $(".title").text();
  // var h1 = $(api).siblings().text();
  // $(".title").text(h1);
  // $('.right').text('');
  //生成返回按钮
  // var span = document.createElement("span");
  // span.setAttribute('class','title-over');
  // span.setAttribute('onclick','TitleOver(this)');
  // console.log(span);
  // var div = $(".top");
  // div.prepend(span);
  $(document).scrollTop('0');
}

function change_val(obj) {
  $("#" + $(obj).attr("class")).attr('value', obj.value);
  // $('.title').text(edit_title)
  // $('.right').text('保存');
  $('.before-mask').animate({
    top: '1500px',
  },300);
  $('.before-mask').css("display","none");
};

function delete_mask() {
  $('.before-mask').remove();
}

// function TitleOver(obj) {
//   $(".title-over").hide();
//   $('.title').text(edit_title);
//   $('.right').text('保存');
//   $('.before-mask').animate({
//     top: '1500px',
//   },300);
//   $('.before-mask').css("display","none");
// }
/* 蒙版 结束 */


/* 模拟点击右上按钮 开始 bobo */
function clickRignt(ojb) {
  $('#btn-submit-btn').bind('click', function() {
    $(ojb).trigger("click");
    console.log('ok');
  });

  $('.btm-save').bind('click', function() {
    $(ojb).trigger("click");
    console.log('ok');
  });
}
/* 模拟点击右上按钮 结束 bobo */

/* notice 自动消失 开始 bobo */
setTimeout(function() {
    $('.alert').fadeOut();
}, 1000);
/* notice 自动消失 结束 bobo */


/*
 * 单次刷新 开始 bobo
 * 调用方法,页面引入 $(refreshOnce());
 */
function refreshOnce() {
  if(getCookie('refresh') != null) {
    delCookie('refresh');
  } else {
    setCookie('refresh','true');
    refresh_cli()
  }
};

// 设置cookie
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

// 读取cookie
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

// 删除cookie
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/* 单次刷新 结束 bobo */

// 编辑　删除弹窗
function ClickShowHide(){
  $("#popup_delete").show();
}
function ClickDeleteBtn(obj){
  var text = $(obj).text();
  if(text == "取消"){
    $("#popup_delete").hide();
  }
  if(text == "确定"){
    $('#delete_bottom_id')[0].click();
      $("#popup_delete").hide();
  }
}


// 切换 job & hospital
  function job_page() {
    $('#job-detail').show();
    $('#hospital_detail').hide();
    $('#job_page').attr('class', 'job-page');
    $('#hospital_page').attr('class', 'hospital-page');
  }

  function hospital_page() {
    $('#job-detail').hide();
    $('#hospital_detail').show();
    $('#job_page').attr('class', 'hospital-page');
    $('#hospital_page').attr('class', 'job-page');
  }

  //清空input内容
  function EmptyCont(input_id) {
  	$("#"+input_id).val('');
  }

  //设定返回链接，用在页面头部
  function set_back(my_url){
        var u = navigator.userAgent;
      	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

        //安卓设置返回的链接中的独有包含字段
      	var androidUrl = my_url == null ? "toDetectionReady" : my_url;
        //IOS设置返回的链接中的独有包含字段
      	var iosUrl={};
      	iosUrl.faction="setBackUrl";
      	iosUrl.type="1";
      	var backUrl={};
      	backUrl.from_index = my_url == null ? "/pageJump/toDetectionReady.do" : my_url;
        console.log(backUrl)
      	iosUrl.parameter=backUrl;


      	if(isiOS){
        	  window.webkit.messageHandlers.interOp.postMessage(JSON.stringify(iosUrl));
          }
        if(isAndroid){
            	window.js2MobInterface.setBackUrl(androidUrl);
        }
  }

  function go_home(){
		var u = navigator.userAgent;
		var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

		//ios首页返回app
		var iosUrl={};
		iosUrl.faction="setBackUrl";
		iosUrl.type="1";
		var backUrl={};
		backUrl.setBackUrl="backHome";
		iosUrl.parameter=backUrl;

	    //固定接头体属性设定
	    //console.log(JSON.stringify(iosTitle));
		console.log(JSON.stringify(iosUrl));

		if(isiOS){
	    	 window.webkit.messageHandlers.interOp.postMessage(JSON.stringify(iosUrl));
	    }
	  if(isAndroid){
		 	//在首页，退出web
			window.js2MobInterface.closeWeb();
		}
	}

  // IOS 或 安卓刷新一下页面
  function refresh_cli() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端

    if(isiOS) {
      location.reload(true)
      console.log('ios refresh ok')
    } else if(isAndroid) {
      mWebView.reload()
      console.log('Android refresh ok')
    } else {
      window.location.replace(window.location.href);
    }
  }

// 获取相对路径
  function GetUrlRelativePath()
　　{
　　　　var url = document.location.toString();
　　　　var arrUrl = url.split("//");

　　　　var start = arrUrl[1].indexOf("/");
　　　　var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

　　　　if(relUrl.indexOf("?") != -1){
　　　　　　relUrl = relUrl.split("?")[0];
　　　　}
　　　　return relUrl;
　　}

  function getWholeUrl() {
    var url = document.location.toString();
    if(url.indexOf("?") != -1){
    　　　　　　relUrl = relUrl.split("?")[0];
    　　　　}
    return relUrl;
  }
