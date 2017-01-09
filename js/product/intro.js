/**
 * Created by Administrator on 2017/1/7.
 */

//判断是否有商品flip

var gid = localStorage.getItem('gid');
if(gid){
    //get good info
    $.ajax({
        url:'http://datainfo.duapp.com/shopdata/getGoods.php',
        data: {
            'goodsID':gid
        },
        dataType:'jsonp',
        success: function(e){
            console.log(e);
            e = e[0];
            //get info from data
            var picsrc = JSON.parse(e.goodsBenUrl)[0];
            var price = e.price;
            var tit = e.goodsName;
            var discount = e.discount;
            var oldPrice = parseInt(price/(discount/10)) || 0;
            var num = e.buynumber;
            var detail = e.detail;
            var bannerList = JSON.parse(e.goodsBenUrl);
            var bigpic = JSON.parse(e.imgsUrl)[0];

            //render intro page
            $('#intro .pic img').attr('src',picsrc)
            $('h3 .price i').html(price);
            $('h3 .tit').html(tit);
            $('#intro .old-pirce s').html(oldPrice);
            $('#intro .discount i').html(discount);
            $('#intro .old-buy-num i').html(num);

            //set other info in storage
            var obj = {
                'detail': detail,
                'bannerList': bannerList,
                'bigpic': bigpic
            };
            localStorage.setItem('productinfo',JSON.stringify(obj));
        }
    })
};

//product返回按钮
$('.icon-fanhui').click(function () {
    window.location = 'index.html'
});


//time count
setInterval(function () {
    var str = timeCalc();
    str = '距离结束时间：'+str;
    $('.time').html(str);
},100)
