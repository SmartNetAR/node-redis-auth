const config = require("../config/config");

class AuthFactory
{
    static create(authConfig = config.authentication.authenticationDefault) 
    {
        const authentication = {
            redis: {},
            jwt: {}
        }

        return authentication[authConfig];
    }
}

module.exports = AuthFactory;