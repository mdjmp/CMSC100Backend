const {build} = require('./app');

/**
 *  starts the app
 */
async function start () {
    //calls to build an app
    const app = await build();

    //get the port from environment var
    //if this is the command export PORT = 8000 && node index.js
    //then port = 8000 else default is 8080
    const port = parseInt(process.env.PORT || '8080');
    const address = '0.0.0.0';

    const addr = await app.listen(port,address);
    console.log(`listening on ${addr}`);

}

start();