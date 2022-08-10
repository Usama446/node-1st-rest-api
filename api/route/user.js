const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
// const user = require('../model/user');
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email,
                userType: req.body.userType
            })

            user.save()
                .then(result => {
                    res.status(200).json({
                        new_user: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})


router.post('/signin',(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1)
        {
            res.status(401).json({
                message : "User not Exist"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(err, result)=>{
            if(!result)
            {
                res.status(401).json({
                    msg : "Password not matched"
                })
            }
            if(result)
            {
                const token = jwt.sign({
                    username : user[0].username,
                    userType : user[0].userType,
                    email : user[0].email,
                    phone : user[0].phone
                },
                'this is dummy test',
                {
                    expiresIn : "24h"   
                }
                );
                res.status(200).json({
                    username : user[0].username,
                    userType : user[0].userType,
                    email : user[0].email,
                    phone : user[0].phone,
                    token: token
                })
            }
        })
    })
})


// router.post('./',(req,res,next)=>{
//     res.status(200).json({
//         message : 'user post api is running'
//     })
// })


// router.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'User route working'
//     }) 
// })

router.get('/', (req, res, next) => {
    User.find()
    .then(result=>{
        res.status(200).json({
            result : result
        });
    })
    .catch(err=>{
        res.status(500).json({
            error : err
        })
    });
})


module.exports = router;