const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../model/product');
const checkAuth = require('../middleware/check-auth');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name : 'node-1st-api',
    api_key : '274824778537685',
    api_secret : 'ShaBvIrtIBHQOE8Y6122Hg_fkxA'
});


router.get('/',checkAuth, (req, res, next) => {
    res.status(200).json({
        message: 'Product route working'
    })
})

// router.post('/insert',(req,res,next) =>{
//     const product = new Product({
//         _id: new mongoose.Types.ObjectId,
//         name : req.body.name
//     })
//     product.save()
//     .then(result => {
//         res.status(200).json({
//             new_product: result
//         })
//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         })
//     })
// })

router.post('/Add',(req,res,next)=>{
    // console.log(req.body);
    const file = req.files.photo
    cloudinary.uploader.upload(file.tempFilePath,(err, result)=>{
        // console.log(result);
        const product = new Product({
            _id: new mongoose.Types.ObjectId,
            name : req.body.name,
            imagePath : result.url
        });
        product.save()
        .then(result => {
            res.status(200).json({
                new_product: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    })
})


module.exports = router;