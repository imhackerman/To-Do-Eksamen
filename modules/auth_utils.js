const crypto = require('crypto');


const secret = 'testpassword';

let utils = {};

utils.decodeCred = function(credString){

    let cred = {};
    
    let b64String = credString.replace('basic', '');

    let asciiString = Buffer.from(b64String, 'base64').toString('ascii');

    cred.username = asciiString.replace(/:.*/, '');

    cred.password = asciiString.replace(cred.username + ':', '');


    return cred;
}

utils.createHash = function(password){

}

utils.createToken = function(username, userId){

}

utils.verifyToken = function(token){

}


module.exports = utils;