const router = require('express').Router();
const Users = require('../../data/models/users/usersModel');

router.get('/:id', (req, res) => {
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

module.exports = router;