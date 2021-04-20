const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/users')
const {secret} = require('../config')

class userCtl{
    async create(ctx){
        ctx.verifyParams({  // 使用koa-parameter对参数进行校验
            name:{type:'string',required:true},
            password:{type:'string',required:true}
         })
         const {name}= ctx.request.body
         const repeatedUser = await User.findOne({name})
         if(repeatedUser){
             ctx.throw(409,'用户已存在')
         }
         const user = await new User(ctx.request.body).save()
         ctx.body = user
    }
    async login(ctx){
       console.log('login')
       
       ctx.verifyParams({  // 使用koa-parameter对参数进行校验
          name:{type:'string',required:true},
          password:{type:'string',required:true}
       })

       const user = await User.findOne(ctx.request.body)
       if(!user){
           ctx.throw(401,'用户或密码不正确')
       }
       const {_id,name} = user
       const token = jsonwebtoken.sign({_id,name},secter,{expiresIn:'1d'})
       ctx.body={token}
    }
}

module.exports = new userCtl()