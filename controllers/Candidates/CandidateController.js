const express = require("express");
const AdminAuth = require("../../middlewares/AdminAuth");
const router = express.Router();
const Candidate = require("../Candidates/candidate")

router.get('/candidates', AdminAuth, (req, res) =>{
    var company = req.session.user.company
    Candidate.findAll({
        where:{
            company: company 
        }
    }).then(Candidates =>{
        res.render('admin/candidates/search', {navbar: 3, session: req.session.user, Candidate: Candidates})
    })
    
})

module.exports = router