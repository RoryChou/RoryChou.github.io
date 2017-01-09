/**
 * Created by Administrator on 2017/1/7.
 */

/* footer set */
footNav.init(2);

//refresh info
var user = localStorage.getItem('user') || '{}';
var userID = JSON.parse(user).userID;
$.ajax({
    url: 'http://datainfo.duapp.com/shopdata/getCar.php',
    data: {
        'userID':userID
    },
    dataType: 'jsonp',
    success: function (res) {
        console.log(res);
        var loadBar = $('.loading');
        var totalMoney = 0;
        var proNum = 0;
        //render page
        for(var i in res){
            //get info
            var src = res[i].goodsListImg;
            var tit = res[i].goodsName;
            var price = res[i].price;
            var number = res[i].number;
            var goodsID = res[i].goodsID;
            proNum = i-0+1;

            var str = '<div class="pic">'+
                '<img src="'+ src +'" alt="">'+
                '</div>'+
                '<div class="detail">'+
                '<h3>'+ tit +'</h3>'+
                '<div class="price">'+
                '单价：'+
                '<span>¥'+ price +'</span>'+
                '</div>'+
                '<div class="num">'+
                '数量：'+
                '<div>'+
                '<span class="decrease">-</span>'+
                '<input type="text" value="'+ number +'">'+
                '<span class="increase">+</span>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="delete">'+
                '<span class="iconfont icon-shanchu"></span>'+
                '</div>';

            var li = $('<li></li>');
            li.addClass('goods');
            li.attr('gid',goodsID);
            li.html(str);

            li.insertBefore(loadBar);
            loadBar.hide();

            /*when fished set flag*/
            //flag = true
        }
        /* set iscroll */
        //设置视口高度
        $('#iscroll-view-cart').height(vpCalc.init('#cart header','#cart .cart-info','footer.nav'));
        //new iscroll
        var flag = true;
        var myIscroll = new iScroll('iscroll-view-cart',{
            /*
                上滑刷新
            */
            onScrollEnd: function () {
                //判断是否触底
                if(myIscroll.scrollerH+myIscroll.y <= myIscroll.wrapperH&&flag){
                    console.log('touch end')
                    flag = false;
                    /*
                        显示已经到底了
                    */
                }
            }
        });

        //ajax obj
        /*var getCartInfo = {
            url: 'http://datainfo.duapp.com/shopdata/getCar.php',
            data: {
                'userID':userID
            },
            dataType: 'jsonp',
            success: function (res) {
                /!*flag = renderGoods(res,loadBar,myIscroll,flag);
                pageCode++;*!/

                //render page
                for(var i in res){
                    //get info
                    var src = res[i].goodsListImg;
                    var tit = res[i].goodsName;
                    var price = res[i].price;
                    var number = res[i].number;
                    var goodsID = res[i].goodsID;

                    var str = '<div class="pic">'+
                        '<img src="'+ src +'" alt="">'+
                        '</div>'+
                        '<div class="detail">'+
                        '<h3>'+ tit +'</h3>'+
                        '<div class="price">'+
                        '单价：'+
                        '<span>¥'+ price +'</span>'+
                        '</div>'+
                        '<div class="num">'+
                        '数量：'+
                        '<div>'+
                        '<span class="decrease">-</span>'+
                        '<input type="text" value="'+ number +'">'+
                        '<span class="increase">+</span>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="delete">'+
                        '<span class="iconfont icon-shanchu"></span>'+
                        '</div>';

                    var li = $('<li></li>');
                    li.addClass('goods');
                    li.attr('gid',goodsID);
                    li.html(str);

                    li.insertBefore(loadBar);
                    loadBar.hide();

                    /!*when fished set flag*!/
                    flag = true
                }
            }
        };*/

        /*购物车操作*/
        $('#cart .main').on('click','span',function (e) {

            //阻止冒泡
            e.stopPropagation();
            console.log(e)

            var target = $(e.target);
            var num = target.parents('li').find('.decrease').next().val();
            var gid = target.parents('li').attr('gid');
            var input = target.parents('li').find('.decrease').next()
            //数量操作
            if(target.hasClass('decrease')){
                //减少
                num--;
                num = num <= 0? 1 : num;
                //render num
                input.val(num);
                //refresh num on server
                cartRefresh(userID,gid,num);
                //refresh totalmoney
                for(var i in res){
                    if(res[i].goodsID == gid){
                        res[i].number = num;
                        break
                    }
                }
                totalMoneyCalc(res);
            }
            if(target.hasClass('increase')){
                //add
                num++;
                num = num <= 0? 1 : num;
                //render num
                input.val(num);
                //refresh num on server
                cartRefresh(userID,gid,num);
                //refresh totalmoney
                console.log(gid,num,res)
                for(var j in res){
                    if(res[j].goodsID == gid){
                        res[j].number = num;
                        break
                    }
                }
                console.log(res);
                totalMoneyCalc(res);
            }
            //detlete
            if(target.hasClass('icon-shanchu')){
                var confirm = window.confirm('你确认删除这个商品吗？')
                if(confirm){
                    //delete on server
                    cartRefresh(userID,gid,0);
                    //render delete (hide ok?)
                    target.parents('li').hide();
                    //refresh totalmoney
                    num = 0;
                    for(var k in res){
                        if(res[k].goodsID == gid){
                            res[k].number = num;
                            break
                        }
                    }
                    proNum--;
                    totalMoneyCalc(res);
                    //iscroll refresh
                    myIscroll.refresh();
                }
            }

        });
        $('#cart .main').on('blur','input', function (e) {
            var target = $(e.target);
            var num = target.val();
            var gid = target.parents('li').attr('gid');
            num = num <= 0? 1 : num;
            //render num
            target.val(num);
            //refresh num on server
            cartRefresh(userID,gid,num);
            //refresh totalmoney
            for(var i in res){
                if(res[i].goodsID = gid){
                    res[i].number = num;
                    break
                }
            }
            totalMoneyCalc(res);
        });

        //refresh totalmoney
        function totalMoneyCalc(res){
            var totalMoney = 0;
            for(var i in res){
                var price = res[i].price;
                var number = res[i].number;
                totalMoney += price*number;
                console.log(price,number)
            }
            $('#cart .cart-info .money span').html('¥'+totalMoney);
            $('#cart .cart-info .num span').html(proNum);
        }
        totalMoneyCalc(res);

        //cart info
        function cartRefresh(userID,goodsID,number){
            $.ajax({
                url: 'http://datainfo.duapp.com/shopdata/updatecar.php',
                data: {
                    'userID':userID,
                    'goodsID':goodsID,
                    'number':number
                },
                success: function (e) {
                    if(e == 0){
                        alert('数据更新失败')
                    }
                }
            })
        }
    }
});

//get goods detail click
$('.main').on('click','.goods', function (e) {
    console.log(e)
    var target = $(e.target);
    var gid = target.parents('li').attr('gid');

    //将gid写入storage
    localStorage.setItem('gid',gid);

    //页面跳转
    window.location = 'product.html'
})
