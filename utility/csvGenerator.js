const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function createCSV(data){
    const chargesData = data.charges;
    chargesData.push({ bookType: 'Total Charges', charges: data.totalCharges });

    // CSV header configuration
    const csvHeader = [
      { id: 'bookType', title: 'Book Type' },
      { id: 'count', title: 'Count' },
      { id: 'duration', title: 'Duration' },
      { id: 'charges', title: 'Charges' }
    ];

    const csvWriter = createCsvWriter({
        path: 'output.csv',
        header: csvHeader
      });

      csvWriter.writeRecords(chargesData)
  .then(() => console.log('CSV file created successfully'))
  .catch(error => console.error('Error:', error));
}


module.exports = createCSV;