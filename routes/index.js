const {todo} = require('./todo')
/**
 * initialize all routes
 * @param {*} app 
 */

exports.routes = (app) => {
    app.get('/', {
        /**
         * handles request for a given route
         */
        handler: async (req) => {
            console.log('hello world!!!');

            //reponse in json format
            return {success: true}
        }
    });

    todo(app);
}