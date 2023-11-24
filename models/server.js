const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.js');
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        //Connecting DB
        this.connectingDB()
        //Middlewares
        this.middlewares();

        //App Routes
        this.routes();
    }

    async connectingDB(){
        await dbConnection();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Parser and reading
        this.app.use(express.json());
        // Public directory
        this.app.use(express.static('public'))
    }

    routes(){

        this.app.use(this.usersPath, require('../routes/users.js'));

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto", this.port)
        });
    }


}

module.exports = Server;