//商品类别表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const commoditytypeSchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String,required:true,select:true}
})

module.exports = model('Commoditytype',commoditytypeSchema)