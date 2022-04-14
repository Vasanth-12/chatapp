var reqHandler = function(response, invokeMethod, params){
    invokeMethod(params)
    .then((result) => {
        result['status'] = 200
        result['message'] = 'Success'
        response.send(result)
    })
    .catch((err) => {
        console.log('Error response');
        response.send({status: 420, message:'Unable to process the request. Please try again after sometime'})
    })
}

module.exports.process = reqHandler