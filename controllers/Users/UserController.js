const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("./user");


router.get('/users/perfil', (req, res) =>{
    res.render('admin/users/perfil', {render: 1})
});

router.get('/users/register', (req, res) =>{
    res.render('admin/users/register', {render: 0})
});
router.post('/users/save', async (req, res) =>{
    var email = req.body.email
    var password = req.body.password
    var type = req.body.type
    if(type == undefined||type == null||type == ""){
        type = 'User'
    }
    if(email&&password){
        var repetido = await User.findOne({
            where:{
                email: email
            }
        })
        if(repetido == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)
            User.create({
                firstName: firstName,
                lastName: lastName,
                type: type,
                email: email,
                password: hash
            })
        }
    }
    res.redirect('/users/register')
});

router.get('/users/edit/:user', (req, res) =>{
    res.render('admin/users/edit', {render: 1})
});
router.post('/users/update/:user', (req, res) =>{

});




module.exports = router;