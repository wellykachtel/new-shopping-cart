import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDTwodOth-5ppUKQF-sVEmjhJ-VswKw6qM",
    authDomain: "kellyshoppingcart-12ef2.firebaseapp.com",
    databaseURL: "https://kellyshoppingcart-12ef2.firebaseio.com",
    projectId: "kellyshoppingcart-12ef2",
    storageBucket: "kellyshoppingcart-12ef2.appspot.com",
    messagingSenderId: "71886150635"
  };
firebase.initializeApp(config);

export default firebase;