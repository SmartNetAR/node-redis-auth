'use strict' ;

const http = require( 'http' ) ;
const express = require( 'express' ) ;
const cors = require( 'cors' ) ;
const morgan = require( 'morgan' ) ;
const config = require( './config/config' ) ;

const app = express() ;
app.use( cors() ) ;
const router = require( './router.js' ) ;

app.use( morgan( 'combined' ) ) ;

app.use(
    express.json( {
        limit: '50mb'
    } )
) ;

app.use(
    express.urlencoded( {
        limit: '50mb',
        extended: true
    } )
) ;

app.use( '/', router ) ;

http.createServer( app ).listen( config.port, () => console.log( `Escuchando en el puerto ${config.port}` ) ) ;

module.exports = app ;