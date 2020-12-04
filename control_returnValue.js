//统一返回的格式{code:xx,msg:'xxx',data:[]}

function returnError(code,msg,data){
    let error = {
        code:code || 1001,
        msg:msg || '无消息返回',
        data:data || []
    }
    return error
}
function returnSuccess(code,msg,data){
    let success = {
        code:code || 200,
        msg:msg || 'success',
        data:data || []
    }
    return success
}
module.exports = {
    returnError,
    returnSuccess
}
