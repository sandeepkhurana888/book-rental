const {connectToMongoDB, getDB,closeConnection} = require('../db/mongoConnection');


async function insertRentalRecords() {
    try {

      await connectToMongoDB();
      const db = getDB()
      const rentalsCollection = db.collection('rentals');
  
      // Insert the rental document
      const result = await rentalsCollection.insertMany(
        [{
            "customerId" : "customerA",
            "books" : [{"bookType": "novel","count": 6, "duration" : 2},{"bookType": "regular","count": 1,"duration" : 1},{"bookType": "fiction","count": 1,"duration" : 3}]
        },
        {
            "customerId" : "customerB",
            "books" : [{"bookType": "novel","count": 2, "duration" : 2},{"bookType": "regular","count": 1,"duration" : 1}]
        }]
      );
      console.log('Rental document inserted successfully');
  
      // Close the MongoDB connection
      closeConnection()
    } catch (error) {
      console.error('Error:', error);
    }
  }

  insertRentalRecords()