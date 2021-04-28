# shop-admin-webserve
商业后台管理服务--nodejs,koa,mongobd

## mongodb
1.创建表的时候要传入第二个参数指定表名,
new Schema({ name: String }, { collection: 'actor' });
不然mongoose会加复数

2.aliyun mongo 47.105.138.178:27017

3.数据库
aliyun

use damianyang

db.createUser(
  {
    user: "boluo",
    pwd: "abc98988KK!!",
    roles: [ { role: "readWrite", db: "damianyang" } ]
  }
)

db.auth('boluo','abc98988KK!!')


单位
1箱,2个,3件