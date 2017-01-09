/**
 * Created by Administrator on 2017/1/6.
 */


//计算视口的高度
var vpCalc = {
    init: function (params) {
        var args = arguments;
        var otherH = 0;
        for (var i in args){
            otherH += $(args[i]).height()
        }
        var deviceH = document.documentElement.clientHeight;
        var diff = deviceH - otherH;
        return diff
    }
};

//处理footer标志
var footNav = {
    init: function(num){
        $('footer.nav ul').find('li').eq(num).addClass('current').siblings().removeClass('current');
    }
};

//render goods
function renderGoods(res,loadBar,myIscroll,flag){

    for(var i in res){
        //var img = res[i]['3'].split(',')[1]
        var img = res[i]['3']
        var h3 = res[i]['2'];
        var price = res[i].price;
        var discount = res[i].discount;
        var finalprice =parseInt(price*discount*0.1);
        var gid = res[i].goodsID;
        var str = '<div class="pic">'+
            '<img src='+ img +' alt="">'+
            '</div>'+
            '<div class="detail">'+
            '<h3>'+ h3 +'</h3>'+
            '<div class="price">'+
            '<span class="current">¥'+finalprice+'</span>'+
            '<span class="old">¥'+ price +'</span>'+
            '<p class="off">'+ discount +'折</p>'+
            '</div>'+
            '<div class="add-cart">'+
            '<img src="img/add-cart.png" alt="">'+
            '</div>'+
            '</div>';

        var li = $('<li></li>');
        li.attr('gid',gid)
        li.addClass('goods');
        li[0].innerHTML = str;

        li.insertBefore(loadBar);
        myIscroll.refresh();
        loadBar.hide();
        /*when fished set flag*/
        flag = true
    }
    return flag;
}

//add cart
function addCart(){
    $('.main').on('click','.add-cart', function (e) {
        //阻止冒泡
        e.stopPropagation();
        console.log(e)
        //find user info from storage
        var userinfo = JSON.parse(localStorage.getItem('user'));
        //console.log(userinfo)
        if(userinfo) {
            var userID = userinfo.userID;
        }
        var gid = $(e.target).parents('li').attr('gid');
        //console.log(userinfo);
        if(!userinfo){
            alert('请先登录！');
            window.location.hash = '#logup';
        }else {
            //get cartinfo from server
            $.ajax({
                url: 'http://datainfo.duapp.com/shopdata/getCar.php',
                data: {
                    'userID':userID
                },
                dataType: 'jsonp',
                success: function (res) {
                    var cartinfo = res || [];
                    var flag = false;
                    for (var i in cartinfo){
                        if(cartinfo[i].goodsID == gid){
                            cartinfo[i].number = parseInt(cartinfo[i].number)+1;
                            flag = true;
                        }
                    }
                    if(!flag){
                        var obj = {};
                        obj.goodsID = gid;
                        obj.number = 1;
                        cartinfo.push(obj);
                    }

                    //refresh cartinfo
                    for(var i in cartinfo){
                        (function (i) {
                            $.ajax({
                                url:'http://datainfo.duapp.com/shopdata/updatecar.php',
                                data: {
                                    'userID':userID,
                                    'goodsID':cartinfo[i].goodsID,
                                    'number':cartinfo[i].number
                                },
                                success: function (res) {
                                    if(res == 0){
                                        alert('数据更新失败！')
                                    }
                                }
                            })
                        })(i)
                    }
                    alert('已加入购物车');
                }
            })
        }

    })
}

//倒计时计算
function timeCalc(future){
    future = future || '2017/01/19 24:00';
    var now = Date.now();
    var future = new Date(future);
    future = future.getTime(future);
    var diff = future - now;
    var sec = diff/1000%60;
    sec = sec.toFixed(1)
    var minute = Math.floor(diff/1000/60%60);
    var hour = Math.floor(diff/1000/60/60%24);
    var day = Math.floor(diff/1000/60/60/24);
    if(sec < 1){
        sec = '0'+sec
    }
    if(minute < 10){
        minute = '0'+minute
    }
    if(hour < 10){
        hour = '0'+hour
    }
    if(day < 10){
        day = '0'+day
    }
    var str = ''+ day +'天'+ hour +'时'+ minute +'分'+ sec +'秒';

    return str;
}


//iscroll blur bug fix
$('body').on('click', function (e) {
    if(e.target.tagName != 'INPUT'){
        $('input:focus').blur();
    }
})
