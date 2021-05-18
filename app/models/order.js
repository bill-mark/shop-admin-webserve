//订单表
const mongoose = require('mongoose')

const { Schema, model } = mongoose

const orderSchema = new Schema({
    __v: { type: Number, select: false },
    state: { type: Number, select: true },//订单状态 1待付款,2待发货,3已发货,4已付款,5有尾款,6已收货,7完结,8进入售后,9其他
    sum: { type: Number },//金额
    ordertime: { type: Date, required: false },//下单时间
    sendtime: { type: Date, required: false },//发货时间
    address: { type: String, required: false },//收货地址
    goodslist: {
        type: [
            {
                commodity:{type:Schema.Types.ObjectId,ref:'commodity'},
                count: { type: Number,required:true},//数量
                price:{type:Number,required:true},//卖出单价
            } 
        ],
        select: true
    },//商品列表
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        select: true
    },//客户表
    ecompany: {
        type: Schema.Types.ObjectId,
        ref: 'ecompany',
        required: false
    },//快递公司
    postid:{
        type:String,
        required: false
    },//快递单号
    postprice:{
        type:Number,
        required: false
    },//快递费
    remark: { type: String, required: false },//备注
},{collection:'order'})

module.exports = model('Order', orderSchema)