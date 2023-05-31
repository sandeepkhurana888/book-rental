const {connectToMongoDB, getDB,closeConnection} = require('./db/mongoConnection');
const createCSV = require('./utility/csvGenerator');




async function calculateCharges(customerId) {
  try {
    await connectToMongoDB();
    const db = getDB()
    const rentalsCollection = db.collection('rentals');
    const chargesCollection = db.collection('rental_charges');
    let totalCharges = 0;
    const rentals = await rentalsCollection.findOne({ customerId });
    let statement = {};
    statement.charges=[];
    statement.totalCharges = 0;

    for(let book of rentals.books){
      let bookCharge = 0;
      const charges = await chargesCollection.findOne({bookType:book.bookType});
      const {perDayCharge,minCharge,minDays} = charges;
      if(book.duration>minDays){
          bookCharge = perDayCharge*book.duration;
      }else{
          bookCharge = minCharge;
      }
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





