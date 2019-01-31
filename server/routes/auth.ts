import * as express from 'express';
import { FirebaseAdmin } from '../firebase/FirebaseAdmin';

const router = express.Router();
const firebase = FirebaseAdmin.getInstance();

// Requires the body-parser middleware

router.post('/login', (req: any, res) => {
    if (!req.body) return res.sendStatus(400);

    const token = req.body.token;
    firebase
        .auth()
        .verifyIdToken(token)
        .then(decodedToken => {
            req.session.decodedToken = decodedToken
            return decodedToken
        })
        .then(decodedToken => res.json({ status: true, decodedToken }))
        .catch(error => res.json({ error }));
});

router.post('/logout', (req: any, res) => {
    req.session.decodedToken = null;
    res.json({ status: true });
});

export default router;
