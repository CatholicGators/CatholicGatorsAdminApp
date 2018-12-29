import * as express from 'express';
import * as next from 'next';

const port:number = parseInt(process.env.PORT, 10) || 3000;
const dev:boolean = process.env.NODE_ENV !== 'production';
const app:next.Server = next({ dev });
const handle:Function = app.getRequestHandler();

if(!process.env.NODE_ENV) {
    throw new Error('ERROR: NODE_ENV is not set!');
}

app.prepare()
    .then(() => {
        const server:express.Express = express();

        server.get('*', (req:Express.Request, res:Express.Response) => {
            return handle(req, res);
        });

        server.listen(port, (err:Error) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
});
