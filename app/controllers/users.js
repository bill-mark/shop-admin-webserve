const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const { secret } = require('../config')

class UserCtl {
    async create(ctx) {
        ctx.verifyParams({  // 使用koa-parameter对参数进行校验
            name: { type: 'string', required: true },
            phone: { type: 'number', required: true },
            password: { type: 'string', required: true }
        })
        const { name } = ctx.request.body
        const repeatedUser = await User.findOne({ name })
        if (repeatedUser) {
            ctx.body = {
                state:-1,
                message:'已存在'
            }
            return
        }
        const user = await new User(ctx.request.body).save()
        console.log(user)
        ctx.body = {
            state:0,
            phone:user.phone,
        }
    }
    async login(ctx) {
        //console.log('login')

        ctx.verifyParams({  // 使用koa-parameter对参数进行校验
            name: { type: 'string', required: true },
            password: { type: 'string', required: true }
        })

        const user = await User.findOne(ctx.request.body)
        if (!user) {
            ctx.body = {
                state:-1,
                message:'账户或者密码不正确'
            }
            return
        }
        const { _id, name } = user
        const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' })
        ctx.body = { 
            state:0,
            token:token,
            id:_id,
            name:name
         }
    }
    async findall(ctx) {
        const { per_page = 10 } = ctx.query
        const page = Math.max(ctx.query.page * 1, 1) - 1 //乘1用来转数字  max保证不能小于1
        const perPage = Math.max(per_page * 1, 1) //每页多少条
        ctx.body = await User
            .find({ name: new RegExp(ctx.query.q) })  //正则表达式模糊搜索  key-value 精确搜索
            .limit(perPage).skip(page * perPage)
    }
    async delete(ctx){
        ctx.verifyParams({
            id:{type:'string',required:true},
         })
        const user = await User.findByIdAndRemove(ctx.request.body.id)
        if(!user){
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
           password:{type:'string',required:false},
           phone:{type:'number',required:false},
        })
  
        const user = await User.findByIdAndUpdate(ctx.request.body.id,ctx.request.body)
        if(!user){
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
}

module.exports = new UserCtl()