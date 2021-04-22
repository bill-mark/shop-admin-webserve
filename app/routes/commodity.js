const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({prefix:'/commmodity'})
const {secret} = require('../config')
const auth = jwt({secret})

const {create} = require('../controllers/commodity')


router.post('/create',create)
// router.post('/delete',del)
// router.post('/update',update)
// router.get('/findall',findall)
// router.get('/findone',findone)

module.exports = router