const express = require("express");
const User = require("../Users/user");
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('admin/home/home', {navbar: 1})
})

router.get('/login', async (req, res) =>{
    var session = req.session.user
    if(session){
        var token = session.token
        var user = await User.findOne({
            where:{
                token: token
            }
        })
        if(user){
            if(user.type == "User"){
                res.redirect('/favorites')
            }else{
                res.redirect('/candidates')
            }
        }else{
            res.render('admin/home/login', {navbar: 0})
        }
    }else{
        res.render('admin/home/login', {navbar: 0})
    }
    
    
})
module.exports = router