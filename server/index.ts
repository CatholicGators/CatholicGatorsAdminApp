import * as express from 'express';
import * as next from 'next';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';

import auth from './routes/auth';

const port: number = parseInt(process.env.PORT, 10) || 3000;
const dev: boolean = process.env.NODE_ENV !== 'production';
const app: next.Server = next({ dev });
const handle: Function = app.getRequestHandler();

if(!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is not set');
}

app.prepare()
    .then(() => {
        const server: express.Express = express();

        server.use(bodyParser.json());
        server.use(
            session({
                secret: 'stdrogo',
                saveUninitialized: true,
                resave: false,
                rolling: true,
                httpOnly: true,
                cookie: { maxAge: 604800000 } // week
            })
        );

        server.use('/auth', auth);

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
});
