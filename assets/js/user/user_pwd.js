$(function() {
    //从 layui 身上得到 form
    var form = layui.form;
    form.verify({
        //判断密码
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        //新密码和原密码不相同
        samePwd: function(value) {
            if (value == $("[name=oldPwd]").val()) {
                return "新密码不能和原来的密码一样!";
            }
        },
        //新密码和确认密码相同
        rePwd: function(value) {
            if (value !== $("[name=newPwd]").val()) {
                return "修改过后的密码不一致!";
            }
        },
    });
    $(".layui-form").on("submit", function(e) {
        //阻止默认提交
        e.preventDefault();
        //用 $.ajax({})
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("修改密码失败!");
                }
                return layui.layer.msg("修改密码成功!");
            },
        });
        // 重置表单
        $(".layui-form")[0].reset();
    });
});