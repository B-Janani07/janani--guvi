import { Client } from 'appwrite';
import { PROJECT_ID, API_ENDPOINT } from '@env';

const client = new Client();

client.setEndpoint(API_ENDPOINT).setProject(PROJECT_ID);

export default client;

