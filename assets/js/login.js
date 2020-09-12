$(function() {
    //添加点击事件
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    //从layui里面获取form属性
    var form = layui.form;
    var layer = layui.layer;
    //通过form.verify()函数自定义校验规则
    form.verify({
        //自定义了一个pwd的校验
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        //校验两次密码是否一致
        repwd: function(value) {
            //通过形参拿到确认密码框里面的内容
            //还需要拿到密码框中的内容
            //进行一次等于的判断
            //如果判断失败,则return一个提示消息即可
            var pwd = $(".reg-box [name=password]").val();
            if (pwd !== value) {
                return "两次密码不一致";
            }
        },
    });

    //监听注册事件
    $("#form_reg").on("submit", function(e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val(),
        };
        $.post("/api/reguser", data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("注册成功!");
            //模拟人点击的行为
            $("#link_login").click();
        });
    });

    //监听登录页面
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败!");
                }
                layer.msg("登录成功!");
                localStorage.setItem("token", res.token);
                console.log(res.token);
                //跳转后台主页
                location.href = "/index.html";
            },
        });
    });
});