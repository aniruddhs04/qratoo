const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');


container.resolve(function (_, users , dash, admin) {

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/Qrato');
    //mongoose.connect('mongodb://raj:vaibhav123@ds137600.mlab.com:37600/qrato');

    //mongodb://raj:vaibhav123@ds137600.mlab.com:37600/qrato
    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(process.env.PORT || 3000,function () {
            console.log("Server started on port 3000!!!");
        });
        ConfigureExpress(app);

        //Setup Router
        const router = require('express-promise-router')();
        users.SetRouting(router);
        dash.SetRouting(router);
        admin.SetRouting(router);
        app.use(router);
    }

    function ConfigureExpress(app) {

        require('./passport/passport-local');
        require('./passport/passport-facebook');
        require('./passport/passport-google');
        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        
        app.use(validator());
        
        
        app.use(session({
            secret: 'thisisasecretkey',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({ mongooseConnection: mongoose.connection })
        }))
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());
        app.locals._ = _;
    }
});