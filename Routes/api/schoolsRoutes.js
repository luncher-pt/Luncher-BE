const router = require('express').Router();
const Schools = require('../../data/models/schools/schoolsModel');

router.get('/', (req, res) => {
    Schools.getAllSchools()
            .then(schools => {
                res.status(200).json(schools);
            })
            .catch(err => {
                res.status(500).json(err);
            });
});

router.post('/', (req, res) => {
    Schools.addSchool(req.body)
            .then(school => {
                if(school.error) {
                    res.status(406).json({ error: 'Missing Field' });
                } else {
                    res.status(201).json(school);
                }
            })
            .catch(err => {
                if(err.errno === 19 || err.code === 'SQLITE_CONSTRAINT') {
                    res.status(400).json({ error: err, message: 'Duplicate Entry' });
                } else {
                    res.status(500).json(err);
                }
            });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Schools.getSchoolById(id)
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

TODO: // add DELETE route for schools

module.exports = router;