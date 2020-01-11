const Hapi = require('hapi');
const routes =  require('./routes.index');

const server = new Hapi.Server();

server.connection({
    port: 9000,
    routes: { cors: true }
});

    routes.forEach((route) => {

        server.route(route);

    });


server.start(err => {

    if (err) {

        // Fancy error handling here
        console.error('Error was handled!');
        console.error(err);

    }

    console.log(`Server started at ${ server.info.uri }`);

});