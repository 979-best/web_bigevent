$.ajaxPrefilter(function(options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url;
    // console.log(options.url);
    // 统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || "",
        };
    }
    options.complete = function(res) {
        // 在 complete 回调函数中， 可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (
            res.responseJSON.status === 1 &&
            res.responseJSON.message === "身份认证失败！"
        ) {
            // 强制清空token
            localStorage.removeItem("token");
            // 强制跳转页面
            location.href = "/login.html";
        }
    };
});