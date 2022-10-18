const express = require("express");
const Opportunite = require("../Opportunities/opportunities");
const Job = require('../Jobs/job')
const router = express.Router();
const UserAuth = require("../../middlewares/UserAuth");
const AdminAuth = require("../../middlewares/AdminAuth");
const User = require("../Users/user");

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
            userEmail: email,
            jobId: jobId
        }
    })
    if(existing){
        Opportunite.destroy({
            where:{
                userEmail: email,
                jobId: jobId
            }
        }).then(() =>{
            if(existing.status == "Pending"){
                Job.findOne({
                    where:{
                        jobId: jobId
                    }
                }).then(job =>{
                    var new_availability = Number(job.availability) + 1
                    Job.update({availability: new_availability},{
                        where:{
                            jobId: jobId
                        }
                    }).then(() =>{
                        res.redirect('back')
                    })
                })
                
            }else{
                res.redirect('back')
            }
        })
    }else{
        User.findOne({
            where:{
                email: email
            }
        }).then(user =>{
            var userDescription = user.description
            var firstName = user.firstName
            var telephone = user.telephone
            var userState = user.state
            var userCity = user.city
            Job.findOne({
                where:{
                    jobId: jobId
                }
            }).then(job =>{
                var jobName = job.jobName
                var description = job.description
                var availability = job.availability
                var status = "Analyze"
                var company = job.company
                var target = job.target
                var city = job.city
                var state = job.state
                var workload = job.workload
                Opportunite.create({
                    userEmail: email,
                    userDescription: userDescription,
                    firstName: firstName,
                    telephone: telephone,
                    userState: userState,
                    userCity: userCity,
                    jobId: jobId,
                    jobName: jobName,
                    description: description,
                    availability: availability,
                    status: status,
                    company: company,
                    target: target,
                    city: city,
                    state: state,
                    workload: workload,
                }).then(()=>{
                    res.redirect('back')
                })
            })
        })
        
        
        
        
    }
})

router.get('/opportunities/edit/:type/:id/:job', AdminAuth, (req, res) =>{
    var type = req.params.type
    var id = req.params.id
    var jobId = req.params.job
    Opportunite.update({status: type}, {
        where:{
            id: id
        }
    }).then(() =>{
        Job.findOne({
            where:{
                jobId: jobId
            }
        }).then(job =>{
            var availability = job.availability
            if(type == "Pending"){
                var new_availability = Number(availability) - 1
            }
            Job.update({availability: new_availability},{
                where:{
                    jobId: jobId
                }
            }).then(() =>{
                res.redirect('back')
            })
        })
    })

})

router.get('/opportunities/api/:id', AdminAuth, (req, res) =>{
    var id = req.params.id  
    Opportunite.findOne({
        where:{
            id: id
        }
    }).then(full_data =>{
        res.json(full_data)
    })
})

module.exports = router