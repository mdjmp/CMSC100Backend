const fastify = require('fastify');
const swagger = require('fastify-swagger');
const { routes } = require('./routes');
const {connect} = require('./db');
const {definitions} = require('./definitions');
const {name:title, description, version} = require('./package.json');

/**
 * This is the function to call to initialize the server
 *
 * @param {{ logger: boolean, trustProxy: boolean }} opts
 * @returns {*}
 */
exports.build = async (opts = { logger: false, trustProxy: false }) => {
  // initialize our server using Fastify
  const app = fastify(opts);

  app.register(swagger, {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
      info: {
        title,
        description,
        version
      },
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      definitions
    }
  })

  await connect();
  
  routes(app);

  return app;
};
