//品牌表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const brandSchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String}
})

module.exports = model('Brand',brandSchema)