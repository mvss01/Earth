const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("./user");
const UserAuth = require("../../middlewares/UserAuth");

router.post('/users/authenticate', async (req, res) =>{

    var email = req.body.email
    var password = req.body.password
    if(email == undefined && password == undefined){
        email = req.flash(email)
        password = req.flash(password)
    }
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
                    firstName: user.firstName,
                    permission: user.type,
                    email: user.email
                }
                User.update({token: token}, {
                    where:{
                        email: email
                    }
                }).then(() =>{
                    if(user.type == "User"){
                        res.redirect('/favorites')
                    }else{
                        res.redirect('/candidates')
                    }  
                }).catch(() =>{
                    res.redirect('/')
                })
            }else{
                res.redirect('/login')
            }
        }else{
            res.redirect('/jobs/register')
        }
    }else{
        res.redirect('/')
    }
    
})

router.get('/users/profile', UserAuth, (req, res) =>{
    res.render('admin/users/profile', {navbar: 2, session: req.session.user})
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
                token: 0,
                password: hash
            }).then(() =>{
                var salt = bcrypt.genSaltSync(10);
                var token = bcrypt.hashSync(firstName, salt);
                req.session.user = {
                    firstName: firstName,
                    token: token,
                    permission: type,
                    email: email

                }
                User.update({token: token}, {
                    where:{
                        email: email
                    }
                }).then(() =>{
                    res.redirect('/favorites')
                }).catch(() =>{
                    res.redirect('/')
                })
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