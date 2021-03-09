# shop-admin-webserve
电商管理后台服务--nodejs,koa,mongobd

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