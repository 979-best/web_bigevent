$(function() {
    var layer = layui.layer;
    var form = layui.form;
    // var confirm = layui.confirm;
    //调用自定义函数
    initArtCateList();
    //自定义函数
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function(res) {
                // console.log(res);
                //用模板引擎渲染数据
                //tpl-table  模板ID
                //渲染的数据  res
                var htmlStar = template("tpl-table", res);
                //把字符串 htmlStar 给 tbody
                $("tbody").html(htmlStar);
            },
        });
    }
    var indexAdd = null;
    $("#tianjia").on("click", function() {
        indexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章分类",
            content: $("#dialog-add").html(),
        });
    });
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $("body").on("submit", "#form-add", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("新增分类失败！");
                }
                //成功之后,重新获取数据
                initArtCateList();
                layer.msg("新增分类成功！");
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd);
            },
        });
    });
    //还是通过代理 form-edit 这次是添加点击事件
    //给所有的编辑按钮添加点击事件
    var indexEdit = null;
    $("tbody").on("click", ".btn-edit", function() {
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });
        var id = $(this).attr("data-id");
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                form.val("form-edit", res.data);
            },
        });
    });
    //再来一次的代理 #form-edit 添加submit事件
    $("body").on("submit", "#form-edit", function(e) {
        //阻止他,就是阻止
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("很遗憾!失败了!");
                }
                layer.msg("恭喜你,成功了!");
                //关闭弹出层
                layer.close(indexEdit);
                //刷新表格数据
                initArtCateList();
            },
        });
    });
    //没想到吧!代理又来了 btn-delete
    $("tbody").on("click", ".btn-delete", function() {
        // console.log("11");
        var id = $(this).attr("data-id");
        //提示删除
        layer.confirm(
            "真的忍心删除吗o(╥﹏╥)o?", { icon: 3, title: "提示" },
            function(index) {
                $.ajax({
                    method: "GET",
                    url: "/my/article/deletecate/" + id,
                    success: function(res) {
                        // console.log(res);
                        if (res.status !== 0) {
                            return layer.msg("哈哈！我还是舍不得你的");
                        }
                        layer.msg("我永远的离开了你！");
                        layer.close(index);
                        initArtCateList();
                    },
                });
            }
        );
    });
});