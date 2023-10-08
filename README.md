# shop-admin-webserve
商业后台管理服务--nodejs,koa,mongobd

## mongodb
1.创建表的时候要传入第二个参数指定表名,
new Schema({ name: String }, { collection: 'actor' });
不然mongoose会加复数

2.aliyun 
mongo 47.105.138.178:27017

3.服务器安装数据库
开启远程连接之前，先要建立一个管理员用户，因为MongoDB默认是没有用户的。

在控制台输入命令连接数据库：
```
mongo  //最新版要用mongosh
```

连接到数据库之后使用以下语句来建立一个管理员用户：

use damianyang


必须在damianyang数据库上创建用户
db.createUser(
  {
    user: "boluo",
    pwd: "abc98988KK!!",
    roles: [ { role: "readWrite", db: "damianyang" } ]
  }
)

创建好后,如果不在damianyang,需要切换到damianyang数据库
use damianyang

在damianyang进行验证
db.auth('boluo','abc98988KK!!')


如果链接失败 可以直接创建数据库管理员账户,用管理员账户链接
use admin
db.createUser(
   {
     user: "dba",
    pwd: "dba",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
   }
 )