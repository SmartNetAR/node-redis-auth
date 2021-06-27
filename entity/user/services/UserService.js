const async = require('async');
const crypto = require( 'crypto' ) ;
const mysqlService = require('../../../service/mysql');
const queries = require( '../queries' ) ;

class UserService {

    register({fullname, email, password}) {
        return new Promise((resolve, reject) => {

            async.waterfall([
                cb => {
                    mysqlService.getConnection((err, conn) => {
                        return cb(err, conn);
                    });
                },
                (conn, cb) => {
                    mysqlService.startTransaction(conn, err => {
                        return cb(err, conn);
                    });
                },
                (conn, cb) => {
                    const hashedPassword = crypto
                        .createHash('sha256')
                        .update(password)
                        .digest('hex');

                    const user = {
                        fullname,
                        email,
                        password: hashedPassword
                    };

                    conn.query(
                        queries.insertUser,
                        [user],
                        (err, result) => {
                            if (err) {
                                return cb(err, conn);
                            }

                            return cb(null, conn, result.insertId);
                        }
                    );
                }
            ],
                (err, conn, userId) => {
                    if (err) {
                        console.log(err);
                        if (conn) {
                            mysqlService.closeConnection(conn);
                        }

                        reject('Internal Server Error.');
                    } else {
                        mysqlService.commitTransaction(conn, (err) => {
                            if (err) {
                                reject('Internal Server Error.');
                            }
                            const resp = {
                                id: userId,
                                fullname,
                                email
                            };

                            resolve(resp);
                        });
                    }
                }
            );
        })
    }
}

module.exports = UserService;