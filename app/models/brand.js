//品牌表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const brandSchema = new Schema({
    __v:{type:Number,select:false},
    namne:{type:String,select:true}
})

module.exports = model('Brand',brandSchema)