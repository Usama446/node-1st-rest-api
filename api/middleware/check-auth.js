const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try
    {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token,'this is dummy test');
        console.log('verify');
        if(verify.userType == 'Admin')
        {
            next();
        }
        else
        {
            return res.status(401).json({
                msg : "You have no Autherization"
            })
        }
    }
    catch(error)
    {
        return res.status(401).json({
            msg : "Invalid token"
        })
    }
}

// module.exports = (req, res, next) => {
//     try{
//         const token = req.headers.authorization.split(" ")[1];
//         console.log(token);
//         const verify = jwt.verify(token,'this is dummy test');
//         // console.log(verify);
//         next();
//     }
//     catch(error)
//     {
//         return res.status(401).json({
//             msg : "Invalid Token"
//         })
//     }
// }