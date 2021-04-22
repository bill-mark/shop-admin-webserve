const Commodity = require('../models/commodity')
//商品
class CommodityCtl{
    async create(ctx){
        ctx.verifyParams({
            name:{type:'string',required:true},
            brandid:{type:'string',required:true},
            typeid:{type:'string',required:true},
        })
        const {name} = ctx.request.body
        const repeated = await Commodity.findOne({name})
        if (repeated) {
            ctx.body = {
                state:-1,
                message:'已存在'
            }
            return
        }
        const result = await new Commodity(ctx.request.body).save()
        if(result._id){
            ctx.body = {
                state:0,
            }
        }  
    }
}

module.exports = new CommodityCtl()