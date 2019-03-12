import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDVtX2MZDAwid1Dua4jDRWPC00VXka0QU0",
  authDomain: "test1-427fa.firebaseapp.com",
  databaseURL: "https://test1-427fa.firebaseio.com",
  projectId: "test1-427fa",
  storageBucket: "test1-427fa.appspot.com",
  messagingSenderId: "843590916898"
};


  class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
      this.db = app.database();
    }
    // *** Auth API ***

    //creating a user
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);
    //signing in
  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
  }
  
  export default Firebase;