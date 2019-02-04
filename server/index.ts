import * as express from 'express';
import * as next from 'next';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import * as admin from 'firebase-admin';

const serverCreds: admin.ServiceAccount = {
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL
}
const port: number = parseInt(process.env.PORT, 10) || 3000;
const dev: boolean = process.env.NODE_ENV !== 'production';
const app: next.Server = next({ dev });
const handle: Function = app.getRequestHandler();
const firebase = admin.initializeApp({
    credential: admin.credential.cert(serverCreds)
});

app.prepare()
    .then(() => {
        const server = express();

        server.use(bodyParser.json());
        server.use(
            session({
                secret: 'geheimnis',
                saveUninitialized: true,
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
