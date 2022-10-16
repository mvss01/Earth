const express = require("express");
const AdminAuth = require("../../middlewares/AdminAuth");
const router = express.Router();
const Candidate = require("../Candidates/candidate")

router.get('/candidates', AdminAuth, (req, res) =>{
    res.render('admin/candidates/search', {navbar: 3, session: req.session.user})
})

module.exports = router