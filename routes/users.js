var express = require('express');
var router = express.Router();


//import queries from pgcon.js
const db=require('../config/pgconn.js');

/* GET users listing. */
router.get('/', db.getUsers);

router.get('/get/:id',db.getUserById);

router.post('/save',db.createUser);

router.put('/update/:id', db.updateUser);

router.delete('/delete/:id', db.deleteUser);

module.exports = router;
