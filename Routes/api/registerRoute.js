// EXPRESS
const express = require('express')

// KNEX DB
    const DB_KNEX = require('../../data/dbConfig.js')

// ROUTER
    const router = express.Router()

// MIDDLEWARE
    const pwHash = require('../../middleware/pwHash.js')

// - GET - //
    router.get('/', async(req,res) => {
        console.log('registerRoute GET/')
        res.status(200).json( {message: 'GET/ -> in registerRouter'} )
    })
// - POST - //
    /* Accepted Shape
        {
            "name": "STRING",
            "email": "STRING",
            "password": "STRING",
            "admin": BOOL,
            "donations": INTEGER
        }
    EXAMPLE
        {
            "name": "Billy",
            "email": "Bill@Billy.com",
            "password": "TacoMan",
            "admin": false,
            "donations": 0
        }
    */
    router.post('/', pwHash, async(req,res) => {
        console.log('registerRouter POST/')

    DB_KNEX("users")
        .insert(req.body)
        .then( () => {
            res.status(201).json( 'Successful Registration')
        })
        .catch( err => {
            res.status(422).json( {error: 'Unable to register new user'})
        })
})
// - PUT - //
// - DEL - //

// EXPORTS
    module.exports = router