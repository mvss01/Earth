const express = require("express");
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('admin/home/home', {render: 1})
})

router.get('/login', (req, res) =>{
    res.render('admin/home/login', {render: 0})
})
module.exports = router