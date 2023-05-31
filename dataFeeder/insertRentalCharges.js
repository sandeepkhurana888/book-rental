const {connectToMongoDB, getDB,closeConnection} = require('../db/mongoConnection');

async function insertRentalChargesRecords() {
    try {
    
        await connectToMongoDB();
        const db = getDB()
        const rentalChargesCollection = db.collection('rental_charges');
  
      // Insert the rental document
      const result = await rentalChargesCollection.insertMany([{
        bookType : "fiction",
        perDayCharge : 3,
        minCharge : 3,
        minDays : 1
    },{
        bookType : "regular",
        perDayCharge : 1.5,
        minCharge : 2,
        minDays : 2
    },{
        bookType : "novel",
        perDayCharge : 1.5,
        minCharge : 4.5,
        minDays : 3
    }]);
      console.log('Rental charges inserted successfully');
  
      // Close the MongoDB connection
        closeConnection()
    } catch (error) {
      console.error('Error:', error);
    }
  }

  insertRentalChargesRecords();