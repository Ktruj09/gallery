//en este apartado requerimos el paquete dotenv
require('dotenv').config();
const cors = require('cors')
//importamos express 
const express = require('express')

//declaremos nuestro puerto
const port = process.env.PORT;

//importamos nuestra conexión de BD
const {dbConnection} = require('./database/db');

//creamos nuestra función
class Server {

    //creación de nuestro constructor
    constructor(){

        this.app = express();
        this.connectDB();

        this.middlewares();
        this.routes();
    }//end constructor()


    //función para la conexión de la BD
    async connectDB(){
        await dbConnection();
    }//end connectDB();


    //acá inicializamos el servidor
    listen(){
        this.app.listen(port, ()=>{
            console.log(`Listening at the port https://localhost:${port}`)
        })
    }//end listen()

    middlewares(){
        this.app.use(cors());
        //lectura parse body
        this.app.use(express.json());

         //cargamos el cors para que nos permita las peticiones desde el frontend
         this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }//end middlewares()

    //iniciamos nuestra ruta
    routes(){
        this.app.use('/api/gallery', require('../api/routes/gallery'))
    }

}

//exportamos el server
module.exports = Server;