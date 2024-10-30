const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('../model.js/user');

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: 'https://127.0.0.5:5011/auth/discord/callback',
    scope: ['identify', 'email']
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({ discordId: profile.id });
            if (!user) {
                user = await User.create({ discordId: profile.id, username: profile.username, email: profile.email });
            }
            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;