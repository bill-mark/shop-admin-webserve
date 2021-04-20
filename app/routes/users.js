const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefox:'/users'})
const {secret} = require('../config')
const auth = jwt({secret})




router.post('./login',login)
