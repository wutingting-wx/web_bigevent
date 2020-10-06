$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();

    })
    $('#link_login').on('click', function() {
            $('.login-box').show();
            $('.reg-box').hide();
        })
        // 自定义表单验证规则
        // 获取form对象，只要导入了layui就可使用layui对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()这个方法来定义校验规则
    form.verify({
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                //   1.通过形参拿到的是确认密码框中的内容
                // 2.还需拿到密码框中的内容
                // 3.然后进行一次等于判断
                // 4.如果判断失败，则return一个提示消息
                var pwd = $(".reg-box [name=password]").val();
                if (pwd !== value) {
                    return '两次密码不一致！';
                }
            }

        })
        // 调用接口发起注册用户的请求
        // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefalut();
            $.post('/api/reguser', { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() },
                function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('注册成功！');
                    $('#link_login').click()
                })
        })
        // 调用接口发起登录的请求
        // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefalut();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            succes: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！');
                }
                layer.msg('登录成功！');
                // 必须要有这两步表单提交才会生效
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})