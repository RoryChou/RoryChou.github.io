/**
 * Created by Administrator on 2017/1/5.
 */
//home
window.onload = function () {
    var getGoods = {
        url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
        data:{
            'linenumber':4,
            'pageCode': 0
        },
        dataType: 'jsonp',
        success: function (res) {
            if(!res){
                $('.loading').html('已经到底啦')
            }
            flag = renderGoods(res,loadBar,myIscroll,flag);
            getGoods.data.pageCode++;
        }
    };
    /* load 1st goods */
    $.ajax(getGoods);

    /* banner */
    new Swiper('.swiper-container',{
        autoplay: 3000,
        //useless
        preventClicks : true,
        onTouchEnd: function(swiper){
            console.log('touchend')
            //swiper.stopPropagation();
            return false;
        }
    });

    /* add cart */
    addCart()

    /* 搜索事件 */
    $('.search input').keyup(function (e) {

        //获取搜索内容
        var selectText = $(this).val();
        selectText = encodeURI(selectText);

        //判断回车按键
        if(e.keyCode == 13){

            //跳转到分类页，并进行storage读写
            if(window.location.hash != '#fenlei'){
                localStorage.setItem('searchinfo',selectText);
                window.location.hash = '#fenlei';
            }
        }
    })

    /* load lists */
    var flag = true;
    var loadBar = $('.loading') ;

    $('#container').height(vpCalc.init('.header-home','div.search','footer.nav'));
    
    var myIscroll = new iScroll('container',{
        onScrollMove: function (e) {
            console.log(myIscroll.scrollerH,myIscroll.y,myIscroll.wrapperH);
            if(myIscroll.y>0){
                $('.reload').show();
            }
        },
        onScrollEnd: function () {
            //判断是否到顶部
            if( myIscroll.y === 0){
                //show loading bar

                //刷新页面
                window.location.reload(true);
            }
            //判断是否触底
            if(myIscroll.scrollerH+myIscroll.y <= myIscroll.wrapperH&&flag){
                flag = false;
                loadBar.show();

                /* 可以继续优化 */
                myIscroll.refresh();
                myIscroll.scrollToElement('.loading');
                $.ajax(getGoods);
            }
        }
    })

    //添加商品详情事件委托
    $('.main').on('click','.goods', function (e) {
        var target = $(e.target);
        var gid = target.parents('li').attr('gid');

        //将gid写入storage
        localStorage.setItem('gid',gid);

        //页面跳转
        window.location = 'product.html'
    });

    /* footer set */
    footNav.init(0);
}()