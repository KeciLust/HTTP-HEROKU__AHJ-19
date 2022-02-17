const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const { v4: uuidv4 } = require('uuid');
const port = process.env.PORT || 7070;


const tickets = [];

app.use(koaBody({
    urlencoded: true,
    multipart: true,
    }));
    
    app.use(async ctx => {
        ctx.response.set({
            'Access-Control-Allow-Origin': '*',
            });
            
         const { method, id } = ctx.request.query;
        
         switch(method) {
            case 'allTickets' :
                ctx.response.body = tickets;
                return;
            case 'createTicket' :
                const ticket = JSON.parse(ctx.request.body);
                ticket.id = uuidv4();
                tickets.push(JSON.stringify(ticket));
                ctx.response.body = {id: ticket.id};
                                       
                return;
             case 'ticketById' :
                     tickets.forEach((el) => {
                     const e = JSON.parse(el)
                     if(e.id === id){
                        tickets.splice(tickets.indexOf(el));
                         ctx.response.body = tickets;
                         
                     }
                 });
                 return;  
                 case 'repearTicket':
                    
                    const repearTicket = JSON.parse(ctx.request.body);
                    tickets.forEach((el) => {
                        const e = JSON.parse(el)
                      
                        if(e.id === repearTicket.id){
                           e.name = repearTicket.name;
                           e.description = repearTicket.description;
                           e.create = repearTicket.create;
                           const er = JSON.stringify(e);
                           tickets.splice(tickets.indexOf(el), 1, er);
                           
                          
                           ctx.response.body = tickets;
                        }
                    });
                    return;
            default:
                    ctx.response.status = 404;
                    
                    return;
         }
        });
        

    

const server = http.createServer(app.callback()).listen(port);

