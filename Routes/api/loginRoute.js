// IMPORTS
    const express = require('express')
    const bcrypt = require('bcryptjs')
    const jwt = require('jsonwebtoken')
    const secrets = require('../../secrets.js')

// KNEX DB 
    DB_KNEX = require('../../data/dbConfig.js')

// ROUTER
    const router = express.Router()

// - GET - //
    router.get('/', async(req,res) => {
        console.log('loginRoute GET/')
        res.status(200).json( {message: 'GET/ -> in loginRoute'} )
    })

// - POST - //
    /* Accepted Shape
        {
            "email": "STRING",
            "password": "STRING",
        }
    EXAMPLE
        {
            "email": "Bill@Billy.com",
            "password": "TacoMan"
        }
    */

    router.post('/', async(req, res) => {
        console.log('loginRoute POST/')
        const {email, password } = req.body
        
        DB_KNEX("users")
            .where('email', email)
                .first()
                .then(user => {

                    const pwVerification = bcrypt.compareSync(password, user.password)
                    if (user && pwVerification) {

                        const token = jwt.sign(
                            {
                                id: user.id,
                            },
                            secrets.jwtSecret,
                            {
                                expiresIn: '1d'
                            }
                        )

                        res.status(200).json({
                            id: user.id,
                            token
                        })
                    } else {
                        res.status(401).json( {error: 'Unable to Login'})
                    } 
                })
                .catch( err => {
                    res.status(500).json( { error: 'Unable to Login'})
                })
    })
// - PUT - //
// - DEL - //

module.exports = router