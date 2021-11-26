const admin = require("firebase-admin");
const serviceAccount = require("./wesopt29-8f39a-firebase-adminsdk-zian7-b34a3307de");
const dotenv = require("dotenv");

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require("./api"),
};