const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecret';

function generateTokens(payload) {
    const accessToken = jwt.sign(payload, accessTokenSecret, {expiresIn: '1h'});
    const refreshToken = jwt.sign(payload, refreshTokenSecret, {expiresIn: '24h'});

    return {accessToken, refreshToken};
}

module.exports = { generateTokens, accessTokenSecret };