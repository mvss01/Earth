const express = require("express");
const  Opportunite = require("../Opportunities/opportunities");
const router = express.Router();
const UserAuth = require("../../middlewares/UserAuth")

router.get('/opportunities', UserAuth, (req, res) =>{
    res.render('admin/opportunities/search', {navbar: 2, session: req.session.user})
})

router.get('/opportunites/register/:id', UserAuth, (req, res) =>{
    var id = req.params.id
    var email = req.session.user.email
    Opportunite.create({
        userEmail: email,
        jobId: id
    }).then(() =>{
        res.redirect('/opportunities')
    })
})
module.exports = router