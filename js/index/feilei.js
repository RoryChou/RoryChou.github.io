/**
 * Created by Administrator on 2017/1/6.
 */

//处理footer
footNav.init(1);

//动态添加商品list
$.ajax({
   url: 'http://datainfo.duapp.com/shopdata/getclass.php',
   success: function (res) {
       res = JSON.parse(res)
       //dom load
       for(var i in res){
           var className = res[i].className;
           var classID = res[i].classID;
           var str = '<p>'+ className +'</p>'
               +'<span class="iconfont icon-jiantou"></span>';

           var li = $('<li></li>');
           li.attr('classID',classID);
           li.addClass('clearfix');
           li.html(str);
           $('#fenlei .lists ul').append(li);
       }
   }
});

var myIscroll;
//添加委托事件
$('#fenlei .lists').on('click','li', function (e) {
    var target = $(e.target);
    var classID = target.attr('classID');

    //获取商品列表
    $.ajax({
        url:'http://datainfo.duapp.com/shopdata/getGoods.php',
        data: {
            'classID':classID,
            'pageCode':0
        },
        dataType: 'jsonp',
        success: function (res) {
            /* 渲染商品列表 */
            //隐藏列表
            $('#fenlei .lists').hide();

            $('.icon-fanhui').show();
            $('.main').show().find('ul').html('<li class="loading">loading...</li>');
            /* load lists */
            var flag = true;
            var loadBar = $('.loading') ;


            //设置视口高度
            $('#fenlei-container').height(vpCalc.init('#fenlei header','#fenlei .search','footer.nav'));

            //new iscroll
            myIscroll = new iScroll('fenlei-container',{
                onScrollEnd: function () {
                    //判断是否触底
                    if(myIscroll.scrollerH+myIscroll.y <= myIscroll.wrapperH&&flag){
                        console.log('touch end')
                        flag = false;
                        loadBar.show();

                        /* 可以继续优化 */
                        myIscroll.refresh();
                        myIscroll.scrollToElement('.loading');

                        $.ajax(getGoodsByClass);

                    }
                }
            });

            //ajax obj
            var getGoodsByClass = {
                url: 'http://datainfo.duapp.com/shopdata/getGoods.php',
                data:{
                    'classID':classID,
                    'pageCode':0
                },
                dataType: 'jsonp',
                success: function (res) {
                    if(!res){
                        $('.loading').html('已经到底啦')
                    }
                    flag = renderGoods(res,loadBar,myIscroll,flag);
                    getGoodsByClass.data.pageCode++;
                }
            };
            //load 1st
            flag = renderGoods(res,loadBar,myIscroll,flag);
        }
    })
});


//返回按键事件委托
$('.icon-fanhui').click(function () {
    //判断当前页面
    if($('.lists').css('display') == 'block'){
        //回退上一个hash
        window.history.back();
    }else {
        //回到分类页
        $('.icon-fanhui').hide();
        myIscroll.destroy();
        $('.main').hide();
        $('.lists').show();
    }
});

/* add cart */
addCart()


/* 搜索事件 */
$('.search input').keyup(function (e) {

    //获取搜索内容
    var selectText = $(this).val();
    selectText = encodeURI(selectText);

    //初始化页数
    var pageCode = 0;

    //判断回车按键
    if(e.keyCode == 13){
        search(selectText,pageCode);
    }
});

/* 判断是否有搜索跳转 */
var searchFlip = localStorage.getItem('searchinfo');
if(searchFlip){
    var selectText = searchFlip;
    search(selectText);
    localStorage.removeItem('searchinfo')
}

//开始搜索并渲染页面
function search (selectText,pageCode){

    pageCode = pageCode||0;

    //隐藏当前页面，并加载loadingbar
    $('#fenlei .lists').hide();
    $('.main').show().find('ul').html('<li class="loading">loading...</li>');
    var loadBar = $('.loading') ;
    loadBar.show();

    //开始搜索
    $.ajax({
        url:'http://datainfo.duapp.com/shopdata/selectGoodes.php',
        data: {
            'selectText': selectText,
            'pageCode':pageCode
        },
        dataType: 'jsonp',
        success: function(res){
            if(!res){
                alert('没有此类商品')
            }else {
                /* 在.main中渲染商品列表 */
                var flag = true;
                //设置视口高度
                $('#fenlei-container').height(vpCalc.init('#fenlei header','#fenlei .search','footer.nav'));

                //new iscroll
                myIscroll = new iScroll('fenlei-container',{
                    onScrollEnd: function () {
                        //判断是否触底
                        if(myIscroll.scrollerH+myIscroll.y <= myIscroll.wrapperH&&flag){
                            flag = false;
                            loadBar.show();

                            /* 可以继续优化 */
                            myIscroll.refresh();
                            myIscroll.scrollToElement('.loading');

                            $.ajax(getGoodsByClass);

                        }
                    }
                });

                //ajax obj by search
                var getGoodsByClass = {
                    url: 'http://datainfo.duapp.com/shopdata/selectGoodes.php',
                    data:{
                        'selectText': selectText,
                        'pageCode':pageCode
                    },
                    dataType: 'jsonp',
                    success: function (res) {
                        flag = renderGoods(res,loadBar,myIscroll,flag);
                        pageCode++;
                    }
                };

                //load 1st
                flag = renderGoods(res,loadBar,myIscroll,flag);
                pageCode++;
            }
        }
    })
}




