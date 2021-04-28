const Koa = require('koa');
const koaBody = require('koa-body') //获取post请求体
const error = require('koa-json-error')  //统一报错
const parameter = require('koa-parameter')  //校验参数
const app = new Koa();
const routing = require('./routes/index.js')
const mongoose = require('mongoose')  //链接mongodb插件
const {dev_connectionStr,produce_connectionStr} = require('./config')
const path = require('path')  //路径模块
const koaStatic = require('koa-static')


if(process.env.MODE_ENV === 'dev'){  //开发模式 链接mongo官方免费云数据库
    mongoose.connect(dev_connectionStr,{
        useNewUrlParser: true,//使用新解析字符串工具
        useUnifiedTopology: true,//使用新的服务器发现和监视引擎
    },()=> console.log('dev mongodb line success !'))
}
if(process.env.MODE_ENV === 'produce'){  //生产  链接阿里云ECS数据库
    mongoose.connect(produce_connectionStr, 
    {useNewUrlParser: true,useUnifiedTopology: true}).then(
        ()=>{console.log('sucess')},
        err=>{console.log(err)}
    )
}



mongoose.connection.on('error',console.error)


app.use(koaStatic(path.join(__dirname,'public')))

app.use(error({
    postFormat:(e,{stack,...rest})=>process.env.NODE_ENV === 'production'?rest:{stack,...rest}
}))

//post请求体
app.use(koaBody({
  multipart:true,//启用文件
  formidable:{
      uploadDir:path.join(__dirname,'public/uploads'),//保存文件目录
      keepExtensions:true,//保留拓展名
  }
}))

app.use(parameter(app))
routing(app)

app.listen(3000,()=>{console.log('shop admin webserver koa has start')})