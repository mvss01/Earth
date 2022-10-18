const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require("./user");
const AllAuth = require("../../middlewares/AllAuth");
const AdminAuth = require("../../middlewares/AdminAuth");


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

router.get('/users/profile', AllAuth, (req, res) =>{
    var email = req.session.user.email 
    var permission = req.session.permission
    if(permission == "User"){
        User.findOne({
            where:{
                email: email
            }
        }).then(User =>{
            res.render('admin/users/profile', {navbar: 2, session: req.session.user, User: User})
        })
    }else{
        User.findOne({
            where:{
                email: email
            }
        }).then(User =>{
            res.render('admin/users/profile', {navbar: 3, session: req.session.user, User: User})
        })
    }
    

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

router.post('/users/update/:user', (req, res) =>{
    var email = req.session.user.email
    var id = req.params.user
    var city =  req.body.city
    var state = req.body.state
    var country = req.body.country
    var telephone = req.body.telephone
    var description = req.body.description
    User.update({id: id, city: city, state: state, country: country, telephone: telephone, description: description},{
        where:{
            email: email
        }
    }).then(()=>{
        res.redirect("/users/profile")
    })
});

router.get('/exit', AllAuth, (req, res) =>{
    req.session.user = null
    res.redirect('/')
})


module.exports = router;