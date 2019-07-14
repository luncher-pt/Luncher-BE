const bcrypt = require('bcryptjs')

function pwHash( req, res, next ) {
    console.log('pwHash Middleware')
    const newUser = req.body
    console.log('newUser - Pre Hash', newUser)

    if (newUser) {
        const hash = bcrypt.hashSync(newUser.password, 12)
        newUser.password = hash 
            console.log('newUser - Post Hash', newUser)
        req.newUser = newUser
        next()
    } else {
        res.status(400).json( {error: "Invalid Data Passed to pwHash middleware"})
    }
    
}

module.exports = pwHash