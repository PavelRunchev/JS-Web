const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const fileUpload = require('express-fileupload');
const download = require('image-downloader');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash-2');


module.exports = (app, config) => {
    app.engine('.hbs', handlebars({
        defaultLayout: 'main',
        extname: '.hbs'
    }));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(fileUpload({
        limit: { fileSize: 50 * 1024 * 1024 }
    }));

    app.use(cookieParser());
    app.use(session({
        secret: 'S3cr3t',
        saveUninitialized: false,
        resave: false
    }));

    // flash configuretion to express!
    app.use(flash());
    app.use(function(req, res, next) {
        // delete session when is empty!!!
        if (Object.getOwnPropertyNames(res.locals.flash).length === 0) {
            delete req.session.flash;
            delete res.locals.flash;
        }

        next();
    });

    app.use(passport.initialize());
    app.use(passport.session());

    // jquery
    app.use(require('express-jquery')('/jquery.js'));

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.user = req.user;
            res.locals.isAuthed = req.user.roles.includes('User');
            res.locals.isAdmin = req.user.roles.includes('Admin');
        }

        next();
    })

    app.set('view engine', '.hbs');
    app.use(express.static(path.normalize(path.join(config.rootPath, 'content'))));
}