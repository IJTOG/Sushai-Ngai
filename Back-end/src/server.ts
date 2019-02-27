var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')
import auth from './middleware/auth'
import * as cors from 'cors'

const PORT = process.env.PORT ||  8080



function setupRoutes(app) {
    const APP_DIR = `${__dirname}/component`
    const features = fs.readdirSync(APP_DIR).filter(
        file => fs.statSync(`${APP_DIR}/${file}`).isDirectory()
    )

    features.forEach(feature => {
        const router = express.Router()
        const routes = require(`${APP_DIR}/${feature}/routes.ts`)
        routes.setup(router)
        app.use(`/api/${feature}`, router)
    });
}

export function setup() {
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
    app.use(auth);
    app.use(cors())
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: false }))
    setupRoutes(app)

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    let server = app.listen(PORT, () => {
        console.log(`===========ready============== on port ${PORT}`)
    })
}