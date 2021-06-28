'use strict' ;

const { validationResult } = require( 'express-validator' ) ;
const crypto = require( 'crypto' ) ;
const mysqlService = require( '../../../service/mysql.js' ) ;
const queries = require( '../queries.js' ) ;
const redisService = require( '../../../service/redis.js' ) ;
const config = require( '../../../config/config.js' ) ;
const utils = require( '../../../helper/utils.js' ) ;
const { default: AuthFactory } = require('../../../auth/authFactory.js');
const UserService = require('../services/UserService');

exports.login = ( req, res ) => {
    const { email, password } = req.body ;
    const hashedPassword = crypto.createHash( 'sha256' ).update( password ).digest( 'hex' ) ;

    mysqlService.executeQuery( queries.getUserByEmailPassword, [ email, hashedPassword ], ( err, results ) => {
        if ( err ) {
            console.log( err ) ;
            return res.status( 500 ).send( 'Internal Server Error.' ) ;
        }

        if ( !results.length ) {
            return res.status( 400 ).send( 'User not found.' ) ;
        }

        const token = utils.generateString( 28 ) ;
        const result = results[0] ;

        // const authService = AuthFactory.create();

        redisService.insert( `TOKEN_${token}`, JSON.stringify( result ), config.tokenTime, ( err ) => {
            if ( err ) {
                console.log( err ) ;
                return res.status( 500 ).send( 'Internal Server Error.' ) ;
            }

            const resp = {
                user: {
                    fullname: result.fullname,
                    email: result.email,
                    id: result.id
                },
                access_token: token
            } ;

            res.send( resp ) ;
        } ) ;
    } ) ;
} ;

exports.logout = ( req, res ) => {
    const { token } = req.session ;

    redisService.delete( `TOKEN_${token}`, ( err ) => {
        if ( err ) {
            console.log( err ) ;
            return res.status( 500 ).json( 'Internal Server Error.' ) ;
        }

        return res.status( 200 ).end() ;
    } ) ;

} ;

exports.register = async ( req, res ) => {
    const { fullname, email, password } = req.body ;

    const errors = validationResult( req ) ;
    if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( { errors: errors.array() } ) ;
    }

    const userService = new UserService() ;
    try {
        
        const user = await userService.register({fullname, email, password}) ;
        res.status(201).json(user);

    } catch (error) {
        
        res.status(500).json(error);
    }
} ;
