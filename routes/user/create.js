const bcrypt = require('bcrypt');
const { User } = require('../../db');
const { definitions } = require('../../definitions');
const { GetOneUserResponse, PostUserRequest } = definitions;
const saltRounds = 10;

/**
 * this is the route for creating a user
 *
 * @param {*} app
 */
exports.create = app => {
  app.post('/user', {
    schema: {
      description: 'Create one user',
      tags: ['User'],
      summary: 'Create one user',
      body: PostUserRequest,
      response: {
        200: GetOneUserResponse
      }
    },
    /**
     * handles the request for a given route
     *
     * @param {import('fastify').FastifyRequest} request
     * @param {import('fastify').FastifyReply<Response>} response
     */
    handler: async (request, response) => {
      const { body } = request;
      const { username, password } = body;

      const hash = await bcrypt.hash(password, saltRounds);

      const data = new User({
        username,
        password: hash,
      });

      await data.save();

      return {
        success: true,
        data
      }
    }
  })
};
