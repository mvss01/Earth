const express = require("express");
const Opportunite = require("../Opportunities/opportunities");
const Job = require('../Jobs/job')
const router = express.Router();
const UserAuth = require("../../middlewares/UserAuth")

router.get('/opportunities', UserAuth, (req, res) =>{
    var email = req.session.user.email
    Opportunite.findAll({
        where:{
            userEmail: email
        }
    }).then(Opportunite =>{
        res.render('admin/opportunities/search', {navbar: 2, session: req.session.user, Opportunite: Opportunite})
    })
    
})

router.get('/opportunities/register/:id', UserAuth, async (req, res) =>{
    var jobId = req.params.id
    var email = req.session.user.email
    var existing = await Opportunite.findOne({
        where:{
            jobId: jobId,
            userEmail: email
        }
    })
    if(existing){
        Opportunite.destroy({
            where:{
                jobId: jobId,
                userEmail: email
            }
        }).then(() =>{
            res.redirect('back')
        })
    }else{Job.findOne({
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
        Opportunite.create({
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