import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
export const collections: { users?: mongoDB.Collection } = {};
export async function connectToDatabase() {
  dotenv.config();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    "mongodb+srv://naojulius:naojulius@cluster0.pvbsa.mongodb.net/SaynaApi?retryWrites=true&w=majority"
  );
  //  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
  //    "mongodb://127.0.0.1:27017"
  //  );
  await client.connect();
  const db: mongoDB.Db = client.db("SaynaDb");
  const usersCollection: mongoDB.Collection = db.collection("users");
  collections.users = usersCollection;
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );
}
