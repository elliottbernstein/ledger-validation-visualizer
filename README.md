# Introduction
Ledger Validation Visualizer is a tool for monitoring average validation times for ledgers on the Ripple blockchain. This is accomplished through periodic Node/Express polling of a testnet rippled server.

## Technical Notes
This project runs best on node v8.9.4 with MacOS & Chrome

To get a better sense of the implementation, inspect the following files:

~/api/routes/index  The singular Express endpoint used by Vue request polling of ledger validations
~/src/assets/data/ledgersData  The Vue component responsible for querying and where we build the main data object
~/src/components/ledgersChart  The Vue component where the data object is rendered into a table, chart, and related statistics

## Installation
``` bash
npm install && cd ./api && npm install && cd ../
```

## Startup
``` bash
npm start
```
