# book-rental

# How data is stored in database:
db Used is MongoDB and there are 2 collections.
1. rentals collection: This stores customer's information what all books are rented by customer.
2. rental_charges collection: This contains required book rental data such as rent per day charges, minimum charges and other metadata which can be modified as per requirement at later stage of time


After cloning this repo steps to configure and run application:
Please make sure NodeJs and Mongod are installed in system. 
1. Run command 'npm install' to install all dependencies to project.
2. Run claculateCharges.js file using command - 'node calculateCharges.js'.

This will run calculateCharges(customer) function which will generate a csv file statement of all the books which customer has rented.

Initially in console there will be message "No Records found" as locally there will be no data of customer and rental charges.



# To add customer data and rental charges in database follow below steps to feed data
1. Go to dataFeeder directory, Modify dummy data mentioned in insertRentalCharges.js and insertRentalRecords.js files as per requirement. 
2. To add customer's data run command 'node insertRentalRecords.js'.
3. To add book rental charges metadata run command 'node insertRentalCharges.js'

# Now data is added to local db with customer details. TO test program follow below steps:
1. In calculateCharges(customer) function of calculateCharges.js file, you can pass valid customer id which was added in previous step of dataFeeder
2. Go back to root directory of the project and run command 'node calculateCharges.js'.
This will claculate the total charges of rented books by customer entered and it will generate a statement in csv file format. Please open csv file in Ms excel or other csv reader.
