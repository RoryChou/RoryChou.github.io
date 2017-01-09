/**
 * Created by Administrator on 2017/1/7.
 */

//根据storage信息渲染页面

var productinfo = localStorage.getItem('productinfo');
productinfo = JSON.parse(productinfo);

var bannerList = productinfo.bannerList;

//render
for( var i in bannerList){
    var div = $('<div></div>');
    div.addClass('swiper-slide');
    var str = '<img src='+ bannerList[i] +' alt="">';
    div.html(str);
    $('.swiper-wrapper').append(div);
}


var mySwiper = new Swiper('.main',{
    pagination: '.swiper-pagination'
});

//product返回按钮
$('.icon-fanhui').click(function () {
    window.location = 'index.html'
});