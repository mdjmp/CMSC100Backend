const {getTodos} = require('../../lib/get-todos');
const { join } = require('path');

/**
 * gets many todos
 * 
 * @param {*} app 
 */
exports.getMany = app => {
    /**
     * this gets the todos from database
     * 
     */
    app.get('/todo', () => {
        const encoding = 'utf8';
        const filename = join(__dirname,'../../database.json');
        const todos = getTodos(filename, encoding);
        const data = [];

        for (const todo of todos) {
            data.push(todo);

        }

        return {
            success: true,
            data
        };

    });
};