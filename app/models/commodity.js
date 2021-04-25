//商品表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const commoditySchema = new Schema({
    __v:{type:Number,select:false},
    name:{type:String,required:false},
    brand:{
        type:Schema.Types.ObjectId,
        ref:'Brand',
        select:true
    },//品牌
    commoditytype:{
        type:Schema.Types.ObjectId,
        ref:'Commoditytype',
        select:true
    },//商品类别
    total:{type:Number,default:0,required:false},//总数
    costprice:{type:Number,default:0},//进货总价
})

module.exports = model('Commodity',commoditySchema)