import axios from 'axios';

// create the data object, seed with the first entry
const data = []

const startTime = performance.now();
let queryNumber = 0;
let previousValue = null;
const interval = 500; // 10 seconds between queries
let totalValidations = 0;

function queryBlockchain() {
  axios.get('http://localhost:8081')
  .then(response => {
    const validatedLedger = response.data.result.info.validated_ledger
    if (!previousValue) { // first run
      previousValue = validatedLedger.seq;
      totalValidations += previousValue;
      data.push({
        time: ((performance.now() - startTime)/1000).toFixed(3),
        sequence: validatedLedger.seq,
        validations: 0, // can't count # validations since last run on first run
        lastValidation: 0,
        totalValidations: 0,
        validationSpeed: 0.00001, // needs a value to kickstart things, will be shifted off later
        averageValidation: 0,
        first: true
      })
    } else { // after first run
      const diff = validatedLedger.seq - previousValue; // # validations since last run
      previousValue = validatedLedger.seq;
      totalValidations += diff;
      data.push({
        time: ((performance.now() - startTime)/1000).toFixed(3),
        sequence: validatedLedger.seq,
        validations: diff,
        totalValidations: data[data.length-1].totalValidations + diff,
        lastValidation: diff > 0 ? performance.now() : data[data.length-1].lastValidation,
        validationSpeed: diff > 0 ? performance.now() - data[data.length-1].lastValidation : 0,
        averageValidation: function() { // iife to calculate average validation speed
          let valSpeeds
          let hasOne = data.filter(i => i.validationSpeed > 0.00001)
          if (hasOne.length === 0) {
            valSpeeds = data.filter(i => i.validationSpeed > 0).map(i => i.validationSpeed);
          } else {
            valSpeeds = data.filter(i => i.validationSpeed > 0.00001).map(i => i.validationSpeed);
          }
          const valSpeedsSum = valSpeeds.reduce((a,b) => b += a)/1000;
          return (valSpeedsSum/valSpeeds.length).toFixed(3)
        }()
      })
    }
    if (data.length > 50) { // start shifting off old data at 50 queries
      data.shift()
    }
  })
}

queryBlockchain() // first run
setInterval(() => {queryBlockchain()}, interval) // query the endpoint at regular intervals
export default data
