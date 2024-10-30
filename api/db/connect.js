const { mongoose } = require("mongoose");

const database = async () => {
    try {
        await mongoose.connect('mongodb+srv://migus722:3166218255Aa@root.uh07c.mongodb.net/passport');
        console.log("Connected to Mongo (conectado de forma correcta)");
    } catch (error) {
        console.error("Error al momento de conectarse con la base de datos", error);
    }
};

module.exports = database;