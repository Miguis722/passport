const express = require('express');
const session = require('express-session');
const passport = require('./middlewares/discord'); // Configuración de Discord
const database = require('./api/db/connect'); // Conexión a la base de datos
const dotenv = require('dotenv').config();
const loginRoutes = require("./routes/login"); // Configuracion de las rutas
const path = require('path');

const app = express();

database();

app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', loginRoutes);



app.listen(5011, () => console.log('Server running on https://127.0.0.5:5011'));