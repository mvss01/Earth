const express = require("express");
const AdminAuth = require("../../middlewares/AdminAuth");
const router = express.Router();
const Opportunite = require("../Opportunities/opportunities")
const User = require("../Users/user")

router.get('/candidates', AdminAuth, (req, res) =>{
    var company = req.session.user.company
    Opportunite.findAll({
        where:{
            company: company 
        }
    }).then(Opportunite =>{ 
        res.render('admin/candidates/search', {navbar: 3, session: req.session.user, Opportunite: Opportunite})
    })
    
})

module.exports = router