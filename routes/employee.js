var express = require('express');
var router = express.Router();

const db=require('../config/mongoconn');

router.get('/',db.getAll);
router.post('/',db.createEmp);
router.get('/getByName',db.getByName);
router.put('/updateByName/:name',db.updateByName);
router.delete('/deleteByName',db.deleteByName);

module.exports=router;