/**
 * 发送get请求
 * @param {String} url 请求地址
 * @param {Object} params 参数
 * @param {Function} successfn 成功回调
 * @param {Function} failfn 失败回调
 */
function ajaxGet(url, params, successfn, failfn) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var params_s = "";
    Object.keys(params).forEach(function (key) {
        params_s += (key + "=" + params[key]);
    })
    xhr.open("get", params_s ? url + "?" + params_s : url, false);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            successfn && successfn(JSON.parse(xhr.responseText));
        } else {
            failfn && failfn(xhr.responseText);
        }
    }
    xhr.send(null);

}
/**
 * 发送post请求
 * @param {String} url 请求地址
 * @param {Object} params 参数
 * @param {Function} successfn 成功回调
 * @param {Function} failfn 失败回调
 */
function ajaxPost(url, params, successfn, failfn) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("get", params_s ? url + "?" + params_s : url);
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            successfn && successfn(JSON.parse(xhr.responseText));
        } else {
            failfn && failfn(xhr.responseText);
        }
    }
    xhr.send(JSON.stringify(params));

}

export {
    ajaxGet,ajaxPost
}