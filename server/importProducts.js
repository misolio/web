const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const products = [];

fs.createReadStream("12.csv")
  .pipe(csv({ separator: ";" }))

  .on("data", (row) => {
    products.push(row);
  })
  .on("end", async () => {
    console.log("Rows:", products.length);

    for (const product of products) {
      await db.collection("products").add({
        ...product,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }

    console.log("IMPORT FINISHED");
    process.exit(0);
  });
