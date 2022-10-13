const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("./user");

router.post('/users/authenticate', async (req, res) =>{
    var email = req.body.email
    var password = req.body.password
    console.log(email)
    console.log(password)
    if(email&&password){
        var user = await User.findOne({
            where:{
                email: email
            }
        })
        if(user){
           var correct = bcrypt.compareSync(password, user.password);
           if(correct){
                var salt = bcrypt.genSaltSync(10);
                var token = bcrypt.hashSync(user.firstName, salt);
                req.session.user = {
                    token: token,
                    firstName: user.firstName
                }
                User.update({token: token}, {
                    where:{
                        email: email
                    }
                }).then(() =>{
                    res.redirect('/jobs/favorites')
                })
           }
        }else{
            res.redirect('/jobs/register')
        }
    }else{
        res.redirect('/')
    }
    
})

router.get('/users/perfil', (req, res) =>{
    res.render('admin/users/perfil', {navbar: 1})
});

router.get('/users/register', (req, res) =>{
    var email = req.flash('email')
    res.render('admin/users/register', {navbar: 0, email: email})
});
router.post('/users/save', async (req, res) =>{
    var email = req.body.email
    var password = req.body.password
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var type = req.body.type
    console.log('entrou na rota')
    if(email&&password&&firstName&&lastName){
        var repetido = await User.findOne({
            where:{
                email: email
            }
        })
        if(repetido == undefined){
            if(type == undefined||type == null||type == ""){
                type = 'User'
            }
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)
            User.create({
                firstName: firstName,
                lastName: lastName,
                type: type,
                email: email,
                password: hash
            }).then(() =>{
                res.redirect('/')
            })
        }
    }else{
        req.flash('email', email)
        res.redirect('/users/register')
    }
});

router.get('/users/edit/:user', (req, res) =>{
    res.render('admin/users/edit', {navbar: 1})
});
router.post('/users/update/:user', (req, res) =>{

});




module.exports = router;