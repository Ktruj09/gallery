'use strict';

//declaramos la variable que usaremos para nuestra conexión con la Mongoose
const mongoose = require('mongoose');

//creamos nuestra función asincrona
const dbConnection = async()=>{
    try {
                //acá usamos la variable ya creada y llamamos al metedo connect. Seguido de ello, le pasamos el puerto y la URL de conexión

        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log('Connected Database')


    } catch (error) {
        
        throw new Error(`Error en ${error}`)
    }
}

module.exports = {dbConnection};