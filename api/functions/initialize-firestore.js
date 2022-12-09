// Replace `to-do-app-b886b-firebase-adminsdk-e9jgz-9ec0b2d94f` with the JSON file name in the firebase/key folder
const serviceAccount = require('../firebase/key/to-do-app-b886b-firebase-adminsdk-e9jgz-9ec0b2d94f.json');
const { getFirestore } = require('firebase-admin/firestore');
const { initializeApp, cert } = require('firebase-admin/app');

initializeApp({
  credential: cert(serviceAccount),
});

let firestoreService;
const initializeFirestore = () => {
  if (!firestoreService) {
    firestoreService = getFirestore();
  }
  return firestoreService;
};

module.exports = initializeFirestore;
