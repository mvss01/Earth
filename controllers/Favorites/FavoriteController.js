const express = require("express");
const Favorite = require("../Favorites/favorite");
const Job = require("../Jobs/job");
const router = express.Router();
const UserAuth = require("../../middlewares/UserAuth");


router.get('/favorites', UserAuth, (req, res) =>{
    var email = req.session.user.email
    Favorite.findAll({
        where:{
            userEmail: email
        }
    }).then(favorites =>{
        res.render('admin/favorites/search', {navbar: 2, session: req.session.user, Favorite: favorites })   
    })
    
    
})
router.get('/favorites/register/:id', UserAuth, async (req, res) =>{
    var jobId = req.params.id
    var email = req.session.user.email
    var existing = await Favorite.findOne({
        where:{
            jobId: jobId,
            userEmail: email
        }
    })
    if(existing){
        Favorite.destroy({
            where:{
                jobId: jobId,
                userEmail: email
            }
        }).then(() =>{
            res.redirect('back')
        })
    }else{
        Job.findOne({
            where:{
                jobId: jobId
            }
        }).then(job =>{
            var jobId = job.jobId
            var jobName = job.jobName
            var description = job.description
            var availability = job.availability
            var status = job.status
            var company = job.company
            var target = job.target
            var city = job.city
            var state = job.state
            var workload = job.workload
            Favorite.create({
                userEmail: email,
                jobId: jobId,
                jobName: jobName,
                description: description,
                availability: availability,
                status: status,
                company: company,
                target: target,
                city: city,
                state: state,
                workload: workload
            }).then(
                res.redirect('back')
            )
        })
    }
     
})

module.exports = router