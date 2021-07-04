const fastify = require('fastify');

/**
 * This is the funct call to initialize server
 * 
 * @param {{logger: boolean, trustProxy:boolean}} opts 
 * @returns {*}
 */

exports.build = async (opts = { logger: true, trustProxy: true}) => {
    //initialize server using fastify
    const app =  fastify(opts);

    //access root address = http://localhost/
    app.get('/', {
        //object
        /**
         * 
         * @param {*} req - req param sent by client
         */
        handler: async (req) => {
            console.log('hello world!!!');

            //reponse in json format
            return {success: true}
        }
    });

    return app;

};