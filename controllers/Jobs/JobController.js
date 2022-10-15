const express = require("express");
const UserAuth = require("../../middlewares/UserAuth");
const router = express.Router();
const User = require("../Users/user")
const Job = require("./job");

router.get('/jobs', async (req, res) =>{
    var session = req.session.user
    var job = await Job.findAll()
    if(session){
        var token = session.token
        var user = await User.findOne({
            where:{
                token: token
            }
        })
        if(user){
            res.render('admin/jobs/search', {navbar: 2, session: req.session.user, Job: job})
        }else{
            res.render('admin/jobs/search', {navbar: 1, session: req.session.user, Job: job})
        }
    }else{
        res.render('admin/jobs/search', {navbar: 1, session: req.session.user, Job: job})
    }
    
})
router.get('/jobs/view/:job', (req, res) =>{
    res.render('admin/jobs/view')
})

router.get('/jobs/register', (req, res) =>{
    res.render('admin/jobs/register')
})
router.post('/jobs/save', (req, res) =>{

})

router.get('/jobs/edit/:job', (req, res) =>{
    res.render('admin/jobs/edit')
})
router.post('/jobs/update/:job', (req, res) =>{

})

router.get('/jobs/favorites', UserAuth, (req, res) =>{
    res.render('admin/jobs/favorites', {navbar: 2, session: req.session.user})
})

router.get('/jobs/api/:id', (req, res) =>{
    var id = req.params.id
    Job.findOne({
        where:{
            id: id
        }
    }).then(job =>{
        res.json(job)
    })
})

module.exports = router