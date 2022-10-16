const express = require("express");
const Favorite = require("../Favorites/favorite");
const Job = require("../Jobs/job");
const router = express.Router();
const UserAuth = require("../../middlewares/UserAuth");


router.get('/favorites', UserAuth, (req, res) =>{
    var email = req.session.user.email
    var favorite =""
    res.render('admin/favorites/search', {navbar: 2, session: req.session.user, Favorite: favorite })   
    
})
router.get('/favorites/register/:id', UserAuth, (req, res) =>{
    var jobId = req.params.id
    var email = req.session.user.email
    console.log(email)
    Favorite.create({
        jobId: jobId,
        userEmail: email
    }).then(
        res.redirect('/favorites')
    )

})

module.exports = router