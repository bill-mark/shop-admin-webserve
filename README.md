# shop-admin-webserve
商业后台管理服务--nodejs,koa,mongobd

##
mongodb

链接账户密码
db.auth("root","DER342434ggbhmkl667")

db.createUser(
     {
       user:"root",
       pwd:"DER342434ggbhmkl667",
       roles:['userAdminAnyDatabase']
     }
)

db.addUser("root","DER342434ggbhmkl667")

stream {
    upstream stream_mongo_backend {
            server 127.0.0.1:27017;
    }

    server {
            listen 47.105.138.178:27017;
            proxy_pass stream_mongo_backend;
    }
}

kkk
分类表
类别
创建日期
更新日期


品牌表
品牌名称
描述


商品表
名称
单价
总数
上游发货商
进货日期
出货日期
买家
保质期
*品牌
*分类


用户表
姓名
密码
联系方式
角色

订单表
状态 待付款 待发货 待收款 已发货 已收款 



客户表
名称
联系方式
店铺地址
*购货列表


单位
1:箱,2个,3件