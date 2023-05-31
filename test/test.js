const { calculateCharges } = require('../calculateCharges');
const { connectToMongoDB, getDB, closeConnection } = require('../db/mongoConnection');
const createCSV = require('../utility/csvGenerator');

// Mock the dependencies
jest.mock('../db/mongoConnection', () => ({
  connectToMongoDB: jest.fn(),
  getDB: jest.fn(),
  closeConnection: jest.fn(),
}));

jest.mock('../utility/csvGenerator', () => jest.fn());

describe('calculateCharges', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate charges for rentals and generate statement', async () => {
    // Mock the necessary functions and data
    const customerId = 'customerA';
    const rentals = {
      customerId,
      books: [
        { bookType: 'novel', count: 2, duration: 2 },
        { bookType: 'regular', count: 1, duration: 1 },
        { bookType: 'fiction', count: 1, duration: 3 },
      ],
    };
    const charges = [
      { bookType: 'novel', perDayCharge: 1.5, minCharge: 4.5, minDays: 3 },
      { bookType: 'regular', perDayCharge: 1.5, minCharge: 2, minDays: 2 },
      { bookType: 'fiction', perDayCharge: 3, minCharge: 3, minDays: 1 },
    ];

    
    getDB.mockReturnValue({
      collection: jest.fn().mockReturnValueOnce({
        findOne: jest.fn().mockImplementation((query) => {
          const charge = charges.find((c) => c.bookType === query.bookType);
          return Promise.resolve(charge);
        }),
      }),
    });

    createCSV.mockImplementation((statement) => {
      expect(statement).toEqual("");
    });

    await calculateCharges(customerId);

    expect(connectToMongoDB).toHaveBeenCalled();
    expect(getDB).toHaveBeenCalled();
    expect(closeConnection).toHaveBeenCalled();
    expect(createCSV).toHaveBeenCalled();
  });

  it('should handle no rentals for a customer', async () => {
    const customerId = 'customerX';
    const rentals = null;

   
    await calculateCharges(customerId);

    expect(connectToMongoDB).toHaveBeenCalled();
    expect(getDB).toHaveBeenCalled();
    expect(closeConnection).toHaveBeenCalled();
    expect(createCSV).toHaveBeenCalled();

  });

});