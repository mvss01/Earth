const express = require("express");
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('admin/home/home', {navbar: 1})
})

router.get('/login', (req, res) =>{
    res.render('admin/home/login', {navbar: 0})
})
module.exports = router