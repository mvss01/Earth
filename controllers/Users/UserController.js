const express = require("express");
const router = express.Router();
const User = require("./user");

router.get('/login', (req, res) =>{
    res.render('admin/users/login')
})
router.get('/users/perfil', (req, res) =>{
    res.render('admin/users/perfil')
})

router.get('/users/register', (req, res) =>{
    res.render('admin/users/register')
})
router.post('/users/save', (req, res) =>{

})

router.get('/users/edit/:user', (req, res) =>{
    res.render('admin/users/edit')
})
router.post('/users/update/:user', (req, res) =>{

})




module.exports = router