import { Client, Databases, Account, Storage } from "appwrite";

const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const ENDPOINT = import.meta.env.VITE_ENDPOINT;
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
export const BUCKET_ID = import.meta.env.VITE_BUCKET_ID;
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const USER_COLLECTION_ID = import.meta.env.VITE_USER_COLLECTION_ID;
export const PHOTO_COLLECTION_ID = import.meta.env.VITE_PHOTO_COLLECTION_ID;
