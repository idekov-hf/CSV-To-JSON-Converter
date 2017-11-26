// Require dependencies
const csvtojson = require('csvtojson')
const fs = require('fs')
const path = require('path')

const defaultCsvPath = path.join(__dirname, 'customer-data.csv')

const convertCsvToJson = (
  csvFilePath = defaultCsvPath,
  fileName = 'customer-data.csv'
) => {
  console.log(`Converting ${fileName} to JSON file`)
  // Array for saving each parsed CSV line
  const outputJSON = []

  csvtojson()
    .fromFile(csvFilePath)
    .on('json', jsonObj => {
      // Combine CSV header row and CSV line to a JSON object
      outputJSON.push(jsonObj)
    })
    .on('done', error => {
      if (error) return console.log(error)
      const outputData = JSON.stringify(outputJSON, null, 2)
      // Write JSON to file
      fs.writeFileSync(path.join(__dirname, 'customer-data.json'), outputData)
      console.log('Conversion done\nJSON data saved to ./customer-data.json')
    })
}

let filePathFromArg
if (process.argv[2]) {
  filePathFromArg = path.join(__dirname, process.argv[2])
}
convertCsvToJson(filePathFromArg, process.argv[2])
