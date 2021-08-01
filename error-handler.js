/**
 * 
 * @param {*} error 
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply<Response>} response
 */
exports.errorHandler = (error, request,response) => {
    let statusCode = error.statusCode || 500;
    let errorCode = error.message;
    let errorMessage = error.message;

    const errors = {
        'todo/not-found': 'Todo cant be found using given id',
        'request/malformed': 'Payload doesn\'t have the necessary properties',
        'auth/wrong.password': 'Password is incorrect',
        'auth/no-authorization-header': 'No authorization header found',
        'auth/no-user': 'No user is found using username',
        'auth/expired': 'Token has expired',
        'auth/unauthorized': 'You are not authorized to use this path',
        'auth/discarded': 'The token has already been logged out'

    }

    if(error.validation && error.validation.length && error.validationContext === 'body'){
        statusCode = 400;
        errorCode = 'request/malformed';
    }

    if(errorMessage === errorCode){
        errorMessage = errors[errorCode];
    }

    return response
        .code(statusCode)
        .send({
            success: false,
            code: errorCode,
            message: errorMessage
        })
}