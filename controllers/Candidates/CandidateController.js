const express = require("express");
const AdminAuth = require("../../middlewares/AdminAuth");
const router = express.Router();
const Opportunite = require("../Opportunities/opportunities")
const User = require("../Users/user")

router.get('/candidates', AdminAuth, (req, res) =>{
    var company = "Empresa"//req.session.user.company
    Opportunite.findAll({
        where:{
            company: company 
        }
    }).then(Opportunite =>{
        console.log(Opportunite.id)
        var email = Opportunite.userEmail
        User.findOne({
            where:{
                email: email
            }
        }).then(candidate =>{
            res.render('admin/candidates/search', {navbar: 3, session: req.session.user, Candidate: candidate, Job: Job })
        })
       
    })
    
})

module.exports = router