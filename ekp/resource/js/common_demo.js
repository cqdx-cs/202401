var storage=window.sessionStorage;
var cur_timestamp = new Date().getTime()
var com_timestamp = storage.com_timestamp
if (com_timestamp){
    if ((cur_timestamp - com_timestamp) > 3000){
        com_timestamp = cur_timestamp
        var _hmt = _hmt || [];
        upBaidu();
        point();
    }
}else {
    storage.com_timestamp = new Date().getTime()
    upBaidu();
    point();
}

//demo访问量埋点
function point(){
    console.log("mypv+1");
    var uri = window.location.href;
    var phone = getCookiePoint("nc_phone");
    if("" === phone || undefined === phone){
        phone = getCookiePoint("phone");
    }
    if("" === phone || undefined === phone){
        phone = getCookiePoint("demo-phone");
    }
    var sceCode = getCookiePoint("sceCode");
    let elementById = document.getElementById("pdeUserName");
    var userName = "";
    if(elementById){
        userName= elementById.getValue;
    }
    userName = userName === undefined ? "":userName;
    var referrer= document.referrer;
    var userAgent = navigator.userAgent;
    try {
        demoAjax({
            url: buryingPointUrl,
            data: {
                "uri": uri,
                "referer":referrer,
                "phone": phone,
                "userName": userName,
                "source": pointSource,
                "userAgent": userAgent,
                "sceCode": sceCode
            },
            type: "POST"
        });
    } catch (e) {
        console.log("buriedPointDataUploadException",e)
    }
}
//百度统计
function upBaidu(){
    console.log("bdpv+1");
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = baiduUrl;
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
}


//原生ajax
function demoAjax(){
    var ajaxData = {
        type:arguments[0].type || "GET",
        url:arguments[0].url || "",
        async:arguments[0].async || "true",
        data:arguments[0].data || null,
        dataType:arguments[0].dataType || "text",
        contentType:arguments[0].contentType || "application/x-www-form-urlencoded",
        beforeSend:arguments[0].beforeSend || function(){},
        success:arguments[0].success || function(){},
        error:arguments[0].error || function(){}
    }
    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType=ajaxData.dataType;
    xhr.open(ajaxData.type,ajaxData.url,ajaxData.async);
    xhr.setRequestHeader("Content-Type",ajaxData.contentType);
    if(ajaxData.contentType === "application/x-www-form-urlencoded"){
        xhr.send(convertData(ajaxData.data));
    }else {
        xhr.send(JSON.stringify(ajaxData.data));
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
                ajaxData.success(xhr.response)
            }else{
                ajaxData.error()
            }
        }
    }
}
function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}
function convertData(data){
    if( typeof data === 'object' ){
        var convertResult = "" ;
        for(var c in data){
            convertResult+= c + "=" + data[c] + "&";
        }
        convertResult=convertResult.substring(0,convertResult.length-1)
        return convertResult;
    }else{
        return data;
    }
}
// 获取指定名称的cookie
function getCookiePoint(cookie_name) {
    var allcookies = document.cookie
    //索引长度，开始索引的位置
    var cookie_pos = allcookies.indexOf(cookie_name)

    // 如果找到了索引，就代表cookie存在,否则不存在
    if (cookie_pos != -1) {
        // 把cookie_pos放在值的开始，只要给值加1即可
        //计算取cookie值得开始索引，加的1为“=”
        cookie_pos = cookie_pos + cookie_name.length + 1
        //计算取cookie值得结束索引
        var cookie_end = allcookies.indexOf(';', cookie_pos)

        if (cookie_end == -1) {
            cookie_end = allcookies.length
        }
        //得到想要的cookie的值
        var value = unescape(allcookies.substring(cookie_pos, cookie_end))
    }
    return value
}
