import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'isomorphic-unfetch'
import clientCreds from '../credentials/client'

export default class AuthService {
    private user;

    constructor() {
        firebase.initializeApp(clientCreds["development"]);
    
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
                return user
                    .getIdToken()
                    .then(token => {
                        return fetch('/api/login', {
                            method: 'POST',
                            headers: new Headers({ 'Content-Type': 'application/json' }),
                            credentials: 'same-origin',
                            body: JSON.stringify({ token })
                        })
                    })
            } else {
                this.user = null;
                fetch('/api/logout', {
                    method: 'POST',
                    credentials: 'same-origin'
                })
            }
        });

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getUser = this.getUser.bind(this);
    }
  
    login() {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  
    logout(){
        firebase.auth().signOut();
    }
  
    getUser(){
        return this.user;
    }
  }