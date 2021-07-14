const {v4: uuid} = require('uuid');
const { readFileSync, writeFileSync} = require('fs');
const {join} = require('path')

/**
 * this is the route for creating todos
 * 
 * @param {*} app 
 */
exports.create = (app) => {
    app.post('/todo', {
        /**
         * handles request for a given route
         * @param {import('fastify').FastifyRequest} request 
         * @param {import('fastify').FastifyReply<Response>} response 
         */
        handler: async (request, response) => {
            //creates a unique identifier
            const id = uuid();
            const { body } = request;
            //get text and done with default false from body, regardless if it has an object value or null whihch makes it return any empty object
            const { text, done = false } = body || {};

            if(!text){
                return response
                    .code(400)
                    .send({
                        success:false,
                        code:'todo/malformed',
                        message: 'Payload doesnt have text property'
                    });
            }
            
            const filename = join(__dirname,'../../database.json');
            const encoding = 'utf8';

            const databaseStringContents = readFileSync(filename,encoding);
            const database = JSON.parse(databaseStringContents);

            const data = {
                id,
                text,
                done,
                dateCreated: new Date().getTime(),
                dateUpdated: new Date().getTime()
            };

            database.todos.push(data);

            //we added null and 2 when stringifying the object so that the JSON file looks visually understandable
            const newDatabaseStringContents = JSON.stringify(database,null,2);
            writeFileSync(filename,newDatabaseStringContents,encoding);

            return {
                success: true,
                data
            }
        }
    })
};