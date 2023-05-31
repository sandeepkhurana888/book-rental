const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'bookstore';
let client;
let db;

async function connectToMongoDB() {
    try {
      client = await MongoClient.connect(url);
      console.log('Connected successfully to MongoDB');
      db = client.db(dbName);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  function getDB() {
    return db;
  }

  function closeConnection() {
    client.close();
    console.log('MongoDB connection closed');
  }
  
  module.exports = { connectToMongoDB, getDB, closeConnection };