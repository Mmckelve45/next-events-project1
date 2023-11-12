import { MongoClient } from "mongodb";

const { dbUrl } = require("@/mongoConfig");

export async function connectDatabase() {
  const client = await MongoClient.connect(dbUrl);
  return client;
}

export async function insertDocument(
  client,
  collection,
  document
) {
  const db = client.db();
  const result = await db
    .collection(collection)
    .insertOne(document);
  return result;
}

export async function getAllDocuments(
  client,
  collection,
  sort
) {
  const db = client.db();
  // find fetches all the comments
  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();
  return documents;
}
