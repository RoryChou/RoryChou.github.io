/**
 * Created by Administrator on 2017/1/7.
 */
/* footer set */
footNav.init(3);

//show user info
var user = JSON.parse(localStorage.getItem('user'));
if(user){
    var str = '昵称：'+user.userID;
    $('.details p').html(str);
    $('button.sign-in a').html('退出登录');
};

$('button.sign-in').click(function () {
    //remover user storage
    localStorage.removeItem('user')
})