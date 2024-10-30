const express = require('express');
const passport = require('../middlewares/discord');
const router = express.Router();

// Ruta de autenticación con Discord
router.get('/discord', passport.authenticate('discord'));

// Ruta de callback después de la autenticación
router.get('/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/'); // Redirige a la página principal
    }
);

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/'); // Redirige a la página principal después de cerrar sesión
    });
});

module.exports = router;