const router = require('express').Router();
const Users = require('../../data/models/users/usersModel');
const pwHash = require('../../middleware/pwHash.js')

const { authenticate } = require('../../auth/authentication.js')



router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    
    if(isNaN(Number(id))) {
        res.status(400).json({ error: 'No ID Found' });
    } else {
        Users.getUser(id)
                .then(user => {
                    user.length ? res.status(200).json(user)
                                : res.status(404).json({
                                    error: 'No User Found With ID'
                                });
                })
                .catch(err => {
                    res.status(500).json(err);
                });
    }
});

router.put('/:id', authenticate, pwHash, (req, res) => {
    const { id } = req.params;
    const edit = req.body;

    if(isNaN(Number(id))) {
        res.status(404).json({ error: 'No User Found With ID' });
    } else {
        Users.editUser(id, edit)
                .then(user => {
                    user.error ? res.status(304).json({ error: 'Field Inccorect' })
                                : res.status(200).json(user);             
                });
    }
});

router.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if(isNaN(Number(id))) {
        res.status(400).json({ message: 'No ID Found' });
    } else {
        Users.deleteUser(id)
            .then(user => {
                user.error ? res.status(404).json({ error: 'No User Found' })
                            : res.status(200).json(user);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
});

module.exports = router;