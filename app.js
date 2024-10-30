const express = require('express');
const session = require('express-session');
const passport = require('./middlewares/discord'); // Configuración de Discord
const database = require('./api/db/connect'); // Conexión a la base de datos

const app = express();

database();

app.use(session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Ruta de autenticación con Discord
app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.listen(5011, () => console.log('Server running on https://127.0.0.5:5011'));