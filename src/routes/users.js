const { Router, json } = require('express');
const router = Router();

router.get('/', (req, res) => {
    return res.json('all users');
});

router.get('/:id', (req, res) => {
    if (req.params.id === 'U001') {
        return res.json("User U001 Found")
    }
    return res.status(404).json("User not found");
});

router.post('/', (req, res) => {
    const {userName, password} = req.body;
    if(userName && password){
        return res.status(201).json("User Created");
    }
    return res.status(400).json("User not created");
});
module.exports = router;