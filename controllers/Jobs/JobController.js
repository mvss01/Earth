const express = require("express");
const UserAuth = require("../../middlewares/UserAuth");
const router = express.Router();
const Job = require("./job");

router.get('/jobs', (req, res) =>{
    res.render('admin/jobs/search', {navbar: 1})
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

router.get('/jobs/favorites', (req, res) =>{
    res.render('admin/jobs/favorites', {navbar: 2, session: req.session.user})
})

module.exports = router