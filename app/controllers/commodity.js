const Commodity = require('../models/commodity')
//商品
class CommodityCtl{
    async create(ctx){
        ctx.verifyParams({
            name:{type:'string',required:true},
            brand:{type:'string',required:true},
            commoditytype:{type:'string',required:true},
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
    async delete(ctx){
        ctx.verifyParams({
            id:{type:'string',required:true},
         })
        const result = await Commodity.findByIdAndRemove(ctx.request.body.id)
        if(!result){
            ctx.body = {
                state:-1,
                message:'目标不存在'
            }
            return
        }
        ctx.body = {
            state:0,
        }
    }
    async update(ctx){
        ctx.verifyParams({
           name:{type:'string',required:false},
           id:{type:'string',required:true},
        })

  
        const result = await Commodity.findByIdAndUpdate(ctx.request.body.id,ctx.request.body)
        if(!result){
            ctx.body = {
                state:-1,
                message:'目标不存在'
            }
            return
        }
        ctx.body = {
            state:0,
        }
    }
    async findall(ctx) {
        const { per_page = 10 } = ctx.query
        const page = Math.max(ctx.query.page * 1, 1) - 1 //乘1用来转数字  max保证不能小于1
        const perPage = Math.max(per_page * 1, 1) //每页多少条
        ctx.body = {
            state:0,
            count:await Commodity.count(),
            data:await Commodity
            .find({ name: new RegExp(ctx.query.q) }).populate('brand commoditytype')
            .limit(perPage).skip(page * perPage)
        }
    }
    async getdetail(ctx){
        const result = await Commodity.findById(ctx.query.id).populate('brand commoditytype')
        if(!result){
           ctx.throw(404,'用户不存在')
        }
        ctx.body = {
            state:0,
            data:result
        }
    }
}

module.exports = new CommodityCtl()