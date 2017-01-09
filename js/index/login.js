/**
 * Created by Administrator on 2017/1/5.
 */

$(function() {
    //对form表单进行验证 如果验证失败不允许提交
    $('form').validate({
        //submithandler 禁止form标签对默认提交事件
        submitHandler:function() {
            //在validate 校验通过对时候 出发submithandler事件

            //serialize 将form表单中 设置name属性对输入框内部对值
            //获取出来 通过name=value形式拼接字符串 传递给后台
            $.ajax({
                url:'http://datainfo.duapp.com/shopdata/userinfo.php',
                data:$('.login-main form').serialize(),
                type:'get',
                success:function(e) {
                    console.info(e);
                    if(e==2) {
                        alert('用户名或密码不正确');
                    } else if(e==0) {
                        alert('用户名已存在')
                    } else {
                        //storage 操作比cookie方便
                        localStorage.setItem('user',e);
                        alert('注册成功,登录中')
                        window.location = 'index.html';

                    }
                }
//							data:{
//								userID:$('#userID'),
//								password:$('#password'),
//								status:'login'
//							}
            })


        },
        rules:{//校验规则  通过标签对name属性关联
            userID:{
                required:true,
                minlength:6
            },
            password:{
                required:true,
                minlength:6
            }
        },
        messages:{//错误提示信息
            userID:{
                required:'用户名不能为空',
                minlength:'用户名必须输入6位'
            },
            password:{
                required:'密码不能为空',
                minlength:'密码必须输入6位'
            }
        }
    })

    $('.icon-fanhui').click(function () {
        window.location.hash = '#myshow'
    })
})