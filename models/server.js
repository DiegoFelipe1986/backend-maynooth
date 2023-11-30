const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger.js');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/v1/users';
        this.postsPath = '/api/v1/posts';
        this.productsPath = '/api/v1/products';
        //Connecting DB
        this.connectingDB()
        //Middlewares
        this.middlewares();
        // Swagger Configuration
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
        //App Routes
        this.routes();
    }

    async connectingDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS con opciones para permitir solicitudes desde tu aplicación frontend
        const corsOptions = {
            origin: 'http://localhost:3000', // Reemplaza con la URL de tu aplicación frontend
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true, // Permite el envío de cookies y otros credenciales
            optionsSuccessStatus: 204, // Para manejar la solicitud de preflight con éxito
        };
        this.app.use(cors(corsOptions));

        // Parser y lectura
        this.app.use(express.json());

        //Parser and reading
        this.app.use(express.json());
        // Public directory
        this.app.use(express.static('public'))
        this.app.use(session({
            secret: process.env.JWT_SECRET_KEY,
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false },
        }));

    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users.js'));
        this.app.use(this.postsPath, require('../routes/posts.js'));
        this.app.use(this.productsPath, require('../routes/products.js'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port)
        });
    }


}

module.exports = Server;