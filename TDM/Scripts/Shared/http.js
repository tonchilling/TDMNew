var http = {};

http.post = function (url, params, callback) {
    
    console.log('HTTP.POST==>', config.root + url);
    return $.post(config.root + url, params, callback);
}

http.get = function (url, params, callback) {
    var urlGet = config.root + url;
     
    console.log(config.root);
    console.log('HTTP.GET==>', urlGet);
    return $.get(urlGet, params, callback);
}

http.url = function (url) {
    console.log('HTTP.URL==>', url);
    
    return config.root + url;
}