async function UserAuth(req, res, next){
    const User = require("../controllers/Users/user")
    if(req.session.user){
        let token = req.session.user.token
        let email = req.session.user.email
        const user = await User.findOne({
            where:{email: email, token: token}
        })
        if(user){
            if(user.type == "User"||user.type == "Admin"||user.type == "Mod"){
                next()
            }else{
                res.redirect('/')
            }  
        }else{
            req.session.user = null
            res.redirect('/')
        }
    }else{
        res.redirect('/')
    }
}

module.exports = UserAuth