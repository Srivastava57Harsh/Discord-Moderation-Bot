/// -------------------------------------------------------------------------------------- #
/// ** DATABASE LOADER **
/// Loads the database and returns the database object
/// -------------------------------------------------------------------------------------- #
import { Db, MongoClient } from 'mongodb';
import config from '../config';

let db: Db;

let client: MongoClient;

async function initializeClient(): Promise<Db> {
  client = await MongoClient.connect(config.databaseURL, {
  });

  return client.db();
}

export default async (): Promise<Db> => {
  if (!db) {
    db = await initializeClient();
  }

  return db;
};

export async function closeDB() {
  client.close();
}
