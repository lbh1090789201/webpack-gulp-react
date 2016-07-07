
/* new页面类型选择脚本 开始 */
function JobBasicNew(obj,api,pclass) {
  var parentdiv = $('<div></div>');
  parentdiv.attr('class','before-mask');
  for (var i = 0; i < obj.length; i++) {
    var childBtn = $('<p>'+obj[i]+'</p>');
    childBtn.attr('value',obj[i]);
    childBtn.attr('onclick', 'change_val(this)');
    childBtn.attr('class', pclass)
    parentdiv.append(childBtn);
  }
  var workExperienceDiv = $('#job_basic');
  parentdiv.appendTo(workExperienceDiv);
  edit_title =  $(".title").text();
  var h1 = $(api).siblings().text();
  $(".title").text(h1);
  // $('.right').text('');
  //生成返回按钮
  var span = document.createElement("span");
  span.setAttribute('class','title-over');
  span.setAttribute('onclick','TitleOver(this)');
  var div = $(".top");
  div.prepend(span);
  $(document).scrollTop('0');
}

function change_val(obj) {
  var input = $("#" + $(obj).attr("class"));
  if(input.parent().attr('class') == 'job-endtime'){
    input.text(obj.value);
    var val = obj.value;
    switch(val){
      case '１星期':
        val = 7;
        input.siblings().children('input').attr('value', val);
        break;
      case '２星期':
        val = 14;
        input.siblings().children('input').attr('value', val);
        break;
      case '半个月':
        val = 15;
        input.siblings().children('input').attr('value', val);
        break;
      case '１个月':
        val = 31;
        input.siblings().children('input').attr('value', val);
        break;
      case '２个月':
        val = 62;
        input.siblings().children('input').attr('value', val);
        break;
      case '３个月':
        val = 93;
        input.siblings().children('input').attr('value', val);
        break;
    }
  }else {
    input.attr('value', obj.value);
  }
  $('.title').text(edit_title);
  $('.before-mask').animate({
    top: '1500px',
  },300);
  $('.before-mask').css("display","none");
};

function TitleOver(obj) {
  console.log("1111");
  $(".title-over").hide();
  $('.title').text(edit_title);
  $('.before-mask').animate({
    top: '1500px',
  },300);
  $('.before-mask').css("display","none");
}
/* new页面类型选择脚本 结束 */


function ReplayImg(index,img_src){
  $('#footer_btm_nav>li').eq(index).children('a').children('span').css('color','#3f9e9d');
  $('#footer_btm_nav>li').eq(index).children('a').children('img').attr('src',img_src);
}

//清空input内容
function EmptyCont(input_id) {
	$("#"+input_id).val('');
}








// 调用方法
// $(".btm-nav>p").on('click',function(){
//   btn_index = $(this).index();
//   popup(li_text, btn_index)
// });

// 需要变量　第一个弹窗li的文本　li_text　和　按钮的下标　btn_index
// function popup(li_text, btn_index){
//   var len = $("body>div#popup").length;
//   console.log(len);
//   if(len == 0) {
//     $('body').append('<div id="popup"><ul><li id="li_1">'+li_text+
//                  '</li><li id="li_2" onclick="Clicksure(btn_index)">确定</li><li id="li_3" onclick="Clickfail(this)">取消</li></ul></div>');
//   };
// };
//
// function Clicksure(obj){
//   console.log("000000");
//   $("#popup").remove();
//   switch (btn_index) {
//       case 0:
//         Ajaxsure_1();
//         break;
//       case 1:
//         Ajaxsure_2();
//         break;
//       default:
//         Ajaxsure_3();
//     };
// }
// function Clickfail(){
//   console.log("000000");
//   $("#popup").remove();
// }

// 样式
// #popup {
//     position: absolute;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0,0,0,1);
//     z-index: 9999;
//   ul {
//     position: fixed;
//     left: 50%;
//     top: 50%;
//     margin-top: -4.2rem;
//     margin-left: -6.75rem;
//     width: 13.5rem;
//     height: 8.4rem;
//     background: #fff;
//     font-size: 0.8rem;
//     border-radius: 0.23rem;
//     z-index: 10000;
//     li:nth-child(1) {
//       width: 100%;
//       height: 5.6rem;
//       text-align: center;
//       line-height: 5.6rem;
//       border-radius: 0.23rem;
//     }
//     li:nth-child(2) {
//       width: 50%;
//       height: 2.8rem;
//       background: #3f9e9f;
//       color: #fff;
//       float: left;
//       text-align: center;
//       line-height: 2.8rem;
//       border-radius: 0 0.23rem 0 0.23rem;
//     }
//     li:nth-child(3) {
//       width: 50%;
//       height: 2.8rem;
//       color: #3f9e9f;
//       float: left;
//       text-align: center;
//       line-height: 2.6rem;
//       border-radius: 0 0 0.23rem 0;
//     }
//   }
// }
