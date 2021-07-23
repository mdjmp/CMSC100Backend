const { getTodos } = require('../../lib/get-todos');
const { writeFileSync } = require('fs');
const { join } = require('path');

/**
 * updates one todo
 *
 * @param {*} app
 */
exports.update = app => {
  /**
   * This updates one todo from the database give a unique ID & a payload
   *
   * @param {import('fastify').FastifyRequest} request
   * @param {import('fastify').FastifyReply<Response>} response
   */
  app.put('/todo/:id', (request,response) => {
    const { params,body } = request;
    const { id } = params;
    // get text and done from body
    const { text, done} = body || {};

    const encoding = 'utf8';
    const filename = join(__dirname, '../../database.json');
    const todos = getTodos(filename, encoding);

    const index = todos.findIndex(todo => todo.id === id);

    if(index < 0) {
      return response
        .code(404)
        .send({
          success: false,
          code: 'todo/not-found',
          message: 'Todo doesnt exist'
        });
    }

    //expect that we should be getting at least a text or a done property
    if(!text && (done === null || done === undefined)) {
      return response
        .code(400)
        .send({
          success: false,
          code: 'todo/malformed',
          message: 'Payload doesnt have text property'
        });
    }

    const data = todos[index];

    if(text){
        data.text = text;
    }
    if(done){
        data.done = done;
    }

    todos[index] = data;

    // we added null and 2 when stringify-ing the object so that
    // the JSON file looks visually understandable
    const newDatabaseStringContents = JSON.stringify({todos}, null, 2);
    writeFileSync(filename, newDatabaseStringContents, encoding);

    return {
      success: true,
      data
    };
  });
};