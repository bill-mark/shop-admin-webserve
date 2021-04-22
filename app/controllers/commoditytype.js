//商品类别
const Commoditytype = require('../models/commoditytype')

class CommoditytypeCtl{
    async create(ctx){
        ctx.verifyParams({
            name:{type:'string',required:true},
        })
        const {name} = ctx.request.body
        const repeated = await Commoditytype.findOne({name})
        if (repeated) {
            ctx.body = {
                state:-1,
                message:'已存在'
            }
            return
        }
        console.log(ctx.request.body)
        //return
        const result = await new Commoditytype(ctx.request.body).save()
        if(result._id){
            ctx.body = {
                state:0,
            }
        }  
    }
}

module.exports = new CommoditytypeCtl()