const router = require('express').Router();
const Schools = require('../../data/models/schools/schoolsModel');
const { authenticate } = require('../../auth/authentication.js')


// - GET - //
    router.get('/', async (req, res) => {
        await Schools.getAllSchools()
            .then(schools => {
                res.status(200).json(schools);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    });

// - POST - //
    router.post('/', authenticate, async (req, res) => {
        await Schools.addSchool(req.body)
            .then(school => {
                res.status(201).json(school);
            })
            .catch(err => { 
                if(err.errno === 19 || err.code === 'SQLITE_CONSTRAINT') {
                    res.status(400).json({ error: err, message: 'Duplicate Entry' });
                } else {
                    console.log('err', err) 
                    res.status(500).json(err);
                }
            });
    });

// - GET - //
    router.get('/:id', async (req, res) => {
        const { id } = req.params;

        await Schools.getSchoolById(id)
                .then(school => {
                    if(school.error) {
                        res.status(404).json({ error: 'No School Found'});
                    } else {
                        res.status(200).json(school);
                    }
                })
                .catch(err => {
                    res.status(500).json(err);
                });
    });

// - PUT - //
    router.put('/:id', authenticate, async(req,res) => {
        console.log('schoolsRouter put/')
        
        const changes = req.body
        const { id } = req.params

        await Schools.editSchool(id, changes)
            .then( result => {
                res.status(201).json( result )
            })
            .catch( err => {
                res.status(500).json(err);
            })
    })

// - DEL - //
    router.delete('/:id', authenticate, async (req, res) => {
        console.log('schoolsRouter delete/')
        const { id } = req.params;

        await Schools.deleteSchool(id)
                    .then(result => {
                        res.status(200).json(id);
                    })
                    .catch(err => {
                        res.status(500).json(err);
                    });
    });

module.exports = router;