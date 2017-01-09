/**
 * Created by Administrator on 2017/1/7.
 */

//根据storage来渲染页面

var productinfo = localStorage.getItem('productinfo');
productinfo = JSON.parse(productinfo);

//处理文本
var detail = productinfo.detail;
detail = detail.replace(/。/g,'。<br>')

var pic = productinfo.bigpic;


//render
$('#pro-detail .main p').html(detail);

$('#pro-detail .banner img').attr('src',pic);

//计算视口高度
$('#pro-detail .main').height(vpCalc.init('#pro-detail header','footer.nav-pro'));


//product返回按钮
$('.icon-fanhui').click(function () {
    window.location = 'index.html'
});