const mongoose = require('mongoose');

productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    imagePath:String
})


module.exports = mongoose.model('product',productSchema);