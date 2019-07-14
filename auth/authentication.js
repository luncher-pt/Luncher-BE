const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWT_SECRET

module.exports = {
    authenticate
}

async function authenticate(req, res, next) {
    const token = req.get('Authorization')
}

if ( token ) {
    jwt.verify(token, jwtKey, (err, decoded) => {
        if ( err ) return RegExp.status(401).json( err );

        req.decoded = decoded

        next()
    })
} else {
    return RegExp.status(401).json({
        error: 'No toke provided, must be set on the Authorization Header'
    })
}