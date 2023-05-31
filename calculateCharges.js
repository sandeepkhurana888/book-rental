const {connectToMongoDB, getDB,closeConnection} = require('./db/mongoConnection');
const createCSV = require('./utility/csvGenerator');


const chargesPerdayConfig = {
  "regular" : 1.5,
  "fiction" : 3,
  "novel" : 1.5
} 


      async function calculateCharges(customerId) {
        try {
          await connectToMongoDB();
          const db = getDB()
          const rentalsCollection = db.collection('rentals');
          let totalCharges = 0;
          const rentals = await rentalsCollection.findOne({ customerId });
          let statement = {};
          statement.charges=[];
          statement.totalCharges = 0;

          for(let book of rentals.books){
            let bookCharge = 0;
            let perDayCharge;
            perDayCharge = chargesPerdayConfig[book.bookType]
            bookCharge = perDayCharge*book.duration;
            book.charges = book.count*bookCharge;
            totalCharges+=book.charges;
            statement.charges.push(book)

          }

          statement.totalCharges = totalCharges;
          console.log("Statement generated", statement);
          createCSV(statement)
          // Close the MongoDB connection
          closeConnection()
        } catch (error) {
          console.error('Error:', error);
        }
      }


      
  
calculateCharges('customerA');





