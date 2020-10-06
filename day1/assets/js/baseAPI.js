// 在ajaxPrefilter中同一拼接请求的根路径
// 1.每次调用$.get()或$.post()或$.ajax()时，都会先调用ajaxPrefilter这个函数
// 2.在这个函数中，可以拿到我们给ajax对象提供的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})