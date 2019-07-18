const router = require('express').Router();
const Schools = require('../../data/models/schools/schoolsModel');

const { authenticate } = require('../../auth/authentication.js')

router.get('/', async (req, res) => {
    await Schools.getAllSchools()
            .then(schools => {
                res.status(200).json(schools);
            })
            .catch(err => {
                res.status(500).json(err);
            });
});

router.post('/', authenticate, async (req, res) => {

    console.log('req.body', req.body)


    await Schools.addSchool(req.body)
            .then(school => {
                console.log('inside THEN')
                console.log('school', school)
                
                res.status(201).json(school);
            })
            .catch(err => {
                console.log('inside CATCH')
                console.log('err 1', err); 

                if(err.errno === 19 || err.code === 'SQLITE_CONSTRAINT') {
                    res.status(400).json({ error: err, message: 'Duplicate Entry' });
                } else {
                    console.log('err', err) 
                    res.status(500).json(err);
                }
            });
});

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

TODO: 
// add DELETE route for schools
router.delete('/:id', authenticate, async (req, res) => {
    console.log('schoolsRouter delete/')
   const { id } = req.params;
   
   await Schools.deleteSchool(id)
                .then(result => {
                    console.log('del result', result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
});


// add PUT route for schools
router.put('/:id', authenticate, async(req,res) => {
    console.log('schoolsRouter put/')
    
    const changes = req.body
    const { id } = req.params

    console.log('changes, id', changes, id)

    await Schools.editSchool(id, changes)
        .then( result => {
            console.log('result', result )
            res.status(201).json( result )
        })
        .catch( err => {
            res.status(500).json(err);
        })
})



module.exports = router;