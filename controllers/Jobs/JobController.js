const express = require("express");
const router = express.Router();
const Job = require("./job");

router.get('/jobs', (req, res) =>{
    res.render('admin/jobs/search')
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


module.exports = router