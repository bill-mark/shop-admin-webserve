const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/customer' })
const { secret } = require('../config')
const auth = jwt({ secret })

const { create, delete: del, update, findall,getdetail} = require('../controllers/customer')


router.post('/create', create)
router.post('/delete', del)
router.post('/update', update)
router.get('/findall', findall)
router.get('/getdetail',getdetail)

module.exports = router