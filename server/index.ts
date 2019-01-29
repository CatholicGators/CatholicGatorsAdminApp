import * as express from 'express';
import * as next from 'next';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as sessionFileStore from 'session-file-store';
import * as admin from 'firebase-admin';
import serverCreds from '../credentials/server';

const port: number = parseInt(process.env.PORT, 10) || 3000;
const dev: boolean = process.env.NODE_ENV !== 'production';
const app: next.Server = next({ dev });
const handle: Function = app.getRequestHandler();
const FileStore = sessionFileStore(session);

if(!process.env.NODE_ENV) {
    throw new Error('ERROR: NODE_ENV is set to ' + process.env.NODE_ENV);
}
const firebase = admin.initializeApp(
    {
        credential: admin.credential.cert(serverCreds[process.env.NODE_ENV]),
        databaseURL: '' // TODO database URL goes here
    },
    'server'
)

app.prepare()
    .then(() => {
        const server = express();

        server.use(bodyParser.json());
        server.use(
            session({
                secret: 'geheimnis',
                saveUninitialized: true,
                store: new FileStore({ path: '/tmp/sessions', secret: 'geheimnis' }),
                resave: false,
                rolling: true,
                httpOnly: true,
                cookie: { maxAge: 604800000 } // week
            })
        );

        server.use((req: any, _, next) => {
            req.firebaseServer = firebase;
            next();
        });

        server.post('/api/login', (req:any , res) => {
            if (!req.body) return res.sendStatus(400)
        
            const token = req.body.token
            firebase
                .auth()
                .verifyIdToken(token)
                .then(decodedToken => {
                    req.session.decodedToken = decodedToken
                    return decodedToken
                })
                .then(decodedToken => res.json({ status: true, decodedToken }))
                .catch(error => res.json({ error }))
        })
        
        server.post('/api/logout', (req:any, res) => {
            req.session.decodedToken = null
            res.json({ status: true })
        })
        
        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
});
