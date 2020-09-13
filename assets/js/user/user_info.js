$(function() {
    //从 layui 身上得到 form
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.legth > 6) {
                return "昵称长度必须在 1 ~ 6 个字符之间！";
            }
        },
    });

    initUserInfo();

    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户基本信息失败！");
                }
                // console.log(res);
                form.val("formUserInfo", res.data);
            },
        });
    }
    //重置按钮
    //添加点击事件
    $("#btnReset").on("click", function(e) {
        //阻止阻止表单的默认重置行为
        e.preventDefault();
        //调用函数啦
        initUserInfo();
    });

    //监听表单提交事件
    $(".layui-form").on("submit", function(e) {
        //阻止表单默认提交
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            method: "POSt",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败");
                }
                layer.msg("更新用户信息成功!");

                //从父网页index中重新渲染用户的头像和用户的信息
                window.parent.getUserInfo();
            },

            // window.parent.getUserInfo();
        });
    });
});