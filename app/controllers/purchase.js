const Purchase = require('../models/purchase')

class PurchaseCtl{
    async create(ctx){
        ctx.verifyParams({
            intime:{type:'string',required:true},
        })
        //mongodb默认存0区时间 要加8小时
        ctx.request.body.intime =new Date(Date.parse(ctx.request.body.intime)).getTime()+8*60*60*1000
        
        const result = await new Purchase(ctx.request.body).save()
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
        const result = await Purchase.findByIdAndRemove(ctx.request.body.id)
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
           id:{type:'string',required:true},
        })
  
        const result = await Purchase.findByIdAndUpdate(ctx.request.body.id,ctx.request.body)
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
            data:await Purchase
            .find({ delivery: new RegExp(ctx.query.q) })
            .limit(perPage).skip(page * perPage)
        }
    }
}

module.exports = new PurchaseCtl()