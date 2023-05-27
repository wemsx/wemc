var getUtf = (str) => {
    str = str.replace(/[\s\S]/g, function(m){
        return '\\u' + ('000' + m.charCodeAt().toString(16)).slice(-4);
    });
    return str
}
var deUtf = (str) => {
    var str_raw = str.split('u').join('\\u')
    let str_string = eval('"' + str_raw + '"')
    return str_string
}
export {
    getUtf,
    deUtf
}