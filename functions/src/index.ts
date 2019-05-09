
import * as admin from 'firebase-admin';
import * as uploadingFunctions from './uploading-functions';

admin.initializeApp();

module.exports = {
  ...uploadingFunctions,
};

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
