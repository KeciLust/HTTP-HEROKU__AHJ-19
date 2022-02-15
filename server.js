const http = require('http');
const port = process.env.PORT || 7070;
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const uuid = require('uuid');

console.log(uuid);

app.use(koaBody({
    urlencoded: true,
    multipart: true,
    }));
    
    app.use(async ctx => {
        console.log(ctx.request.querystring);
        console.log(ctx.request.body);

        ctx.response.body = 'server response';
        });
        
const server = http.createServer(app.callback()).listen(port);
