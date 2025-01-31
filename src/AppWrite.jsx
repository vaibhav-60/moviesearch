import { Client, Database } from 'appwrite'
 
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint()
    .setProject()

const database = new Database(client);

export const updateSearchCount = (searchTerm, movie) => {
    console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);  
}