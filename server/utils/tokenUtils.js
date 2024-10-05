const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY
const createToken = (userPayload) =>{
    return jwt.sign(userPayload, secretKey, {expiresIn: '5m'});
}

// const refreshToken = (oldToken) =>{
//     const decoded = jwt.verify(oldToken, secretKey);

// }

module.exports = createToken;