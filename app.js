const fastify = require('fastify');
const {routes} = require('./routes');

/**
 * This is the funct call to initialize server
 * 
 * @param {{logger: boolean, trustProxy:boolean}} opts 
 * @returns {*}
 */
exports.build = async (opts = { logger: true, trustProxy: true}) => {
    //initialize server using fastify
    const app =  fastify(opts);

    routes(app);

    return app;
};
