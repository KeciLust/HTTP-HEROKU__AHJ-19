const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

const tickets = [];

app.use(koaBody({
    urlencoded: true,
    multipart: true,
    }));
    
    app.use(async ctx => {
        
        ctx.response.set({
            'Access-Control-Allow-Origin': '*',
            });
            
         const { method } = ctx.request.query;
        
         switch(method) {
            case 'allTickets' :
                ctx.response.body = tickets;
                return;
            case 'createTicket' :
                tickets.push(ctx.request.body);
                ctx.response.body = tickets                        
                return;
            default:
                    ctx.response.status = 404;
                    
                    return;
         }
        });
        

    

const server = http.createServer(app.callback()).listen(7070);

