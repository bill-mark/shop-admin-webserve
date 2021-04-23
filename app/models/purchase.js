//进货表
const mongoose = require('mongoose')

const {Schema,model} = mongoose

const purchaseSchema = new Schema({
    __v:{type:Number,select:false},
    intime:{type:Date,required:false},//进货时间
    delivery:{type:String,required:false},//发货方
    goodslist:{
       type:[
           {
               commodity:{type:Schema.Types.ObjectId,ref:'commodity'},
               count:{type:Number,required:true},//数量
               unit:{type:String,required:true},//单位
               price:{type:Number,required:true},//单价
           }
       ]
    },
    allmoney:{type:Number},//本次进货总价
    remark:{type:String},//备注
})

module.exports = model('Purchase',purchaseSchema)