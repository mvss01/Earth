const express = require("express");
const router = express.Router();
const User = require("./user");

router.get('/login', (req, res) =>{
    res.render('admin/users/login', {render: 0})
})
router.get('/users/perfil', (req, res) =>{
    res.render('admin/users/perfil', {render: 1})
})

router.get('/', (req, res) =>{
    res.render('admin/home/home', {render: 0})
})
router.post('/users/save', (req, res) =>{

})

router.get('/users/edit/:user', (req, res) =>{
    res.render('admin/users/edit', {render: 1})
})
router.post('/users/update/:user', (req, res) =>{

})




module.exports = router