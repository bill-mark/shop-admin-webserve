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
        //console.log(ctx.request.body)
        //return
        const result = await new Commoditytype(ctx.request.body).save()
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
        const result = await Commoditytype.findByIdAndRemove(ctx.request.body.id)
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
           name:{type:'string',required:true},
           id:{type:'string',required:true},
        })
  
        const result = await Commoditytype.findByIdAndUpdate(ctx.request.body.id,ctx.request.body)
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
            data:await Commoditytype
            .find({ name: new RegExp(ctx.query.q) })  //正则表达式模糊搜索  key-value 精确搜索
            .limit(perPage).skip(page * perPage)
        }
       
    }
}

module.exports = new CommoditytypeCtl()