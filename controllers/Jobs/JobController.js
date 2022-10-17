const express = require("express");
const UserAuth = require("../../middlewares/UserAuth");
const AdminAuth = require("../../middlewares/AdminAuth");
const router = express.Router();
const User = require("../Users/user")
const Job = require("./job");
const Favorite = require('../Favorites/favorite')

router.get('/jobs', async (req, res) =>{
    var session = req.session.user
    var job = await Job.findAll()
    if(session){
        var email = req.session.user.email
        var favorite = await Favorite.findAll({
            where:{
                userEmail: email
            }
        })
        var token = session.token
        var user = await User.findOne({
            where:{
                token: token
            }
        })
        if(user){
            if(user.type == "User"){
                res.render('admin/jobs/search', {navbar: 2, session: req.session.user, Job: job, Favorite: favorite, fav: 0})
            }else{
                res.render('admin/jobs/search', {navbar: 3, session: req.session.user, Job: job})
            }
        }else{
            res.render('admin/jobs/search', {navbar: 1, session: req.session.user, Job: job})
        }
    }else{
        res.render('admin/jobs/search', {navbar: 1, Job: job})
    }
    
})

router.get('/jobs/register', AdminAuth, (req, res) =>{
    res.render('admin/jobs/register', {navbar: 3, session: req.session.user})
})
router.post('/jobs/save', (req, res) =>{
    var name = req.body.name
    var description = req.body.description
    var target = req.body.experience
    var workload = req.body.workload
    var availability = req.body.availability
    var state = req.body.state
    var city = req.body.city
    var company = 'Empresa'//req.session.company
    var status = 'Active'
    Job.create({
        jobName: name,
        description: description,
        target: target,
        workload: workload,
        availability: availability,
        state: state,
        city: city,
        company: company,
        status: status
    }).then(()=>{
        res.redirect('/jobs')
    })
})

router.get('/jobs/edit/:job', AdminAuth, (req, res) =>{
    var id = req.params.job
    Job.findOne({
        where:{
            jobId: id
        }
    }).then(job =>{
        res.render('admin/jobs/edit', {navbar: 3, session: req.session.user, job: job})
    })
    
})
router.post('/jobs/update/:job', (req, res) =>{
    var id = req.params.job
    var name = req.body.name
    var description = req.body.description
    var target = req.body.experience
    var workload = req.body.workload
    var availability = req.body.availability
    var state = req.body.state
    var city = req.body.city
    var status = 'Active'
    Job.update({
        jobName: name,
        description: description,
        target: target,
        workload: workload,
        availability: availability,
        state: state,
        city: city,
        status: status
    }, { where:{
        jobId: id
    }}).then(() =>{
        res.redirect('/jobs')
    })

})

router.get('/jobs/api/:id', (req, res) =>{
    var id = req.params.id
    var session = req.session.user
    var email = req.session.user.email
    if(session){
        Favorite.findAll({
            where:{
                userEmail: email,
                jobId: id
            }
        }).then(favorite =>{
            
            if(favorite != 0){
                Job.findOne({
                    where:{
                        jobId: id
                    }
                }).then(job =>{
                    var informations ={
                        favorite: favorite,
                        job: job,
                        session: session
                    }
                    res.json(informations)
                })
            }else{
                Job.findOne({
                    where:{
                        jobId: id
                    }
                }).then(job =>{
                    var informations ={
                        favorite: null,
                        job: job,
                        session: session
                    }
                    res.json(informations)
                })
            }
        })
    }else{
        Job.findOne({
            where:{
                jobId: id
            }
        }).then(job =>{
            var informations ={
                favorite: null,
                job: job,
                session: session
            }
            res.json(informations)
        })
    }
})

module.exports = router